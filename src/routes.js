import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import {isAuthenticated} from './services/auth';
import Login from './pages/login';
import Logout from './pages/logout';
import Categories from './pages/categories';
import Products from './pages/products';
import ForgotPassword from './pages/forgotpassword';
import Lists from './pages/lists';
import DetailsList from './pages/lists/details';
import SharedList from './pages/lists/share';
import Users from './pages/users';
import ChangeUser from './pages/users/change';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
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
            <PrivateRoute path="/users" component={Users} />
            <PrivateRoute path="/changeuser" component={ChangeUser} />
            <PrivateRoute path="/logout" component={Logout} />
            <PrivateRoute exact path="/lists" component={Lists} />
            <PrivateRoute exact path="/lists/share/:id" component={SharedList} />
            <PrivateRoute exact path="/lists/details/:id" component={DetailsList} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
  );
  
  export default Routes;