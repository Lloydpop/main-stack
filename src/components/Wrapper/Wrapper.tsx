import { ReactNode } from "react";
import { Header } from "../Header/Header";
import productOne from "@/assets/images/product1.png";
import productTwo from "@/assets/images/product2.png";
import productThree from "@/assets/images/product3.png";
import productFour from "@/assets/images/product4.png";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="lg:px-6">
      <div className=" shadow-lg hidden h-[200px] w-[48px] absolute left-4 top-80 rounded-t-[40px] gap-5 rounded-b-[40px] bg-[#fff] z-20 lg:flex items-center flex-col justify-center">
        <img src={productFour} className="w-5 h-5 mix-blend-luminosity" />
        <img src={productOne} className="w-5 h-5 mix-blend-luminosity" />
        <img src={productTwo} className="w-5 h-5 mix-blend-luminosity" />
        <img src={productThree} className="w-5 h-5 mix-blend-luminosity" />
      </div>
      <Header />
      <div className=" lg:px-24 px-6 py-8">{children}</div>
    </div>
  );
};
