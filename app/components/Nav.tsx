import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../constants/routes.json';
import Select from './generic/Select';
import Button from './generic/Button';
import ConfigLoader from './ConfigLoader';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfigLoaderVisible: true
    };
  }

  componentDidMount() {
    let cacheElem = document.getElementById('preload-cache');
    window.setTimeout(() => {
      cacheElem.remove();
    }, 1000);
  }

  apiCall = route => {
    fetch('http://localhost:8080/' + route).then(res => {
      console.log(res);
      return res;
    });
  };

  isBackendAlive = () => {
    fetch('http://localhost:8080/is-backend-alive').then(res => {
      res.json().then(res => {
        if (res.success == false) {
          this.setState({ isConfigLoaderVisible: true });
        }
      });
    });
  };

  render() {
    return (
      <>
        <ConfigLoader
          onBackendLoaded={() => {
            this.setState({ isConfigLoaderVisible: false }, () => {});
          }}
          isVisible={this.state.isConfigLoaderVisible}
        />
        <nav className="nav">
          <NavLink activeClassName="active" to={routes.BUILDER}>
            <i className="la la-pencil-ruler" /> BUILD
          </NavLink>
          <NavLink activeClassName="active" to={routes.SHOW}>
            <i className="la la-satellite"></i> SHOW
          </NavLink>
          <NavLink disabled activeClassName="active" to={routes.INIT}>
            <i className="la la-cog" /> TESTS
          </NavLink>
          <div className="nav__right">
            <Button
              className="button button--danger"
              onClick={() => {
                this.apiCall('kill');
                this.setState({ isConfigLoaderVisible: true }, () => {});
              }}
            >
              SHUTDOWN
            </Button>
          </div>
        </nav>
      </>
    );
  }
}

export default Nav;
