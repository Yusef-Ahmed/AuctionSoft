import { Dialog } from "primereact/dialog";
import { getToken, logOut } from "../util/authentication";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import { redirect } from "react-router-dom";

function Model({ setVisible, position, visible }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (visible != 0) {
      reviewsLoader(visible).then((response) => {
        setReviews(response);
      });
    }
  }, [visible]);

  let productRatings = 0;
  const rates = [0, 0, 0, 0, 0];

  if (reviews) {
    reviews.map((review) => {
      console.log(review);
      productRatings += review.rating;
      rates[review.rating - 1]++;
    });
    productRatings = (productRatings / reviews.length).toFixed(1);
  }

  return (
    <Dialog
      className="border p-4 rounded-lg h-full"
      header={
        <h1 className="text-4xl text-center border-b border-b-gray-400 pb-5 mb-5">
          Reviews section
        </h1>
      }
      visible={visible != 0}
      position={position}
      style={{ width: "80%", backgroundColor: "#1A1A1D" }}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      dismissableMask
      draggable={false}
      resizable={false}
      modal={true}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <Reviews
        setReviews={setReviews}
        sellerId={visible}
        reviews={reviews}
        productRatings={productRatings}
        rates={rates}
      />
    </Dialog>
  );
}

async function reviewsLoader(id) {
  const response = await fetch("http://localhost:8080/reviews/" + id, {
    headers: { authorization: getToken() },
  });

  if (response.status == 401) {
    logOut();
    return redirect("/auth");
  }

  const resData = await response.json();

  return resData;
}

export default Model;
