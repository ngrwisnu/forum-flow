import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Signup = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 lg:px-0">
      <div className="w-full rounded-2xl bg-white p-4 drop-shadow-xl md:max-w-[480px]">
        <h1 className="mb-6 text-4xl font-bold">Create Account</h1>
        <form className="flex flex-col gap-2">
          <div>
            <label htmlFor="name">Name</label>
            <Input id="name" placeholder="John Doe" type="text" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" placeholder="example@email.com" type="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" />
          </div>
          <Button className="btn-primary mt-4 w-full">Create an account</Button>
        </form>
        <div className="mt-6 text-slate-500">
          Have an account?{" "}
          <Link to="/login" className="text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
