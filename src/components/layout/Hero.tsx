"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function Home() {
  // preferred background logic removed (not currently used)

  // Note: background load handlers removed because overlay conditional is currently always shown

  const PHOTOS = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpeg",
    "/images/8.jpg",
    "/images/9.jpg",

  ];
  const PHOTOS1 = [
    "/images/10.jpeg",
    "/images/11.jpg",
    "/images/12.jpeg",
    "/images/13.jpg",

  ];

  // small rotation classes to give the playful pinned look
  const ROTATIONS = [
    "rotate-[-6deg]",
    "rotate-[-3deg]",
    "rotate-[4deg]",
    "rotate-[2deg]",
    "rotate-[-4deg]",
    "rotate-[3deg]",
    "rotate-[-2deg]",
    "rotate-[5deg]",
    "rotate-[-1deg]",
  ];


  return (
    <main className="min-h-screen 2xl:w-[99.2vw] w-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[230vh] w-full overflow-hidden">
        {/* Background for small screens */}
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src="/homesm.png" // 👈 mobile version
            alt="Hero Background Mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Background for medium and larger screens */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/Homepage.png" // 👈 desktop version
            alt="Hero Background Desktop"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay box that sits at top:40vh until the background finishes loading */}
        {/* {!bgLoaded && ( */}
        <div className="absolute left-0 right-0 z-50 pointer-events-none" style={{ top: '25vh' }}>
          <div className="mx-auto w-[min(1100px,92%)]  flex-col text-white rounded-lg p-6 flex items-center justify-center gap-12">
            <div className="flex items-center flex-col justify-center gap-4">
              <div className="flex flex-col items-center justify-center gap-12">
                {/* <div className="text-lg font-semibold">Loading background</div> */}
                <Image src="/Elements/logo.png" alt="Loading" width={240} height={240} />
                <div className="relative w-full flex items-center justify-center py-3 ">
                  {/* wrapper controlling size */}
                  <div className="relative text-center">
                    {/* BACK LAYER: outline / shadow */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <h1
                        className="retro-font retro-outline select-none text-[3.6rem] md:text-[6rem] lg:text-[5rem] leading-none tracking-wider"
                        style={{ transform: "scale(1.02)" }}
                      >
                        INTER IIT
                        <br />
                        <span>CULTURAL MEET</span>
                      </h1>
                    </div>

                    {/* FRONT LAYER: gradient fill text (on top) */}
                    <h1
                      className="relative retro-font select-none text-[4.2rem] md:text-[6rem] lg:text-[8rem] leading-none tracking-wider
                     bg-clip-text text-transparent"
                      style={{ zIndex: 10 }}
                    >
                      INTER IIT
                      <br />
                      <span className="text-[1.2rem] md:text-[2rem] lg:text-[2.6rem]">CULTURAL MEET</span>
                    </h1>

                    {/* Optional gloss highlight */}
                    <div className="retro-highlight" />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-6 md:py-16 lg:py-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-10 justify-items-center">
                {PHOTOS1.map((src, idx) => (
                  <div key={idx} className={`relative w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] ${ROTATIONS[idx % ROTATIONS.length]}`}>
                    {/* pin */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                      {/** if you have pin.png use Image; otherwise show a red circle */}
                      <div className="w-6 h-6 rounded-full bg-red-600 shadow-md" />
                      {/* <div className="relative w-6 h-6">
                    <Image src="/Elements/pin.png" alt="pin" fill style={{ objectFit: "contain" }} />
                  </div> */}
                    </div>

                    {/* polaroid frame */}
                    <div className="bg-white rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.25)] pt-4 pb-6 px-3">
                      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden rounded-lg">
                        {/* inner image */}
                        <Image
                          src={src}
                          alt={`gallery-${idx + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />

                        {/* transparent overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>
                      </div>

                      {/* small caption / white strip (polaroid) */}
                      <div className="mt-3 h-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </section>
      <section className="relative w-full bg-[#e88f33] speckle">
        {/* top stripe */}
        <div className="absolute xl:left-0 2xl:left-[-5px] right-0 top-[-65px] pointer-events-none z-[9999]">
          <div className="w-screen h-24 md:h-24 lg:h-48 relative overflow-visible rotate-[1deg]">
            <Image
              src="/Elements/stripe.png"
              alt="film strip top"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* bottom stripe */}
        {/* <div className="absolute left-0 right-0 bottom-[-48px] pointer-events-none z-50">
              <div className="w-screen h-12 md:h-24 lg:h-36 relative overflow-visible">
                <Image
                  src="/Elements/stripe.png"
                  alt="film strip bottom"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div> */}

        {/* content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Text column */}
            <div className="lg:col-span-7">
              <h1 className="vintage-title text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold mb-6">
                About
              </h1>

              <div className="vintage-body text-lg md:text-base lg:text-xl leading-relaxed space-y-6 max-w-3xl">
                <p>
                  The Inter IIT Cultural Meet is the annual celebration of art, creativity, and culture that brings together students from all Indian Institutes of Technology. It serves as a vibrant platform for participants to express themselves through music, dance, drama, design, literature, and more.
                </p>

                <p>
                  Since its inception, the Cultural Meet has been more than just a competition — it’s a festival of ideas, collaboration, and artistic excellence. It allows IITians from across the country to connect, perform, and share their diverse traditions and creative expressions on one grand stage.
                </p>

                <p className="font-semibold">
                  Join us as we celebrate imagination, talent, and togetherness — join us, to celebrate the Inter IIT Cultural Meet!
                </p>

              </div>
            </div>

            {/* Right spacer for guitar (keeps text readable on small screens) */}
            <div className="lg:col-span-5 relative">
              {/* empty column — guitar is absolutely positioned */}
            </div>
          </div>
        </div>

        {/* guitar image: absolute and responsive */}
        <div className="absolute right-0 bottom-12 md:bottom-12 lg:bottom-36 z-30 pointer-events-none md:rotate-0 -rotate-12 guitar-smooth"
          style={{ width: "32%", maxWidth: 380, minWidth: 180 }}>
          {/* Use a wrapper with responsive width; Image with layout 'fill' to preserve ratio */}
          <div className="relative w-full aspect-[3/4] hidden lg:block">
            <Image
              src="/Elements/guitar.png"
              alt="guitar"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

        </div>

        {/* protective padding at bottom so stripes don't overlap content on short screens */}
        <div className="h-36 md:h-32 lg:h-10" />
      </section>
      <section className="relative w-full min-h-[110vh] h-fit overflow-visible">
        {/* Bluish background image (full cover) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Elements/about.png"
            alt="Events background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* TOP film-strip (rotated to match screenshot) */}
        <div className="absolute lg:left-[-5px] left-0 right-0 lg:top-[-80px] top-[-40px] pointer-events-none z-[9999]">
          <div className="w-screen h-24 md:h-24 lg:h-48 relative overflow-visible rotate-[2deg]">
            <Image
              src="/Elements/stripe.png"
              alt="film strip top"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-10 pt-24 md:pt-22 lg:pt-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left text column */}
            <div className="lg:col-span-9">
              <h1 className="vintage-title vintage-heading-outline text-[4.2rem] md:text-[6rem] lg:text-[7.2rem] leading-tight font-extrabold mb-6">
                Events
              </h1>

              <div className="vintage-body text-lg md:text-lg lg:text-lg leading-relaxed space-y-6 max-w-7xl">
                <p>
                  The Inter IIT Cultural Meet is the annual celebration of creativity and artistic brilliance across all Indian Institutes of Technology. It brings together some of the most talented students from premier institutes across the nation, offering a vibrant platform to express themselves through art, dance, drama, music, design, literature, and a wide array of other cultural forms.
                </p>

                <div className="hidden md:block absolute top-36 right-6 z-30 masks-smooth" style={{ width: 320, maxWidth: '100%' }}>
                  <div className="relative w-full aspect-[1/1] hidden lg:block ">
                    <Image src="/Elements/mask.png" alt="masks" fill style={{ objectFit: 'contain' }} priority />
                  </div>
                </div>

                <p>
                  What began as a modest effort to promote cultural exchange among IITs has now grown into one of the most anticipated and respected intercollegiate events in India. Each year, one of the IITs hosts this grand celebration, transforming its campus into a melting pot of cultures, ideas, and imagination. Participants spend months preparing, perfecting performances, and curating experiences that reflect both creativity and technical finesse.
                </p>
                <p>
                  The Inter IIT Cultural Meet is not just a competition — it is a shared experience of learning, expression, and collaboration. From soulful musical renditions to powerful theatrical performances, from graceful classical displays to electrifying street art — every performance tells a story, every participant adds a new shade to the canvas of culture.
                </p>

                <p className="font-semibold">
                  More than just a fest, the Inter IIT Cultural Meet is a celebration of diversity, unity, and the boundless spirit of creation. Join us as we celebrate expression, imagination, and the timeless energy that defines the cultural heart of every IIT — join us, to celebrate the Inter IIT Cultural Meet!
                </p>

                <p className="font-semibold">
                  Join us to celebrate creativity — join us, to celebrate Inter-IIT Cultural!
                </p>
              </div>
            </div>

            {/* Right spacer to mirror image composition */}
            <div className="lg:col-span-5 relative">
              {/* decorative icons positioned in absolute layers so the text column remains unchanged */}
              {/* <div className="hidden md:block absolute -top-6 right-6 z-30 masks-smooth" style={{ width: 320, maxWidth: "100%" }}>
              <div className="relative w-full aspect-[1/1]">
                <Image src="/Elements/mask.png" alt="masks" fill style={{ objectFit: "contain" }} priority />
              </div>
            </div> */}

              {/* small decorative element placeholder if needed */}
            </div>
          </div>
        </div>

        {/* Paintbrush bottom-left */}
        {/* <div className="absolute left-4  vintage-body text-[0.95rem] md:text-base lg:text-lg leading-relaxed space-y-6 md:left-12  z-30 brush-smooth pointer-events-none flex flex-row justify-center items-center flex-nowrap w-screen h-[25vh]">
          <div className="relative w-[20vw] aspect-[3/2] hidden lg:block">
            <Image src="/Elements/guitar.png" alt="paint brush" fill style={{ objectFit: "contain" }} priority />
          </div>
          <div className="lg:w-[50vw] w-full px-5 flex flex-col text-lg gap-4">
            
          </div>
        </div> */}

        {/* Guitar on right (overlapping) */}
        {/* <div className="absolute right-6 md:right-12 lg:right-20 bottom-24 md:bottom-28 lg:bottom-36 z-30 pointer-events-none guitar-smooth" style={{ width: "30%", maxWidth: 420, minWidth: 140 }}>
        <div className="relative w-full aspect-[3/4]">
          <Image src="/Elements/guitar.png" alt="guitar" fill style={{ objectFit: "contain" }} priority />
        </div>
      </div> */}

        {/* BOTTOM film-strip (overlapping bottom edge) */}
        {/* <div className="absolute -left-6 right-0 bottom-[-64px] pointer-events-none z-[9999]">
        <div className="relative w-screen overflow-visible transform rotate-0" style={{ height: "auto" }}>
          <div className="relative w-full stripe-h">
            <Image
              src="/Elements/stripe.png"
              alt="film strip bottom"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div> */}

        {/* breathing space so next section doesn't overlap stripe */}
        <div className="h-28 md:h-32 lg:h-64" />
      </section>
      <section className="relative w-full overflow-visible bg-[#F3E1A0]">
        {/* background image */}


        {/* top film strip (overlapping) */}
        <div className="absolute md:-left-2 left-0 right-0 md:top-[-74px] top-[-40px]  pointer-events-none z-40">
          <div className="relative w-screen overflow-visible transform -rotate-2">
            <div className="relative w-screen h-24 md:h-24 lg:h-48 ">
              <Image src="/Elements/stripe.png" alt="stripe top" fill style={{ objectFit: "cover" }} priority />
            </div>
          </div>
        </div>

        {/* heading */}
        <div className="relative z-20 pt-20 md:pt-28 lg:pt-32">
          <h2 className="text-center vintage-title text-[3.2rem] md:text-[4.6rem] lg:text-[5.8rem] font-bold text-[#8b1414]">
            Gallery
          </h2>
        </div>

        {/* camera top-left decorative */}
        <div className="absolute left-4 top-12 md:left-10 md:top-42 z-30 pointer-events-none" style={{ width: 120, maxWidth: "18%" }}>
          <div className="relative w-full aspect-[1/1]">
            <Image src="/Elements/camera.png" alt="camera" fill style={{ objectFit: "contain" }} priority />
          </div>
        </div>

        {/* gallery grid */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 justify-items-center">
            {PHOTOS.map((src, idx) => (
              <div key={idx} className={`relative w-[220px] sm:w-[240px] md:w-[260px] lg:w-[280px] ${ROTATIONS[idx % ROTATIONS.length]}`}>
                {/* pin */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                  {/** if you have pin.png use Image; otherwise show a red circle */}
                  <div className="w-6 h-6 rounded-full bg-red-600 shadow-md" />
                  {/* <div className="relative w-6 h-6">
                  <Image src="/Elements/pin.png" alt="pin" fill style={{ objectFit: "contain" }} />
                </div> */}
                </div>

                {/* polaroid frame */}
                <div className="bg-white rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.25)] pt-4 pb-6 px-3">
                  <div className="relative w-full aspect-[4/3] bg-black overflow-hidden rounded-lg">
                    {/* inner image */}
                    <Image
                      src={src}
                      alt={`gallery-${idx + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />

                    {/* transparent overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                  </div>

                  {/* small caption / white strip (polaroid) */}
                  <div className="mt-3 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* piano decorative bottom-right */}
        <div className="absolute right-0 bottom-[-90px] md:bottom-0 lg:bottom-[-90px] z-0 pointer-events-none" style={{ width: "36%", maxWidth: 420 }}>
          <div className="relative w-full aspect-[4/3]">
            <Image src="/Elements/keyboard.png" alt="keyboard" fill style={{ objectFit: "contain" }} priority />
          </div>
        </div>
        {/* spacing for next section */}
        <div className="absolute -left-2 right-0 bottom-[-120px]  pointer-events-none z-0">
          <div className="relative w-screen overflow-visible transform rotate-1 ">
            <div className="relative w-screen h-16 md:h-24 lg:h-48 ">
              <Image src="/Elements/stripe.png" alt="stripe top" fill style={{ objectFit: "cover" }} priority />
            </div>
          </div>
        </div>
        <div className="h-28 md:h-36 lg:h-48" />
      </section>
      <section className="relative w-full overflow-visible bg-black">

        <Footer />
      </section>
    </main>
  );
}
