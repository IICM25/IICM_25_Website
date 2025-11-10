import React from 'react';

export default function Header(){
  return (
    <header className="w-full py-6 z-50 bg-gradient-to-b from-[#FFD37F] to-[#FFB347] bg-clip-text text-transparent px-6 backdrop-blur-md fixed">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">IICM</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/schedule" className="hover:text-blue-600">Schedule</a></li>
            <li><a href="/team" className="hover:text-blue-600">Team</a></li>
            <li><a href="/iitk" className="hover:text-blue-600">IITK</a></li>
            <li><a href="/judges" className="hover:text-blue-600">Judges</a></li>
            <li><a href="/partners" className="hover:text-blue-600">Partners</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};