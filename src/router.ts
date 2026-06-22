import { createElement, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "",
    element: createElement(Home),
    errorElement: createElement(NotFoundPage),
  },
]);

export default router;
