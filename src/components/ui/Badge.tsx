import { HTMLAttributes } from 'react';
import { cn } from '../../helpers/utils';

const Badge = ({ children, className }: HTMLAttributes<HTMLDivElement>) => <div className={cn('badge', className)}>{children}</div>;

export default Badge;
