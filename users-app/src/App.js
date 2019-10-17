import React from 'react';
import './App.css';

import {Home} from './components/Home'
import {Users} from './components/Users'
import {Navigation} from './components/Navigation'

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NavLink from 'react-bootstrap/NavLink';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">ReactJS WebApi</h3>
        <h5 className="m-3 d-flex justify-content-center">User Managment Portal</h5>

        <Navigation/>

        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/users' component={Users}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
