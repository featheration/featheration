import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import process from 'node:process';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/featheration/',
  plugins: [
    react(
      process.env.NO_FAST_REFRESH
        ? {
            fastRefresh: false,
          }
        : {},
    ),
    linaria({
      include: ['**/*.{ts,tsx}'],
    }),
  ],
});
