import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SchemeExplorer from "./pages/SchemeExplorer";
import ApplicationTracker from "./pages/ApplicationTracker";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "schemes", Component: SchemeExplorer },
      { path: "tracker", Component: ApplicationTracker },
    ],
  },
]);
