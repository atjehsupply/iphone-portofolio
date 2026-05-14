import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Menggunakan esbuild untuk minifikasi super cepat
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Strategi pemecahan vendor chunks
        manualChunks: {
          // Chunk khusus untuk core Three.js
          'three-core': ['three'],
          // Chunk khusus untuk ekosistem React Three Fiber
          'three-fiber': ['@react-three/fiber', '@react-three/drei'],
          // Chunk untuk library pendukung UI agar tidak membebani main bundle
          'ui-framework': ['framer-motion', 'lucide-react'],
        },
      },
    },
    // Meningkatkan limit peringatan chunk agar tidak muncul warning saat build
    chunkSizeWarningLimit: 1000,
  },
  // Optimasi esbuild tambahan
  esbuild: {
    drop: ['console', 'debugger'], // Menghapus log saat production agar kode lebih bersih
  },
})