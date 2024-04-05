import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { Groups, Home, Students, Subjects, Teachers } from "./pages";
import store from "./store/store";

const router = createBrowserRouter([
  {
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
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
