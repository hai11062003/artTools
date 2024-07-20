import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import Layout from "./components/layout/Layout";
import ArtTools from "./pages/arttools/ArtTools";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/arttools",
          element: <ArtTools />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/detail/:id",
          element: <Detail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
