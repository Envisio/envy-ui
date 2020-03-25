import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { isBoolean, partial } from 'lodash';

import EnvisioIcon, { EnvisioIconConstants } from '../assets';

import { ui, uiMenuDropdown, uiButton } from '../ui';

export default class MenuDropdownWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    themeLight: PropTypes.bool,
    addClass: PropTypes.string,
    addClassActive: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    disabled: false,
    themeLight: false,
    addClass: '',
    addClassActive: '',
  }

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  handleToggleMenu = toggleState => this.setState(({ isMenuOpen }) => {
    const newState = isBoolean(toggleState) ? toggleState : !isMenuOpen;

    return ({ isMenuOpen: newState });
  })

  render() {
    const {
      children,
      disabled,
      themeLight,
      addClass,
      addClassActive,
    } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <OutsideClickHandler onOutsideClick={partial(this.handleToggleMenu, false)}>
        <div {...ui([uiMenuDropdown`--light:${themeLight} --active:${isMenuOpen}`, addClass, isMenuOpen ? addClassActive : ''])}>
          <button
            disabled={disabled}
            onClick={this.handleToggleMenu}
            tabIndex="0"
            {...ui(uiMenuDropdown`__button`)}
          >
            <EnvisioIcon
              iconType={EnvisioIconConstants.FA_ELLIPSIS_V}
              cleanClassName
              {...ui([uiMenuDropdown`__button-content`])}
              tabIndex="-1"
            />
          </button>
          {isMenuOpen && children ? (
            <ul {...ui(uiMenuDropdown`__items`)}>
              {Children.map(children, child => (
                <li {...ui(uiMenuDropdown`__item`)}>
                  {cloneElement(child, { ...ui([uiMenuDropdown`__button-item`, uiButton`--clean`]), tabIndex: '0' })}
                </li>
              ))}
            </ul>)
          : null}
        </div>
      </OutsideClickHandler>
    );
  }
}
