import { ReactNode } from "react";
import classnames from "classnames";
import CircleLoader from "react-spinners/ClipLoader";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  variant?: string;
  disabled?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  variant = "primary",
  disabled,
  isFullWidth = false,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  return (
    <button
      className={classnames(
        `  rounded-[100px] block font-[600] border py-3 px-4 text-sm items-center shadow-sm
       
          disabled:cursor-not-allowed`,
        {
          "bg-primary text-white disabled:opacity-50": variant === "primary",
          "bg-[#e7d1e1] text-primary border-indigo border-2":
            variant === "secondary",
          "bg-red-600 text-white hover:bg-red-500": variant === "danger",
          "bg-green-600 text-white hover:bg-green-500": variant === "success",
          "bg-[#EFF1F6] hover:bg-gray-50 !border-0 !px-4 font-semibold":
            variant === "outline",
          " hover:bg-gray-50 !border !px-4 font-semibold":
            variant === "outline2",
          "bg-gray-700 text-white": variant === "black",
          "bg-transparent !border-0 !shadow-none": variant === "transparent",
          "w-full": isFullWidth,
        }
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {disabled ? (
        <CircleLoader size={25} color={"#000"} />
      ) : (
        <span className="flex items-center justify-center gap-3">
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </span>
      )}
    </button>
  );
};
