import {
  UI_COLOR_PALE_BLUE,
  UI_COLOR_PLAIN_GRAY,
  UI_COLOR_DEFAULT,
  UI_COLOR_RED,
} from '../from-dictionary/color';

export const rsSelect = ({ showError = false, reflowMultiSelect = flase } = {}) => ({
  styles: {
    menu: (provided) => ({
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
      height: '33px',
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
      borderColor: showError ? UI_COLOR_RED : (isFocused ? '#76bcd0 !important' : `${UI_COLOR_PLAIN_GRAY}`),
      borderRadius: '3px',
      // padding: '0 10px',
      boxShadow: isFocused ? `inset 0 0 1px 3px rgba(${showError ? '118,188,008,0.3' : '118,188,208,0.3'})` : '0',
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
    })
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