import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactResizeDetector, { useResizeDetector } from 'react-resize-detector';
import ResizeObserver from 'react-resize-detector/build/withPolyfill';

import { ui, uiWrapperScroll } from '../';

export const ScrollValue = React.createContext(0);

export default function Scrollbar({ children, disable, ...rest }) {

  // const { width, height, ref } = useResizeDetector();

  if (disable) {
    return children;
  }

  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
    >
      {({
        width,
        height,
      }) => (console.log(`width ${width} / height ${height}`),
        <Scrollbars
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          hideTracksWhenNotNeeded
          {...ui(uiWrapperScroll)}
          {...rest}
        >
          {children}
        </Scrollbars>
      )}
    </ReactResizeDetector>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  disable: PropTypes.bool,
};

Scrollbar.defaultProp = {
  disable: false,
};
