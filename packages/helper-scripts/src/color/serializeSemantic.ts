/* eslint-disable @typescript-eslint/ban-ts-comment */
import { data, Variable } from './data';

type NestedObject = {
  [key: string]: NestedObject | string | ColorItem;
};

type ColorItem = {
  name: string;
  lightValue: string;
  darkValue: string;
};

function convert_folder_structured_name_to_nested_object(
  arr: Variable[],
): NestedObject {
  const root: NestedObject = {};

  arr.forEach((item) => {
    const folders = item.name.split('/');
    if (folders.length < 4) return;

    let currentObj: NestedObject = root;

    folders.forEach((folder, index) => {
      if (typeof currentObj[folder] === 'undefined') {
        currentObj[folder] = // @ts-ignore
          index === folders.length - 1 ? item.value?.name : {};
      }
      currentObj = currentObj[folder] as NestedObject;
    });
  });

  return root;
}

function mergeColors(
  lightObj: NestedObject,
  darkObj: NestedObject,
): NestedObject {
  const merged: NestedObject = {};

  Object.keys(lightObj).forEach((key) => {
    if (
      typeof lightObj[key] === 'object' &&
      darkObj[key] &&
      typeof darkObj[key] === 'object'
    ) {
      merged[key] = mergeColors(
        lightObj[key] as NestedObject,
        darkObj[key] as NestedObject,
      );
    } else if (
      typeof lightObj[key] === 'string' ||
      typeof darkObj[key] === 'string'
    ) {
      merged[key] = {
        name: key,
        lightValue: lightObj[key] as string,
        darkValue: (darkObj[key] || '') as string,
      };
    }
  });

  return merged;
}

function convertToDesiredFormat(merged: NestedObject): any {
  const result: any[] = [];

  Object.keys(merged).forEach((key) => {
    const value = merged[key];
    if (
      value &&
      typeof value === 'object' &&
      !(value as ColorItem).lightValue
    ) {
      const nestedObject = convertToDesiredFormat(value as NestedObject);
      if (nestedObject.length > 0) {
        result.push({
          name: key,
          value: nestedObject,
        });
      }
    } else if ((value as ColorItem).lightValue) {
      result.push({
        name: key,
        lightValue: (value as ColorItem).lightValue,
        darkValue: (value as ColorItem).darkValue,
      });
    }
  });

  return result;
}

export function serializeSemantic() {
  const newSemanticDump = data.collections2.find((e) => e.modes.length > 1);

  const lightColors = newSemanticDump?.modes.find((e) => e.name == 'Light');
  const darkColors = newSemanticDump?.modes.find((e) => e.name == 'Dark');

  const converted_light_colors =
    convert_folder_structured_name_to_nested_object(
      lightColors?.variables as Variable[],
    );
  const converted_dark_colors = convert_folder_structured_name_to_nested_object(
    darkColors?.variables as Variable[],
  );

  const mergedColors = mergeColors(
    converted_light_colors,
    converted_dark_colors,
  );

  return convertToDesiredFormat(mergedColors);
}
