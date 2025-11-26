// assets.ts
// Vite/Remix bisa pake import.meta.glob untuk auto-import semua file PNG/JPG
export const images = import.meta.glob('./assets/*.{png,jpg,jpeg}', { eager: true, as: 'base64' });
