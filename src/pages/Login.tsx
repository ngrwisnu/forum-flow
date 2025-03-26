import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  const loginHandler = (email: string, password: string) => {
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
      <div className="w-full rounded-2xl bg-white p-4 drop-shadow-xl md:max-w-[480px]">
        <h1 className="mb-6 text-4xl font-bold">Login</h1>
        <LoginForm onSubmit={loginHandler} />
        <div className="mt-6 text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
