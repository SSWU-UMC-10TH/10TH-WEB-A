import "./App.css";
import MoviePage from "./pages/MoviePage";
import { HomePage } from "./pages/HomePage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [{
      path: "movies/:category",
      element: <MoviePage />,
    },
    {
      path: "movie/:movieId",
      element: <MovieDetailPage />,
    }
  ],
  }
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;