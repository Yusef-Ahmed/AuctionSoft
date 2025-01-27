import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Products, { newBidder, productsLoader } from "./pages/Products";
import { handleLogOut, logInCheck } from "./util/authentication";
import Auth, { authAction } from "./pages/Auth";
import Transactions, { transactionLoader } from "./pages/Transactions";
import CreateProduct, { createAction } from "./pages/CreateProduct";

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
        {
          path: "/auctions",
          element: <Products />,
          loader: productsLoader,
          action: newBidder,
          shouldRevalidate: ({ formMethod }) => formMethod === "POST",
        },
        {
          path: "/createProduct",
          element: <CreateProduct />,
          action: createAction,
        },
        {
          path: "/transaction/:mode",
          element: <Transactions />,
          loader: transactionLoader,
        },
        { path: "/auth", element: <Auth />, action: authAction },
        { path: "/logOut", action: handleLogOut },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
