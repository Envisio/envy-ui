import jssGlobal from '../from-css/ui-jss';
import { UI_COLOR_PALE_BLUE } from '../index'

const jss = jssGlobal['@global'];
const jssCard = jss['.env-card'];

export const rsDropdownMenu = {
  styles: {
    menu: (provided) => ({
      ...provided,
      width: 'auto',
      minWidth: 'auto',
      position: 'absolute',
      display: 'flex',
      marginTop: '0',
      marginBottom: '0',
      padding: '0',
      right: '0',
      ...jssCard,
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
    })
  },
  components: {
    IndicatorSeparator: () => null,
    Placeholder: () => null,
    SingleValue: () => null,
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