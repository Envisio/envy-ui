import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Portal from './portal';

const Tooltip = ({ domId, ...props }) => {

  return (
    <Portal domId={domId}>
      <ReactTooltip
        effect="solid"
        multiline
        {...props}
      />
    </Portal>
  );
};

Tooltip.propTypes = {
  domId: PropTypes.string,
};

Tooltip.defaultProps = {
  domId: '[data-jsTooltip]',
};

export default Tooltip;

