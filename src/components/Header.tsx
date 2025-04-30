"use client"; // 因为使用了 useState

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // 假设有一个工具函数来合并 Tailwind 类名

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"en" | "zh">("zh");

  const navItems = [
    { href: "/", label: "首页" },
    { href: "/articles", label: "文章" },
    { href: "/travel", label: "旅行" },
    { href: "/about", label: "关于" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLang = () => setCurrentLang(currentLang === "zh" ? "en" : "zh");

  return (
    <header className="bg-black text-white sticky top-0 z-50 transition-all duration-300 ease-in-out shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo/Brand - Can be added here if needed */}
        {/* <Link href="/" className="text-xl font-bold">
          MO
        </Link> */}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Language Switch & Mobile Menu Button */}
        <div className="flex items-center">
          {/* Language Switch */}
          <button
            onClick={toggleLang}
            className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 mr-6"
            aria-label={
              currentLang === "zh" ? "Switch to English" : "切换到中文"
            }
          >
            {currentLang === "zh" ? "EN" : "中文"} /{" "}
            {currentLang === "zh" ? "中文" : "EN"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed. */}
            {/* Heroicon name: outline/menu */}
            <svg
              className={cn("h-6 w-6", isMobileMenuOpen ? "hidden" : "block")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            {/* Icon when menu is open. */}
            {/* Heroicon name: outline/x */}
            <svg
              className={cn("h-6 w-6", isMobileMenuOpen ? "block" : "hidden")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-screen shadow-lg" : "max-h-0"
        )}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          {/* Language Switch in Mobile */}
          <button
            onClick={() => {
              toggleLang();
              setIsMobileMenuOpen(false);
            }}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            aria-label={
              currentLang === "zh" ? "Switch to English" : "切换到中文"
            }
          >
            {currentLang === "zh" ? "切换到 English" : "Switch to 中文"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
