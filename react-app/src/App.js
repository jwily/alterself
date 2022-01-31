import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Roster from './components/characters/Roster';
import Character from './components/characters/Character';
import { authenticate } from './store/session';
import Home from './components/Home';
import Welcome from './components/Welcome';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path='/roster' exact={true} >
          <Roster />
        </ProtectedRoute>
        <ProtectedRoute path='/roster/:charId'>
          <Character />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          {user ? <Home /> : <Welcome />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
