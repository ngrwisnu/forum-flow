import { InputHTMLAttributes } from 'react';
import { cn } from '../../helpers/utils';

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      'input block w-full focus:border-none focus:outline-slate-300',
      className,
    )}
    {...props}
  />
);

export default Input;
