export const rsStylesDropdownMenu = {
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
    border: 'solid 1px #d1d4e4',
    borderRadius: '3px',
    boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.15)',
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
};

export const rsComponentsDropdownMenu = {
  IndicatorSeparator: () => null,
  Placeholder: () => null,
  SingleValue: () => null,
};