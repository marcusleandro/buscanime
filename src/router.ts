import { lazy, createElement } from "react";
import {
  createBrowserRouter,
  data,
  Outlet,
  type LoaderFunctionArgs,
} from "react-router-dom";
import { RootErrorBoundary } from "@/components/common";
import { NotFound } from "@/pages/NotFound";
import { isValidAnimeIdParam } from "@/utils/animeId";

const Home = lazy(() => import("@/pages/Home"));
const AnimeList = lazy(() => import("@/pages/AnimeList"));
const AnimeDetail = lazy(() => import("@/pages/AnimeDetail"));
const AnimeReviews = lazy(() => import("@/pages/AnimeReviews"));

const validateAnimeIdLoader = ({ params }: LoaderFunctionArgs) => {
  if (!isValidAnimeIdParam(params.id)) {
    throw data(null, { status: 404 });
  }
  return null;
};

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
        loader: validateAnimeIdLoader,
        element: createElement(AnimeDetail),
      },
      {
        path: "animes/:id/reviews",
        loader: validateAnimeIdLoader,
        element: createElement(AnimeReviews),
      },
      {
        path: "*",
        element: createElement(NotFound),
      },
    ],
  },
]);

export default router;
