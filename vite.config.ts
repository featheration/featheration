import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import linaria from '@linaria/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), linaria()],
});
