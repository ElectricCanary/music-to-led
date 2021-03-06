import React from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import routes from './constants/routes.json';
import BuilderPage from './containers/BuilderPage';
import InitPage from './containers/InitPage';
import TestPage from './containers/TestPage';
import ShowPage from './containers/ShowPage';
import SplashScreen from './components/SplashScreen';
import Nav from './components/Nav';

export default function Routes() {
  return (
    <React.Fragment>
      <div className="draggable-bar">
        {process.env.npm_package_version ? (
          <small className="software-version">
            <span>v{process.env.npm_package_version}</span>
          </small>
        ) : (
          ''
        )}
      </div>
      {process.env.NODE_ENV !== 'development' ? <SplashScreen /> : ''}
      <Nav />
      <Switch>
        <Route path={routes.INIT} component={InitPage} />
        <Route path={routes.SHOW} component={ShowPage} />
        <Route path={routes.BUILDER} component={BuilderPage} />
        <Route path={routes.TEST} component={TestPage} />
        <Redirect from="*" exact to={routes.BUILDER} />
      </Switch>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
}
