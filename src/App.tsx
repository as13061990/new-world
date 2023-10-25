import * as platform from 'platform';
import Main from "./page/Main";
import Planet from "./three/Planet";
import React from 'react';
import State from './store/State';
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
      textAlign: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }}><span>Поверните устройство в горизонтальное положение</span></div>

    return (<>
          <Main />
    </>
    )
  }
}

export default App;
