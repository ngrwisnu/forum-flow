import { useState } from "react";
import Button from "../ui/Button";
import { FormItem } from "../ui/Form";
import Input from "../ui/Input";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col gap-2">
      <FormItem>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          value={email}
          placeholder="example@email.com"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormItem>
      <FormItem>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormItem>
      <Button
        type="button"
        onClick={() => onSubmit(email, password)}
        className="btn-primary mt-4 w-full"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
