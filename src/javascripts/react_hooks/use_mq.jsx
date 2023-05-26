import { useResizeDetector } from 'react-resize-detector';

export default function useMediaQuery({md = 0, lg = 99999}) {
  const {width, ref} = useResizeDetector();
  // console.log('useMediaQuery sizes', sizes);
  // const { width } = sizes;
  const mq = {
    sm: width <= md,
    md: (width > md && width <= lg),
    mdMinus: width <= lg,
    mdPlus: width > md,
    lg: width > lg,
  };

  return [ref, mq];
};
