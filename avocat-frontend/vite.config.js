import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
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
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'splash-image.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        start_url: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#0d3346',
        background_color: '#0d3346',
        splash_pages: [
          {
            src: 'splash-image.png',
            sizes: '1280x720',
            type: 'image/jpeg'
          }
        ],
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
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    historyApiFallback: true, 
  },

  build: {
    outDir: '../public_html', 
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
