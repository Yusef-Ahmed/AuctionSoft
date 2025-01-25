import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getToken, logOut } from "../util/authentication";
import Cards from "../components/Cards";
import Notification from "../components/Notification";

function Products() {
  let products = useLoaderData();
  const message = useActionData() || {};

  return (
    <>
      <Notification
        error={message.error}
        status={message.status == 200 ? "success" : "error"}
      />
      <Cards newBidder={message} products={products} />
    </>
  );
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

export async function newBidder({ request }) {
  const req = await request.formData();
  const data = {
    productId: req.get("productId"),
    newPrice: req.get("newPrice"),
  };

  const response = await fetch("http://localhost:8080/products/newbidder", {
    method: "PUT",
    headers: { Authorization: getToken(), "Content-type": "application/json" },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (response.status == 401) {
    logOut();
    return redirect("/auth");
  }

  let res = { error: resData.message, status: response.status };

  if (response.ok) {
    res.id = data.productId;
    res.price = data.newPrice;
  }
  console.log(res);

  return res;
}

export default Products;
