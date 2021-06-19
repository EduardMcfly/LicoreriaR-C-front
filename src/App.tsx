import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ApolloProvider } from '@apollo/client';

import { ThemeProvider } from 'components/ThemeContext';
import { PathRoutes } from './constantsApp';
import { Landing } from './pages/Landing';
import Order from './pages/Order';
import {
  ShopProvider,
  ProductsProvider,
  SessionProvider,
} from './contexts';
import { client } from './client';
import Analytics from './Analytics';

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CssBaseline />
        <ProductsProvider>
          <ShopProvider>
            <BrowserRouter>
              <Analytics />
              <SessionProvider>
                <Switch>
                  <Route
                    exact
                    path={PathRoutes.LANDING}
                    component={Landing}
                  />
                  <Route
                    exact
                    path={PathRoutes.ORDER}
                    component={Order}
                  />
                  <Redirect
                    exact
                    from={PathRoutes.ROOT}
                    to={PathRoutes.LANDING}
                  />
                </Switch>
              </SessionProvider>
            </BrowserRouter>
          </ShopProvider>
        </ProductsProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
