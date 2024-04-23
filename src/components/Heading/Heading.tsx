import { ReactNode } from "react";
interface HeadingProps {
  children: ReactNode;
  size?: string;
}
export const Heading = ({ children, size = "30" }: HeadingProps) => {
  return (
    <h1
      style={{
        fontSize: `${size}px`,
      }}
      className="font-[700] tracking-wide"
    >
      {children}
    </h1>
  );
};
