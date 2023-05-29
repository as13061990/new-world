import * as platform from 'platform';
import Main from "./page/Main";
import Planet from "./three/Planet";
import React from 'react';
import State from './store/State';

class App extends React.Component {
  componentDidMount(): void {
    new Planet();
    console.log(platform)
    if (platform.os.family === 'iOS' || platform.os.family === 'Android') {
      State.setIsMobile(true);
    }
  }
  
  render() {
    return (
      <Main/>
    )
  }
}

// function App() {
//   new Planet();
//   return (
//     <Main/>
//   );
// }

export default App;
