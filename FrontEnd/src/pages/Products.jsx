import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getToken, logOut } from "../util/authentication";
import Cards from "../components/Cards";
import Notification from "../components/Notification";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

function Products() {
  const [items, setItems] = useState([]);
  const products = useLoaderData();
  const data = useActionData() || {};

  function handleExpired(id) {
    setItems((prev) => prev.filter((val) => val.id != id));
  }

  useEffect(() => {
    setItems(products);
    socket.on("products", (bidder) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id == bidder.productId) {
            item = {
              ...item,
              price: bidder.newPrice,
              buyer_id: bidder.buyerId,
            };
          }
          return item;
        })
      );
    });
    return () => {
      socket.off("products");
    };
  }, [products]);

  return (
    <>
      <Notification status={data.status} message={data.message} />
      <Cards products={items} handleExpired={handleExpired} />
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

  if (!response.ok) {
    return { message: resData.message, status: response.status };
  }

  return {
    message: resData.message,
    status: response.status,
    id: data.productId,
    price: data.newPrice,
  };
}

export default Products;
