const rgbToYIQ = ({ r, g, b }) => ((r * 299) + (g * 587) + (b * 114)) / 1000;

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

export const isTextLight = (color) => (
  contrastColor(color) === '#fff'
);