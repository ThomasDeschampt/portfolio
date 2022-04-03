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
          "three",
          "../node_modules/three/build/three.module.js",
          "../node_modules/three/examples/jsm/controls/OrbitControls.js",
          "../node_modules/three/examples/jsm/loaders/GLTFLoader.js",
          "../node_modules/three/examples/jsm/loaders/DRACOLoader.js",
          "../node_modules/gsap",
        ],
    }
  }
})




