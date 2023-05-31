import { modal } from '../types/enums';

const points: Ipoints[] = [
  {
    state: modal.CHINA,
    points: [
      {
        position: { x: -0.3, y: .6, z: -.9 },
        rotation: { x: 3.4, y: -.4, z: 3.2 },
        data: 'Точнка на карте Китая'
      }
    ]
  },
  {
    state: modal.INDIA,
    points: [
      {
        position: { x: 0.19, y: .46, z: -1.03 },
        rotation: { x: 3.43, y: -.06, z: 3.16 },
        data: 'Точнка на карте Индии'
      }
    ]
  },
  {
    state: modal.BELARUS,
    points: [
      {
        position: { x: .57, y: .89, z: -.2934 },
        rotation: { x: 3.47, y: .92, z: 2.81 },
        data: 'Точнка на карте Баларуси'
      }
    ]
  },
  {
    state: modal.SERBIA,
    points: [
      {
        position: { x: .76, y: .76, z: -.2834 },
        rotation: { x: 3.47, y: 0.92, z: 2.81 },
        data: 'Точнка на карте Сербии'
      }
    ]
  },
  {
    state: modal.SOUTH_AFRICA,
    points: [
      {
        position: { x: .88, y: -.56, z: -.3934 },
        rotation: { x: 2.49, y: .92, z: 3.78 },
        data: 'Точнка на карте ЮАР'
      }
    ]
  },
  {
    state: modal.BRAZIL,
    points: [
      {
        position: { x: .77, y: -.18, z: .7866 },
        rotation: { x: 3.62, y: 2.53, z: 2.89 },
        data: 'Точнка на карте Бразилии'
      }
    ]
  }
];

export default (country: modal) => {
  return points.find(data => data.state === country).points;
}