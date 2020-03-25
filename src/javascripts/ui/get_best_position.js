import { some, last } from 'lodash';

const getBestPosition = ({
  x,
  y,
  globalContainer,
  relativeElement,
  relativeElementGap = 0,
  containerSize,
}) => {
  // console.log('parameter x ', x);
  // console.log('parameter y ', y);
  // console.log('globalContainer ', globalContainer);
  // console.log('relativeElement ', relativeElement);
  // console.log('relativeElementGap ', relativeElementGap);
  // console.log('containerSize ', containerSize);
  const position = {
    x: last(x),
    y: last(y),
  };

  if (!globalContainer || !relativeElement) {
    return position;
  }

  const globalContainerRect = globalContainer.getBoundingClientRect();
  const relativeElementRect = relativeElement.getBoundingClientRect();
  const relativeElementRectHeight = relativeElementRect.bottom - relativeElementRect.top;
  const relativeElementRectWidth = relativeElementRect.right - relativeElementRect.left;

  const topAvailableArea = relativeElementRect.top - globalContainerRect.top - relativeElementGap;
  const bottomAvailableArea = globalContainerRect.bottom - relativeElementRect.bottom - relativeElementGap;
  const leftAvailableArea = relativeElementRect.left - globalContainerRect.left - relativeElementGap;
  const rightAvailableArea = globalContainerRect.right - relativeElementRect.right - relativeElementGap;
  const isTopVerticalCenterFit = topAvailableArea + (relativeElementRectHeight / 2) > containerSize.height / 2;
  const isBottomVerticalCenterFit = bottomAvailableArea + (relativeElementRectHeight / 2) > containerSize.height / 2;
  const isLeftHorizontalCenterFit = leftAvailableArea + (relativeElementRectWidth / 2) > containerSize.width / 2;
  const isRightHorizontalCenterFit = rightAvailableArea + (relativeElementRectWidth / 2) > containerSize.width / 2;

  // console.log('leftAvailableArea ', leftAvailableArea, 'rightAvailableArea ', rightAvailableArea);
  // console.log('topAvailableArea ', topAvailableArea, 'bottomAvailableArea ', bottomAvailableArea);

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
