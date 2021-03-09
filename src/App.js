import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));


class App extends Component {

  
  
 isAuthenticated = () => {
     if(sessionStorage.getItem('UserId')){
        return true;
     }
     return false;
  }

  UnauthenticatedRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        !this.isAuthenticated()
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
    );

AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      this.isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );
  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
             <this.UnauthenticatedRoute exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <this.AuthenticatedRoute path="/" name="Home" component={TheLayout} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
