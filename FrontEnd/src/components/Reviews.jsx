import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";
import { getToken, logOut } from "../util/authentication";
import { redirect, useActionData } from "react-router-dom";
import Notification from "./Notification";

function Reviews({ reviews, productRatings, rates, sellerId, setReviews }) {
  const reviewRef = useRef(null);
  const review = useRef();
  const stars = useRef(0);
  const [message, setMessage] = useState({});

  function handleReview() {
    if (!review.current.value) {
      setMessage({ message: "Please type a review", status: 500 });
      return;
    }
    if (!stars.current) {
      setMessage({ message: "Please select rating out of 5", status: 500 });
      return;
    }

    sendReview(review.current.value, stars.current, sellerId).then(
      (response) => {
        setMessage(response);
        setReviews((prev) => [
          {
            review: review.current.value,
            rating: stars.current,
            reviewerName: localStorage.getItem("userName"),
          },
          ...prev,
        ]);
      }
    );
  }

  return (
    <section className="px-8 antialiased">
      <Notification status={message.status} message={message.message} />
      <div className="px-4 2xl:px-0">
        <div className="flex justify-between">
          <section className="w-1/2">
            <div className="flex items-center gap-2 mt-2">
              <p className="text-2xl font-semibold leading-none text-center mr-5">
                {productRatings} out of 5
              </p>
              <div className="flex gap-5">
                <div className="flex items-center">
                  <div className="flex flex-col text-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={
                            Math.floor(productRatings) > rating
                              ? "text-slate-200 h-6 w-6 flex-shrink-0"
                              : "text-gray-600 h-6 w-6 flex-shrink-0"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    reviewRef.current.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="text-sm mt-1 font-medium leading-none text-slate-400 hover:underline cursor-pointer"
                >
                  {reviews.length} Reviews
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-6 mt-2 gap-4 sm:flex sm:items-start w-fit">
              <div className="mt-6 min-w-0 flex-1 space-y-3 w-full">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div className="flex items-center gap-2" key={rating}>
                    <p className="w-2 shrink-0 text-start text-sm font-medium leading-none">
                      {rating}
                    </p>
                    <svg
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <div className="h-1.5 w-80 rounded-full bg-slate-600">
                      <div
                        className="h-1.5 rounded-full bg-slate-200"
                        style={{
                          width:
                            Math.round(
                              (rates[rating - 1] / reviews.length) * 320
                            ) || 0,
                        }}
                      ></div>
                    </div>
                    <button
                      onClick={() =>
                        reviewRef.current.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                      className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline text-primary-500 sm:w-auto sm:text-left"
                    >
                      {rates[rating - 1]}{" "}
                      <span className="hidden sm:inline">reviews</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="flex flex-col w-1/2 gap-5">
            <h1 className="text-2xl font-semibold leading-none text-center mb-4">
              Add a Review
            </h1>
            <div className="flex gap-5">
              <p className="ml-1 text-xl">Give a rate</p>
              <Rating
                name="size-large"
                size="large"
                onChange={(_, value) => (stars.current = value)}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#e2e8f0",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#4a5565",
                  },
                }}
              />
            </div>
            <textarea
              placeholder="Describe your review"
              ref={review}
              className="transition focus:-translate-y-1 border w-full p-2 rounded-sm text-center"
            />
            <button
              onClick={handleReview}
              className="rounded-md bg-indigo-600 cursor-pointer p-2 transition hover:bg-indigo-500 hover:scale-105"
            >
              Send review
            </button>
          </section>
        </div>

        {!reviews.length && (
          <h1 className="flex justify-center text-5xl my-48">
            No reviews provided
          </h1>
        )}

        {/* Reviews */}
        <div ref={reviewRef} className="mt-6 divide-y divide-slate-400">
          {reviews.map((review, index) => (
            <div key={index} className="gap-3 py-6 sm:flex sm:items-start">
              <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                <p className="ml-1">{review.reviewerName}</p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={
                        Math.floor(review.rating) > rating
                          ? "text-slate-200 h-6 w-6 flex-shrink-0"
                          : "text-gray-600 h-6 w-6 flex-shrink-0"
                      }
                    />
                  ))}
                </div>
                {/* <div className="inline-flex items-center gap-1">
                  <svg
                    className="h-5 w-5 text-primary-700 text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium text-slate-300">
                    Verified purchase
                  </p>
                </div> */}
              </div>

              <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                <p className="text-lg font-medium text-slate-300 hover:text-slate-200">
                  {review.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function sendReview(review, rate, sellerId) {
  const response = await fetch("http://localhost:8080/reviews/" + sellerId, {
    method: "POST",
    headers: {
      authorization: getToken(),
      "Content-type": "application/json",
    },
    body: JSON.stringify({ review: review, rating: rate }),
  });

  if (response.status == 401) {
    logOut();
    return redirect("/auth");
  }

  const resData = await response.json();
  resData.status = response.status;

  return resData;
}

export default Reviews;
