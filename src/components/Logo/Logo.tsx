import brand from "@/assets/images/mainstack-logo.png";
interface LogoProps {
  size?: string;
}
export const Logo = ({ size = "20" }: LogoProps) => {
  return (
    <img
      src={brand}
      className="object-contain"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
