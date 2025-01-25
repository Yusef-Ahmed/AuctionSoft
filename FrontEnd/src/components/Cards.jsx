import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Form } from "react-router-dom";

function Cards({ products, newBidder }) {
  const [items, setItems] = useState(products);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (newBidder.id) {
      setItems((prev) =>
        prev.map((product) => {
          if (product.id == newBidder.id)
            return {
              ...product,
              price: newBidder.price,
              buyer_id: localStorage.getItem("userId"),
            };
          return product;
        })
      );
    }
  }, [newBidder.id]);

  function handleExpired(id) {
    setItems((prev) => prev.filter((val) => val.id != id));
  }

  return (
    <>
      <div className="flex flex-wrap gap-14 justify-center">
        {items.map((product) => (
          <div key={product.id} className="border w-1/5 rounded-lg">
            <h2 className="py-2 text-center">{product.name}</h2>
            <img src={product.image} />
            <section className="flex flex-col p-3 gap-4">
              <div className="flex justify-between">
                <p>Price : {product.price}$</p>
                {product.buyer_id == userId && (
                  <p className="text-green-400">&larr; Your bid</p>
                )}
                {!product.buyer_id && (
                  <p className="text-blue-400">No bidder yet!</p>
                )}
                {product.buyer_id && product.buyer_id != userId && (
                  <p className="text-red-400">Bid now !</p>
                )}
                {product.buyer_id && product.seller_id == userId && (
                  <p className="text-amber-400">Your product</p>
                )}
              </div>
              <Countdown
                className="text-center"
                date={product.ex_date}
                onComplete={() => handleExpired(product.id)}
              />
              <Form method="PUT" className="flex justify-between">
                <input hidden readOnly name="productId" value={product.id} />
                <input
                  className="transition focus:-translate-y-1 border rounded-sm p-1 pl-4 w-1/2 text-center"
                  placeholder="Your bid"
                  type="number"
                  name="newPrice"
                />
                <button className="transition border rounded-sm hover:cursor-pointer hover:bg-green-500 hover:text-gray-950 hover:-translate-y-1 w-1/3">
                  Bid
                </button>
              </Form>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
