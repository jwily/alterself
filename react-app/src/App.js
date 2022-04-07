import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Roster from './components/characters/Roster';
import Character from './components/characters/Character';
import { authenticate } from './store/session';
import Welcome from './components/Welcome';

import { setChars } from './store/characters';
import { setItems } from './store/items';
import { setFeats } from './store/features';
import { setProfs } from './store/profs';

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

  useEffect(() => {
    (async () => {
      if (user) {
        const response = await fetch(`/api/characters/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          dispatch(setChars(data.chars))
          dispatch(setItems(data.items));
          dispatch(setFeats(data.feats));
          dispatch(setProfs(data.profs));
        }
      }
    })();
  }, [dispatch, user])

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
          {user ? <Roster /> : <Welcome />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
