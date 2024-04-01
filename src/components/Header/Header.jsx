// Import necessary modules
import React from "react";
import { NavLink } from "react-router-dom";
import { useMyContext } from "../MyContext";

const Header = () => {
  const { status } = useMyContext();

  // Navigation items
  const navItems = [
    {
      name: "Home",
      slug: "/",
      status: true,
    },
    {
      name: "Login",
      slug: "/login",
      status: !status,
    },
    {
      name: "Signup",
      slug: "/signup",
      status: !status,
    },
  ];

  return (
    <div className="w-full flex justify-between items-center px-5 sm:px-20 h-14 absolute top-0 left-0 shadow-xl">
      <div>
        <i className="ri-ghost-smile-line "></i>
      </div>
      <div>
        <ul className="flex gap-5">
          {/* Render navigation items */}
          {navItems.map((item, index) => {
            return (
              item.status && (
                <li key={index}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }
                    to={item.slug}
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
