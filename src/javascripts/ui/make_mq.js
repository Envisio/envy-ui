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

