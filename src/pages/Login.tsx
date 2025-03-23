import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center border border-red-400 px-4 lg:px-0">
      <div className="w-full rounded-2xl bg-white p-4 drop-shadow-2xl lg:max-w-[250px]">
        <h1 className="mb-6 text-4xl font-bold">Login</h1>
        <form className="flex flex-col gap-2">
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" placeholder="example@email.com" type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              placeholder="example@email.com"
              type="password"
            />
          </div>
          <Button className="btn-primary mt-4 w-full">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
