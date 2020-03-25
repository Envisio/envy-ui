function checkOverflow(
  {
    offsetWidth, scrollWidth, offsetHeights, scrollHeights,
  },
  direction,
) {
  if (!offsetWidth) {
    return false;
  }

  switch (direction) {
    case 'x':
      return (offsetWidth < scrollWidth);
    case 'y':
      return (offsetHeights < scrollHeights);
    case 'xy':
      return (offsetWidth < scrollWidth && offsetHeights < scrollHeights);
    default:
      return false;
  }
}

export default checkOverflow;

