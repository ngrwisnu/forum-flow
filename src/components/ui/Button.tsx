import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../helpers/utils';

const Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={cn('btn', className)} {...props}>
      {children}
    </button>
);

export default Button;
