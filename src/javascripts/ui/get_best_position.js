import { some, last } from 'lodash';

/**
 * Calculates the best position for an element relative to a container and optional reference element.
 * @param {Object} params
 * @param {('left'|'center'|'right')[]} params.x - Preferred horizontal positions.
 * @param {('top'|'center'|'bottom')[]} params.y - Preferred vertical positions.
 * @param {HTMLElement} [params.relativeElement] - Reference element for positioning.
 * @param {number} [params.relativeElementGap=0] - Gap between the element and reference element.
 * @param {{width: number, height: number}} params.containerSize - Size of the element to position.
 * @param {boolean} [params.debug=false] - Enable debug logging.
 * @returns {{x: string|number, y: string|number, left: number, right: number, top: number, bottom: number}}
 */
const getBestPosition = ({
  x,
  y,
  relativeElement,
  relativeElementGap = 0,
  containerSize,
  debug = false,
}) => {
  if (debug) {
    console.log('parameter x ', x);
    console.log('parameter y ', y);
    // console.log('globalContainer ', globalContainer);
    console.log('relativeElement ', relativeElement);
    console.log('relativeElementGap ', relativeElementGap);
    console.log('containerSize ', containerSize);
  }
  const position = {
    x: last(x),
    y: last(y),
  };

  if (!relativeElement) {
    return position;
  }

  // const globalContainerRect = globalContainer.getBoundingClientRect();
  const relativeElementRect = relativeElement.getBoundingClientRect();
  const relativeElementRectHeight = relativeElementRect.bottom - relativeElementRect.top;
  const relativeElementRectWidth = relativeElementRect.right - relativeElementRect.left;

  const topAvailableArea = relativeElementRect.top - 0 - relativeElementGap;
  const bottomAvailableArea = document.documentElement.clientHeight - relativeElementRect.bottom - relativeElementGap;
  const leftAvailableArea = relativeElementRect.left - 0 - relativeElementGap;
  const rightAvailableArea = document.documentElement.clientWidth - relativeElementRect.right - relativeElementGap;
  const isTopVerticalCenterFit = topAvailableArea + (relativeElementRectHeight / 2) > containerSize.height / 2;
  const isBottomVerticalCenterFit = bottomAvailableArea + (relativeElementRectHeight / 2) > containerSize.height / 2;
  const isLeftHorizontalCenterFit = leftAvailableArea + (relativeElementRectWidth / 2) > containerSize.width / 2;
  const isRightHorizontalCenterFit = rightAvailableArea + (relativeElementRectWidth / 2) > containerSize.width / 2;

  if (debug) {
    console.log('leftAvailableArea ', leftAvailableArea, 'rightAvailableArea ', rightAvailableArea);
    console.log('topAvailableArea ', topAvailableArea, 'bottomAvailableArea ', bottomAvailableArea);
  }

  position.left = relativeElementRect.left;
  position.right = relativeElementRect.right;
  position.bottom = relativeElementRect.bottom;
  position.top = relativeElementRect.top;

  some(y, (currentY) => {
    switch (currentY) {
      case 'bottom':
        if (bottomAvailableArea > containerSize.height) {
          position.y = 'bottom';
          return true;
        }
        break;
      case 'center':
        if (isTopVerticalCenterFit && isBottomVerticalCenterFit) {
          position.y = 'center';
          return true;
        }
        break;
      case 'top':
        if (topAvailableArea > containerSize.height) {
          position.y = 'top';
          return true;
        }
        break;
      default:
        return false;
    }

    return false;
  });

  some(x, (currentX) => {
    switch (currentX) {
      case 'left':
        if (leftAvailableArea > containerSize.width) {
          position.x = 'left';
          return true;
        }
        break;
      case 'center':
        if (isLeftHorizontalCenterFit && isRightHorizontalCenterFit) {
          position.x = 'center';
          return true;
        }
        break;
      case 'right':
        if (rightAvailableArea > containerSize.width) {
          position.x = 'right';
          return true;
        }
        break;
      default:
        return false;
    }

    return false;
  });

  return position;
};

export default getBestPosition;
