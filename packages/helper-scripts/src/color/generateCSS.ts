/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { data } from './data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertStringToPrimitive(s: string) {
  const result = s
    .replace('Color/', 'color-')
    .replace(/\//g, '-')
    .toLowerCase();

  const split = result.split('-');
  if (split.length === 3) {
    return '--' + result;
  } else if (split.length > 3) {
    return '--' + split[0] + '-' + split[1] + '-' + split[3];
  } else {
    return '--' + split[0];
  }
}
function convertToCSS(styles: { [key: string]: string }): string {
  let css = ':root {\n';
  for (const [key, value] of Object.entries(styles)) {
    css += `    ${key}: ${value};\n`;
  }
  css += '}';
  return css;
}
export const createComponentNames = () => {
  const componentColorDump = data.collections2.find(
    (e) => e.name === 'Component ( Colors )',
  );

  let finalData = {};
  componentColorDump?.modes[0].variables.forEach((e) => {
    if (typeof e.value !== 'string') {
      finalData = {
        ['--' + e.name.split('/')[e.name.split('/').length - 1]]: `var(${
          '--' +
          e.value.name
            .split('/')
            [e.value.name.split('/').length - 1].toLowerCase()
        })`,
        ...finalData,
      };
    } else {
      //   if (e.name.split("/").length > 3) {
      //     finalData = {
      //       [e.name]: "--" + e.value.split("/")[4],
      //       ...finalData,
      //     };
      //   } else if (e.name.split("/").length === 3) {
      //     finalData = {
      //       [e.name]: "--" + e.value.split("/")[2],
      //       ...finalData,
      //     };
      //   }
      console.log(e.value);
    }
  });
  fs.writeFileSync(
    __dirname.replace('/helper-scripts/src/color', '') +
      '/presets/styles/component.style.css',
    convertToCSS(finalData),
  );
};
export const generateSemantic = () => {
  // const semanticDump = data.collections.find(
  //   (e) => e.name === 'Semantic ( Colors )',
  // );

  const newSemanticDump = data.collections2.find((e) => e.modes.length > 1);

  const lightColors = newSemanticDump?.modes.find((e) => e.name == 'Light');
  const darkColors = newSemanticDump?.modes.find((e) => e.name == 'Dark');
  let finalLight = {};
  let finalDark = {};
  darkColors?.variables.forEach((e) => {
    if (typeof e.value !== 'string') {
      finalDark = {
        ['--' +
        e.name.split('/')[
          e.name.split('/').length - 1
        ]]: `var(${convertStringToPrimitive(e.value.name)})`,
        ...finalDark,
      };
    } else {
      if (e.name.split('/').length > 3) {
        finalDark = {
          ['--' + e.name.split('/')[4]]: e.value,
          ...finalDark,
        };
      } else if (e.name.split('/').length === 3) {
        finalDark = {
          ['--' + e.name.split('/')[2]]: e.value,
          ...finalDark,
        };
      }
    }
  });
  lightColors?.variables.forEach((e) => {
    if (typeof e.value !== 'string') {
      finalLight = {
        ['--' +
        e.name.split('/')[
          e.name.split('/').length - 1
        ]]: `var(${convertStringToPrimitive(e.value.name)})`,
        ...finalLight,
      };
    } else {
      if (e.name.split('/').length > 3) {
        finalLight = {
          ['--' + e.name.split('/')[4]]: e.value,
          ...finalLight,
        };
      } else if (e.name.split('/').length === 3) {
        finalLight = {
          ['--' + e.name.split('/')[2]]: e.value,
          ...finalLight,
        };
      } else {
      }
    }
  });
  // fs.writeFileSync(
  //   __dirname.replace('/helper-scripts/src/color', '') +
  //     '/presets/styles/lightColor.style.css',
  //   convertToCSS(finalLight),
  // );
  // fs.writeFileSync(
  //   __dirname.replace('/helper-scripts/src/color', '') +
  //     '/presets/styles/darkColors.styles.css',
  //   convertToCSS(finalDark),
  // );
};
