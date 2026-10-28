import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // Load env file based on `mode` in the current working directory.
  return {
    plugins: [react()],
    server: { proxy: { '/api/ai': { target: 'http://127.0.0.1:5000', changeOrigin: false } }, },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
