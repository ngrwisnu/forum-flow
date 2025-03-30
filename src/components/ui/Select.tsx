import { SelectHTMLAttributes } from 'react';
import { cn } from '../../helpers/utils';

const Select = ({
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
      className={cn(
        'select field-sizing-content focus:border-slate-300 focus:outline-slate-300',
        className,
      )}
      {...props}
    >
      {children}
    </select>
);

export default Select;
