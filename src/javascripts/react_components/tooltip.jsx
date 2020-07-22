import React from 'react';
import Portal from 'react-dom';

const Tooltip = ({ domId, ...props }) => {

  return (
    <Portal domId={domId}>
      <Tooltip
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

