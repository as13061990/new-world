import * as THREE from 'three';
import anime, { AnimeInstance } from 'animejs';
import State from '../store/State';
import { modal } from '../types/enums';
import positions from './positions';

import map from '../assets/images/map.png';
import china from '../assets/images/china.png';
import india from '../assets/images/india.png';

const DURATION = 800;
const COUNTRY_DURATION = 1500;

class Planet {
  constructor() {
    this._build();
  }

  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _sphere: THREE.Mesh;
  private _china: THREE.Mesh;
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
    const state = positions[0];
    this._sphere.position.set(state.position.x, state.position.y, state.position.z);
    this._sphere.rotation.set(state.rotation.x, state.rotation.y, state.rotation.z);

    this._loader.load(india, texture => this._createIndia(texture));
    this._loader.load(china, texture => this._createChina(texture));
    
    // this._move(this._sphere, 0.01);
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

    const m = this._india.material as THREE.Material;
    m.transparent = true;
    m.opacity = 0;
  }

  private _createChina(texture: THREE.Texture): void {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    this._china = new THREE.Mesh(new THREE.PlaneGeometry(.235, .235), material);
    this._china.position.set(-.18, .62, -.995);
    this._china.rotation.set(.35, 2.97, 6.24);
    this._china.scale.set(3, 3, 3);

    this._scene.add(this._china);
    this._sphere.add(this._china);

    const m = this._china.material as THREE.Material;
    m.transparent = true;
    m.opacity = 0;
  }

  private _checkAnimation(): void {
    const current = {
      position: this._sphere.position,
      rotation: this._sphere.rotation
    } as IPlanetState;
    const state = this._getStepState();

    if (this._checkPosition(current, state) === false) {
      this._animation = anime({
        targets: this._sphere.position,
        x: state.position.x,
        y: state.position.y,
        z: state.position.z,
        easing: "easeInOutSine",
        duration: DURATION
      });
      anime({
        targets: this._sphere.rotation,
        x: state.rotation.x,
        y: state.rotation.y,
        z: state.rotation.z,
        easing: "easeInOutSine",
        duration: DURATION
      });
    }
  }

  private _getStepState(): IPlanetState {
    const scroll = State.getScrollPrecent();
    const part = 100 / positions.length;
    const step = Math.floor(scroll / part);
    const index = step >= positions.length ? positions.length - 1 : step;
    const prevPos = positions[index]; // текущая позиция
    const nextPos = index === positions.length - 1 ? prevPos : positions[index + 1]; // следующая позиция
    const percents = (scroll % part) / part; // путь в процентах от текущей точки к следующей

    const position = new THREE.Vector3();
    const rotation = new THREE.Vector3();
    
    position.x = (nextPos.position.x - prevPos.position.x) * percents + prevPos.position.x;
    position.y = (nextPos.position.y - prevPos.position.y) * percents + prevPos.position.y;
    position.z = (nextPos.position.z - prevPos.position.z) * percents + prevPos.position.z;

    rotation.x = (nextPos.rotation.x - prevPos.rotation.x) * percents + prevPos.rotation.x;
    rotation.y = (nextPos.rotation.y - prevPos.rotation.y) * percents + prevPos.rotation.y;
    rotation.z = (nextPos.rotation.z - prevPos.rotation.z) * percents + prevPos.rotation.z;
    
    if (this._index !== index) {
      this._index = index;
      console.log(this._index + 1, positions.length);
      console.log(nextPos);
    }

    if (index === 7) {
      State.getModal() === modal.NO && this._showCountry(modal.CHINA);
    } else if (index === 9) {
      State.getModal() === modal.NO && this._showCountry(modal.INDIA);
    } else if (State.getModal() !== modal.NO) {
      this._hideCountry();
    }
    return { position, rotation }
  }

  private _showCountry(country: modal): void {
    State.setModal(country);
    
    const material = 
      country === modal.INDIA ? this._india.material :
      country === modal.CHINA ? this._china.material :
      null;

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
      targets: [this._india.material, this._china.material],
      opacity: 0,
      easing: "easeInOutSine",
      duration: COUNTRY_DURATION
    });
  }

  private _checkPosition(state1: IPlanetState, state2: IPlanetState): boolean {
    if (state1.position.x === state2.position.x &&
      state1.position.y === state2.position.y &&
      state1.position.z === state2.position.z &&
      state1.rotation.x === state2.rotation.x &&
      state1.rotation.y === state2.rotation.y &&
      state1.rotation.z === state2.rotation.z) return true;
    return false;
  }

  private _move(object: THREE.Mesh, step: number = .001): void {
    let vector = 0, position = false;
    const log = (): void => {
      console.log({
        position: object.position,
        rotation: object.rotation
      });
      this._stop = true;
    } 

    document.onkeydown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        const vector3 = vector === 0 ? 'x' : vector === 1 ? 'y' : 'z';
        const property = position ? 'position' : 'rotation';
        const sign = e.code === 'ArrowUp' ? 1 : -1;
        object[property][vector3] += (step * sign);
        log();
      } else if (e.code === 'ArrowLeft' || e.code == 'ArrowRight') {

        if (e.code === 'ArrowLeft') vector = vector === 0 ? 2 : vector - 1;
        else position = !position;
        
        const vector3 = vector === 0 ? 'x' : vector === 1 ? 'y' : 'z';
        const property = position ? 'position' : 'rotation';
        console.log(property + ' - ' + vector3);
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