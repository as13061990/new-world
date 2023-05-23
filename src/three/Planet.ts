import * as THREE from 'three';
import anime, { AnimeInstance } from 'animejs';
import State from '../store/State';
import { modal } from '../types/enums';
import map from '../assets/images/map.png';
import india from '../assets/images/india.png';

type PlanetState = {
  x: number,
  y: number,
  z: number,
  rotation: number
}

const DURATION = 800;
const COUNTRY_DURATION = 1500;
const POSITIONS: PlanetState[] = [
  { x: 0, y: -1, z: 15, rotation: 3.3 },
  { x: 0, y: -.5, z: 7.5, rotation: 3.8 },
  { x: 0, y: 0, z: 0, rotation: 4.8 },
  { x: 0, y: 0, z: 0, rotation: 6.0 },
  { x: 0, y: 0, z: 0, rotation: 7.1 },
  { x: 0, y: 0, z: 0, rotation: 8.3 },
  { x: 0, y: 0, z: 0, rotation: 9.0 },
  { x: 0, y: 0, z: 5, rotation: 9.3 },
  { x: -.5, y: -.5, z: 10, rotation: 9.6 },
  { x: -.5, y: -.5, z: 10, rotation: 9.6 },
  { x: -.5, y: -.5, z: 10, rotation: 9.6 },
  { x: 0, y: 0, z: 8, rotation: 9.8 },
  { x: 0, y: 0, z: 6, rotation: 10.0 },
  { x: 0, y: 0, z: 4, rotation: 10.5 },
  { x: 0, y: 1, z: 3, rotation: 11.0 },
  { x: 0, y: 2, z: 2, rotation: 11.5 },
  { x: 0, y: 3.4, z: 1, rotation: 12.0 }
];

class Planet {
  constructor() {
    this._build();
  }

  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _sphere: THREE.Mesh;
  private _india: THREE.Mesh;
  private _animation: AnimeInstance;
  private _loader: THREE.TextureLoader;
  private _index: number = 0;
  private _stop: boolean = false;

  private _build(): void {
    const root = document.querySelector('#canvas_three') as HTMLElement;
    
    this._scene = new THREE.Scene();

    this._camera = new THREE.PerspectiveCamera(12, root.clientWidth / root.clientHeight, 0.01, 100);
    this._camera.position.set(0, 0, 20);

    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(root.clientWidth, root.clientHeight);
    this._renderer.setClearColor('#FFFFFF', 0); // цвет фона. 0 - прозрачность
    root.insertBefore(this._renderer.domElement, root.firstChild);

    this._loader = new THREE.TextureLoader();
    this._loader.load(map, texture => this._createPlanet(texture));

    // const aLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    // aLight.position.set(-1.5,1.7,.7);
    // this._scene.add(aLight);

    requestAnimationFrame(this._update.bind(this));
  }

  private _createPlanet(texture: THREE.Texture): void {
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    const geometry = new THREE.SphereGeometry(1.0499, 200, 200);
    this._sphere = new THREE.Mesh(geometry, material);
    this._scene.add(this._sphere);
    const state = POSITIONS[0];
    this._sphere.position.set(state.x, state.y, state.z);
    this._sphere.rotation.set(0, state.rotation, 0);

    this._move(this._sphere, 0.01);

    this._loader.load(india, texture => this._createIndia(texture));
  }

  private _createIndia(texture: THREE.Texture): void {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    this._india = new THREE.Mesh(new THREE.PlaneGeometry(.235, .235), material);
    this._india.position.set(.14, .39, -.985);
    this._india.rotation.set(.35, 2.97, 6.24);
    this._india.scale.set(2, 2, 2);
    this._scene.add(this._india);
    this._sphere.add(this._india);

    const india = this._india.material as THREE.Material;
    india.transparent = true;
    india.opacity = 0;
  }

  private _checkAnimation(): void {
    const current = {
      ...this._sphere.position,
      rotation: this._sphere.rotation.y
    } as PlanetState;
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
      anime({
        targets: this._sphere.rotation,
        y: position.rotation,
        easing: "easeInOutSine",
        duration: DURATION
      });
    }
  }

  private _getStepPosition(): PlanetState {
    const scroll = State.getScrollPrecent();
    const part = 100 / POSITIONS.length;
    const step = Math.floor(scroll / part);
    const index = step >= POSITIONS.length ? POSITIONS.length - 1 : step;
    const prevPos = POSITIONS[index]; // текущая позиция
    const nextPos = index === POSITIONS.length - 1 ? prevPos : POSITIONS[index + 1]; // следующая позиция
    const percents = (scroll % part) / part; // путь в процентах от текущей точки к следующей
    const x = (nextPos.x - prevPos.x) * percents + prevPos.x;
    const y = (nextPos.y - prevPos.y) * percents + prevPos.y;
    const z = (nextPos.z - prevPos.z) * percents + prevPos.z;
    const rotation = (nextPos.rotation - prevPos.rotation) * percents + prevPos.rotation;
    
    if (this._index !== index) {
      this._index = index;
      console.log(this._index, POSITIONS.length);
    }

    if (index === 8 || index === 9) {
      
      if (State.getModal() === modal.NO) {
        this._showCountry(modal.INDIA);
      }
    } else if (State.getModal() !== modal.NO) {
      this._hideCountry();
    }
    return { x, y, z, rotation }
  }

  private _showCountry(country: modal): void {
    State.setModal(country);
    const material = country === modal.INDIA ? this._india.material : null;
    anime({
      targets: material,
      opacity: 1,
      easing: "easeInOutSine",
      duration: COUNTRY_DURATION
    });
  }

  private _hideCountry(): void {
    State.setModal(modal.NO);

    anime({
      targets: [this._india.material],
      opacity: 0,
      easing: "easeInOutSine",
      duration: COUNTRY_DURATION
    });
  }

  private _checkPosition(pos1: PlanetState, pos2: PlanetState): boolean {
    if (pos1.x === pos2.x && pos1.y === pos2.y && pos1.z === pos2.z && pos1.rotation === pos2.rotation) return true;
    return false;
  }

  private _move(object: THREE.Mesh, step: number = .001): void {
    let vector = 0;
    const log = (): void => {
      console.log({
        ...object.position,
        rotation: object.rotation.y
      });
      this._stop = true;
    } 

    document.onkeydown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp') {

        if (vector === 0) {
          object.position.x += step;
        } else if (vector === 1) {
          object.position.y += step;
        } else if (vector === 2) {
          object.position.z += step;
        } else {
          object.rotation.y += step;
        }
        log();
      } else if (e.code === 'ArrowDown') {
        
        if (vector === 0) {
          object.position.x -= step;
        } else if (vector === 1) {
          object.position.y -= step;
        } else if (vector === 2) {
          object.position.z -= step;
        } else {
          object.rotation.y -= step;
        }
        log();
      } else if (e.code === 'ArrowLeft' || e.code == 'ArrowRight') {

        if (e.code === 'ArrowLeft') vector = vector === 0 ? 3 : vector - 1;
        else vector = vector === 3 ? 0 : vector + 1;
        console.log(vector === 0 ? 'x' : vector === 1 ? 'y' : vector === 2 ? 'z' : 'rotation');
      } else if (e.code === 'Space') {
        this._stop = false;
      }
    }
  }

  private _update(time: number): void {
    if (this._sphere && (!this._animation || this._animation?.completed === true) && this._stop === false) {
      this._checkAnimation();
    }
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(this._update.bind(this));
  }
}

export default Planet;