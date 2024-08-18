import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import Home from "./pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "event-details",
      element: <EventDetails />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
