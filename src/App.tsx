import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { ThemeProvider } from 'components/ThemeContext';
import { PathRoutes } from './constantsApp';
import { Landing } from './pages/Landing';

function App() {
  return (
    <ThemeProvider>
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
