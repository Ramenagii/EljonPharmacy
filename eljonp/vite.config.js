import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('@supabase')) return 'supabase'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('@tabler') || id.includes('@heroicons') || id.includes('react-icons')) return 'icons'
          if (id.includes('react-router')) return 'router'
          if (id.includes('react')) return 'react-vendor'
          return 'vendor'
        },
      },
    },
  },
})
