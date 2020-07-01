import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { ThemeProvider } from 'components/ThemeContext';
import { PathRoutes } from './constantsApp';
import { Landing } from './pages/Landing';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <HashRouter>
        <Switch>
          <Route
            exact
            path={PathRoutes.LANDING}
            component={Landing}
          />
          <Redirect
            exact
            from={PathRoutes.ROOT}
            to={PathRoutes.LANDING}
          />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
