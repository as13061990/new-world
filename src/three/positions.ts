import { modal } from '../types/enums';

const positions: IPlanetState[] = [
  {
    position: { x: 0, y: -1, z: 15 },
    rotation: { x: 0, y: 3.3, z: 0 }
  },
  {
    position: { x: 0, y: -1, z: 15 },
    rotation: { x: 0, y: 4.3, z: 0 }
  },
  {
    position: { x: 0, y: -.5, z: 7.5 },
    rotation: { x: 0, y: 5.3, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 6.3, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 7.3, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 8.3, z: 0 }
  },
  {
    state: modal.CHINA,
    position: { x: 0, y: 0, z: 6 }, // Китай
    rotation: { x: .2, y: 9.05, z: 0 }
  },
  {
    state: modal.CHINA,
    position: { x: 0, y: 0, z: 6 }, // Китай
    rotation: { x: .2, y: 9.05, z: 0 }
  },
  {
    state: modal.CHINA,
    position: { x: 0, y: 0, z: 6 }, // Китай
    rotation: { x: .2, y: 9.05, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .21, y: 9.2, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .22, y: 9.4, z: 0 }
  },
  {
    state: modal.INDIA,
    position: { x: 0, y: 0, z: 6 }, // Индия
    rotation: { x: .24, y: 9.6, z: 0 }
  },
  {
    state: modal.INDIA,
    position: { x: 0, y: 0, z: 6 }, // Индия
    rotation: { x: .24, y: 9.6, z: 0 }
  },
  {
    state: modal.INDIA,
    position: { x: 0, y: 0, z: 6 }, // Индия
    rotation: { x: .24, y: 9.6, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .27, y: 9.85, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .30, y: 10.05, z: 0 }
  },
  {
    state: modal.BELARUS,
    position: { x: 0, y: 0, z: 6 }, // Беларусь
    rotation: { x: .32, y: 10.25, z: 0 }
  },
  {
    state: modal.BELARUS,
    position: { x: 0, y: 0, z: 6 }, // Беларусь
    rotation: { x: .32, y: 10.25, z: 0 }
  },
  {
    state: modal.BELARUS,
    position: { x: 0, y: 0, z: 6 }, // Беларусь
    rotation: { x: .32, y: 10.25, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .31, y: 10.35, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: .3, y: 10.5, z: 0 }
  },
  {
    state: modal.SERBIA,
    position: { x: 0, y: 0, z: 6 }, // Сербия
    rotation: { x: .29, y: 10.5, z: 0 }
  },
  {
    state: modal.SERBIA,
    position: { x: 0, y: 0, z: 6 }, // Сербия
    rotation: { x: .29, y: 10.5, z: 0 }
  },
  {
    state: modal.SERBIA,
    position: { x: 0, y: 0, z: 6 }, // Сербия
    rotation: { x: .23, y: 10.5, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.1, y: 10.5415, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.45, y: 10.583, z: 0 }
  },
  {
    state: modal.SOUTH_AFRICA,
    position: { x: 0, y: 0, z: 6 }, // ЮАР
    rotation: { x: -.81, y: 10.583, z: 0 }
  },
  {
    state: modal.SOUTH_AFRICA,
    position: { x: 0, y: 0, z: 6 }, // ЮАР
    rotation: { x: -.81, y: 10.583, z: 0 }
  },
  {
    state: modal.SOUTH_AFRICA,
    position: { x: 0, y: 0, z: 6 }, // ЮАР
    rotation: { x: -.81, y: 10.583, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.65, y: 10.73, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.46, y: 10.86, z: 0 }
  },
  {
    state: modal.BRAZIL,
    position: { x: 0, y: 0, z: 6 }, // Бразилия
    rotation: { x: -.35, y: 11.933, z: 0 }
  },
  {
    state: modal.BRAZIL,
    position: { x: 0, y: 0, z: 6 }, // Бразилия
    rotation: { x: -.35, y: 11.933, z: 0 }
  },
  {
    state: modal.BRAZIL,
    position: { x: 0, y: 0, z: 6 }, // Бразилия
    rotation: { x: -.35, y: 11.933, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 6 },
    rotation: { x: -.2, y: 12, z: 0 }
  },
  {
    position: { x: 0, y: 0, z: 4 },
    rotation: { x: -.05, y: 12.5, z: 0 }
  },
  {
    position: { x: 0, y: .2, z: 3 },
    rotation: { x: 0, y: 13.0, z: 0 }
  },
  {
    position: { x: 0, y: .4, z: 3 },
    rotation: { x: 0, y: 13.5, z: 0 }
  },
  {
    position: { x: 0, y: .6, z: 3 },
    rotation: { x: 0, y: 14.0, z: 0 }
  },
  {
    position: { x: 0, y: .8, z: 3 },
    rotation: { x: 0, y: 14.5, z: 0 }
  },
  {
    position: { x: 0, y: 1, z: 3 },
    rotation: { x: 0, y: 15.0, z: 0 }
  },
  {
    position: { x: 0, y: 1.5, z: 3 },
    rotation: { x: 0, y: 15.5, z: 0 }
  },
  {
    position: { x: 0, y: 2.1, z: 3 },
    rotation: { x: 0, y: 16.0, z: 0 }
  },
  {
    position: { x: 0, y: 3.4, z: 3 },
    rotation: { x: 0, y: 16.5, z: 0 }
  },
  {
    position: { x: 0, y: 3.4, z: 3 },
    rotation: { x: 0, y: 16.5, z: 0 }
  },
  {
    position: { x: 0, y: 3.4, z: 3 },
    rotation: { x: 0, y: 16.5, z: 0 }
  },
  {
    position: { x: 0, y: 3.4, z: 3 },
    rotation: { x: 0, y: 16.5, z: 0 }
  },
];
export default positions;