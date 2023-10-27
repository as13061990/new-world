import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import anime, { AnimeInstance } from 'animejs';
import State from '../store/State';
import { modal } from '../types/enums';
import positions from './positions';
import Loader from './Loader';
import points from './points';

import map from '../assets/images/map.png';
import china from '../assets/images/china.png';
import india from '../assets/images/india.png';
import belarus from '../assets/images/belarus.png';
import serbia from '../assets/images/serbia.png';
import southAfrica from '../assets/images/south-africa.png';
import brazil from '../assets/images/brazil.png';
import point from '../assets/images/point.png';

import EarthSpecularMap from '../assets/images/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../assets/images/8k_earth_clouds.jpg';

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
  private _earth: THREE.Mesh;
  private _country: THREE.Mesh;
  private _clouds: THREE.Mesh;
  private _icon: THREE.Mesh;
  private _load: Loader = new Loader();
  private _zoom: boolean = false;
  private _time: number = 0;
  private _flash: AnimeInstance;

  private _build(): void {
    this._root = document.querySelector('#canvas_three') as HTMLElement;
    if (!this._root) return;

    State.stepCallback = this._stepCallback.bind(this);
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(12, this._root.clientWidth / this._root.clientHeight, 0.01, 100);
    this._camera.position.set(0, 0, 20);
    this._renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    this._renderer.setSize(this._root.clientWidth, this._root.clientHeight);
    this._renderer.setClearColor('#FFFFFF', 0); // цвет фона. 0 - прозрачность
    this._root.insertBefore(this._renderer.domElement, this._root.firstChild);

    const light = new THREE.DirectionalLight(0xF6F3EA, 1.2);
    light.position.set(-15, 5, 20);
    this._scene.add(light);

    this._loadCounter()
    this._load.onProgress = (progress) => {
      const loadingText = document.getElementById('loading-text');
      loadingText.innerText = `${progress}%`;
    };

    this._load.image('map', map);
    this._load.image('china', china);
    this._load.image('india', india);
    this._load.image('belarus', belarus);
    this._load.image('serbia', serbia);
    this._load.image('south-africa', southAfrica);
    this._load.image('brazil', brazil);
    this._load.image('point', point);
    
    // this._load.image('EarthDayMap', EarthDayMap);
    // this._load.image('EarthNormalMap', EarthNormalMap);
    this._load.image('specular', EarthSpecularMap);
    this._load.image('clouds', EarthCloudsMap);

    this._load.onComplete = this._loadComplete.bind(this);

    requestAnimationFrame(this._update.bind(this));
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
    State.setAnimation(true);
    const i = State.getStep();
    const state = positions[i];
    if (!state || !this._earth) {
      setTimeout(() => {
        State.setAnimation(false);
      }, DURATION);
      return;
    }
    const m = state.state as modal;

    if (m && m !== State.getModal()) {
      this._showCountry(m);
    } else if (State.getModal() !== modal.NO && !m) {
      this._hideCountry();
    }

    anime({
      targets: this._earth.rotation,
      x: state.rotation.x,
      y: state.rotation.y,
      z: state.rotation.z,
      easing: EASING,
      duration: DURATION,
      complete: (): void => {
        State.setAnimation(false);
      }
    });

    if (this._zoom === false) {
      anime({
        targets: this._earth.position,
        x: state.position.x,
        y: state.position.y,
        z: state.position.z,
        easing: EASING,
        duration: DURATION
      });
    }
  }

  private _loadCounter(): void {
    const yandexMetrikaScript = document.createElement('script');
    yandexMetrikaScript.type = 'text/javascript';
    yandexMetrikaScript.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){
        (m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  
      ym(95340418, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
      });
    `;
    document.head.appendChild(yandexMetrikaScript);
  }

  private _loadComplete(): void {
    this._createPlanet();
    this._createClouds();
    this._createCountry();
    setTimeout(()=>{
      State.setIsLoaded(true)
    },100)
  }

  private _createPlanet(): void {
    const texture = this._load.get('map');
    const texture2 = this._load.get('specular');
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      specularMap: texture2,
      specular: new THREE.Color('grey'), 
    });
    const geometry = new THREE.SphereGeometry(1.05, 100, 100);
    this._earth = new THREE.Mesh(geometry, material);
    this._earth.name = 'sphere';
    this._scene.add(this._earth);
    const state = positions[0];
    this._earth.position.set(state.position.x, state.position.y, state.position.z);
    this._earth.rotation.set(state.rotation.x, state.rotation.y, state.rotation.z);
  }

  private _createClouds(): void {
    const texture = this._load.get('clouds');
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      opacity: .3,
      depthWrite: true,
      transparent: true,
      side: THREE.DoubleSide
    });
    const geometry = new THREE.SphereGeometry(1.057, 100, 100);
    this._clouds = new THREE.Mesh(geometry, material);
    this._clouds.name = 'clouds';
    this._earth.add(this._clouds);
  }

  private _createCountry(): void {
    const texture = this._load.get('china');
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    material.needsUpdate = true;
    material.transparent = true;
    material.opacity = 0;
    const geometry = new THREE.SphereGeometry(1.065, 32, 32);
    this._country = new THREE.Mesh(geometry, material);
    this._country.name = 'country';
    this._earth.add(this._country);
    // const main = document.querySelector('#main') as HTMLElement;
    // new OrbitControls(this._camera, main);
  }

  private _showCountry(country: modal): void {
    State.setModal(country);
    const material = this._country.material as THREE.Material;
    this._flash?.pause();

    if (material.opacity === 0) {
      const texture = this._load.get(country);
      // @ts-ignore
      this._country.material.map = texture;
      anime({
        targets: material,
        opacity: 1,
        easing: EASING,
        duration: COUNTRY_DURATION,
        complete: (): void => {
          this._flash = anime({
            targets: material,
            opacity: .5,
            loop: true,
            easing: EASING,
            duration: 1000,
            direction: 'alternate'
          });
        }
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
            duration: COUNTRY_DURATION / 2,
            complete: (): void => {
              this._flash = anime({
                targets: material,
                opacity: .5,
                loop: true,
                easing: EASING,
                duration: 1000,
                direction: 'alternate'
              });
            }
          });
        }
      });
    }
  }

  private _hideCountry(): void {
    State.setModal(modal.NO);
    this._flash?.pause();
    anime({
      targets: this._country.material,
      opacity: 0,
      easing: EASING,
      duration: COUNTRY_DURATION
    });
  }

  private _checkZoom(): void {
    if (!this._earth) return;
    if (!this._zoom && State.getModal() !== modal.NO && State.getModalActive()) {
      this._zoom = true;
      anime({
        targets: this._earth.position,
        x: ZOOM.x,
        y: ZOOM.y,
        z: ZOOM.z,
        easing: EASING,
        duration: DURATION
      });
    } else if (this._zoom && (State.getModal() === modal.NO || !State.getModalActive())) {
      this._zoom = false;
      const i = State.getStep();
      const state = positions[i];
      if (!state) return;
      
      anime({
        targets: this._earth.position,
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

  private _move(object: THREE.Mesh | any, step: number = .001): void {
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

  private _getDelta(time: number): number {
    const delta = time - this._time;
    this._time = time;
    return delta;
  }

  private _cloudsAnimation(): void {
    if (this._clouds) {
      this._clouds.rotation.y += .0004;
    }
  }

  private _update(time: number): void {
    const delta = this._getDelta(time);
    this._cloudsAnimation();
    this._checkZoom();
    this._setIconPostition();
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(this._update.bind(this));
  }
}

export default Planet;