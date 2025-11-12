"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import MobileDrawer from "./MobileDrawer";

// import typefacefinal from "../assets/title.png"; // place title.png in /public

import logo from "./logo.jpg"; // place logo.jpg in /public

const Header = () => {
  const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleMobileDrawer = () => setIsMobileDrawerOpen(!isMobileDrawerOpen);

  const isRootPage = pathname === "/";

  if (pathname === "/3d") return null;

  return (
    <nav className="flex justify-between items-center h-20 px-4 fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-b border-white/10 z-[999] font-[Mooli]">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Inter IIT logo" className="h-[70px] w-[70px]  rounded-full py-1" />
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div
        className="text-white text-2xl cursor-pointer block lg:hidden"
        onClick={toggleMobileDrawer}
      >
        <div
          className={`transition-transform ${isMobileDrawerOpen ? "rotate-90 text-[var(--secondary-color)]" : ""
            }`}
        >
          &#9776;
        </div>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden lg:flex items-center space-x-4 text-white">
        {/* Merch */}
        <li>
          <Link
            href="/iitk"
            className={`relative hover:text-[var(--secondary-color)] ${pathname === "/merch" ? "text-[var(--secondary-color)]" : ""
              }`}
          >
            About IITK
          </Link>
        </li>

        {/* Schedule */}
        <li>
          <Link
            href="/gallery"
            className={`relative hover:text-[var(--secondary-color)] ${pathname === "/gallery" ? "text-[var(--secondary-color)]" : ""
              } ${isRootPage ? "hover:text-[var(--secondary-color)]" : ""}`}
          >
            Gallery
          </Link>
        </li>

        {/* Other Links */}
        <li>
          <Link
            href="/contact"
            className={`hover:text-[var(--secondary-color)] ${pathname === "/contact" ? "text-[var(--secondary-color)]" : ""
              }`}
          >
            Contact
          </Link>
        </li>
        {/* <li>
          <Link
            href="/hof"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/hof" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Hall Of Fame
          </Link>
        </li> */}

        <li>
          <Link
            href="https://drive.google.com/file/d/1VUxhRSf0R2xDKwhzhKKDB2_uktCDeV6M/view?usp=drive_open"
            className={`hover:text-[var(--secondary-color)] ${pathname === "https://drive.google.com/file/d/1VUxhRSf0R2xDKwhzhKKDB2_uktCDeV6M/view?usp=drive_open" ? "text-[var(--secondary-color)]" : ""
              }`}
          >
            RuleBook
          </Link>
        </li>
      </ul>

      {/* Social Icons */}
      <div className="hidden lg:flex space-x-3 text-white">
        <a href="https://whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r">
          <FontAwesomeIcon icon={faWhatsapp} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.instagram.com/antaragni.iitkanpur/">
          <FontAwesomeIcon icon={faInstagram} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://twitter.com/antaragni">
          <FontAwesomeIcon icon={faXTwitter} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.youtube.com/user/antaragniiitkanpur">
          <FontAwesomeIcon icon={faYoutube} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.linkedin.com/company/antaragni-iit-kanpur/mycompany/">
          <FontAwesomeIcon icon={faLinkedin} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.facebook.com/antaragni.iitk/">
          <FontAwesomeIcon icon={faFacebook} className="hover:text-[var(--secondary-color)]" />
        </a>
      </div>

      {/* Mobile Drawer */}

      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={toggleMobileDrawer} />
    </nav>
  );
};

export default Header;
