import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from https://<user>.github.io/CSS_Native_transitions/
  base: '/CSS_Native_transitions/',
})
