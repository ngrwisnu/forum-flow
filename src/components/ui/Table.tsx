import { HTMLAttributes, TableHTMLAttributes } from "react";
import { cn } from "../../helpers/utils";

export const TableRow = ({
  children,
  className,
}: HTMLAttributes<HTMLTableRowElement>) => {
  return <tr className={cn(className)}>{children}</tr>;
};

const Table = ({
  children,
  className,
}: TableHTMLAttributes<HTMLTableElement>) => {
  return <table className={cn("table", className)}>{children}</table>;
};

export default Table;
