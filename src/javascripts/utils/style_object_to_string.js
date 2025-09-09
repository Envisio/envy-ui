/**
 * Converts a JS style object to a CSS string.
 * Example: { backgroundColor: 'red', fontSize: '12px' } -> "background-color:red;font-size:12px;"
 * @param {Record<string, string | number>} style - The style object
 * @returns {string} CSS string
 */
export const styleObjectToString = (style) => {
  return Object.keys(style).reduce((acc, key) => (
      acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
  ), '');
};
