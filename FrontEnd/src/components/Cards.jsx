import Countdown from "react-countdown";
import { Form } from "react-router-dom";

function Cards({ products, transactions, show, handleExpired }) {
  const userId = localStorage.getItem("userId");

  return (
    <>
      {!products.length && (
        <h1 className="text-5xl text-center mt-64">No products to show !</h1>
      )}
      <div className="flex flex-wrap gap-14 justify-center">
        {products.map((product) => (
          <div key={product.id} className="border w-1/5 rounded-lg h-fit">
            <h1 className="py-2 text-center text-xl font-bold">
              {product.name}
            </h1>
            <img
              className="h-74 w-full"
              alt="product image"
              src={"http://localhost:8080/" + product.image}
            />
            {!transactions && (
              <section className="flex flex-col p-3 gap-4">
                <div className="flex justify-between">
                  <p>Price : {product.price}$</p>
                  {product.buyer_id == userId && (
                    <p className="text-green-400">&larr; Your bid</p>
                  )}
                  {!product.buyer_id && (
                    <p className="text-blue-400">No bidder yet!</p>
                  )}
                  {product.buyer_id &&
                    product.seller_id != userId &&
                    product.buyer_id != userId && (
                      <p className="text-red-400">Bid now !</p>
                    )}
                  {product.buyer_id && product.seller_id == userId && (
                    <p className="text-amber-400">Someone bade !</p>
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
            )}
            {transactions == "bought" && (
              <section className="flex flex-col p-3 gap-4">
                <p>Your bid : {product.price}$</p>
                <button
                  onClick={() => show(product.sellerId)}
                  className="text-left border p-2 rounded-md transition hover:scale-105 hover:-translate-y-1 cursor-pointer"
                >
                  <h1 className="text-lg text-center mb-3">Seller info</h1>
                  <p>Name : {product.sellerName}</p>
                  <p>Email : {product.sellerEmail}</p>
                </button>
              </section>
            )}
            {transactions == "sold" && (
              <section className="flex flex-col p-3 gap-4">
                <p>Price : {product.price}$</p>
                {product.buyerName ? (
                  <div>
                    <p>Buyer name : {product.buyerName}</p>
                    <p>Buyer email : {product.buyerEmail}</p>
                  </div>
                ) : (
                  <p className="text-center text-xl">No one bid on this</p>
                )}
              </section>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Cards;
