import React from 'react';
import useResizeAware from 'react-resize-aware';

export default function useMediaQuery({md = 0, lg = 99999}) {
  const [resizeListener, sizes] = useResizeAware();
  const { width } = sizes;
  const mq = {
    sm: width <= md,
    md: (width > md && width <= lg),
    mdMinus: width <= lg,
    mdPlus: width > md,
    lg: width > lg,
  };

  return [resizeListener, mq];
};
