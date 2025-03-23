import { HTMLAttributes } from "react";
import { cn } from "../../helpers/utils";

export const CardHeader = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

export const CardContent = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

export const CardFooter = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("w-full", className)}>{children}</div>;
};

const Card = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("card bg-base-100 shadow-sm", className)}>
      {children}
    </div>
  );
};

export default Card;
