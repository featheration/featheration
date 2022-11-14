import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ['**/*.{ts,tsx}'],
    }),
  ],
});
