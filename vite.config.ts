import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
// Obtener el modo de ejecución (development o production)
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  // Usar ruta relativa en producción, absoluta en desarrollo
  base: isProduction ? './' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    cssCodeSplit: true,
    // Asegurar que los assets se carguen correctamente
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['react-icons', 'recharts'],
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  define: {
    'process.env': {}
  },
  publicDir: 'public',
  ssr: {
    noExternal: ['react-icons'],
  },
});
