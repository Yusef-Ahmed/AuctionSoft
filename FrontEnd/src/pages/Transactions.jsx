import { useLoaderData, useParams } from "react-router-dom";
import Cards from "../components/Cards";
import { getToken } from "../util/authentication";
import Model from "../components/Model";
import { useState } from "react";

function Transactions() {
  const [visible, setVisible] = useState(0);
  const [position, setPosition] = useState("center");

  const products = useLoaderData();
  const params = useParams().mode;

  const show = (sellerId) => {
    setPosition("bottom");
    setVisible(sellerId);
  };

  return (
    <>
      <Model setVisible={setVisible} position={position} visible={visible} />
      <Cards show={show} transactions={params} products={products} />
    </>
  );
}

export async function transactionLoader({ params }) {
  const response = await fetch(
    "http://localhost:8080/products/" + params.mode,
    {
      headers: { Authorization: getToken() },
    }
  );

  const resData = await response.json();

  return resData;
}

export default Transactions;
