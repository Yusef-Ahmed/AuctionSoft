import { Form, Link, NavLink, redirect, useLoaderData } from "react-router-dom";
import logo from "../../assets/Header.png";

function Header() {
  const isLoggedIn = useLoaderData("root");

  return (
    <header className="text-lg p-5 mb-5 pt-0 flex justify-between items-center border-b-2 border-gray-500 hover:border-gray-400 mx-auto font-semibold">
      <NavLink to={"/"}>
        <img
          className="transition-all duration-300 hover:scale-110 hover:-translate-y-2"
          src={logo}
        />
      </NavLink>
      <center className="flex gap-20 mr-56">
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
      </center>
      {isLoggedIn ? (
        <Form action={"/logOut"} method="post">
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
