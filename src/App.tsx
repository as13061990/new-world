import Main from "./page/Main";
import Planet from "./three/Planet";
import React from 'react';

class App extends React.Component {
  componentDidMount(): void {
    new Planet();
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
