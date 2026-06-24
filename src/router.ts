import { lazy, createElement } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const AnimeListPage = lazy(() => import("@/pages/AnimeList"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: createElement(Home),
    errorElement: createElement(NotFoundPage), // Faz sentido ter um error element aqui com a pagina de not found?
  },
  {
    path: "/animes",
    element: createElement(AnimeListPage),
  },
  // {
  //   path: "/animes",
  //   element: createElement(Navigate, { to: "/", replace: true }),
  // },
  // {
  //   path: "/animes/:id",
  //   element: createElement(AnimeDetailPage),
  // },
  // {
  //   path: "/animes/:id/episodes",
  //   element: createElement(AnimeEpisodesPage),
  // },
  // {
  //   path: "/animes/:id/reviews",
  //   element: createElement(AnimeReviewsPage),
  // },
  {
    path: "*",
    element: createElement(NotFoundPage),
  },
]);

export default router;
