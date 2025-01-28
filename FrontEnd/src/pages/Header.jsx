import { Form, Link, NavLink, redirect, useLoaderData } from "react-router-dom";
import logo from "../../assets/Header.png";

function Header() {
  const isLoggedIn = useLoaderData("root");
  const userName = localStorage.getItem("userName");

  return (
    <header className="text-lg p-5 mb-5 pt-0 flex justify-between items-center border-b-2 border-gray-500 hover:border-gray-400 mx-auto font-bold">
      <NavLink to={"/"}>
        <img
          className="transition-all duration-300 hover:scale-110 hover:-translate-y-2"
          src={logo}
        />
      </NavLink>
      <center className="flex gap-20 mx-auto">
        <NavLink
          className={({ isActive }) =>
            (isActive ? "border-b-2 " : "") +
            "will-change-transform transition-all duration-300 hover:scale-125 hover:-translate-y-2"
          }
          to={"/auctions"}
        >
          Auctions
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "border-b-2 " : "") +
            "will-change-transform transition-all duration-300 hover:scale-125 hover:-translate-y-2"
          }
          to={"/transaction/sold"}
        >
          Sold
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "border-b-2 " : "") +
            "will-change-transform transition-all duration-300 hover:scale-125 hover:-translate-y-2"
          }
          to={"/transaction/bought"}
        >
          Bought
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "border-b-2 " : "") +
            "will-change-transform transition-all duration-300 hover:scale-125 hover:-translate-y-2"
          }
          to={"/createProduct"}
        >
          New product
        </NavLink>
      </center>
      {isLoggedIn ? (
        <Form action={"/logOut"} method="POST" className="flex">
          <p className="border-r-2 pr-5 mr-5 border-dashed cursor-default">Welcome {userName}</p>
          <button className="will-change-transform transition-all duration-300 hover:scale-125 hover:-translate-y-2 cursor-pointer">
            Logout
          </button>
        </Form>
      ) : (
        <Link to={"/auth"}>Login</Link>
      )}
    </header>
  );
}

export default Header;
