import * as THREE from 'three';
import map from '../assets/images/map.png';

class Planet {
  constructor() {
    this._build();
  }

  private _sphere: THREE.Mesh;

  private _build(): void {
    const root = document.querySelector('#canvas_three') as HTMLElement;
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, root.clientWidth / root.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(root.clientWidth, root.clientHeight);
    renderer.setClearColor('#FFFFFF', 0); // цвет фона. 0 - прозрачность
    root.insertBefore(renderer.domElement, root.firstChild);

    const loader = new THREE.TextureLoader();
    loader.load(
      map,
      (texture) => {
        const material = new THREE.MeshBasicMaterial({
          map: texture
        });
        const geometry = new THREE.SphereGeometry(1.0499, 64, 100);
        this._sphere = new THREE.Mesh(geometry, material);
        scene.add(this._sphere);
      }
    );
    
    const animate = (time: number): void => {
      if (this._sphere) {
        this._sphere.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
}

export default Planet;