import React, { Component, Fragment, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import ShortUniqueId from 'short-unique-id';

import { ui, uiA, uiCheckbox } from '../';

const uid = new ShortUniqueId();

export default class CheckboxWrapper extends Component {
  static propTypes = {
    children: PropTypes.node,
    themeToggle: PropTypes.bool,
    themeCheck: PropTypes.bool,
    themeRadio: PropTypes.bool,
    addClass: PropTypes.string,
    id: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    themeToggle: false,
    themeCheck: false,
    themeRadio: false,
    addClass: '',
    id: null,
  }

  constructor(props) {
    super(props);

    this.uid = uid.randomUUID(6);
  }

  render() {
    const {
      children,
      themeToggle,
      themeCheck,
      themeRadio,
      addClass,
    } = this.props;

    return (
      Children.map(children, child => (
        <Fragment>
          {cloneElement(child, { id: this.uid, ...ui(uiA`vanish inline-block`) })}
          <label
            {...ui([
              uiCheckbox`--toggle:${themeToggle} --check:${themeCheck} --radio:${themeRadio} --disabled:${child.props.disabled}`,
              addClass])}
            htmlFor={this.uid}
          />
        </Fragment>
      ))
    );
  }
}
