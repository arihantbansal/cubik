import { data } from '../../../../packages/helper-scripts/src/color/data';

interface ColorVariant {
  variant: string;
  value: any;
  name: string;
  theme: string;
  dark?: string;
  light?: string;
}

interface MergedItem {
  name: string;
  variant: string;
  light: string | null;
  dark: string | null;
}

function mergeThemes(items: ColorVariant[]) {
  const mergedItems: { [name: string]: MergedItem } = {};

  items.forEach((item: ColorVariant) => {
    const { name, theme, value, variant } = item;

    if (!mergedItems[name]) {
      mergedItems[name] = { name, variant, light: null, dark: null };
    }

    if (theme === 'light') {
      mergedItems[name].light = value;
    } else if (theme === 'dark') {
      mergedItems[name].dark = value;
    }
  });

  return Object.values(mergedItems);
}

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

export function serializeSemantic() {
  const semanticDump = data.collections.find(
    (e) => e.name === 'Semantic ( Colors )',
  );

  const lightColors = semanticDump?.modes.find((e) => e.name == 'Light');
  const darkColors = semanticDump?.modes.find((e) => e.name == 'Dark');
  let finalLight: any = {};
  let finalDark: any = {};
  darkColors?.variables.forEach((e) => {
    if (typeof e.value !== 'string') {
      finalDark = {
        ['--' + e.name.split('/')[2]]: `var(${convertStringToPrimitive(
          e.value.name,
        )})`,
        ...finalDark,
      };
    } else if (e.name.split('/').length > 3) {
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
  });
  lightColors?.variables.forEach((e) => {
    if (typeof e.value !== 'string') {
      finalLight = {
        ['--' + e.name.split('/')[2]]: `var(${convertStringToPrimitive(
          e.value.name,
        )})`,
        ...finalLight,
      };
    } else if (e.name.split('/').length > 3) {
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
  });

  const background: ColorVariant[] = [];
  const foreground: ColorVariant[] = [];
  const surface: ColorVariant[] = [];
  const finalDarkObj = Object.keys(finalDark);

  finalDarkObj.map((e) => {
    e = e.replace('colors-', 'color-');
    e = e.replace('colo-', 'colors-');
    // console.log(e);
    const name = e.replace('--', '');
    const splitted = name
      .split('-')
      .map((e) => e.toLocaleLowerCase())
      .filter((e) => e !== 'color');
    if (splitted.length == 2 || splitted.length == 3) {
      if (splitted[0] === 'bg') {
        background.push({
          variant: splitted[1],
          value: finalDark[e],
          name: e,
          theme: 'dark',
        });
      }
      if (splitted[0] === 'fg') {
        foreground.push({
          variant: splitted[1],
          value: finalDark[e],
          name: e,
          theme: 'dark',
        });
      }
      if (splitted[0] === 'surface') {
        surface.push({
          variant: splitted[1],
          value: finalDark[e],
          name: e,
          theme: 'dark',
        });
      }
    }
  });

  const finalLightObj = Object.keys(finalLight);
  finalLightObj.map((e) => {
    e = e.replace('colors-', 'color-');
    e = e.replace('colo-', 'colors-');
    // console.log(e);
    const name = e.replace('--', '');
    const splitted = name
      .split('-')
      .map((e) => e.toLocaleLowerCase())
      .filter((e) => e !== 'color');
    if (splitted.length == 2 || splitted.length == 3) {
      if (splitted[0] === 'bg') {
        background.push({
          variant: splitted[1],
          value: finalLight[e],
          name: e,
          theme: 'light',
        });
      }
      if (splitted[0] === 'fg') {
        foreground.push({
          variant: splitted[1],
          value: finalLight[e],
          name: e,
          theme: 'light',
        });
      }
      if (splitted[0] === 'surface') {
        surface.push({
          variant: splitted[1],
          value: finalLight[e],
          name: e,
          theme: 'light',
        });
      }
    }
  });

  return {
    bg: mergeThemes(background),
    fg: mergeThemes(foreground),
    surface: mergeThemes(surface),
  };
}
