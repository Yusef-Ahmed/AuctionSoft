import { Form, Link, useSearchParams } from "react-router-dom";
import logo from "../../assets/Logo.png";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const signup = searchParams.get("mode") == "signup";

  return (
    <div className="flex flex-col items-center gap-8">
      <Link to={"/"}>
        <img
          className="w-28 mt-4 transition-all duration-300 hover:scale-125 hover:-translate-y-5"
          src={logo}
        />
      </Link>
      <Form className="flex flex-col gap-3">
        <h1 className="text-3xl mb-5">
          {signup ? "Sign up for free now!" : "Sign in to your account"}
        </h1>
        {signup && (
          <section className="flex flex-col gap-1">
            <label className="ml-0.5">User name</label>
            <input
              placeholder="Name"
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
          Login
        </button>
        <section className="flex justify-between text-sm">
          <p className="text-gray-400">Doesn't have an email ? </p>
          <Link to={"/auth/?mode=" + (signup ? "login" : "signup")} className="text-blue-400 hover:underline">
            Signup now !
          </Link>
        </section>
      </Form>
    </div>
  );
}

export default AuthForm;
