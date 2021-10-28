import React from 'react';
import { components } from 'react-select';
import {
  ui, uiButton,
} from '../';
import { UI_COLOR_PALE_BLUE } from '../index'

// DotsDropdownIndicator.propTypes = { isFocused: PropTypes.bool.isRequired };

// MenuOption.propTypes = {
//   data: PropTypes.shape({ isAvailable: PropTypes.bool }).isRequired,
//   label: PropTypes.string.isRequired,
// };

export const rsDropdownMenu = {
  styles: {
    menu: (provided) => ({
      ...provided,
      width: 'auto',
      minWidth: 'auto',
      position: 'absolute',
      // display: 'flex',
      marginTop: '2px',
      marginBottom: '2px',
      padding: '0',
      right: '0',
      border: '1px solid #d1d4e4',
      borderRadius: 3,
      backgroundColor: '#ffffff',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    valueContainer: (provided) => ({
      ...provided,
      border: '0',
      maxWidth: '0',
      padding: '0',
      opacity: '0',
    }),
    control: (provided) => ({
      ...provided,
      borderWidth: '0',
      boxShadow: '0',
      minHeight: 'auto',
      backgroundColor: 'transparent',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0',
    }),
    menuList: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'column',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
    }),
    option: (provided) => ({
      ...provided,
      cursor: 'pointer',
      paddingRight: '25px',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
    })
  },
  components: {
    IndicatorSeparator: () => null,
    Placeholder: () => null,
    SingleValue: () => null,
    DropdownIndicator: ({ menuButtonContent = null }) => ({
      isFocused,
      ...props
    }) => (
      <components.DropdownIndicator
        isFocused={isFocused}
        {...props}
        {...ui([
          uiButton`--clean --content-gray --focus:${isFocused}`,
        ])}
      >
        <span {...ui([uiButton`__content`])}>
          {menuButtonContent}
          {/* <FontAwesomeIcon
            icon={['far', 'ellipsis-v']}
            {...ui([uiA`font-size-20`])}
          /> */}
        </span>
      </components.DropdownIndicator>
    ),

    Option: () => ({
      data: {
        isAvailable,
        ...data
      },
      label,
      ...props
    }) => (isAvailable ? (
      <components.Option
        data={{
          isAvailable,
          ...data,
        }}
        label={label}
        {...props}
        isSelected={false}
      >
        <span>{label}</span>
      </components.Option>
    ) : '')
  },
  theme: theme => ({
    ...theme,
    borderRadius: 3,
    colors: {
      ...theme.colors,
      primary25: UI_COLOR_PALE_BLUE,
      primary: UI_COLOR_PALE_BLUE,
    },
  }),
};