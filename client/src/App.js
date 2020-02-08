import React from 'react';
import {HashRouter} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import {useRoutes} from "./hooks/routes";
function App() {

    const routes = useRoutes(false);

  return (
      <HashRouter>
          <div className="container">
              {routes}
          </div>
      </HashRouter>
  );
}

export default App;
