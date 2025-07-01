"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { navLinks } from "../config/navLinks";
import { buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./ui/sheet";
import { HamburgerMenu } from "./HamburgerMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-sb-accent-foreground via-black to-sb-muted galaxy shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-2">
          <Star className="h-7 w-7 text-sb-primary" aria-hidden="true" />
          <span className="text-lg md:text-2xl font-extrabold tracking-wide text-sb-primary font-sans drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] uppercase">
            Starbase
          </span>
        </div>

        <nav aria-label="Main Navigation" className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={buttonVariants({ variant: "navLink" })}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="z-50 md:hidden ">
            <HamburgerMenu
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            />
          </SheetTrigger>

          <SheetContent side="top" className="h-screen w-full bg-sb-muted p-6">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Select a link to navigate the site.
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-sb-primary"
                  >
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
