import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "All Departments" },
  { href: "/", label: "Alexa Skills" },
  { href: "/", label: "Amazon Devices" },
  { href: "/", label: "Apps & Games" },
  { href: "/", label: "Baby" },
  { href: "/", label: "Books" },
  { href: "/", label: "Beauty" },
  { href: "/", label: "Gift Cards" },
  { href: "/", label: "Health & Personal Care" },
  { href: "/", label: "Garden & Outdoors" },
  { href: "/", label: "Fashion" },
  { href: "/", label: "Grocery" },
];

function DropDown() {
  return (
    <Menu>
      <Menu.Button className="w-16 pl-4 flex space-x-2 items-center bg-amazonGray  rounded-l-md">
        <span className="text-sm">All</span>
        <ChevronDownIcon className="w-3 h-4" />
      </Menu.Button>
      <Menu.Items className="flex flex-col absolute w-fit p-2 top-12 bg-amazonGray/95 rounded-md z-50">
        {links.map((link) => (
          <Menu.Item
            as="a"
            key={link.href}
            href={link.href}
            className="px-4 py-1 text-sm ui-active:bg-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-black"
          >
            {link.label}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default DropDown;
