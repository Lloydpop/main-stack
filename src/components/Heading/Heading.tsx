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
      className="font-[DegularBold] tracking-tight"
    >
      {children}
    </h1>
  );
};
