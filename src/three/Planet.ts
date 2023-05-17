import * as THREE from 'three';
import map from '../assets/images/map.png';
import anime, { AnimeInstance } from 'animejs';
import State from '../store/State';

type Vector3 = {
  x: number,
  y: number,
  z: number
}

const DURATION = 400;

const POSITIONS: Vector3[] = [
  { x: 0, y: -1, z: 15},
  { x: 0, y: -.5, z: 7.5},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 0, z: 0},
  { x: 0, y: 1, z: 0},
  { x: 0, y: 2, z: 0},
  { x: 0, y: 3, z: 0},
  { x: 0, y: 4, z: 0},
];

class Planet {
  constructor() {
    this._build();
  }

  private _sphere: THREE.Mesh;
  private _animation: AnimeInstance;

  private _build(): void {
    const root = document.querySelector('#canvas_three') as HTMLElement;
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(12, root.clientWidth / root.clientHeight, 0.01, 100);
    camera.position.set(0, 0, 20);

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
        this._sphere.position.set(0, -1, 15);
      }
    );

    const animate = (time: number): void => {
      if (this._sphere && (!this._animation || this._animation?.completed === true)) {
        this._checkAnimation();
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  private _checkAnimation(): void {
    const current = this._sphere.position as Vector3;
    const position = this._getStepPosition();

    if (this._checkPosition(current, position) === false) {
      this._animation = anime({
        targets: this._sphere.position,
        x: position.x,
        y: position.y,
        z: position.z,
        easing: "easeInOutSine",
        duration: DURATION
      });
    }
  }

  private _getStepPosition(): Vector3 {
    const scroll = State.getScrollPrecent();
    const step = Math.floor(scroll / 5);
    const index = step >= POSITIONS.length ? POSITIONS.length - 1 : step;
    const prevPos = POSITIONS[index]; // текущая позиция
    const nextPos = index === POSITIONS.length - 1 ? prevPos : POSITIONS[index + 1]; // следующая позиция
    const percents = ((scroll - step * 5) * 20) / 100; // путь в процентах от текущей точки к следующей
    const x = (nextPos.x - prevPos.x) * percents + prevPos.x;
    const y = (nextPos.y - prevPos.y) * percents + prevPos.y;
    const z = (nextPos.z - prevPos.z) * percents + prevPos.z;
    return { x, y, z }
  }

  private _checkPosition(pos1: Vector3, pos2: Vector3): boolean {
    if (pos1.x === pos2.x && pos1.y === pos2.y && pos1.z === pos2.z) return true;
    return false;
  }

  private _move(object: THREE.Mesh, step: number = 1): void {
    let vector = 0; 
    document.onkeydown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {

        if (vector === 0) {
          object.position.x += step;
        } else if (vector === 1) {
          object.position.y += step;
        } else {
          object.position.z += step;
        }
        console.log(object.position);
      } else if (e.code === 'ArrowDown') {
        
        if (vector === 0) {
          object.position.x -= step;
        } else if (vector === 1) {
          object.position.y -= step;
        } else {
          object.position.z -= step;
        }
        console.log(object.position);
      } else if (e.code === 'ArrowLeft' || e.code == 'ArrowRight') {

        if (e.code === 'ArrowLeft') vector = vector === 0 ? 2 : vector - 1;
        else vector = vector === 2 ? 0 : vector + 1;
        console.log(vector === 0 ? 'x' : vector === 1 ? 'y' : 'z');
      }
    }
  }
}

export default Planet;