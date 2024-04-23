import { Logo } from "../Logo/Logo";
import { Avatar, Button } from "..";
import { headerMenu } from "./components/MenuItems";
import menuIcon from "../../assets/images/menuIcon.png";
import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../../service/api.service";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const Header = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => transactionService.getUser(),
  });
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header className=" shadow-md rounded-[100px]  bg-[#fff]  px-8 py-6 min-h-[64px] flex justify-between items-center">
        <Logo size="36" />
        <nav className="lg:flex hidden items-center gap-5 capitalize">
          {headerMenu?.menu_one.map((menu, i) => (
            <Button
              key={i}
              variant={menu.variant}
              leftIcon={
                <img
                  src={menu.icon}
                  alt={menu.label}
                  className="w-5 h-5 object-contain"
                />
              }
            >
              {menu?.label}
            </Button>
          ))}
        </nav>
        <ul className="flex items-center gap-5">
          {headerMenu?.menu_two.map((menu, i) => (
            <li key={i} className="block">
              <img
                src={menu.icon}
                className="w-5 h-5 object-contain"
                alt={`icon${i}`}
              />
            </li>
          ))}
          <li className="flex items-center gap-5 bg-[#dbdee569] rounded-[100px] pl-2 pr-4 py-1">
            <span>
              <Avatar name={`${user?.first_name} ${user?.last_name}`} />
            </span>
            <span
              onClick={() => {
                setOpen(!open);
              }}
              className=" cursor-pointer"
            >
              <img
                src={menuIcon}
                className="w-5 h-5 object-contain"
                alt="menu"
              />
            </span>
          </li>
        </ul>
      </header>
      <div
        className={`border lg:hidden block p-6 fixed top-0 w-[250px] duration-[0.8s] ease-in-out bg-white h-full z-[100] ${
          open ? "left-0" : "-left-[100%]"
        }`}
      >
        <div className="flex justify-between items-center">
          <Logo size="36" />
          <XMarkIcon
            onClick={() => {
              setOpen(false);
            }}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        <nav className="space-y-6 capitalize mt-12 font-[600]">
          {headerMenu?.menu_one.map((menu, i) => (
            <Button
              key={i}
              onClick={() => {
                setOpen(false);
              }}
              variant={menu.variant}
              leftIcon={
                <img
                  src={menu.icon}
                  alt={menu.label}
                  className="w-5 h-5 object-contain"
                />
              }
            >
              {menu?.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};
