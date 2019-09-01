/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-10 16:27:14
 * @LastEditTime: 2019-08-31 11:59:34
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import StartPage from './routes/StartPage';
import SeatPage from './routes/SeatPage';
import MenuPage from './routes/MenuPage';
import OrderPage from './routes/OrderPage';
import CustomerPage from './routes/CustomerPage';
import Register from './routes/Register';
import MenuDetailPage from './routes/MenuDetailPage';
import Footer from './routes/Footer';


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
        <Route path="/register" component={Register} />
        <Route path="/menuDetailPage" component={MenuDetailPage} />
        <Route path="/footer" component={Footer} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
