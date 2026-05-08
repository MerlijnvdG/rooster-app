import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isTauri = mode === 'tauri';

  return {
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: isTauri ? 'dist' : '../src/main/resources/static',
      emptyOutDir: true,
    },
    clearScreen: false,
  };
});
