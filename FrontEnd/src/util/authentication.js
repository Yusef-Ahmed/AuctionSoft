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

export function checkAuthLoader() {
  const token = getToken()
  
  if (!token || expiredToken()) {
    logOut();
    return redirect("/auth");
  }
  
  return null;
}

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}