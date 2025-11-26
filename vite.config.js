import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Esnaad-Legal/',  // Replace with your GitHub repository name
    server: {
        port: 5173
    },
    build: {
        outDir: 'dist'
    }
})
