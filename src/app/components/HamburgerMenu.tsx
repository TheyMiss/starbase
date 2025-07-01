import React from "react";
import { Menu } from "lucide-react";
import { buttonVariants } from "./ui/button";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className={`${buttonVariants({
      variant: "ghost",
      size: "icon",
    })} md:hidden p-2`}
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? (
      <></>
    ) : (
      <Menu className="h-6 w-6 text-sb-primary size-6" aria-hidden="true" />
    )}
  </button>
);
