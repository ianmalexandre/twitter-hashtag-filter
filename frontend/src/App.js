  
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SignIn from "./pages/signin";
import FirstPage from "./pages/map";
import MapTesting from "./pages/testLeaflet";

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/search" component={FirstPage} />
          <Route path="/test" component={MapTesting} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;