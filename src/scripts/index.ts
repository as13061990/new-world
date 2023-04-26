import './types/interfaces';
import '../assets/css/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// require('three/examples/js/controls/OrbitControls');

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
  const camera = new THREE.PerspectiveCamera(12, root.clientWidth / root.clientHeight, 0.01, 100);
  camera.position.set(10.5, 4, -3.5);
  // camera.setViewOffset(10, 10, -2, .5, 9, 9); // как ей «смотреть» — смещаем «куда» она смотрит
  
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(root.clientWidth, root.clientHeight);
  root.appendChild(renderer.domElement);
  renderer.setClearColor('#333333', 1); // фоновый цвет, установить 0, если требуется прозрачность
  
  const lightHolder = new THREE.Group(); // Создание группы для СВЕТОВ!
  const aLight = new THREE.DirectionalLight(0xFFFFFF, 2); // Создание простого Света!
  aLight.position.set(-1.5, 1.7, .7); // Установка позиции для этого света
  lightHolder.add(aLight); // Прикрепляем к удержателю позиции света, чтобы он дальше не крутился вместе с объектами на сцене
  
  
  const aLight2 = new THREE.DirectionalLight(0xFFFFFF, 2); // Второй дополнительный свет
  aLight2.position.set(-1.5, 0.3, .7);
  lightHolder.add(aLight2);

  const geometry = new THREE.IcosahedronGeometry(1.0, 2); // Создание геометрии сферы (которая икосахедрон) — для того, чтобы прикрепить к нему все остальные объекты — сам он будет невидим на сцене

  // Создание материала для икосахедрона (сферы)
  const materialIcosahedron = new THREE.MeshBasicMaterial({
    opacity: 0,
    transparent: true
  });

  const mesh = new THREE.Mesh(geometry, materialIcosahedron); // Создание некоторого абстрактного объекта (переводится — сетка)

  // Создание сферы, которую мы будем видеть — для скрытия заднего вида самой карты
  const geomHide = new THREE.SphereGeometry(1.0499, 64, 36);
  const matHide = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x091e5a) });
  const meshHide = new THREE.Mesh(geomHide, matHide);

  // Добавляем объекты на сцену
  scene.add(meshHide);
  scene.add(lightHolder);


  new OrbitControls(camera, root);
  
  const animate = (time: number) => {
    lightHolder.quaternion.copy(camera.quaternion);
    renderer.render(scene, camera);
  
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}