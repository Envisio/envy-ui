import React from 'react';
import PropTypes from 'prop-types';
import { partial, find, map, eq, isNil } from 'lodash';
import { components } from 'react-select';

import EnvisioIcon, { EnvisioIconConstants } from '../assets';

import { ui, uiA, uiButton } from '../ui';
import color from '../colors';

const defaultValueClasses = [
  uiButton`--clean`,
  uiA`f f-a-center font-size-15 bold color-brand-blue color-hover-brand-blue-dark`,
];

export const rsStyle = ({
  menu: menuStyle = {},
  dropdownIndicator: dropdownIndicatorStyle = {},
  control: controlStyle = {},
  valueContainer: valueContainerStyle = {},
  indicatorsContainer: indicatorsContainerStyle = {},
  option: optionStyle = {},
}) => ({
  menu: s => ({
    ...s,
    width: 'auto',
    marginTop: '0',
    marginBottom: '0',
    menuStyle,
  }),
  dropdownIndicator: s => ({
    ...s,
    padding: '0',
    ...dropdownIndicatorStyle,
  }),
  control: s => ({
    ...s,
    borderWidth: '0',
    justifyContent: 'flex-start',
    boxShadow: '0',
    minHeight: '35px',
    ...controlStyle,
  }),
  valueContainer: s => ({
    ...s,
    border: '0',
    maxWidth: '0',
    padding: '0',
    ...valueContainerStyle,
  }),
  indicatorsContainer: s => ({
    ...s,
    ...indicatorsContainerStyle,
  }),
  option: (s, { isFocused }) => {
    return {
      ...s,
      backgroundColor: isFocused ? color.paintGray : color.white,
      color: color.default,
      padding: '8px 20px 8px 10px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      ...optionStyle,
    };
  },
});

const schemaSetDropdownIndicator = {
  check: () => <EnvisioIcon {...ui([uiA`m-right-small color-green`])} iconType={EnvisioIconConstants.FA_SOLID_CHECK} key="key-check" />,
  icon: ({ icon }) => <EnvisioIcon iconType={EnvisioIconConstants[icon]} key={`key-icon-${icon}`} />,
  label: ({ label }, { dropdownIndicatorLabelClasses }) => (
    <span {...ui(dropdownIndicatorLabelClasses || [uiA`m-right-small`])} key={`key-label-${label}`}>
      {label}
    </span>
  ),
  triangle: () => <EnvisioIcon iconType={EnvisioIconConstants.FA_SOLID_CARET_DOWN} {...ui([uiA`font-size-em-8 w-auto h-auto`])} key="key-triangle" />,
};

schemaSetDropdownIndicator.label.propTypes = {
  label: PropTypes.string,
};

schemaSetDropdownIndicator.icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

schemaSetDropdownIndicator.label.defaultProps = {
  label: '',
};

const schemaOption = {
  check: ({ value, selectProps }) => (
    <EnvisioIcon
      {...ui([uiA`m-right-small color-green opacity-0:${!eq(value, selectProps.value)}`])}
      iconType={EnvisioIconConstants.FA_SOLID_CHECK}
      key={`key-check-${selectProps.value}`}
    />
  ),
  icon: ({ data: { icon } }) => <EnvisioIcon iconType={EnvisioIconConstants[icon]} key={`key-icon-${icon}`} />,
  label: ({ data: { label } }) => <span {...ui([uiA`m-right-small`])} key={`key-label-${label}`}>{label}</span>,
  triangle: (...rest) => <EnvisioIcon iconType={EnvisioIconConstants.FA_SOLID_CARET_DOWN} key="key-triangle" />,
};

const DropdownIndicator = (params, props) => {
  const {
    dropdownIndicatorSchema,
    dropdownIndicatorClasses,
    ...rest
  } = params;
  const {
    selectProps: {options, value}
  } = props;
  return (
    <components.DropdownIndicator {...props}>
      <button
        {...ui(dropdownIndicatorClasses || defaultValueClasses)}
      >
        {map(dropdownIndicatorSchema, (element) => {
          const thisValue = isNil(value.value) ? value : value.value;
          const param = find(options, ['value', thisValue]) || null;

          return schemaSetDropdownIndicator[element](param, rest);
        })}
      </button>
    </components.DropdownIndicator>
  );
};

const Option = (params, props) => {
  const {
    optionSchema,
    optionClasses,
  } = params;
  return (
    <components.Option {...ui(optionClasses || '')} {...props}>
      {map(optionSchema, (element) => {
        return schemaOption[element](props);
      })}
    </components.Option>
  );
};

export const rsComponents = params => ({
  DropdownIndicator: partial(DropdownIndicator, params),
  Option: params.optionSchema ? partial(Option, params) : components.Option,
  IndicatorSeparator: () => null,
  // ValueContainer: () => null,
});
