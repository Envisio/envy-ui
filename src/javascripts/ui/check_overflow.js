/**
 * Checks if the content overflows its container in a given direction.
 *
 * @param {Object} sizes - Size properties of the container/content.
 * @param {number} sizes.offsetWidth - The visible width of the container.
 * @param {number} sizes.scrollWidth - The full scrollable width of the content.
 * @param {number} sizes.offsetHeights - The visible height of the container.
 * @param {number} sizes.scrollHeights - The full scrollable height of the content.
 * @param {'x'|'y'|'xy'} direction - Direction to check for overflow.
 * @returns {boolean} True if the content overflows in the given direction, otherwise false.
 */
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

