import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssPxtoRem from 'postcss-pxtorem';
import path from 'path'


export default defineConfig({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: process.env.NODE_ENV !== 'production',
  },
  // 文件引用路径根目录配置
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  // 配置静态资源处理
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: 'static/js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'static/js/[name].[hash].js', // 拆分js到模块文件夹
        assetFileNames: (assetInfo: any) => {
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          // Separate CSS files into the 'css' directory
          if (assetInfo.name.endsWith('.css')) {
            return `assets/css/[name].[hash].[ext]`;
          }
          // Separate image files into the 'images' directory
          if (/\.(jpe?g|png|gif|bmp|webp|svg|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name].[hash].[ext]`;
          }
          // Default output directory and filename pattern for other assets
          return `assets/other/[name].[hash].[ext]`;
        },
      },
    },
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 1024,
    assetsInlineLimit: 4096, // 图片转 base64 编码的阈值
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variables" as *;
          @use "@/assets/styles/mixins" as *;
        `,
      }
    },
    postcss: {
      plugins: [
        postcssPxtoRem({
          rootValue: 100,
          propList: ['*'],
          unitPrecision: 5,
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          exclude: /node_modules/i
        })
      ]
    }
  },
});