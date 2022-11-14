import type { StorybookConfig } from '@storybook/types';
import { defineConfig, mergeConfig, UserConfig } from 'vite';

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

module.exports = {
  ...config,
  async viteFinal(config: UserConfig) {
    return mergeConfig(
      config,
      defineConfig({
        build: {
          sourcemap: false,
        },
      }),
    );
  },
};
