import { Global } from '@emotion/react';
import type { DecoratorFunction, Parameters } from '@storybook/types';
import { Animation, Reset } from '../src/styles';
import type { ReactFramework } from '@storybook/react';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)/i,
      date: /Date$/,
      action: /^on/,
    },
  },
};

export const decorators: DecoratorFunction<ReactFramework>[] = [
  (Story) => (
    <>
      <Global styles={[Reset, Animation]} />
      <Story />
    </>
  ),
];
