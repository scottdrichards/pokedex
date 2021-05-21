import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Detail from './components/detail/Detail';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={()=><Detail id={10}/>}/>
          <Route path="/detail/">Hello</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
