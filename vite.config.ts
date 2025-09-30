import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
// Obtener el modo de ejecución (development o production)
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Usar ruta relativa en producción, absoluta en desarrollo
    base: isProduction ? './' : '/',
    plugins: [react()],
    // Configuración para manejar correctamente las rutas en producción
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
      manifest: true,
      // Asegurar que los módulos se sirvan con el tipo MIME correcto
      assetsInlineLimit: 0,
      // Forzar la inclusión de hashes en los nombres de archivo
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['react-icons', 'recharts'],
          },
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    // Configuración para manejar correctamente las rutas en desarrollo
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'es2020',
      // Configuración adicional para soporte de navegadores antiguos
      supported: {
        'es2020': true
      },
    },
  },
  // Configuración de variables de entorno
  define: {
    'process.env': {}
  },
  publicDir: 'public',
  // Configuración para el modo preview
  preview: {
    port: 3000,
    open: true
  },
  // Configuración para SSR (si es necesario en el futuro)
  ssr: {
    noExternal: ['react-icons'],
  },
  // Configuración de caché
  cacheDir: 'node_modules/.vite',
  };
});
