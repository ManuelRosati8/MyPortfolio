import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/MyPortfolio/',            // <— fondamentale per GitHub Pages project site
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  }
});