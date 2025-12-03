import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Pastikan ini tetap ada agar file 3D terbaca
  assetsInclude: ['**/*.glb'],

  build: {
    // 1. Minify tingkat tinggi agar ukuran file sekecil mungkin
    cssMinify: true,

    // 2. Naikkan batas peringatan size (biar terminal gak berisik kuning-kuning)
    chunkSizeWarningLimit: 1000,

    // 3. Konfigurasi Pemecahan File (Chunking)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Pisahkan Library 3D yang berat (Three.js, Rapier, Drei)
            if (id.includes('three') || id.includes('@react-three') || id.includes('rapier') || id.includes('drei') || id.includes('meshline')) {
              return 'vendor-3d';
            }
            // Pisahkan Firebase ke file sendiri
            if (id.includes('firebase')) {
              return 'vendor-firebase';
            }
            // Pisahkan Library UI/Animasi (Lucide, Typewriter, dll)
            if (id.includes('lucide') || id.includes('typewriter') || id.includes('hot-toast') || id.includes('react-helmet')) {
              return 'vendor-ui';
            }
            // Sisanya (React core) masuk vendor umum
            return 'vendor-react';
          }
        },
      },
    },
  },
})