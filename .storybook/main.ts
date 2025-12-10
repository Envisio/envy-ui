import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(currentDir, '..');
const envyUiEntry = path.resolve(repoRoot, 'lib', 'index.js');
const detectBrowserShim = path.resolve(
  repoRoot,
  'dev',
  'ts-playground',
  'shims',
  'detect-browser.ts'
);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (baseConfig) => {
    baseConfig.resolve = baseConfig.resolve ?? {};
    const aliasEntries: Array<{ find: string | RegExp; replacement: string }> = [];
    const existingAlias = baseConfig.resolve.alias;

    if (Array.isArray(existingAlias)) {
      aliasEntries.push(...existingAlias);
    } else if (existingAlias && typeof existingAlias === 'object') {
      aliasEntries.push(
        ...Object.entries(existingAlias).map(([find, replacement]) => ({
          find,
          replacement: replacement as string,
        }))
      );
    }

    const upsertAlias = (find: string, replacement: string) => {
      const currentIndex = aliasEntries.findIndex((entry) => entry.find === find);
      if (currentIndex >= 0) {
        aliasEntries[currentIndex] = { find, replacement };
      } else {
        aliasEntries.push({ find, replacement });
      }
    };

    upsertAlias('envy-ui', envyUiEntry);
    upsertAlias('detect-browser', detectBrowserShim);
    baseConfig.resolve.alias = aliasEntries;

    baseConfig.optimizeDeps = baseConfig.optimizeDeps ?? {};
    const currentIncludes = baseConfig.optimizeDeps.include ?? [];
    baseConfig.optimizeDeps.include = Array.from(
      new Set([...currentIncludes, 'envy-ui'])
    );

    baseConfig.build = baseConfig.build ?? {};
    baseConfig.build.commonjsOptions = baseConfig.build.commonjsOptions ?? {};
    const cjsIncludes = baseConfig.build.commonjsOptions.include ?? [];
    baseConfig.build.commonjsOptions.include = [
      ...(Array.isArray(cjsIncludes)
        ? cjsIncludes
        : [cjsIncludes].filter(Boolean)),
      /node_modules/,
      path.resolve(repoRoot, 'lib', '**'),
    ];

    baseConfig.plugins = baseConfig.plugins ?? [];
    baseConfig.plugins.push({
      name: 'envy-ui-local-link',
      enforce: 'pre',
      resolveId(source) {
        if (source === 'envy-ui') {
          return envyUiEntry;
        }
        if (source === 'detect-browser') {
          return detectBrowserShim;
        }
        return null;
      },
    });
    return baseConfig;
  },
};
export default config;
