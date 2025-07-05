import {
  Home,
  LoaderPinwheel,
  MessagesSquareIcon,
  UserPlusIcon,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const navItems = [
  {
    name: "Messaging",
    link: "/message",
    icon: <MessagesSquareIcon />,
  },
  {
    name: "Friends",
    link: "/friends",
    icon: <UserPlusIcon />,
  },
];

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center py-4 fixed top-0 w-full bg-red-700">
      <Button
        variant={"Link"}
        onClick={() => navigate("/")}
        className={"flex flex-row gap-1"}
      >
        <LoaderPinwheel />
        <h1>Pixo</h1>
      </Button>
      <div className="flex flex-row">
        {navItems.map((item) => (
          <Button
            variant={"link"}
            className={"flex flex-col gap-0"}
            onClick={() => navigate(item.link)}
          >
            <span className="">{item.icon}</span>
            {item.name}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;
