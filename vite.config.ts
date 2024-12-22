import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
    base: '',
    plugins: [react()],
    server: {
        proxy: mode === 'development' ? {
            '/corals': {
                target: 'http://localhost:8081/',
                secure: false,
                changeOrigin: true,
            },
        } : undefined,
        port: 3000,
    },
    define: {
        'process.env.BACKEND_URL': JSON.stringify(mode === 'production' ? process.env.BACKEND_URL : 'http://localhost:8081'),
    },
}));
