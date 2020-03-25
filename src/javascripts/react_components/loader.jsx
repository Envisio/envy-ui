import React from 'react';
import PropTypes from 'prop-types';

import { ui, uiLoader } from '../ui';

export default function Loader({ type, size }) {
  return (
    <div {...ui([uiLoader`#${type} #${size}`])}>
      {[1, 2, 3].map(() => <span {...ui([uiLoader`__bar`])}/>)}
    </div>
  );
}

Loader.propTypes = {
  type: PropTypes.string.isRequired,
};
