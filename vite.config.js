import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep dist/assets/ reserved for course images copied from public/assets/.
    assetsDir: 'static',
  },
})
