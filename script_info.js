import * as THREE from '/src/static/three.module.js'
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//texture 
const textureloader = new THREE.TextureLoader()
const gradienttext = textureloader.load('src/static/5.jpg')
gradienttext.magFilter = THREE.NearestFilter

//objects
const material = new THREE.MeshToonMaterial({
    color: '#ffeded',
    gradientMap: gradienttext
})

const objectDistance = 4

const geometry = new THREE.TorusKnotGeometry( 10, 3, 64, 8, 18, 3 );
const mesh1 = new THREE.Mesh( geometry, material );
scene.add( mesh1 );

mesh1.scale.set(0.09, 0.09, 0.09)


const sectionMesh = [mesh1]

//particles 
const partCount = 500
const position = new Float32Array(partCount * 3)

for(let i = 0; i < partCount; i ++)
{
    position[i * 3 + 0] = (Math.random() - 0.5) * 10
    position[i * 3 + 1] = objectDistance * 0.5 - Math.random() * objectDistance * 3
    position[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const partGeometry = new THREE.BufferGeometry()
partGeometry.setAttribute('position', new THREE.BufferAttribute(position, 3))

const partMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.03
})

const particles = new THREE.Points(partGeometry, partMaterial)
scene.add(particles)

//lights
const directionallight = new THREE.DirectionalLight('#FFFFFF', 0.6)
directionallight.position.set(0.5, 0.5, 0)
scene.add(directionallight)

const testL = new THREE.AmbientLight('#020202', 0.7)
scene.add(testL)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//camera
//group
const cameragroup = new THREE.Group()
scene.add(cameragroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameragroup.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//scroll
let scrollY = window.scrollY

window.addEventListener('scroll', () =>
{
    scrollY  = window.scrollY
})

//cursor 
const cursor = {}
cursor.y = 0
cursor.x = 0 

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //animate object 
    for(const mesh of sectionMesh)
    {
        mesh.rotation.x = elapsedTime * 0.2
        mesh.rotation.y = elapsedTime * 0.1
    }

    //update camera
    camera.position.y = - scrollY / sizes.height * objectDistance
    
    const parallaX = cursor.x * 0.5
    const parallaY = - cursor.y * 0.5

    cameragroup.position.x += (parallaX - cameragroup.position.x) * 3 * deltaTime
    cameragroup.position.y += (parallaY - cameragroup.position.y) * 3 * deltaTime

    function myFunction(taille) {
        if (taille.matches) { // If media query matches
          mesh1.position.x = 0
          mesh1.scale.set(0.055, 0.055, 0.055)
        } else {
          mesh1.position.x = 2
          mesh1.scale.set(0.09, 0.09, 0.09)
        }
      }
      
      var taille = window.matchMedia("(max-width: 1024px)")
      myFunction(taille) // Call listener function at run time
      taille.addListener(myFunction) // Attach listener function on state changes

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
