import { useState } from "react";
import Countdown from "react-countdown";
import { Form } from "react-router-dom";

function Cards({ products }) {
  const [items, setItems] = useState(products);

  function handleExpired(index) {
    setItems((prev) => prev.filter((_val, position) => index != position));
  }
  return (
    <>
      <div className="flex flex-wrap gap-14 justify-center">
        {items.map((product, index) => (
          <div key={index} className="border w-1/5 rounded-lg">
            <h2 className="py-2 text-center">{product.name}</h2>
            <img src={product.image} />
            <section className="flex flex-col p-3 gap-4">
              <p>Price : {product.price}$</p>
              <Countdown
                className="text-center"
                date={product.ex_date}
                onComplete={() => handleExpired(index)}
              />
              <Form method="POST" className="flex justify-between">
                <input hidden value={product.id} />
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
