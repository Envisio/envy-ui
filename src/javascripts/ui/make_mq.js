/**
 * Creates a media query checker function for given breakpoints.
 *
 * @param {Object} breakpoints - The breakpoint widths.
 * @param {number} breakpoints.md - Medium breakpoint width.
 * @param {number} breakpoints.lg - Large breakpoint width.
 * @returns {function(number, string): boolean} Function that checks if a given width matches a specified media query.
 *
 * @example
 * const checkMQ = makeMq({ md: 768, lg: 1200 });
 * checkMQ(500, 'sm'); // true
 * checkMQ(800, 'md+'); // true
 */
const makeMq = function makeMediaQuery({ md, lg }) {
  return function checkMQ(width, mq) {
    // console.log('width ', width);
    switch (mq) {
      case 'sm':
        // console.log('sm ', width <= md);
        return (width <= md);
      case 'md+':
        // console.log('md+ ', width > md);
        return (width > md);
      case 'md-':
        // console.log('md- ', width <= lg);
        return (width <= lg);
      case 'md':
        // console.log('md ', width > md && width <= lg);
        return (width > md && width <= lg);
      case 'lg':
        // console.log('lg ', width > lg);
        return (width > lg);
      default:
        console.warn('Media query problem ', mq);
        return false;
    }
  };
};

export default makeMq;

