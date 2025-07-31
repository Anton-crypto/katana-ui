import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UIKit',
      formats: ['es'],
      fileName: 'ui-kit',
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  }
});