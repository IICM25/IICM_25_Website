// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About IITK", href: "/iitk" },
    { label: "Gallery", href: "/gallery" },
    { label: "Core Team", href: "/contact" },
  ];

  const iitLinks = [
    { label: "IITK Homepage", href: "https://iitk.ac.in" },
    { label: "Students Gymkhana", href: "https://itsgyanendra.github.io/website/cells/" },
  ];

  // documents list removed because it's currently unused

  return (
    <footer className="bg-black text-[#e9e6e0] pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[10vw]">
          {/* LEFT: logos + description */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="flex items-center gap-4 mb-4">
              {/* Put your logos in /public/Elements/ */}
              <div className="w-12 h-12 relative">
                <Image src="/logo.jpg" alt="Inter IIT logo" fill style={{ objectFit: "contain" }} />
              </div>
            </div>

            <h3 className="text-sm font-semibold tracking-widest mb-3 text-[#dcd6cf]">
              INTER IIT CULTURAL MEET
            </h3>

            <p className="text-sm leading-relaxed text-[#cfc8bf]">
              The Inter IIT Cultural Meet brings together students from IITs across India to celebrate
              culture, creativity and performance. We aim to provide a safe and inclusive space for all participants.
            </p>
          </div>

          {/* MIDDLE: quick links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest mb-4 text-[#d6cfc6]">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline text-[#ddd6cf]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: IITK links */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest mb-4 text-[#d6cfc6]">IITK&apos;S LINK</h4>
            <ul className="space-y-2 text-sm">
              {iitLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#ddd6cf]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* DOCUMENTS */}
          
        </div>
      </div>

      {/* copyright row */}
      <div className="border-t border-t-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-6 text-center text-sm text-[#cfc8bf]">
          © {new Date().getFullYear()} — All rights reserved by Inter IIT Cultural Meet
        </div>
      </div>
    </footer>
  );
}
