/**
 * Converts an RGB color to a YIQ value to determine brightness.
 * @param {{ r: number, g: number, b: number }} param0
 * @returns {number} Brightness value
 */
const rgbToYIQ = ({ r, g, b }) => ((r * 299) + (g * 587) + (b * 114)) / 1000;

/**
 * Converts an RGB(A) string to a hex color string.
 * @param {string} rgba - The rgba or rgb string, e.g. "rgb(255, 0, 0)"
 * @returns {string} Hex color string like "#ff0000", or empty string if invalid
 */
export const rgba2hex = (rgba) => {
  rgba = rgba.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgba && rgba.length === 4
    ? "#" +
        ("0" + parseInt(rgba[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgba[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgba[3], 10).toString(16)).slice(-2)
    : "";
}

/**
 * Converts a hex color string to an RGB object.
 * @param {string} hex - Hex color string like "#ff0000"
 * @returns {{r: number, g: number, b: number}|undefined} RGB object or undefined if invalid
 */
const hexToRgb = (hex) => {
  if (!hex || hex === undefined || hex === '') {
    return undefined;
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : undefined;
};

/**
 * Returns black or white depending on the brightness of the color.
 * @param {string|undefined} colorHex - Hex color string
 * @param {number} [threshold=150] - Threshold for deciding contrast
 * @returns {string} "#000" for black or "#fff" for white
 */
export const contrastColor = (colorHex, threshold = 150) => {
  if (colorHex === undefined) {
    return '#000';
  }

  const rgb = hexToRgb(colorHex);

  if (rgb === undefined) {
    return '#000';
  }

  return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
};

/**
 * Returns true if the color is considered light.
 * @param {string} color - Hex color string
 * @returns {boolean}
 */
export const isTextLight = (color) => (
  contrastColor(color) === '#fff'
);