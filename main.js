import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,.1,1000)

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(40)

renderer.render(scene,camera)

const earthTexture = new THREE.TextureLoader().load('earth-surface.jpg')

const geometry = new THREE.SphereGeometry(10,64,64)
const material = new THREE.MeshBasicMaterial({
  map: earthTexture
})

const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,10,10)
pointLight.intensity = 1.25

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight,pointLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(150,50)
// scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera,renderer.domElement)

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z)
  scene.add(star)
    
}

Array(200).fill().forEach(addStars)

const spaceTexture = new THREE.TextureLoader().load('space-background.jpg')
scene.background = spaceTexture


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera)
  controls.update()
}

animate()

