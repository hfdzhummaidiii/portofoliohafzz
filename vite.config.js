import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Kita naikkan limit warning biar terminal gak berisik
    // Tapi kita SERAHKAN urusan memecah file ke Vite (Auto)
    chunkSizeWarningLimit: 1600, 
  },
})