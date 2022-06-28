import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default App;
