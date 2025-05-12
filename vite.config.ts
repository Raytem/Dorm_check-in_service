import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 80,
    host: 'local.vstu.by',
  },
  plugins: [react(), tsconfigPaths()],
});
