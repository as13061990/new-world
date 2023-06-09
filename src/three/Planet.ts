import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import anime, { AnimeInstance } from 'animejs';
import State from '../store/State';
import { modal } from '../types/enums';
import positions from './positions';

import map from '../assets/images/map.png';
import china from '../assets/images/china.png';
import india from '../assets/images/india.png';
import belarus from '../assets/images/belarus.png';
import serbia from '../assets/images/serbia.png';
import southAfrica from '../assets/images/south-africa.png';
import brazil from '../assets/images/brazil.png';
import point from '../assets/images/point.png';
import Loader from './Loader';
import points from './points';

const DURATION = 700;
const COUNTRY_DURATION = 500;
const EASING = 'easeInOutQuad';
const ZOOM: Vector3 = {
  x: -.7,
  y: -.2,
  z: 13
}

class Planet {
  constructor() {
    this._build();
  }

  private _root: HTMLElement;
  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _sphere: THREE.Mesh;
  private _country: THREE.Mesh;
  private _icon: THREE.Mesh;
  private _animation: AnimeInstance;
  private _load: Loader = new Loader();
  private _zoom: boolean = false;
  private _points: THREE.Mesh[] = [];

  private _build(): void {
    State.stepCallback = this._stepCallback.bind(this);
    this._root = document.querySelector('#canvas_three') as HTMLElement;
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(12, this._root.clientWidth / this._root.clientHeight, 0.01, 100);
    this._camera.position.set(0, 0, 20);
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(this._root.clientWidth, this._root.clientHeight);
    this._renderer.setClearColor('#FFFFFF', 0); // цвет фона. 0 - прозрачность
    this._root.insertBefore(this._renderer.domElement, this._root.firstChild);

    this._load.image('map', map);
    this._load.image('china', china);
    this._load.image('india', india);
    this._load.image('belarus', belarus);
    this._load.image('serbia', serbia);
    this._load.image('south-africa', southAfrica);
    this._load.image('brazil', brazil);
    this._load.image('point', point);
    this._load.onComplete = this._loadComplete.bind(this);

    // const aLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    // aLight.position.set(-1.5,1.7,.7);
    // this._scene.add(aLight);

    requestAnimationFrame(this._update.bind(this));
  }

  private _click(): void {
    document.onclick = (event): void => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const ww = this._root.clientWidth;
      const hh = this._root.clientHeight;
      const xMouse = event.offsetX;
      const yMouse = event.offsetY;
      mouse.x = (xMouse / ww) * 2 - 1;
      mouse.y = -(yMouse / hh) * 2 + 1;
      raycaster.setFromCamera(mouse, this._camera);
      const intersects = raycaster.intersectObjects(this._points);

      if (this._points.length > 0) {
        const answer = intersects[0];

        if (answer?.object) {
          const mesh = answer.object as THREE.Mesh;
          this._icon = mesh;
          State.setCountryPointIndex(mesh.userData.index);
          // координаты курсора в 3д пространстве
          // console.log(answer.point);
        }
      }
    }
  }

  private toScreenXY(position: THREE.Vector3): Vector2 {
    const pos = position.clone();
    const vector = pos.project(this._camera);
    const { width, height } = this._root.getBoundingClientRect();
    vector.x = (vector.x + 1) / 2 * width;
    vector.y = -(vector.y - 1) / 2 * height;
    return vector;
  }

  private _stepCallback(): void {
    const i = State.getStep();
    const state = positions[i];
    if (!state || !this._sphere) return;
    const m = state.state as modal;

    if (m && m !== State.getModal()) {
      this._showCountry(m);
    } else if (State.getModal() !== modal.NO && !m) {
      this._hideCountry();
    }

    this._animation = anime({
      targets: this._sphere.rotation,
      x: state.rotation.x,
      y: state.rotation.y,
      z: state.rotation.z,
      easing: EASING,
      duration: DURATION,
      complete: (): void => {
        if (this._zoom && this._animation.completed) {
          this._showPoints();
        }
      }
    });

    if (this._zoom === false) {
      anime({
        targets: this._sphere.position,
        x: state.position.x,
        y: state.position.y,
        z: state.position.z,
        easing: EASING,
        duration: DURATION
      });
    } else {
      this._hidePoints();
    }
  }

  private _loadComplete(): void {
    const texture = this._load.get('map');
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    const geometry = new THREE.SphereGeometry(1.0499, 200, 200);
    this._sphere = new THREE.Mesh(geometry, material);
    this._sphere.name = 'sphere';
    this._scene.add(this._sphere);
    const state = positions[0];
    this._sphere.position.set(state.position.x, state.position.y, state.position.z);
    this._sphere.rotation.set(state.rotation.x, state.rotation.y, state.rotation.z);
    this._createCountry();
  }

  private _createCountry(): void {
    const texture = this._load.get('china');
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    material.needsUpdate = true;
    material.transparent = true;
    material.opacity = 0;
    const geometry = new THREE.SphereGeometry(1.065, 200, 200);
    this._country = new THREE.Mesh(geometry, material);
    this._country.name = 'country';
    this._sphere.add(this._country);
    this._click();
    // const main = document.querySelector('#main') as HTMLElement;
    // new OrbitControls(this._camera, main);
  }

  private _showCountry(country: modal): void {
    State.setModal(country);
    const material = this._country.material as THREE.Material;

    if (material.opacity === 0) {
      const texture = this._load.get(country);
      // @ts-ignore
      this._country.material.map = texture;
      anime({
        targets: material,
        opacity: 1,
        easing: EASING,
        duration: COUNTRY_DURATION
      });
    } else {
      anime({
        targets: material,
        opacity: 0,
        easing: EASING,
        duration: COUNTRY_DURATION / 2,
        complete: (): void => {
          const texture = this._load.get(country);
          // @ts-ignore
          this._country.material.map = texture;
          anime({
            targets: material,
            opacity: 1,
            easing: EASING,
            duration: COUNTRY_DURATION / 2
          });
        }
      });
    }
  }

  private _hideCountry(): void {
    State.setModal(modal.NO);
    anime({
      targets: this._country.material,
      opacity: 0,
      easing: EASING,
      duration: COUNTRY_DURATION
    });
  }

  private _showPoints(): void {
    const data = points(State.getModal());
    this._points.map(point => {
      this._country.remove(point);
    });
    this._points = [];
    data.map((point, index) => {
      const texture = this._load.get('point');
      const material = new THREE.MeshBasicMaterial({
        map: texture
      });
      material.transparent = true;
      material.opacity = 0;
      const meshTexture = new THREE.Mesh(
        new THREE.PlaneGeometry(.08, 0.1),
        material
      );
      const position = point.position;
      meshTexture.position.set(position.x, position.y, position.z);
      meshTexture.scale.set(.5, .5, .5);
      meshTexture.userData = {
        text: point.data,
        index: index
      }
      this._country.add(meshTexture);
      this._points.push(meshTexture);
      meshTexture.lookAt(this._camera.position);

      if (index === 0) {
        this._country.remove(this._icon);
        this._icon = meshTexture;
        State.setCountryPointIndex(0);
      }

      anime({
        targets: material,
        opacity: 1,
        easing: EASING,
        duration: DURATION / 2
      });
    });
  }

  private _hidePoints(): void {
    State.setCountryPointIndex(null);
    this._points.map(point => {
      anime({
        targets: point.material,
        opacity: 0,
        easing: EASING,
        duration: DURATION / 2,
        complete: (): void => {
          this._country.remove(point);
        }
      });
    });
  }

  private _checkZoom(): void {
    if (!this._sphere) return;
    if (!this._zoom && State.getModal() !== modal.NO && State.getModalActive()) {
      this._zoom = true;
      this._animation = anime({
        targets: this._sphere.position,
        x: ZOOM.x,
        y: ZOOM.y,
        z: ZOOM.z,
        easing: EASING,
        duration: DURATION,
        complete: (): void => {
          if (this._animation.completed) {
            this._showPoints();
          }
        }
      });
    } else if (this._zoom && (State.getModal() === modal.NO || !State.getModalActive())) {
      this._zoom = false;
      const i = State.getStep();
      const state = positions[i];
      if (!state) return;
      this._hidePoints();
      anime({
        targets: this._sphere.position,
        x: state.position.x,
        y: state.position.y,
        z: state.position.z,
        easing: EASING,
        duration: DURATION
      });
    }
  }

  private _setIconPostition(): void {
    if (!this._icon) return;
    const vector = this._icon.getWorldPosition(new THREE.Vector3());
    const position = this.toScreenXY(vector);
    const state = State.getIconPosition();

    if (state.x !== position.x || state.y !== position.y) {
      State.setIconPosition(position.x, position.y);
    }
  }

  private _move(object: THREE.Mesh, step: number = .001): void {
    let vector = 0, position = false;
    const log = (): void => {
      console.log({
        position: object.position,
        rotation: object.rotation
      });
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
        console.log('JUST SPACE BUTTON')
      }
    }
  }

  private _update(time: number): void {
    this._checkZoom();
    this._setIconPostition();
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(this._update.bind(this));
  }
}

export default Planet;