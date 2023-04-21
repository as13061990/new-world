import './types/interfaces';
import '../assets/css/style.css';
import * as THREE from 'three';

window.onload = (): void => {
  setTimeout((): void => {
    three();
    window.addEventListener('resize', (): void => {
      console.log('resize');
    }, false);
  }, 100);
}

const three = () => {
  const root: HTMLElement = document.querySelector('#root');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, root.clientWidth / root.clientHeight, .1, 1000);
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);
  
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  camera.position.z = 5;
  
  const animate = (time: number) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
  
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}