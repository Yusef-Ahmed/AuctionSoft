import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { checkAuthLoader, handleLogOut, logInCheck } from "./util/authentication";
import Auth, { authAction } from "./pages/Auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootLayout />,
      errorElement: <NotFound />,
      loader: logInCheck,
      children: [
        { index: true, element: <Home /> },
        { path: "/auctions", element: <Products />, loader: checkAuthLoader },
        { path: "/auth", element: <Auth />, action: authAction },
        {path : "/logOut", action: handleLogOut}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
