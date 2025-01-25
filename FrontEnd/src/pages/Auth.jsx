import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function Auth() {
  return <AuthForm />;
}

export async function authAction({ request }) {
  const req = await request.formData();
  const data = {
    name: req.get("name"),
    email: req.get("email"),
    password: req.get("password"),
  };

  const mode = new URL(request.url).searchParams.get("mode") || "logIn";

  const response = await fetch("http://localhost:8080/auth/" + mode, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  if (!response.ok) {
    return resData.message;
  }

  const expiration = new Date();
  console.log(expiration.getHours());
  expiration.setHours(expiration.getHours() + 24);
  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem("token", resData.token);

  return redirect("/auctions");
}

export default Auth;
