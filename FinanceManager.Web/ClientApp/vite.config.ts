import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
    },
  },
  server: {
    port: 4321,
    proxy: {
      '/api': {
        target: 'http://localhost:5053',
        changeOrigin: true,
      },
      '/swagger': {
        target: 'http://localhost:5053',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: { theme_color: '#141414' },
    }),
  ],
})
