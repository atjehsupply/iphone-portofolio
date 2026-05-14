import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Kita matikan dulu manualChunks yang ribet biar build-nya lolos
    rollupOptions: {
      output: {
        manualChunks: undefined 
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  // Kita hapus bagian 'drop console' dulu sementara biar esbuild nggak rewel
})