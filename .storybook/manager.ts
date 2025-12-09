import { addons } from 'storybook/manager-api';

import envisioTheme from './theme';

addons.setConfig({
  theme: envisioTheme,
  sidebar: {
    showRoots: false,
  },
});
