import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { gsap } from 'gsap'

            
//loader
const loadingBarElement = document.querySelector('.loading')
const ld = document.querySelector('.ld')
            
let sceneReady = false
const loadingManager = new THREE.LoadingManager(
// Loaded
    () =>
    {
        window.setTimeout(() =>
        {
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 2, value: 0, delay: 0 })
        }, 500)  
        window.setTimeout(() =>
        {
            sceneReady = true
        }, 2000)
    },
            
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        const progressRatio = itemsLoaded / itemsTotal
        if (progressRatio <= 0.30 )
        {
            loadingBarElement.innerHTML = "."
        }else if (progressRatio <= 0.60 )
        {
            loadingBarElement.innerHTML = ".."
        }else if (progressRatio <= 0.95 )
        {
                        loadingBarElement.innerHTML = "..."
        }
        if (progressRatio == 1)
        {
            loadingBarElement.innerHTML = ""
            ld.innerHTML = ""
        }
    }
)
            
const textureLoader = new THREE.TextureLoader(loadingManager)
            
// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('src/static/draco/')
            
// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager)
gltfLoader.setDRACOLoader(dracoLoader)
            
// Debug
const debugObject = {}
            
// Canvas
const canvas = document.querySelector('canvas.webgl')
            
// Scene
const scene = new THREE.Scene()
            
//overlay
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
            
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)
            
//texture
const bakedtexture = textureLoader.load('src/static/p_final_bake.jpg')
const poster = textureLoader.load('src/static/image as plane/zoro.jpg')
const ecran1 = textureLoader.load('src/static/image as plane/ecranport.jpg')
const ecran2 = textureLoader.load('src/static/image as plane/ecrancrypto.jpg')
const mangach = textureLoader.load('src/static/image as plane/chainsaw.jpg')
const mangaop = textureLoader.load('src/static/image as plane/one_piece.jpg')
const mangahx = textureLoader.load('src/static/image as plane/hunter.jpg')
const mangapr = textureLoader.load('src/static/image as plane/prisonnier.jpg')
const mangafi = textureLoader.load('src/static/image as plane/fire.jpg')
bakedtexture.flipY = false
            
//material
const bakedMaterial = new THREE.MeshBasicMaterial({map : bakedtexture})
            
//model
gltfLoader.load(
    'src/static/page finalee.glb',
    (gltf) =>
    {
        const bakedmesh = gltf.scene.children.find(children => children.name === 'bakee')
        bakedmesh.material = bakedMaterial
        gltf.scene.position.x = - 10
        gltf.scene.position.y = -3
        gltf.scene.position.z = 5
        gltf.scene.rotation.y = Math.PI / 4
                    
        scene.add(gltf.scene)
    }
)
            
//point
const raycaster = new THREE.Raycaster()
const points = [
    {
        position: new THREE.Vector3(0.3, -1.3, - 2.3),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(-5.5, -0.1, - 2.1),
        element: document.querySelector('.point-0')
    }
]
            
//size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
            
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
            
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
            
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
            
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
camera.rotation.z = Math.PI
camera.near = 0.1
camera.far = 20
scene.add(camera)
            
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableDamping = true
controls.minDistance = 2
controls.maxDistance = 12
controls.minPolarAngle = 0
controls.maxPolarAngle = Math.PI / 2
controls.minAzimuthAngle = Math.PI / 4
controls.maxAzimuthAngle =  Math.PI * 0.75
            
//image plane
const postergeo = new THREE.PlaneBufferGeometry(0.8, 1)
const postermat = new THREE.MeshBasicMaterial({map: poster})
const postermesh = new THREE.Mesh(postergeo, postermat)
scene.add(postermesh)
postermesh.position.y = 0.2
postermesh.position.x = -4.55
postermesh.position.z = -3.64
postermesh.rotation.y = Math.PI / 4
            
const ecran1geo = new THREE.PlaneBufferGeometry(1.513, 0.89)
const ecran1mat = new THREE.MeshBasicMaterial({map: ecran1})
const ecran1mesh = new THREE.Mesh(ecran1geo, ecran1mat)
scene.add(ecran1mesh)
ecran1mesh.position.y = -0.37
ecran1mesh.position.x = -5.43
ecran1mesh.position.z = -2.25
ecran1mesh.rotation.y = Math.PI / 4
            
const ecran2geo = new THREE.PlaneBufferGeometry(1.7, 1)
const ecran2mat = new THREE.MeshBasicMaterial({map: ecran2})
const ecran2mesh = new THREE.Mesh(ecran2geo, ecran2mat)
scene.add(ecran2mesh)
ecran2mesh.scale.set(0.4, 0.5, 0.75)
ecran2mesh.position.y = -0.77
ecran2mesh.position.x = -6.26
ecran2mesh.position.z = -1.58
ecran2mesh.rotation.y = Math.PI / 2.8
            
const mangachgeo = new THREE.PlaneBufferGeometry(0.95, 0.47)
const mangachmat = new THREE.MeshBasicMaterial({map: mangach})
const mangachmesh1 = new THREE.Mesh(mangachgeo, mangachmat)
const mangachmesh2 = new THREE.Mesh(mangachgeo, mangachmat)
scene.add(mangachmesh1, mangachmesh2)
mangachmesh1.position.y = -1.57
mangachmesh1.position.x = -2.76
mangachmesh1.position.z = -5.08
mangachmesh1.rotation.y = Math.PI / 4
mangachmesh2.position.y = -1.57
mangachmesh2.position.x = -2.24
mangachmesh2.position.z = -5.59
mangachmesh2.rotation.y = Math.PI / 4
            
const mangaopgeo = new THREE.PlaneBufferGeometry(1.65, 0.45)
const mangaopmat = new THREE.MeshBasicMaterial({map: mangaop})
const mangaopmesh = new THREE.Mesh(mangaopgeo, mangaopmat)
scene.add(mangaopmesh)
mangaopmesh.position.y = -0.43
mangaopmesh.position.x = -2.37
mangaopmesh.position.z = -5.47
mangaopmesh.rotation.y = Math.PI / 4
            
const mangahxgeo = new THREE.PlaneBufferGeometry(1.8, 0.45)
const mangahxmat = new THREE.MeshBasicMaterial({map: mangahx})
const mangahxmesh = new THREE.Mesh(mangahxgeo, mangahxmat)
scene.add(mangahxmesh)
mangahxmesh.position.y = -2.22
mangahxmesh.position.x = -2.41
mangahxmesh.position.z = -5.41
mangahxmesh.rotation.y = Math.PI / 4
            
const mangafigeo = new THREE.PlaneBufferGeometry(2.05, 0.48)
const mangafimat = new THREE.MeshBasicMaterial({map: mangafi})
const mangafimesh = new THREE.Mesh(mangafigeo, mangafimat)
scene.add(mangafimesh)
mangafimesh.position.y = 0.24
mangafimesh.position.x = -2.4
mangafimesh.position.z = -5.43
mangafimesh.rotation.y = Math.PI / 4
            
const mangaprgeo = new THREE.PlaneBufferGeometry(1.1, 0.45)
const mangaprmat = new THREE.MeshBasicMaterial({map: mangapr})
const mangaprmesh = new THREE.Mesh(mangaprgeo, mangaprmat)
const mangaprmesh1 = new THREE.Mesh(mangaprgeo, mangaprmat)
scene.add(mangaprmesh, mangaprmesh1)
mangaprmesh.position.y = -0.98
mangaprmesh.position.x = -2.57
mangaprmesh.position.z = -5.25
mangaprmesh.rotation.y = Math.PI / 4
mangaprmesh1.position.y = -0.98
mangaprmesh1.position.x = -2.06
mangaprmesh1.position.z = -5.77
mangaprmesh1.rotation.y = Math.PI / 4
            
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
scene.background = new THREE.Color( 0x0e1214 );
            
//animate
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    controls.update()
            
    if(sceneReady)
    {
        for(const point of points)
        {
            const screenPosition = point.position.clone()
            screenPosition.project(camera)
                
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)
                
            if(intersects.length === 0)
            {
                point.element.classList.add('visible')
            }
            else
            {
                const intersectionDistance = intersects[0].distance
                const pointDistance = point.position.distanceTo(camera.position)
                if(intersectionDistance < pointDistance)
                {
                    point.element.classList.remove('visible')
                }
                else
                {
                    point.element.classList.add('visible')
                }
            }
                
            const translateX = screenPosition.x * sizes.width * 0.5
            const translateY = - screenPosition.y * sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
    }        
    renderer.render(scene, camera)
            
    window.requestAnimationFrame(tick)
}
tick()