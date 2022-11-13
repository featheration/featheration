// .storybook/main.ts

// Imports Storybook's configuration API
import type { StorybookConfig } from '@storybook/types';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    docsPage: true,
  },
  core: {
    disableTelemetry: true,
  },
};

module.exports = config;
