import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

interface Pic {
  ref: string;
  url: string;
}

interface TeamMember {
  Id: string;
  Name: string;
  Vertical: string;
  Email?: string;
  Phone?: string;
  LinkedIn?: string;
  Instagram?: string;
  Facebook?: string;
  Twitter?: string;
  Pic?: Pic | string;
}

interface ContactCardProps {
  member: TeamMember;
}

const ContactCard: React.FC<ContactCardProps> = ({ member }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleCardClick = () => {
    if (window.innerWidth <= 768) setShowInfo((prev) => !prev);
  };

  // helper for consistent icon button
  const renderIcon = (icon: React.ReactNode, href?: string) => {
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex justify-center items-center rounded bg-[#d4a437]/20 text-white hover:text-[#5a3a14] hover:bg-[#d4a437]/40 transition"
        >
          {icon}
        </a>
      );
    }
    return (
      <span className="w-8 h-8 flex justify-center items-center rounded bg-[#d4a437]/10 text-[#5a3a14]/30 cursor-not-allowed">
        {icon}
      </span>
    );
  };

  return (
    <div
      className="relative w-[270px] h-[320px] flex justify-center items-center group overflow-hidden rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      {/* golden gradient frame (behind image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 blur-2xl opacity-40 z-5"></div>

      {/* inner overlay */}
      <b className="absolute inset-[6px] bg-[#fff6da]/70 z-10 rounded"></b>

      {/* profile image or placeholder */}
      {member.Pic ? (
        (() => {
          const src = typeof member.Pic === 'string' ? member.Pic : member.Pic?.url;
          return src ? (
            <img
              src={src}
              alt={member.Name}
              loading="lazy"
              className={`absolute left-[6px] top-[6px] z-20 w-[calc(100%-12px)] h-[calc(100%-12px)] object-cover rounded transition-all duration-500 ${
                showInfo ? "scale-95 brightness-90" : "group-hover:scale-95 group-hover:brightness-90"
              }`}
            />
          ) : (
            <div className="absolute left-[6px] top-[6px] z-20 w-[calc(100%-12px)] h-[calc(100%-12px)] bg-gray-200 rounded flex items-center justify-center text-[#5a3a14] font-semibold">
              <span>{member.Name.split(" ")[0]}</span>
            </div>
          );
        })()
      ) : (
        <div className="absolute left-[6px] top-[6px] z-20 w-[calc(100%-12px)] h-[calc(100%-12px)] bg-gray-200 rounded flex items-center justify-center text-[#5a3a14] font-semibold">
          <span>{member.Name.split(" ")[0]}</span>
        </div>
      )}

      {/* bottom gradient for readability */}
      <div className="absolute bottom-[6px] left-[6px] right-[6px] h-24 bg-gradient-to-t from-[#fff6da]/90 via-transparent to-transparent z-25 transition-all duration-300 group-hover:from-[#fff6da]/80"></div>

      {/* info overlay */}
      <div
        className={`absolute bottom-4 flex flex-col items-center z-30 transition-all duration-500
          ${
            showInfo
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
          }`}
      >
        <p className="text-white font-semibold text-sm tracking-wide uppercase text-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]">
          {member.Name}
          <br />
          <span className="font-light text-xs opacity-80">
            {member.Vertical}
          </span>
        </p>

        {/* social icons */}
        <ul className="flex gap-2 mt-2">
          <li>{renderIcon(<FaPhone size={14} />, member.Phone ? `tel:${member.Phone}` : undefined)}</li>
          <li>{renderIcon(<FaEnvelope size={14} />, member.Email ? `mailto:${member.Email}` : undefined)}</li>
          {member.LinkedIn && <li>{renderIcon(<FaLinkedin size={14} />, member.LinkedIn)}</li>}
          {member.Instagram && <li>{renderIcon(<FaInstagram size={14} />, member.Instagram)}</li>}
          {member.Facebook && <li>{renderIcon(<FaFacebook size={14} />, member.Facebook)}</li>}
          {member.Twitter && <li>{renderIcon(<FaTwitter size={14} />, member.Twitter)}</li>}
        </ul>
      </div>
    </div>
  );
};

export default ContactCard;
