import { Outlet } from "react-router-dom";
import Header from "./Header";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;