import * as THREE from 'three';
import Planet from './Planet';

type Texture = {
  name: string,
  texture: THREE.Texture | null
}

class Loader extends THREE.TextureLoader {
  constructor(app: Planet) {
    super();
    this._app = app;
    this._init();
  }

  private _app: Planet;
  private _textures: Texture[] = [];
  public onComplete: Function = (): void => {};

  private _init(): void {

  }

  private _checkProgress(): void {
    const loaded = this._textures.filter(data => data.texture !== null).length;
    this._textures.length === loaded && this.onComplete();
  }

  public image(key: string, path: string): void {
    const data: Texture = { name: key, texture: null };
    this._textures.push(data);
    this.load(path, texture => {
      data.texture = texture;
      this._checkProgress();
    });
  }

  public get(key: string): THREE.Texture {
    const data = this._textures.find(texture => texture.name === key);
    const texture = data?.texture as THREE.Texture;
    return texture;
  }
}

export default Loader;