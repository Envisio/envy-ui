import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { take } from 'lodash';
import { ui, uiA, uiBadge, uiCheckbox } from '../';
import { contrastColor } from '../utils/contrast_color';
import {
  UI_COLOR_PALE_BLUE,
  UI_COLOR_PLAIN_GRAY,
  UI_COLOR_DEFAULT,
  UI_COLOR_RED,
} from '../from-dictionary/color';

const statusColors = {
  'completed': '--status-completed',
  'someDisruption': '--status-minor-disruption',
  'minorDisruption': '--status-minor-disruption',
  'majorDisruption': '--status-major-disruption',
  'onTrack': '--status-on-track',
  'upcoming': '--status-upcoming',
  'statusPending': '--status-pending',
  'discontinued': '--status-discontinued',
};

export function FullTag(props) {
  const {
    name,
    color,
    addClass,
  } = props;

  return (
    <span
      {...ui([uiBadge`--tag:--tag-light:${contrastColor(color) === '#fff'}`, uiA`w-max-100%`, addClass])}
      style={{ backgroundColor: color, color: contrastColor(color) }}
    >
      <span {...ui([uiA`f-1-1-auto ellipsis`])}>
        {name}
      </span>
    </span>
  );
}
export function StatusTag(props) {
  const {
    value,
    name,
    addClass,
  } = props;

  return (
    <span
      {...ui([uiBadge`#${statusColors[value]}`, uiA`w-max-100%`, addClass])}
    >
      <span {...ui([uiA`f-1-1-auto ellipsis`])}>
        {name}
      </span>
    </span>
  );
}

FullTag.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  addClass: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
};

FullTag.defaultProps = {
  addClass: '',
};

export const rsSelect = ({
  showError = false,
  reflowMultiSelect = false,
  tagStyle = false,
  statusStyle = false,
  stackLeft = false,
  stackRight = false,
  udjustedLabelLength = 0,
} = {}) => ({
  styles: {
    menu: (proviLed) => ({
      ...provided,
      width: 'auto',
      minWidth: '100%',
      position: 'absolute',
      display: 'flex',
      marginTop: '2px',
      marginBottom: '2px',
      padding: '0',
      // right: '0',
      border: '1px solid #d1d4e4',
      borderRadius: 3,
      backgroundColor: '#ffffff',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      marginTop: '4px',
      marginBottom: '4px',
      height: reflowMultiSelect ? 'auto' : '25px', //this
      color: `${UI_COLOR_PLAIN_GRAY}`
    }),
    menuList: (provided) => ({
      ...provided,
      width: '100%',
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      marginTop: '0',
      marginBottom: '0',
      height: '33px',
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: '4px',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: reflowMultiSelect ? 'auto' : '33px',
      minHeight: '33px',
      flexWrap: reflowMultiSelect ? 'wrap' : 'nowrap',
      // border: '0',
      // maxWidth: '0',
      // padding: '0',
      // opacity: '0',
    }),
    control: (provided, {isDisabled, isFocused}) => ({
      ...provided,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: showError ? `${UI_COLOR_RED} !important` : (isFocused ? '#76bcd0 !important' : `${UI_COLOR_PLAIN_GRAY}`),
      borderRadius: '3px',
      borderTopLeftRadius: stackRight ? '0' : '3px',
      borderBottomLeftRadius: stackRight ? '0' : '3px',
      borderTopRightRadius: stackLeft ? '0' : '3px',
      borderBottomRightRadius: stackLeft ? '0' : '3px',
      // padding: '0 10px',
      boxShadow: isFocused ? `inset 0 0 1px 3px rgba(${showError ? '204, 24, 30, 0.2' : '118,188,208,0.3'})` : '0',
      minHeight: '35px',
      maxHeight: reflowMultiSelect ? 'auto' : '35px',
      // backgroundColor: 'transparent',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      width: '15px',
      marginLeft: '6px',
      marginRight: '6px',
      padding: '0',
    }),
    // menuList: (provided) => ({
    //   ...provided,
    //   display: 'flex',
    //   flexDirection: 'column',
    //   margin: '0',
    //   padding: '0',
    //   overflow: 'hidden',
    // }),
    option: (provided, {isDisabled, isFocused, isSelected}) => ({
      ...provided,
      cursor: isDisabled ? 'default' : 'pointer',
      color: UI_COLOR_DEFAULT,
      paddingRight: '25px',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
    }),
    multiValueContainer: (provided) => ({
      ...provided,
      flexWrap: 'nowrap',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      ...(tagStyle || statusStyle ? {
        padding: '0',
        paddingLeft: '0',
      } : {}),
    }),
    multiValue: (provided, {getValue, hasValue, isMulti}) => ({
      ...provided,
      ...(tagStyle || statusStyle ? {
        minWidth: '50px',
        maxWidth: '175px',
      } : {}),
      ...(tagStyle ? {
        borderRadius: '10px',
      } : {}),
      ...(udjustedLabelLength && isMulti && hasValue ? {maxWidth: `${udjustedLabelLength/getValue()?.length}px`} : {}),
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      ...(tagStyle || statusStyle ? {
        flex: '0 0 auto',
      } : {}),
      ...(tagStyle ? {
        borderRadius: '50%',
      } : {}),
    }),
  },
  components: {
    // IndicatorSeparator: () => null,
    // Placeholder: () => null,
    // SingleValue: () => null,
    SingleValue: () => null,
  },
  theme: theme => ({
    ...theme,
    borderRadius: 3,
    colors: {
      ...theme.colors,
      primary25: UI_COLOR_PALE_BLUE,
      primary: '#b2d4ff',
    },
  }),
});

export const rsMultiValueContainer = ({
  children,
  selectProps: { maxValuesToShow },
  ...props
}) => {
  const {
    getValue,
    hasValue,
  } = props;
  const valuesCount = getValue().length;

  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  return (
    <components.ValueContainer {...props}>
      {take(children[0], maxValuesToShow)}
      {valuesCount > maxValuesToShow ? (
        <span {...ui([uiA`m-x-small`])}>
          {`+${valuesCount - maxValuesToShow}`}
        </span>
      ) : ''}
      {children[1]}
    </components.ValueContainer>
  );
};

export const rsTagMultiValueLabel = ({
  data: {
    label,
    color,
    ...data
  },
  ...props
}) => (
  <components.MultiValueLabel
    data={{
      label,
      color,
      ...data,
    }}
    {...props}
  >
    <FullTag
      name={label}
      color={color}
    />
  </components.MultiValueLabel>
);

export const rsStatusSingleValue = ({
  data: {
    value,
    label,
    ...data
  },
  ...props
}) => (
  <components.SingleValue
    data={{
      label,
      value,
      ...data,
    }}
    {...props}
  >
    <StatusTag
      value={value}
      name={label}
    />
  </components.SingleValue>
);

export const rsStatusMultiValueLabel = ({
  data: {
    value,
    label,
    ...data
  },
  ...props
}) => (
  <components.MultiValueLabel
    data={{
      label,
      value,
      ...data,
    }}
    {...props}
  >
    <StatusTag
      value={value}
      name={label}
    />
  </components.MultiValueLabel>
);

export const rsMultiSelectOption = (props) => {
  const { isSelected, ...reducedProps } = props;
  return (
    <components.Option
      {...reducedProps}
      {...ui([uiA`p-left`])}
    >
      <span {...ui([uiA`f f-a-center f-gap font-weight-normal`])}>
        <span
          {...ui([uiCheckbox`--check --checked:${isSelected}`])}
        />
        <span {...ui([uiA`ellipsis`])}>{reducedProps?.label}</span>
      </span>
    </components.Option>
  );
};

export const rsTagMultiSelectOption = ({
  isSelected,
  label,
  data: {
    color,
    ...data
  },
  ...props
}) => (
  <components.Option
    label={label}
    data={{
      ...data,
      color,
    }}
    {...props}
    {...ui([uiA`p-left`])}
  >
    <span {...ui([uiA`f f-a-center f-gap font-weight-normal`])}>
      <span
        {...ui([uiCheckbox`--check --checked:${isSelected}`])}
      />
      <FullTag
        name={label}
        color={color}
        addClass={uiA`w-max-300`}
      />
    </span>
  </components.Option>
);

export const rsStatusMultiSelectOption = ({
  isSelected,
  label,
  value,
  data: {
    ...data
  },
  ...props
}) => (
  <components.Option
    label={label}
    value={value}
    data={{
      ...data,
    }}
    {...props}
    {...ui([uiA`p-left`])}
  >
    <span {...ui([uiA`f f-a-center f-gap font-weight-normal`])}>
      <span
        {...ui([uiCheckbox`--check --checked:${isSelected}`])}
      />
      <StatusTag
        name={label}
        value={value}
        addClass={uiA`w-max-300`}
      />
    </span>
  </components.Option>
);

export const rsStatusOption = ({
  isSelected,
  label,
  value,
  data: {
    ...data
  },
  ...props
}) => (
  <components.Option
    label={label}
    value={value}
    data={{
      ...data,
    }}
    {...props}
    {...ui([uiA`p-x`])}
  >
    <span {...ui([uiA`f f-a-center f-gap font-weight-normal`])}>
      <StatusTag
        name={label}
        value={value}
        addClass={uiA`w-max-300`}
      />
    </span>
  </components.Option>
);

// export const rsSelectPlus = ({ showError }) => ({
//   styles: {
//     ...rsSelect.styles,
//     control: (provided, {isDisabled, isFocused}) => ({
//       ...provided,
//       borderWidth: '1px',
//       borderStyle: 'solid',
//       borderColor: showError ? 'red' : (isFocused ? '#76bcd0 !important' : UI_COLOR_PLAIN_GRAY),
//       borderRadius: '3px',
//       // padding: '0 10px',
//       boxShadow: isFocused ? `inset 0 0 1px 3px rgba(${showError ? '118,188,008,0.3' : '118,188,208,0.3'})` : '0',
//       minHeight: '35px',
//       maxHeight: '35px',
//       // backgroundColor: 'transparent',
//     }),
//   },
//   theme : {
//     ...rsSelect.theme,
//   },
// });