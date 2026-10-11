import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Configuración de Vitest (las pruebas)
  test: {
    environment: 'jsdom',            // simula un navegador (document, localStorage, etc.)
    setupFiles: './src/test/setup.jsx', // archivo que corre antes de las pruebas
  },
});
