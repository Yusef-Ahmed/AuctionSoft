import { Form, Link, useActionData, useSearchParams } from "react-router-dom";
import logo from "../../assets/Logo.png";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const signUp = searchParams.get("mode") == "signUp";
  const error = useActionData();

  return (
    <div className="flex flex-col items-center gap-8">
      <Link to={"/"}>
        <img
          className="w-28 mt-4 transition-all duration-300 hover:scale-125 hover:-translate-y-5"
          src={logo}
        />
      </Link>
      {error && (
        <div
          className="p-4 mb-4 border-1 rounded-lg bg-gray-800 text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}
      <Form className="flex flex-col gap-3" method="POST">
        <h1 className="text-3xl mb-5">
          {signUp ? "Sign up for free now!" : "Sign in to your account"}
        </h1>
        {signUp && (
          <section className="flex flex-col gap-1">
            <label className="ml-0.5">User name</label>
            <input
              placeholder="Name"
              autoComplete="off"
              className="transition border p-2 rounded-md focus:-translate-y-1"
              name="name"
            />
          </section>
        )}
        <section className="flex flex-col gap-1">
          <label className="ml-0.5">Email address</label>
          <input
            placeholder="Email"
            className="transition border p-2 rounded-md focus:-translate-y-1"
            name="email"
            type="email"
          />
        </section>
        <section className="flex flex-col gap-1">
          <label className="ml-0.5">Password</label>
          <input
            placeholder="Password"
            className="transition border p-2 rounded-md focus:-translate-y-1"
            name="password"
            type="password"
          />
        </section>
        <button className="transition rounded-md bg-indigo-600 py-1.5 hover:cursor-pointer hover:bg-indigo-500 hover:-translate-y-1">
          {signUp ? "Signup" : "Login"}
        </button>
        <section className="flex justify-between text-sm">
          <p className="text-gray-400">
            {signUp ? "Already have an email ?" : "Doesn't have an email ?"}{" "}
          </p>
          <Link
            to={"/auth/?mode=" + (signUp ? "logIn" : "signUp")}
            className="text-blue-400 hover:underline"
          >
            {signUp ? "Login now" : "Signup now"}
          </Link>
        </section>
      </Form>
    </div>
  );
}

export default AuthForm;
