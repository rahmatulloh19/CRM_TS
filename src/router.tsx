import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Groups, Home, Students, Subjects, Teachers } from "./pages";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Home />,
        path: "/",
        index: true,
      },
      {
        element: <Students />,
        path: "/students/*",
      },
      {
        element: <Groups />,
        path: "/groups/*",
      },
      {
        element: <Teachers />,
        path: "/teachers/*",
      },
      {
        element: <Subjects />,
        path: "/subjects/*",
      },
    ],
  },
]);

export default router;
