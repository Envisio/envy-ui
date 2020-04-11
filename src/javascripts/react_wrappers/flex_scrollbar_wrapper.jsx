import React from 'react';
import PropTypes from 'prop-types';
import Scrollbar from '../react_components/scrollbar';

import { ui, uiA } from '../';

export default function FlexScrollbarWrapper({
  children,
  ...rest
}) {
  return (
    <div {...ui([uiA`f-1-1-auto h-100% relative`])}>
      <div {...ui([uiA`absolute w-100% h-100%`])}>
        <Scrollbar {...rest}>
          {children}
        </Scrollbar>
      </div>
    </div>
  );
}

FlexScrollbarWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

