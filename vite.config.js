import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: ['es2015', 'chrome50'],
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'XiangqiTV',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    {
      name: 'tizen-smart-tv-transform',
      transformIndexHtml(html) {
        let scriptSrc = '';
        let cleanHtml = html
          .replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/gi, (match, src) => {
            scriptSrc = src;
            return '';
          })
          .replace(/<script defer[^>]*src="([^"]+)"[^>]*><\/script>/gi, (match, src) => {
            scriptSrc = src;
            return '';
          });

        if (scriptSrc) {
          cleanHtml = cleanHtml.replace('</body>', `  <script src="${scriptSrc}"></script>\n</body>`);
        }
        return cleanHtml;
      }
    }
  ]
});
