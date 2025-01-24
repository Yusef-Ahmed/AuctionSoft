import { NavLink } from "react-router-dom";
import logo from "../../assets/Header.png";

function Header() {
  return (
    <header className="p-5 mb-5 pt-0 flex justify-between items-center border-b-2 mx-auto font-semibold">
      <NavLink to={"/"}>
        <img src={logo} />
      </NavLink>
      <center className="flex gap-20 mr-56">
        <NavLink to={"/auctions"}>Auctions</NavLink>
        <NavLink to={"/sold"}>Sold</NavLink>
        <NavLink to={"/bought"}>Bought</NavLink>
      </center>
      <NavLink to={"/auth"}>Login</NavLink>
    </header>
  );
}

export default Header;
