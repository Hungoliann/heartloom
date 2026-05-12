import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "./pages/home";
import Concierge from "./pages/Concierge";
import Letters from "./pages/Letters";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/concierge" component={Concierge} />
      <Route path="/letters" component={Letters} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
