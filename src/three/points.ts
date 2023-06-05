import { modal } from '../types/enums';
import india1 from '../assets/images/attractions-india-1.png'

const points: Ipoints[] = [
  {
    state: modal.CHINA,
    points: [
      {
        position: { x: -0.45, y: .6, z: -.9 },
        data: 'Точнка на карте Китая 1',
        image: india1,
        name: 'Тадж-Махал'
      },
      {
        position: { x: -0.3, y: .7, z: -.9 },
        data: 'Точнка на карте Китая 2',
        image: india1,
        name: 'Тадж-Махал'
      }
    ]
  },
  {
    state: modal.INDIA,
    points: [
      {
        position: { x: 0.19, y: .46, z: -1.03 },
        data: 'Точнка на карте Индии',
        image: india1,
        name: 'Тадж-Махал'
      }
    ]
  },
  {
    state: modal.BELARUS,
    points: [
      {
        position: { x: .57, y: .89, z: -.2934 },
        data: 'Точнка на карте Баларуси',
        image: india1,
        name: 'Тадж-Махал'
      }
    ]
  },
  {
    state: modal.SERBIA,
    points: [
      {
        position: { x: .76, y: .76, z: -.2834 },
        data: 'Точнка на карте Сербии',
        image: india1,
        name: 'Тадж-Махал'
      }
    ]
  },
  {
    state: modal.SOUTH_AFRICA,
    points: [
      {
        position: { x: .88, y: -.56, z: -.3934 },
        data: 'Точнка на карте ЮАР',
        image: india1,
        name: 'Тадж-Махал'
      }
    ]
  },
  {
    state: modal.BRAZIL,
    points: [
      {
        position: { x: .77, y: -.18, z: .7866 },
        data: 'Точнка на карте Бразилии',
        image: india1,
        name: 'Тадж-Махал'
      }
    ]
  }
];

export default (country: modal) => {
  const foundData = points.find(data => data.state === country);
  return foundData ? foundData.points : [];
}