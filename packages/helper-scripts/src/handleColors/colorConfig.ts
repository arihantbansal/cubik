import fs from 'fs';

import { colorDump } from '../utils/color';

interface ColorObject {
  id: string;
  name: string;
  description: string;
  type: string;
  valuesByMode: {
    [key: string]: { r: number; g: number; b: number; a: number };
  };
  resolvedValuesByMode: {
    [key: string]: {
      resolvedValue: { r: number; g: number; b: number; a: number };
      alias: null;
    };
  };
  scopes: string[];
  hiddenFromPublishing: boolean;
  codeSyntax: {};
}

interface newColorObj {
  name: string;
  color: string;
}

function convertColorsToHex(inputArray: ColorObject[]): newColorObj[] {
  const hexColorArray: newColorObj[] = [];

  for (const colorObj of inputArray) {
    const { name, valuesByMode, ...rest } = colorObj;
    const rgbValue = valuesByMode['202:2'];

    if (rgbValue) {
      const hexValue = rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b);
      const updatedName = name.replace('Color/', '').replace(/\//g, '-');

      const newColorObj: newColorObj = {
        name: updatedName.toLowerCase(),
        color: hexValue,
      };

      hexColorArray.push(newColorObj);
    }
  }

  return hexColorArray;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const createColor = () => {
  const newD = convertColorsToHex(colorDump);
  let colors = new Object();
  newD.forEach((e) => {
    colors = {
      [e.name]: e.color,
      ...colors,
    };
  });
  const colorKeys = Object.keys(colors);

  // Sort the color keys based on their numeric index
  colorKeys.sort((a, b) => {
    const [, aIndex] = a.split('-');
    const [, bIndex] = b.split('-');
    return Number(bIndex) - Number(aIndex);
  });

  // Create a new object with the reordered colors
  const reorderedColors = {};
  for (const key of colorKeys) {
    //@ts-ignore
    reorderedColors[key] = colors[key];
  }

  fs.writeFileSync('colors.json', JSON.stringify(colors));
};
