import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      '@tinymce/tinymce-react',
      'tinymce/tinymce',
      'tinymce/models/dom/model',
      'tinymce/themes/silver/theme',
      'tinymce/icons/default/icons',
      'tinymce/plugins/advlist',
      'tinymce/plugins/anchor',
      'tinymce/plugins/autolink',
      'tinymce/plugins/charmap',
      'tinymce/plugins/code',
      'tinymce/plugins/fullscreen',
      'tinymce/plugins/image',
      'tinymce/plugins/insertdatetime',
      'tinymce/plugins/link',
      'tinymce/plugins/lists',
      'tinymce/plugins/media',
      'tinymce/plugins/preview',
      'tinymce/plugins/searchreplace',
      'tinymce/plugins/table',
      'tinymce/plugins/visualblocks',
      'tinymce/plugins/wordcount',
    ],
  },
})
