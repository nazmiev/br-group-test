import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import News, {
  loader as newsLoader,
  action as newsAction,
} from "./routes/news";

const baseName = import.meta.env.BASE_URL;

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
    },
    {
      path: "news/:newsId",
      element: <News />,
      loader: newsLoader,
      action: newsAction,

    },
  ],
  { basename: baseName }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)
