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
    <header className="w-full py-4 px-6 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">IICM</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/schedule" className="hover:text-blue-600">Schedule</a></li>
            <li><a href="/team" className="hover:text-blue-600">Team</a></li>
            <li><a href="/iitk" className="hover:text-blue-600">IITK</a></li>
            <li><a href="/partners" className="hover:text-blue-600">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Drawer */}

      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={toggleMobileDrawer} />
    </nav>
  );
};

export default Header;
