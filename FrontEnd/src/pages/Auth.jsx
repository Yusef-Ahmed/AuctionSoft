import { useLoaderData } from "react-router-dom";

function Auth() {
  const isLogged = useLoaderData();
  
  return <h1>{isLogged ? "logout" : "login"}</h1>;
}

export default Auth;
