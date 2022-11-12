import { readability } from '@ctrl/tinycolor';

export type getContrastTextColorColorOpts = {
  dark: string;
  light: string;
};

/**
 * Extract contrast text from the given color
 *
 * @param color - color to extract
 * @param colorOpts
 * @returns
 */
export function getContrastTextColor(
  color: string,
  colorOpts: getContrastTextColorColorOpts,
) {
  try {
    return readability(color, 'white') > 3 ? colorOpts.light : colorOpts.dark;
  } catch {
    return colorOpts.dark;
  }
}
