import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ms1/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    global: "window",
  },
})
