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
          "/src/static/three.module.js",
          "/node_modules/three/build/three.module.js",
          "three/build/three.module.js",
          "three/examples/jsm/controls/OrbitControls.js",
          "three/examples/jsm/loaders/GLTFLoader.js",
          "three/examples/jsm/loaders/DRACOLoader.js",
          "gsap",
          "script_info.js",
        ],
    }
  }
})




