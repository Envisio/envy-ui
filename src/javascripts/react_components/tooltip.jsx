import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { styled } from '@mui/material/styles';
import MuTooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Portal from './portal';
import { UI_COLOR_BORDER } from '../index';

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


// eslint-disable-next-line max-len
const BootstrapTooltip = styled(({ className, maxWidth, ...props }) => <MuTooltip {...props} classes={{ popper: className }} />)(
  ({ theme, maxWidth }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: '12px',
      maxWidth,
    },
  }),
);

const BootstrapLightTooltip = styled(({ className, ...props }) => <MuTooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
  // [`& .${tooltipClasses.arrow}`]: {
  //   color: theme.palette.common.white,
  // },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: '12px',
    border: `1px solid ${UI_COLOR_BORDER}`,
  },
}));

export function EnvisioTooltip({ title = null, children, delay = false, isLight = false, ...props }) {
  const CurrentTooltip = isLight ? BootstrapLightTooltip : BootstrapTooltip;
  return (
    <CurrentTooltip title={title || ''} enterDelay={delay ? 1500 : 100} enterNextDelay={delay ? 1500 : 0} {...props}>
      {children}
    </CurrentTooltip>
  );
}

// eslint-disable-next-line react/forbid-prop-types
EnvisioTooltip.propTypes = { children: PropTypes.object.isRequired, title: PropTypes.node, delay: PropTypes.bool, isLight: PropTypes.bool };


Tooltip.propTypes = {
  domId: PropTypes.string,
};

Tooltip.defaultProps = {
  domId: '[data-jsTooltip]',
};

export default Tooltip;



