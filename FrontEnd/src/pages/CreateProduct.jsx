import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { getToken, logOut } from "../util/authentication";
import Notification from "../components/Notification";

function CreateProduct() {
  const [image, setImage] = useState(null);
  const data = useActionData() || {};


  function handleImage(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
    <Notification status={data.status} message={data.message} />
    <Form
      encType="multipart/form-data"
      className="flex flex-col gap-3 w-1/4 mx-auto mt-20"
      method="POST"
    >
      <h1 className="text-3xl mb-5 text-center">Create Product</h1>
      <section className="flex flex-col gap-1">
        <label className="ml-0.5">Name</label>
        <input
          placeholder="Product name"
          className="transition border p-2 rounded-md focus:-translate-y-1"
          name="name"
          autoComplete="off"
        />
      </section>
      <section className="flex flex-col gap-1">
        <label className="ml-0.5">Price</label>
        <input
          placeholder="Product price"
          className="transition border p-2 rounded-md focus:-translate-y-1"
          name="price"
          type="number"
          step="0.01"
        />
      </section>
      {image && <img className="h-60 rounded-md w-60 m-auto" src={image} />}
      <section className="flex flex-col gap-1">
        <label className="ml-0.5">Product image</label>
        <input
          className="p-1 border rounded file:p-1 file:rounded file:bg-gray-200 file:text-gray-900"
          name="image"
          type="file"
          alt="image"
          onChange={handleImage}
        ></input>
      </section>
      <section className="flex flex-col gap-1">
        <label className="ml-0.5">Expire date</label>
        <input
          className="transition border p-2 rounded-md focus:-translate-y-1 [&::-webkit-calendar-picker-indicator]:invert"
          name="ex_date"
          type="datetime-local"
          min={(() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const day = String(now.getDate()).padStart(2, "0");
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            return `${year}-${month}-${day}T${hours}:${minutes}`;
          })()}
        />
      </section>
      <button className="transition rounded-md bg-indigo-600 py-1.5 hover:cursor-pointer hover:bg-indigo-500 hover:-translate-y-1">
        Create
      </button>
    </Form>
    </>
  );
}

export async function createAction({ request }) {
  const data = await request.formData();

  const response = await fetch("http://localhost:8080/products/createProduct", {
    method: "POST",
    headers: { Authorization: getToken() },
    body: data,
  });

  const resData = await response.json();

  if (response.status == 401) {
    logOut();
    return redirect("/auth");
  }

  if (!response.ok) {
    return { message: resData.message, status: response.status };
  }

  return redirect("/auctions");
}

export default CreateProduct;
