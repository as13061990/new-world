import * as platform from 'platform';
import Main from "./page/Main";
import Planet from "./three/Planet";
import React, { Suspense } from 'react';
import State from './store/State';
import { AfricaAsync } from './countryPages/Rio/Africa.async';
import { Route, Routes } from 'react-router-dom';
import { BelarusAsync } from './countryPages/Belarus/Belarus.async';
import { IndiaAsync } from './countryPages/India/India.async';
import { SerbiaAsync } from './countryPages/Serbia/Serbia.async';
import { BrazilAsync } from './countryPages/Brazil/Brazil.async';

class App extends React.Component {
  componentDidMount(): void {
    new Planet();

    if (platform.os.family === 'iOS' || platform.os.family === 'Android') {
      State.setIsMobile(true);
    }
    let resize = false;
    window.addEventListener('resize', () => {
      if (resize) return;
      resize = true;
      window.location.reload();
    });
  }

  render() {
    const vertical = window.innerHeight > window.innerWidth;
    if (vertical) return <div style={{
      color: '#fFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }}>Поверните устройство в горизонтальное положение</div>

    return (<>
      <Suspense fallback={<p className='loading-page'>Пожалуйста, подождите, идет загрузка</p>}>
        <Routes>

          <Route path='/' element={<Main />} />
          <Route path='/africa' element={<AfricaAsync />} />
          <Route path='/belarus' element={<BelarusAsync />} />
          <Route path='/india' element={<IndiaAsync />} />
          <Route path='/serbia' element={<SerbiaAsync />} />
          <Route path='/brazil' element={<BrazilAsync />} />
        </Routes>
      </Suspense>
    </>
    )
  }
}

export default App;
