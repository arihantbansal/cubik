import fs from 'fs';

import { data } from './data';

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
export const generateSemantic = () => {
  const semanticDump = data.collections.find(
    (e) => e.name === 'Semantic ( Colors )',
  );

  const lightColors = semanticDump?.modes.find((e) => e.name == 'Light');
  const darkColors = semanticDump?.modes.find((e) => e.name == 'Dark');
  let finalLight = {};
  let finalDark = {};
  darkColors?.variables.forEach((e) => {
    if (typeof e.value !== 'string') {
      finalDark = {
        ['--' + e.name.split('/')[2]]: `var(${convertStringToPrimitive(
          e.value.name,
        )})`,
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
        ['--' + e.name.split('/')[2]]: `var(${convertStringToPrimitive(
          e.value.name,
        )})`,
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
      }
    }
  });

  fs.writeFileSync(
    '/Users/dhruvraj/Documents/cubik/frontend/cubik/packages/presets/styles/lightColor.style.css',
    convertToCSS(finalLight),
  );
  fs.writeFileSync(
    '/Users/dhruvraj/Documents/cubik/frontend/cubik/packages/presets/styles/darkColors.styles.css',
    convertToCSS(finalDark),
  );
};
