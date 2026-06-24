import { lazy, createElement } from "react";
import { createBrowserRouter, data, Outlet } from "react-router-dom";
import { RootErrorBoundary } from "@/components/common";
import { isValidAnimeIdParam } from "@/utils/animeId";

const Home = lazy(() => import("@/pages/Home"));
const AnimeList = lazy(() => import("@/pages/AnimeList"));
const AnimeDetail = lazy(() => import("@/pages/AnimeDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const router = createBrowserRouter([
  {
    element: createElement(Outlet),
    errorElement: createElement(RootErrorBoundary),
    children: [
      {
        index: true,
        element: createElement(Home),
      },
      {
        path: "animes",
        element: createElement(AnimeList),
      },
      {
        path: "animes/:id",
        loader: ({ params }) => {
          if (!isValidAnimeIdParam(params.id)) {
            throw data(null, { status: 404 });
          }
          return null;
        },
        element: createElement(AnimeDetail),
      },
      // TODO: Add episodes and reviews pages
      // {
      //   path: "animes/:id/episodes",
      //   loader: ({ params }) => {
      //     if (!isValidAnimeIdParam(params.id)) {
      //       throw data(null, { status: 404 });
      //     }
      //     return null;
      //   },
      //   element: createElement(AnimeEpisodesPage),
      // },
      {
        path: "*",
        element: createElement(NotFound),
      },
    ],
  },
]);

export default router;
