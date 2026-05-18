import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
  // 1. إضافة logLevel لإخفاء رسائل [inf] و [war] المزعجة في السجلات
  logLevel: 'error', 

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        short_name: 'Avocat',
        name: 'نظام إدارة مكاتب المحاماة',
        description: 'Comprehensive Law Firm Management System',
        lang: 'ar',
        dir: 'rtl',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: 'splash-image.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'splash-image.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'splash-image.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#0d3346',
        background_color: '#0d3346',
      },  
    }), 
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],

  define: {
    'process.env': {},
    __APP_ENV__: process.env.APP_ENV,
  },

  server: {
    host: '0.0.0.0', // يفضل كتابتها كنص لضمان الربط الصحيح
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    strictPort: true, // تغيير لـ true يضمن استقرار الربط مع Railway       
    hmr: {
      overlay: false, // 2. إخفاء رسالة الخطأ التي تظهر فوق الموقع في المتصفح
    },
  },

  build: {
    outDir: 'dist', 
    emptyOutDir: false, 
    minify: 'esbuild',
    sourcemap: false, 
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@config': path.resolve(__dirname, './src/config'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@tailwindConfig': path.resolve(__dirname, './tailwind.config.js'),
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@fullcalendar/core'],
  },
});
