import { redirect, useLoaderData } from "react-router-dom";
import { getToken, logOut } from "../util/authentication";
import Cards from "../components/Cards";

function Products() {
  const products = useLoaderData();

  return <Cards products={products} />
}

export async function productsLoader() {
  const response = await fetch("http://localhost:8080/products/all", {
    headers: { Authorization: getToken() },
  });

  const resData = await response.json();

  if (!response.ok) {
    if (response.status == 401) {
      logOut();
      return redirect("/auth");
    }
    return resData.message;
  }

  return resData;
}

export default Products;
