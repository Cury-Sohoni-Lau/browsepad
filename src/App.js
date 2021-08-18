import { useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import NotesPage from "./views/NotesPage";
import { storeUserAndToken } from "./utils";
import { Context } from "./Store";

function App() {
  const [, dispatch] = useContext(Context);

  useEffect(() => {
    storeUserAndToken(dispatch);
  }, [dispatch]);

  const paths = {
    homePage: "/",
    loginPage: "/login",
    registerPage: "/register",
    notesPage: "/notes",
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
    {
      path: paths.notesPage,
      render: () => <NotesPage />,
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
