import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isTauri = mode === 'tauri';

  return {
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: 'https://rooster-app.up.railway.app',
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
