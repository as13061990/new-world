import { modal } from '../types/enums';

const positions: IPlanetState[] = [
  {
    position: { x: 0, y: -1, z: 15 },
    rotation: { x: 0, y: 3.3, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 6.3, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 8.3, z: 0 }
  },
  {
    state: modal.CHINA,
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .3, y: 9.23, z: 0 }
  },
  {
    state: modal.INDIA,
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .24, y: 9.6, z: 0 }
  },
  {
    state: modal.BELARUS,
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .62, y: 10.62, z: 0 }
  },
  {
    state: modal.SERBIA,
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .29, y: 10.76, z: 0 }
  },
  {
    state: modal.SOUTH_AFRICA,
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.81, y: 10.583, z: 0 }
  },
  {
    state: modal.BRAZIL,
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.35, y: 11.933, z: 0 }
  },
  {
    position: { x: 0, y: 3.4, z: 3 },
    rotation: { x: 0, y: 13.0, z: 0 }
  }
];
export default positions;