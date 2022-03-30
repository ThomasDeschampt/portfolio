// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        info: resolve(__dirname, 'src/info.html'),
        pro: resolve(__dirname, 'src/projet.html'),
      }
    }
  }
})