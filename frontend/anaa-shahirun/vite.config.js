import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'https://poem-ai-app-bjrx.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

