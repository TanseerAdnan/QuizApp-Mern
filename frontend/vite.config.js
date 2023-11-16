import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env
export default defineConfig({
  define: {
    __VALUE__: `"${process.env.VALUE}"` // wrapping in "" since it's a string
  },
  plugins: [react()],
  // ... other Vite configuration ...
});
