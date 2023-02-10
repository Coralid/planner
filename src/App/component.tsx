import React from 'react';
import Planner from "./Planner/component";
import "./styles.css"

class App extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <div className="app">
          <Planner />
        </div>
    );
  }

}

export default App;
