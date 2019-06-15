import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import StartPage from './routes/StartPage';
import SeatPage from './routes/SeatPage';
import MenuPage from './routes/MenuPage';
import OrderPage from './routes/OrderPage';
import CustomerPage from './routes/CustomerPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/start" component={StartPage} />
        <Route path="/seat" component={SeatPage} />
        <Route path="/menu" component={MenuPage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/customer" component={CustomerPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
