import * as THREE from 'three';

type Texture = {
  name: string,
  texture: THREE.Texture
}

class Loader extends THREE.TextureLoader {
  constructor() {
    super();
  }

  private _textures: Texture[] = [];
  public onComplete: Function = (): void => {};

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
    const texture = data.texture as THREE.Texture;
    return texture;
  }
}

export default Loader;