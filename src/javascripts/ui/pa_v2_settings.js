import { uiGp } from './ui_names';
export const pathToImages = 'http://app.envisio.localhost:3000/assets/corporate_v3/';

export const bsStyleFocusShadow = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6)' : '0',
    borderColor: state.isFocused ? '#66afe9' : base.borderColor,
  }),
};

export const uiPAv2 = {
  bottomPanelHeight: 350,
  leftPanelWidth: 350,
};

export const containers = {
  mainContainer: {
    class: `${uiGp}js-m-c`,
    mq: {
      height: {
        md: 430,
        lg: 718,
      },
    },
  },
};
