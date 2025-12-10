import { create } from 'storybook/theming/create';

import { envisioLogoMarkup } from '../src/stories/assets/envisio-logo-markup';

const brandImage = `data:image/svg+xml;utf8,${encodeURIComponent(envisioLogoMarkup)}`;

const envisioTheme = create({
  base: 'light',
  brandTitle: 'Envisio Design System',
  brandUrl: './',
  brandImage,
  colorPrimary: '#1B88F9',
  colorSecondary: '#42E2B8',
  appBg: '#f4f6fb',
  appContentBg: '#ffffff',
  appBorderColor: '#d8dce8',
  appBorderRadius: 8,
  fontBase: "'Source Sans Pro', Arial, sans-serif",
  fontCode: "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', monospace",
  textColor: '#0f172a',
  textInverseColor: '#ffffff',
  barTextColor: '#475467',
  barSelectedColor: '#1B88F9',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#cfd4e5',
  inputTextColor: '#0f172a',
});

export default envisioTheme;
