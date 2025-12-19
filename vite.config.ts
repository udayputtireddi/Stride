import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.* for the Gemini Service
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.VISION_MODEL': JSON.stringify(env.VISION_MODEL)
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
