import React from 'react';
import PropTypes from 'prop-types';
import OverlayScrollbars from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactResizeDetector, { useResizeDetector } from 'react-resize-detector';
// import ResizeObserver from 'react-resize-detector/build/withPolyfill';

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
      }) => (
        <Scrollbars
          style={{
            width,
            height,
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
  // return (
  //   <ReactResizeDetector
  //     handleWidth
  //     handleHeight
  //   >
  //     {({
  //       width,
  //       height,
  //     }) => (console.log(`width ${width} / height ${height}`),
  //       <
  //         style={{
  //           width: `${width}px`,
  //           height: `${height}px`,
  //         }}
  //         hideTracksWhenNotNeeded
  //         {...ui(uiWrapperScroll)}
  //         {...rest}
  //       >
  //         {children}
  //       </Scrollbars>
  //     )}
  //   </ReactResizeDetector>
  // );
}

export function OverlayScroll({ children, options, options: { className }, disable, ...rest }) {

  // const { width, height, ref } = useResizeDetector();

  if (disable) {
    return children;
  }

  const updatedOptions = {...options, className: `${className} os-theme-dark`};

  return (
    <OverlayScrollbarsComponent
      options={updatedOptions}
      {...rest}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  disable: PropTypes.bool,
};

Scrollbar.defaultProp = {
  disable: false,
};

OverlayScroll.propTypes = {
  children: PropTypes.node.isRequired,
  disable: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
};

OverlayScroll.defaultProp = {
  disable: false,
  options: {},
  className: '',
};
