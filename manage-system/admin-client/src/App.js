import React from 'react';
import { HashRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path='/login' component={Login} />
              <Route path='/' component={Admin} />
          </Switch>
      </HashRouter>
  );
}

export default App;
