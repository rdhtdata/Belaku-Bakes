import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function devHtmlPlugin(): Plugin {
  return {
    name: 'dev-html-transform',
    apply: 'serve', // only active during 'npm run dev'
    transformIndexHtml(html) {
      return html
        .replace(
          /<meta[\s\S]*?http-equiv="Content-Security-Policy"[\s\S]*?\/>/gi,
          ''
        )
        .replace(
          /<script type="module" crossorigin src=".*?assets\/index\.js"><\/script>/g,
          ''
        )
        .replace(
          /<link rel="stylesheet" crossorigin href=".*?assets\/index\.css">/g,
          ''
        )
        .replace(
          '</body>',
          '  <script type="module" src="/Belaku-Bakes/src/main.tsx"></script>\n  </body>'
        );
    },
  };
}

export default defineConfig(() => {
  return {
    base: "/Belaku-Bakes/",
    build: {
      outDir: "docs",
      rollupOptions: {
        input: path.resolve(__dirname, "src/template.html"),
        output: {
          entryFileNames: "assets/index.js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/index.[ext]",
        },
      },
    },
    plugins: [devHtmlPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
