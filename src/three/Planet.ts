import * as THREE from 'three';

class Planet {
  constructor() {
    this._build();
    
  }

  private _build(): void {
    const root = document.querySelector('#canvas_three') as HTMLElement;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, root.clientWidth / root.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(root.clientWidth, root.clientHeight);
    root.insertBefore(renderer.domElement, root.firstChild);

    const lightHolder = new THREE.Group(); // Создание группы для СВЕТОВ!
    const aLight = new THREE.DirectionalLight(0xFFFFFF, 2); // Создание простого Света!
    aLight.position.set(-1.5, 1.7, .7); // Установка позиции для этого света
    lightHolder.add(aLight); // Прикрепляем к удержателю позиции света, чтобы он дальше не крутился вместе с объектами на сцене
    const aLight2 = new THREE.DirectionalLight(0xFFFFFF, 2); // Второй дополнительный свет
    aLight2.position.set(-1.5, 0.3, .7);
    lightHolder.add(aLight2);

    const geomHide = new THREE.SphereGeometry(1.0499, 64, 36);
    const matHide = new THREE.MeshStandardMaterial({ color: new THREE.Color(0x091e5a) });
    const meshHide = new THREE.Mesh(geomHide, matHide);

    scene.add(meshHide);
    scene.add(lightHolder);
    
    const animate = (time: number): void => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
}

export default Planet;