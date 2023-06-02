interface Vector2 {
  x: number;
  y: number;
}
interface Vector3 {
  x: number;
  y: number;
  z: number;
}
interface IPlanetState {
  state?: string,
  position: Vector3;
  rotation: Vector3;
}
interface Ipoint {
  position: Vector3;
  data: string;
  image: string;
  name: string;
}
interface Ipoints {
  state: string;
  points: Ipoint[];
}