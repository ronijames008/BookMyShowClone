import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/proxy': {
        target: 'http://localhost:8082', // Backend server
        changeOrigin: true, // Ensures the Host header matches the target
        rewrite: (path) => path.replace(/^\/proxy/, ''), // Remove /proxy from the path
      },
    },
  },
})