import { UI_COLOR_PALE_BLUE } from '../index'

export const rsSelect = {
  styles: {
    menu: (provided) => ({
      ...provided,
      width: 'auto',
      minWidth: 'auto',
      position: 'absolute',
      display: 'flex',
      marginTop: '2px',
      marginBottom: '2px',
      padding: '0',
      right: '0',
      border: '1px solid #d1d4e4',
      borderRadius: 3,
      backgroundColor: '#ffffff',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
    }),
    // indicatorSeparator: (provided) => ({
    //   ...provided,
    //   display: 'none',
    // }),
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
    // IndicatorSeparator: () => null,
    // Placeholder: () => null,
    // SingleValue: () => null,
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