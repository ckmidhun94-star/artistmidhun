import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/examples/jsm/')) return 'three-extras'
          if (id.includes('/node_modules/three/')) return 'three'
          if (id.includes('/node_modules/postprocessing/')) return 'postprocessing'
          if (id.includes('/node_modules/@react-three/')) return 'react-three'
          if (id.includes('/node_modules/framer-motion/')) return 'motion'
          if (id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react/')) {
            return 'react'
          }
          if (id.includes('/node_modules/react-markdown/')) return 'markdown'
          return undefined
        },
      },
    },
  },
})
