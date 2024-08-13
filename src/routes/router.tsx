import {
  Home,
  Accounts,
  LoansAndDebts,
  Login,
  MyProfile,
  Reporting,
  Transactions,
  SignUp,
} from "../views";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { useAppContext } from "../store/appContext/app-context";

export const AppRouter = () => {
  const { user } = useAppContext();
  const isLoggedIn = Boolean(user);

  const routes: RouteObject[] = [
    {
      path: "/",
      element: isLoggedIn ? <PrivateRouter /> : <Navigate to={ROUTES.AUTH} />,
      children: [
        { path: ROUTES.HOME, element: <Home /> },
        { path: ROUTES.ACCOUNTS, element: <Accounts /> },
        { path: ROUTES.LOANS_AND_DEBT, element: <LoansAndDebts /> },
        { path: ROUTES.REPORTING, element: <Reporting /> },
        { path: ROUTES.TRANSACTIONS, element: <Transactions /> },
        { path: ROUTES.MY_PROFILE, element: <MyProfile /> },
      ],
    },
    {
      path: ROUTES.HOME,
      element: !isLoggedIn ? <PublicRouter /> : <Navigate to={ROUTES.HOME} />,
      children: [
        { path: "/auth", element: <Login /> },
        { path: "/sign-up", element: <SignUp /> },
      ],
    },
  ];

  return createBrowserRouter(routes);
};
