import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.sass';
import Detail from './components/detail/Detail';
import { PokeList } from './components/pokelist/Pokelist';

export const EntryPoint = "/pokemon/"

const App = () => {
  const history = useHistory();
  if (history.location.pathname==="/")history.push(EntryPoint)
  return (
    <div className="App">
        <Switch>
          <Route exact={true} path={EntryPoint} render={(props)=>{
            const query = new URLSearchParams(props.location.search);
            const page = parseInt(query.get("page")||"")||undefined;
            const name = query.get("name")||undefined;
            const onNameChange = (name:string)=>{
              const query = name.length?`?${(new URLSearchParams({name})).toString()}`:""
              history.replace(props.location.pathname+query)
            };
            return <PokeList page={page} name={name} onNameChange={onNameChange}/>
          }}/>
          <Route path={EntryPoint+":id"} render={(props)=>{
            const id = parseInt(props.match.params.id as string);
            return <Detail id={id}/>;
          }}/>
        </Switch>
    </div>
  );
}

export default App;
