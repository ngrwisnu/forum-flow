import { useState } from 'react';
import Button from '../ui/Button';
import { FormItem } from '../ui/Form';
import Input from '../ui/Input';
import { SignupRequest } from '../../types/auth';

interface SignUpFormProps {
  onSubmit: ({ name, email, password }: SignupRequest) => void;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="flex flex-col gap-2">
      <FormItem>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          placeholder="John Doe"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormItem>
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
        onClick={() =>
          onSubmit({
            name,
            email,
            password,
          })
        }
        className="btn-primary mt-4 w-full"
      >
        Create account
      </Button>
    </form>
  );
};

export default SignUpForm;
