import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Login",
      slug: "/login",
    },
    {
      name: "Signup",
      slug: "/signup",
    },
  ];
  return (
    <div className="w-full flex justify-between items-center px-20 h-14 absolute top-0 left-0 shadow-xl">
      <div>Home</div>
      <div>
        <ul className="flex gap-5">
          {navItems.map((item, index) => {
            return (
              <li>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive ? "underline underline-offset-4 font-semibold" : ""
                  }
                  to={item.slug}
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
