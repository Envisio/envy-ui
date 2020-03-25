import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import EnvisioIcon, { EnvisioIconConstants } from '../assets';
import { ui, uiA, uiButton, uiPanel } from '../ui';

export default function PanelWrapper({
  children,
  title,
  hasTitle,
  hasClose,
  closeButton,
  handleClose,
  hasBorder,
  themeDark,
  addClass,
  row,
  ...rest
}) {
  const CloseIcon = ({ noTitle }) => (<EnvisioIcon
    iconType={EnvisioIconConstants.FA_LIGHT_TIMES}
    tabIndex="-1"
    cleanClassName
    {...ui([uiButton`__content`, uiA`w-25:${noTitle} h-25:${noTitle}`])}
  />);

  const uiCloseButton = noTitle => ui([
    uiButton`--clean --gray`,
    uiA`sticky:${noTitle} right-10:${noTitle} top-10:${noTitle} w-25:${noTitle} h-25:${noTitle} m-left-auto:${noTitle}`,
  ]);

  const CloseButton = ({ noTitle }) => (
    closeButton ? (
      cloneElement(closeButton, { ...uiCloseButton(noTitle) }, <CloseIcon noTitle={noTitle} />)
    ) : (
      <button
        onClick={handleClose}
        {...uiCloseButton(noTitle)}
      >
        <CloseIcon noTitle={noTitle} />
      </button>
    )
  );

  return (
    <div
      {...ui([
        uiPanel`--has-title:${hasTitle} --has-close:${hasClose} --bg-dark:${themeDark} --border:${hasBorder}`,
        addClass,
      ])}
      {...rest}
    >
      { hasTitle ? (
        <div {...ui(uiPanel`__header`)}>
          <div {...ui(uiPanel`__header-title`)}>
            {title}
          </div>
          { hasClose && <CloseButton noRender={!hasClose} />}
        </div>
      ) : '' }
      { hasTitle || <CloseButton noTitle /> }
      <div {...ui(uiPanel`__content --row:${row}`)}>
        {children}
      </div>
    </div>
  );
}

PanelWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  hasTitle: PropTypes.bool,
  hasClose: PropTypes.bool,
  closeButton: PropTypes.node,
  handleClose: PropTypes.func,
  hasBorder: PropTypes.bool,
  themeDark: PropTypes.bool,
  row: PropTypes.bool,
  addClass: PropTypes.string,
};

PanelWrapper.defaultProps = {
  children: null,
  title: '',
  hasTitle: false,
  hasClose: false,
  closeButton: null,
  handleClose: () => null,
  hasBorder: false,
  themeDark: false,
  row: false,
  addClass: '',
};

