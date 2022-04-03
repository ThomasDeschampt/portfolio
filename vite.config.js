// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        info: resolve(__dirname, 'info.html'),
        pro: resolve(__dirname, 'projet.html'),
      },
        external: [
          "/src/three.module.js",
          "/src/controls/OrbitControls.js",
          "/src/loaders/GLTFLoader.js",
          "/src/loaders/DRACOLoader.js",
          "gsap",
          "script_info.js",
        ],
    }
  }
})




