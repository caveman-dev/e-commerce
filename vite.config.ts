import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:'',
  plugins: [react()],
  server: {
    proxy: {
      '/corals': {
        target: 'http://localhost:8081/',
        secure: false,
        changeOrigin: true,
      },
    },
    port: 3000,
  },
})
