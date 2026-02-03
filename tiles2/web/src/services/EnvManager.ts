 import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import type { typeWithMode } from '../types/typescript'; 
 
export default ({ mode } : typeWithMode) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': env
    }
  });
};
