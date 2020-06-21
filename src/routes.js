import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import {isAuthenticated} from './services/auth';
import Login from './pages/login';
import Categories from './pages/categories';
import Products from './pages/products';
import ForgotPassword from './pages/forgotpassword';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

  const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <PrivateRoute path="/app" component={() => <h1>App</h1>} />
            <PrivateRoute path="/categories" component={Categories} />
            <PrivateRoute path="/products" component={Products} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
  );
  
  export default Routes;