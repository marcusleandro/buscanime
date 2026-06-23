import { lazy, createElement } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const AnimeListPage = lazy(() => import("@/pages/AnimeList"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "",
    element: createElement(Home),
    errorElement: createElement(NotFoundPage),
  },
  {
    path: "/animes",
    element: createElement(AnimeListPage),
    errorElement: createElement(NotFoundPage),
  },
]);

export default router;
