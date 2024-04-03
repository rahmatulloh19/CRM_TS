import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <h1>Home</h1>,
        path: "/",
        index: true,
      },
      {
        element: <h1>students</h1>,
        path: "/students",
      },
      {
        element: <h1>groups</h1>,
        path: "/groups",
      },
      {
        element: <h1>teachers</h1>,
        path: "/teachers",
      },
      {
        element: <h1>subjects</h1>,
        path: "/subjects",
      },
    ],
  },
]);

export default router;
