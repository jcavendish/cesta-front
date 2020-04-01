import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewStore from './pages/NewStore';
import StoreDetail from './pages/StoreDetail';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Logon} />
      <Route path="/registrar" component={Register} />
      <Route path="/lojas" component={Profile} />
      <Route path="/loja/detalhe" component={StoreDetail} />
      <Route path="/loja/cadastrar" component={NewStore} />
    </Switch>
  </BrowserRouter>
);
