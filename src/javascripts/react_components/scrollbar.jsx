import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import ReactResizeDetector from 'react-resize-detector';

import { ui, uiWrapperScroll } from '../ui';

export const ScrollValue = React.createContext(0);

export default function Scrollbar({ children, ...rest }) {
  return (
    <ReactResizeDetector
      handleWidth
      handleHeight
      render={({
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
    />
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
};
