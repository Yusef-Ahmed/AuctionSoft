import { redirect } from "react-router-dom";

function expiredToken() {
  const storedExpiration = localStorage.getItem("expiration");
  const expiration = new Date(storedExpiration);
  const current = new Date();

  return expiration - current <= 0;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logInCheck() {
  const token = getToken();
  if (!token || expiredToken()) {
    logOut();
  }
  return token;
}

export function checkAuthLoader() {
  const token = getToken();

  if (!token || expiredToken()) {
    logOut();
    return redirect("/auth");
  }

  return null;
}

export function alreadyLogged() {
  if (getToken()) return redirect("/");

  return null;
}

export function handleLogOut() {
  logOut();
  return redirect("/");
}

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
}
