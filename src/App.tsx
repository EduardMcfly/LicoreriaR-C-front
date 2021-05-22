import React from 'react';
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';

import { ThemeProvider } from 'components/ThemeContext';
import { PathRoutes } from './constantsApp';
import { Landing } from './pages/Landing';
import { ShopProvider } from './contexts/Shop';
import { ProductsProvider } from './contexts/Products';
import { client } from './client';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CssBaseline />
        <ProductsProvider>
          <ShopProvider>
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
          </ShopProvider>
        </ProductsProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
