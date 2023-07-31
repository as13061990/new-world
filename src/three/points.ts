import { modal } from '../types/enums';

const points: Ipoints[] = [
  {
    state: modal.CHINA,
    point: {
      data: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis eros commodo, vehicula turpis eu, posuere diam. Duis et dapibus lacus. Morbi bibendum, nulla sed imperdiet lacinia, diam nibh mattis sapien, non vehicula nulla nisl et nibh. Sed ac tincidunt augue. Suspendisse dictum pulvinar purus sed eleifend. Sed eu suscipit nulla. Sed nec risus eget justo dapibus cursus in et nibh.  Mauris nec diam at leo pellentesque dignissim et eu augue. Nunc in mattis nibh, et laoreet arcu. Aenean sit amet rhoncus risus. Etiam vitae pellentesque diam, nec porttitor eros. Aliquam vehicula diam a nisi sodales, sit amet feugiat dui vulputate. Vestibulum pulvinar ligula rutrum eros laoreet pellentesque. Aliquam ',
      name: 'Тадж-Махал'
    }
  },
  {
    state: modal.INDIA,
    point: {
      data: 'Индия — самая многонаселённая страна мира, обогнавшая Китай, и самая многоязычная страна, говорящая на 400 наречиях. Мало кто знает, что именно по языковому принципу здесь развивается индустрия кино. Да, оказывается, это не только Болливуд, есть еще Толливуд, Колливуд, Сандалвуд, Бходжвуд, Джолливуд, Дхолливуд, Долливуд, Полливуд, Чхолливуд… и ещё много разных «вудов». В целом, Индия является для России отличным рынком по замещению западных товаров. И кто знает, может быть, совсем скоро, у нас появятся Боллинетфликс и Толлизон…',
      name: 'Тадж-Махал'
    }
  },
  {
    state: modal.BELARUS,
    point: {
      data: 'Точка на карте Баларуси',
      name: 'Тадж-Махал'
    }
  },
  {
    state: modal.SERBIA,
    point: {
      data: 'Точка на карте Сербии',
      name: 'Тадж-Махал'
    }
  },
  {
    state: modal.SOUTH_AFRICA,
    point: {
      data: 'ЮАР — самое яркое государство африканского континента. Жители Южной Африки называют себя "радужная нация".\n\nЗдесь 11 официальных языков и люди всех цветов кожи уживаются под одним ярким флагом.\n\nПри этом мало кто знает, но Россию и Южную Африку объединяют более 100 лет совместной истории и деловых связей.',
      name: 'Тадж-Махал'
    }
  },
  {
    state: modal.BRAZIL,
    point: {
      data: 'Бразилия — страна самбо и самбы, где первое — это название народа, а второе — естественно, танцы. На главном карнавальном шествии в этом году в ритме самбы участники буквально оттанцевали сцены из жизни созвучных потомков индейцев — самбо. Если вы не слышали о них, то точно знаете самых известных их представителей: Уго Чавеса и актера Дуэйна по прозвищу Скала. Насколько различны Бразилия и Россия по своему этническому составу, настолько схожи ментально, культурологически и даже экономически. Бразилия — наш самый западный союзник по БРИКС, но самый близкий по духу.',
      name: 'Тадж-Махал'
    }
  }
];

export default (country: modal): Ipoint => {
  const foundData = points.find(data => data.state === country);
  return foundData ? foundData.point : null;
}