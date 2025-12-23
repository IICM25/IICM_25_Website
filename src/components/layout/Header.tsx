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

import logo from "./logo.jpg";

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
          <Image
            src={logo}
            alt="Inter IIT logo"
            className="h-[70px] w-[70px] rounded-full py-1"
          />
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div
        className="text-white text-2xl cursor-pointer block lg:hidden"
        onClick={toggleMobileDrawer}
      >
        <div
          className={`transition-transform ${
            isMobileDrawerOpen ? "rotate-90 text-[var(--secondary-color)]" : ""
          }`}
        >
          &#9776;
        </div>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden lg:flex items-center space-x-4 text-white">

        <li>
          <Link
            href="/iitk"
            className={`relative hover:text-[var(--secondary-color)] ${
              pathname === "/merch" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            About IITK
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/events" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Events 
          </Link>
        </li>
        {/* <li>
          <Link
            href="/schedule"
            className={`hover:text-[var(--secondary-color)] ${pathname === "/schedule" ? "text-[var(--secondary-color)]" : ""
              }`}
          >
            Schedule
          </Link>
        </li> */}
        <li>
          <Link
            href="/schedule"
            className={`hover:text-[var(--secondary-color)] ${pathname === "/schedule" ? "text-[var(--secondary-color)]" : ""
              }`}
          >
            Schedule
          </Link>
        </li>

        {/* Other Links */}
        <li>
          <Link
            href="https://drive.google.com/file/d/1VUxhRSf0R2xDKwhzhKKDB2_uktCDeV6M/view?usp=drive_open"
            className="hover:text-[var(--secondary-color)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            RuleBook
          </Link>
        </li>
        <li>
          <Link
            href="/places"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/places" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Places
          </Link>
        </li>
        <li>
          <Link
            href="/judges"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/judges" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Judges
          </Link>
        </li>
        <li>
          <Link
            href="/gallery"
            className={`relative hover:text-[var(--secondary-color)] ${
              pathname === "/gallery" ? "text-[var(--secondary-color)]" : ""
            } ${isRootPage ? "hover:text-[var(--secondary-color)]" : ""}`}
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`hover:text-[var(--secondary-color)] ${pathname === "/contact" ? "text-[var(--secondary-color)]" : ""
              }`}
          >
            Core Team
          </Link>
        </li>
        
        <li>
          <Link
            href="/partners"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/partners" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Partners
          </Link>
        </li>
      </ul>

      {/* Social Icons */}
      <div className="hidden lg:flex space-x-3 text-white">
        {/* <a href="https://whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r">
          <FontAwesomeIcon icon={faWhatsapp} className="hover:text-[var(--secondary-color)]" />
        </a> */}
        <a href="https://www.instagram.com/interiit_culturals/" target="_blank"
            rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="hover:text-[var(--secondary-color)]" />
        </a>
        {/* <a href="https://twitter.com/antaragni">
          <FontAwesomeIcon icon={faXTwitter} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.youtube.com/user/antaragniiitkanpur">
          <FontAwesomeIcon icon={faYoutube} className="hover:text-[var(--secondary-color)]" />
        </a> */}
        <a href="https://www.linkedin.com/company/inter-iit-culturals/posts/?feedView=all" target="_blank"
            rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="hover:text-[var(--secondary-color)]" />
        </a>
        {/* <a href="https://www.facebook.com/antaragni.iitk/">
          <FontAwesomeIcon icon={faFacebook} className="hover:text-[var(--secondary-color)]" />
        </a> */}
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={toggleMobileDrawer} />

    </nav>
  );
};

export default Header;