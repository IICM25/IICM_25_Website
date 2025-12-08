// "use client"
// import React, { useState, useEffect } from "react";

// function AboutIITK() {
//   // Theme Colors
//   const theme = {
//     bg: "#cd7f32", // Deep ochre/orange
//     accent: "#1f4e5f", // Teal/Dark Cyan
//     textMain: "#fefae0", // Cream/Off-White
//     gold: "#FFD700", // Gold for borders
//   };

//   const stats = [
//     { title: "Excellence", desc: "Top Ranked Technical Institute" },
//     { title: "150+ Postdocs", desc: "Leading Innovation & Discovery" },
//     { title: "9500+ Students", desc: "With 1:1 UG:PG Students Ratio" },
//     { title: "570 Faculty", desc: "Across 20 Departments" },
//     { title: "1055 Acres", desc: "Fully Residential Campus" },
//     { title: "Community", desc: "Diverse & Talented Body" },
//     { title: "Global Impact", desc: "Alumni Changing the World" },
//   ];

//   // --- CAROUSEL LOGIC ---
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(1);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) setItemsPerView(4);
//       else if (window.innerWidth >= 768) setItemsPerView(2);
//       else setItemsPerView(1);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex, itemsPerView]);

//   const handleNext = () => {
//     setCurrentIndex((prev) => 
//       prev >= stats.length - itemsPerView ? 0 : prev + 1
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => 
//       prev === 0 ? stats.length - itemsPerView : prev - 1
//     );
//   };
//   // -----------------------

//   return (
//     <div className="min-h-screen font-serif text-[#fefae0] overflow-x-hidden">
      
//       {/* =========================================
//           1. HERO SECTION
//          ========================================= */}
//       <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url('/images/IITK-hero.avif')" }} 
//         >
//           <div className="absolute inset-0 bg-black/60"></div>
//         </div>

//         <div className="relative z-10 text-center p-8">
//           <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider drop-shadow-2xl text-white">
//             IIT KANPUR
//           </h1>
//           <div className="h-1 w-80 mx-auto bg-[#cd7f32] mb-6"></div>
//           <p className="text-2xl md:text-3xl tracking-widest uppercase text-gray-200">
//             Legacy of Excellence
//           </p>
//         </div>
//       </section>

//       {/* =========================================
//           2. MAIN CONTENT
//          ========================================= */}
//       <div 
//         className="relative w-full pt-20"
//         style={{ backgroundColor: theme.bg }}
//       >
//         <div
//             className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
//             style={{ backgroundImage: "url('/images/top.png')" }}
//         ></div>

//         <div className="relative z-10">
            
//             {/* Intro Text */}
//             <div className="max-w-4xl mx-auto text-center px-6 mb-20">
//                 <h2 className="text-5xl font-bold mb-8 text-[#fefae0] inline-block pb-2 border-b border-[#fefae0]/30">
//                 Where Academia Thrives
//                 </h2>
//                 <p className="text-xl leading-loose text-[#fefae0]/90">
//                 Established in 1959, the Indian Institute of Technology Kanpur (IIT Kanpur) 
//                 is a premier engineering institution. For over six decades, we have been the 
//                 cradle of innovation.
//                 </p>
//             </div>

//             {/* --- CAROUSEL STATS STRIP --- */}
//             <div className="w-full border-y border-[#fefae0]/30 bg-[#000000]/20 backdrop-blur-sm py-12 mb-24 relative group">
//                 <div className="max-w-7xl mx-auto px-12 relative overflow-hidden">
//                     <div 
//                       className="flex transition-transform duration-700 ease-in-out"
//                       style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
//                     >
//                         {stats.map((item, index) => (
//                             <div 
//                                 key={index} 
//                                 className="flex-shrink-0 px-6 border-r border-[#fefae0]/20"
//                                 style={{ width: `${100 / itemsPerView}%` }}
//                             >
//                                 <div className="flex flex-col justify-center h-full">
//                                   <h3 className="text-3xl font-bold mb-2 leading-tight whitespace-nowrap">{item.title}</h3>
//                                   <p className="text-sm md:text-base opacity-80 font-light leading-snug">{item.desc}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 hover:bg-white/10 rounded-full transition text-4xl">‹</button>
//                     <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 hover:bg-white/10 rounded-full transition text-4xl">›</button>
//                 </div>
//             </div>


//             {/* --- LEADERSHIP SECTION --- */}
//             <div className="max-w-7xl mx-auto px-6 mb-32">
//                 <h2 className="text-4xl font-bold text-center mb-16 tracking-widest uppercase opacity-90">
//                      From The Desk Of Leadership
//                 </h2>
//                 <div className="grid md:grid-cols-2 gap-12 lg:gap-24 relative">
//                     <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-[#fefae0]/30"></div>
//                     {/* Director */}
//                     <div className="relative group">
//                         <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#fefae0]/50"></div>
//                         <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#fefae0]/50"></div>
//                         <div className="p-8 text-center">
//                             <h3 className="text-2xl font-bold mb-1 text-[#fefae0]">Director's Message</h3>
//                             <p className="font-bold italic mb-6 text-[#fefae0]/60">Prof. Manindra Agrawal</p>
//                             <blockquote className="text-xl leading-relaxed font-light italic relative">
//                                 <span className="text-6xl absolute -top-8 -left-2 opacity-20 font-serif">“</span>
//                                 Welcome to IIT Kanpur. Our commitment remains steadfast — to nurture brilliant minds, foster groundbreaking research, and create leaders who will shape the future.
//                                 <span className="text-6xl absolute -bottom-10 right-0 opacity-20 font-serif">”</span>
//                             </blockquote>
//                         </div>
//                     </div>
//                     {/* Dean */}
//                     <div className="relative group mt-12 md:mt-0">
//                         <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#fefae0]/50"></div>
//                         <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#fefae0]/50"></div>
//                         <div className="p-8 text-center">
//                             <h3 className="text-2xl font-bold mb-1 text-[#fefae0]">Dean's Message</h3>
//                             <p className="font-bold italic mb-6 text-[#fefae0]/60">Prof. Ashoke De</p>
//                             <blockquote className="text-xl leading-relaxed font-light italic relative">
//                                 <span className="text-6xl absolute -top-8 -left-2 opacity-20 font-serif">“</span>
//                                 We believe in holistic development that goes beyond textbooks. We empower students to become critical thinkers, innovators, and problem solvers.
//                                 <span className="text-6xl absolute -bottom-10 right-0 opacity-20 font-serif">”</span>
//                             </blockquote>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {/* --- TIMELINE --- */}
//             <div className="max-w-4xl mx-auto pb-32 px-6">
//                 <h2 className="text-4xl font-bold text-center mb-16 text-[#fefae0]">
//                     Historic Milestones
//                 </h2>
//                 <div className="relative">
//                     <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#fefae0]/30 -translate-x-1/2"></div>
//                     <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-[#fefae0]/30"></div>
//                     <div className="space-y-12">
//                         {[
//                             { year: "1959", text: "Established with US Collaboration" },
//                             { year: "1963", text: "First Batch Graduates" },
//                             { year: "1972", text: "First Computer Centre in India" },
//                             { year: "2020", text: "Global Research Expansion" },
//                         ].map((item, index) => (
//                             <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
//                                 <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#fefae0] rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 group-hover:scale-125 transition-transform"></div>
//                                 <div className="w-full flex md:justify-between pl-12 md:pl-0">
//                                     <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'hidden md:block md:invisible'}`}>
//                                         <h3 className="text-3xl font-bold text-[#fefae0]">{item.year}</h3>
//                                         <p className="text-[#fefae0]/80 text-lg">{item.text}</p>
//                                     </div>
//                                     <div className={`md:w-[45%] ${index % 2 !== 0 ? 'md:text-left' : 'hidden md:block md:invisible'}`}>
//                                         <h3 className="text-3xl font-bold text-[#fefae0]">{item.year}</h3>
//                                         <p className="text-[#fefae0]/80 text-lg">{item.text}</p>
//                                     </div>
//                                     <div className="md:hidden">
//                                          <h3 className="text-2xl font-bold text-[#fefae0]">{item.year}</h3>
//                                          <p className="text-[#fefae0]/80">{item.text}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* =========================================
//                 3. NEW FOOTER SECTION
//                ========================================= */}
//             <footer 
//                 className="relative py-16 overflow-hidden text-center border-t-4 border-double border-[#fefae0]/30"
//                 style={{ backgroundColor: theme.accent }}
//             >
//                  {/* Texture overlay for continuity */}
//                 <div 
//                     className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" 
//                     style={{ backgroundImage: "url('/images/top.png')" }}
//                 ></div>
//                    {/* Retro Style Button */}
//                     <a
//                       href="https://www.iitk.ac.in/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block group relative"
//                     >
                      
//                        {/* Button Shadow Offset */}
//                        <div className="absolute inset-0 bg-[#cd7f32]/50 translate-y-2 translate-x-2 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-300 rounded-sm"></div>
                       
//                        {/* Main Button styled as a retro ticket/stamp */}
//                        <div 
//                         className="relative border-2 border-[#fefae0]/80 px-10 py-4 text-xl font-bold text-[#fefae0] transition-all duration-300 z-10 tracking-wider uppercase rounded-sm group-hover:-translate-y-1 group-hover:-translate-x-1"
//                         style={{ backgroundColor: theme.bg }}
//                        >
//                           Visit Official IITK Website
//                        </div>
//                     </a>
                
//             </footer>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutIITK;

"use client"
import React, { useState, useEffect, useCallback } from "react";

function AboutIITK() {
  // Theme Colors
  const theme = {
    bg: "#cd7f32", // Deep ochre/orange
    accent: "#1f4e5f", // Teal/Dark Cyan
    textMain: "#fefae0", // Cream/Off-White
    gold: "#FFD700", // Gold for borders
  };

  const stats = [
    { title: "Excellence", desc: "Top Ranked Technical Institute" },
    { title: "150+ Postdocs", desc: "Leading Innovation & Discovery" },
    { title: "9500+ Students", desc: "With 1:1 UG:PG Students Ratio" },
    { title: "570 Faculty", desc: "Across 20 Departments" },
    { title: "1055 Acres", desc: "Fully Residential Campus" },
    { title: "Community", desc: "Diverse & Talented Body" },
    { title: "Global Impact", desc: "Alumni Changing the World" },
  ];

  // --- CAROUSEL LOGIC ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // make handleNext/handlePrev stable with useCallback so effects can depend on them safely
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) =>
      prev >= stats.length - itemsPerView ? 0 : prev + 1
    );
  }, [itemsPerView, stats.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, stats.length - itemsPerView) : prev - 1
    );
  }, [itemsPerView, stats.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [handleNext]); // now the linter is satisfied

  // -----------------------

  return (
    <div className="min-h-screen font-serif text-[#fefae0] overflow-x-hidden">
      
      {/* =========================================
          1. HERO SECTION
         ========================================= */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/IITK-hero.avif')" }} 
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center p-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider drop-shadow-2xl text-white">
            IIT KANPUR
          </h1>
          <div className="h-1 w-80 mx-auto bg-[#cd7f32] mb-6"></div>
          <p className="text-2xl md:text-3xl tracking-widest uppercase text-gray-200">
            Legacy of Excellence
          </p>
        </div>
      </section>

      {/* =========================================
          2. MAIN CONTENT
         ========================================= */}
      <div 
        className="relative w-full pt-20"
        style={{ backgroundColor: theme.bg }}
      >
        <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{ backgroundImage: "url('/images/top.png')" }}
        ></div>

        <div className="relative z-10">
            
            {/* Intro Text */}
            <div className="max-w-4xl mx-auto text-center px-6 mb-20">
                <h2 className="text-5xl font-bold mb-8 text-[#fefae0] inline-block pb-2 border-b border-[#fefae0]/30">
                Where Academia Thrives
                </h2>
                <p className="text-xl leading-loose text-[#fefae0]/90">
                Established in 1959, the Indian Institute of Technology Kanpur (IIT Kanpur) 
                is a premier engineering institution. For over six decades, we have been the 
                cradle of innovation.
                </p>
            </div>

            {/* --- CAROUSEL STATS STRIP --- */}
            <div className="w-full border-y border-[#fefae0]/30 bg-[#000000]/20 backdrop-blur-sm py-12 mb-24 relative group">
                <div className="max-w-7xl mx-auto px-12 relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-700 ease-in-out"
                      style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                    >
                        {stats.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex-shrink-0 px-6 border-r border-[#fefae0]/20"
                                style={{ width: `${100 / itemsPerView}%` }}
                            >
                                <div className="flex flex-col justify-center h-full">
                                  <h3 className="text-3xl font-bold mb-2 leading-tight whitespace-nowrap">{item.title}</h3>
                                  <p className="text-sm md:text-base opacity-80 font-light leading-snug">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 hover:bg-white/10 rounded-full transition text-4xl">‹</button>
                    <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 hover:bg-white/10 rounded-full transition text-4xl">›</button>
                </div>
            </div>


            {/* --- LEADERSHIP SECTION --- */}
            <div className="max-w-7xl mx-auto px-6 mb-32">
                <h2 className="text-4xl font-bold text-center mb-16 tracking-widest uppercase opacity-90">
                     From The Desk Of Leadership
                </h2>
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 relative">
                    <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-[#fefae0]/30"></div>
                    {/* Director */}
                    <div className="relative group">
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#fefae0]/50"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#fefae0]/50"></div>
                        <div className="p-8 text-center">
                            <h3 className="text-2xl font-bold mb-1 text-[#fefae0]">{"Director's Message"}</h3>
                            <p className="font-bold italic mb-6 text-[#fefae0]/60">Prof. Manindra Agrawal</p>
                            <blockquote className="text-xl leading-relaxed font-light italic relative">
                                <span className="text-6xl absolute -top-8 -left-2 opacity-20 font-serif">“</span>
                                Welcome to IIT Kanpur. Our commitment remains steadfast — to nurture brilliant minds, foster groundbreaking research, and create leaders who will shape the future.
                                <span className="text-6xl absolute -bottom-10 right-0 opacity-20 font-serif">”</span>
                            </blockquote>
                        </div>
                    </div>
                    {/* Dean */}
                    <div className="relative group mt-12 md:mt-0">
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#fefae0]/50"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#fefae0]/50"></div>
                        <div className="p-8 text-center">
                            <h3 className="text-2xl font-bold mb-1 text-[#fefae0]">Dean&#39;s Message</h3>
                            <p className="font-bold italic mb-6 text-[#fefae0]/60">Prof. Ashoke De</p>
                            <h3 className="text-2xl font-bold mb-1 text-[#fefae0]">Dean&#39;s Message</h3>
                            <p className="font-bold italic mb-6 text-[#fefae0]/60">Prof. Pratik Sen</p>
                            <blockquote className="text-xl leading-relaxed font-light italic relative">
                                <span className="text-6xl absolute -top-8 -left-2 opacity-20 font-serif">“</span>
                                We believe in holistic development that goes beyond textbooks. We empower students to become critical thinkers, innovators, and problem solvers.
                                <span className="text-6xl absolute -bottom-10 right-0 opacity-20 font-serif">”</span>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>


            {/* --- TIMELINE --- */}
            <div className="max-w-4xl mx-auto pb-32 px-6">
                <h2 className="text-4xl font-bold text-center mb-16 text-[#fefae0]">
                    Historic Milestones
                </h2>
                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#fefae0]/30 -translate-x-1/2"></div>
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-[#fefae0]/30"></div>
                    <div className="space-y-12">
                        {[
                            { year: "1959", text: "Established with US Collaboration" },
                            { year: "1963", text: "First Batch Graduates" },
                            { year: "1972", text: "First Computer Centre in India" },
                            { year: "2020", text: "Global Research Expansion" },
                        ].map((item, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row itemscenter justify-between group">
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#fefae0] rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 group-hover:scale-125 transition-transform"></div>
                                <div className="w-full flex md:justify-between pl-12 md:pl-0">
                                    <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:text-right' : 'hidden md:block md:invisible'}`}>
                                        <h3 className="text-3xl font-bold text-[#fefae0]">{item.year}</h3>
                                        <p className="text-[#fefae0]/80 text-lg">{item.text}</p>
                                    </div>
                                    <div className={`md:w-[45%] ${index % 2 !== 0 ? 'md:text-left' : 'hidden md:block md:invisible'}`}>
                                        <h3 className="text-3xl font-bold text-[#fefae0]">{item.year}</h3>
                                        <p className="text-[#fefae0]/80 text-lg">{item.text}</p>
                                    </div>
                                    <div className="md:hidden">
                                         <h3 className="text-2xl font-bold text-[#fefae0]">{item.year}</h3>
                                         <p className="text-[#fefae0]/80">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* =========================================
                3. NEW FOOTER SECTION
               ========================================= */}
            <footer 
                className="relative py-16 overflow-hidden text-center border-t-4 border-double border-[#fefae0]/30"
                style={{ backgroundColor: theme.accent }}
            >
                 {/* Texture overlay for continuity */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" 
                    style={{ backgroundImage: "url('/images/top.png')" }}
                ></div>
                   {/* Retro Style Button */}
                    <a
                      href="https://www.iitk.ac.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block group relative"
                    >
                      
                       {/* Button Shadow Offset */}
                       <div className="absolute inset-0 bg-[#cd7f32]/50 translate-y-2 translate-x-2 group-hover:translate-y-1 group-hover:translate-x-1 transition-transform duration-300 rounded-sm"></div>
                       
                       {/* Main Button styled as a retro ticket/stamp */}
                       <div 
                        className="relative border-2 border-[#fefae0]/80 px-10 py-4 text-xl font-bold text-[#fefae0] transition-all duration-300 z-10 tracking-wider uppercase rounded-sm group-hover:-translate-y-1 group-hover:-translate-x-1"
                        style={{ backgroundColor: theme.bg }}
                       >
                          Visit Official IITK Website
                       </div>
                    </a>
                
            </footer>

        </div>
      </div>
    </div>
  );
}

export default AboutIITK;
