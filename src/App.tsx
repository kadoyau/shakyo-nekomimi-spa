import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RootPage from './pages/Root';
import WatchPage from './pages/Watch';
import NoMatchPage from './pages/NoMatch';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={RootPage} />
      <Route path="/watch/:id" component={WatchPage} />
      <Route component={NoMatchPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
