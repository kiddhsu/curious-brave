import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/curious-brave/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: '好奇小勇者',
        short_name: '好奇小勇者',
        description: '探索為什麼、練習小勇氣：適合低年級的生活教育小遊戲',
        theme_color: '#1fa6a0',
        background_color: '#dff6f1',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'zh-Hant-TW',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
