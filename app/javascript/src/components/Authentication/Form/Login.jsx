import React from "react";

import { Link } from "react-router-dom";

import Button from "components/Button";
import Input from "components/Input";

const Login = ({ handleSubmit, setEmail, setPassword, loading }) => (
  <div
    className="bg-gray-50 flex min-h-screen items-center
      justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div className="w-full max-w-md">
      <h2
        className="mt-6 text-center text-3xl font-extrabold
          leading-9 text-bb-gray-700"
      >
        Sign In
      </h2>
      <div className="text-center">
        <Link
          to="/signup"
          className="transition focus:outline-none mt-2 text-sm
            font-medium text-bb-purple duration-150 ease-in-out
            focus:underline"
        >
          Or Register Now
        </Link>
      </div>
      <form className="mt-8" onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="oliver@example.com"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          placeholder="********"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button buttonText="Sign In" loading={loading} type="submit" />
      </form>
    </div>
  </div>
);

export default Login;
