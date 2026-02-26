/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom', // emuluje przeglądarkę
    setupFiles: './src/setupTests.ts', // plik z dodatkową konfiguracją
    exclude: [
      ...configDefaults.exclude,
      '**/e2e/**',
      '**/node_modules/**',
      'e2e/*.spec.ts', // Dodaj to dla pewności
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
