import { createBrowserRouter } from "react-router-dom";
import HeaderLayout from "../components/Layout/HeaderLayout";
import { LoginForm } from "../pages/Login";
import MainPage from "../pages/Main";
import PageNotFound from "../pages/PageNotFound/PageNotFound";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <HeaderLayout />,
    children: [{ path: "home", element: <MainPage /> }],
  },
  { path: "*", element: <PageNotFound/> },
]);

export default router;