import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,  // Use the same port as your backend server
    proxy: {
      '/api': {
        target: 'https://poem-ai-app-bjrx.onrender.com', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
