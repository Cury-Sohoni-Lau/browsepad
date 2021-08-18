import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./components/LoginForm";
import RegisterPage from "./components/RegisterForm";
import "./App.css";

function App() {
  const paths = {
    homePage: "/",
    loginPage: "/login",
    registerPage: "/register",
  };
  const routes = [
    {
      path: paths.homePage,
      exact: true,
      render: () => <HomePage />,
    },
    {
      path: paths.loginPage,
      render: () => <LoginPage />,
    },
    {
      path: paths.registerPage,
      render: () => <RegisterPage />,
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((r) => (
          <Route
            path={r.path}
            exact={Boolean(r.exact)}
            render={r.render}
            key={r.path}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
