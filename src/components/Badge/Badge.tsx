import classNames from "classnames";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  status: string;
}
export const Badge = ({ children, status }: BadgeProps) => {
  return (
    <p
      className={classNames(
        `font-[500] disabled:cursor-not-allowed capitalize text-[14px]`,
        {
          "text-[#0EA163]": status === "successful",
        }
      )}
    >
      {children}
    </p>
  );
};
