import { HTMLAttributes } from "react";

export const FormItem = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};
