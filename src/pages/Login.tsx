import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserLogin } from "../store/auth/action";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const { auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  const loginHandler = (email: string, password: string) => {
    dispatch(asyncUserLogin({ email, password }));
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
      <div className="w-full rounded-2xl bg-white p-4 drop-shadow-xl md:max-w-[480px]">
        <h1 className="mb-6 text-center text-4xl font-bold">Login</h1>
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
