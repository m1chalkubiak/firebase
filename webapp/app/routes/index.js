import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { DEFAULT_ROOM } from '../modules/rooms/rooms.redux';
import App from './app.container';
import Room from './room';
import Login from './login';
import NotFound from './notFound';

export class RootContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={'/login'} />} />

        <Route exact path="/404" component={NotFound} />

        <Route path="/">
          <App>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/room/" render={() => <Redirect to={`/room/${DEFAULT_ROOM}`} />} />
              <Route exact path="/404" component={NotFound} />
              <Route exact path="/room/:id" component={Room} />
              <Route component={NotFound} />
            </Switch>
          </App>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(RootContainer);
