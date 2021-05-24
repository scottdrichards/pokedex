import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Detail from './components/detail/Detail';
import { PokeList } from './components/pokelist/Pokelist';


const App = () => {
  const history = useHistory();
  return (
    <div className="App">
        <Switch>
          <Route exact={true} path="/pokemon/" render={(props)=>{
            const query = new URLSearchParams(props.location.search);
            const page = parseInt(query.get("page")||"")||undefined;
            const name = query.get("name")||undefined;
            const onNameChange = (name:string)=>{
              const q = (new URLSearchParams({name})).toString();
              history.replace(props.location.pathname+"?"+q)
            };
            return <PokeList page={page} name={name} onNameChange={onNameChange}/>
          }}/>
          <Route path="/pokemon/:id" render={(props)=>{
            const id = parseInt(props.match.params.id);
            return <Detail id={id}/>;
          }}/>
        </Switch>
    </div>
  );
}

export default App;
