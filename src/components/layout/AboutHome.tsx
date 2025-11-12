import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-screen overflow-hidden bg-[#e88f33] speckle">
      {/* top stripe */}
      <div className="absolute left-0 right-0 top-[-20px] pointer-events-none z-30">
        <div className="w-full h-16 md:h-24 lg:h-32 relative">
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
      <div className="absolute left-0 right-0 bottom-0 pointer-events-none z-20">
        <div className="w-full h-12 md:h-24 lg:h-32 relative">
          <Image
            src="/Elements/stripe.png"
            alt="film strip bottom"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>

      {/* content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Text column */}
          <div className="lg:col-span-7">
            <h1 className="vintage-title text-5xl md:text-6xl lg:text-7xl leading-tight font-extrabold mb-6">
              About
            </h1>

            <div className="vintage-body text-sm md:text-base lg:text-lg leading-relaxed space-y-6 max-w-3xl">
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
      <div className="absolute right-0 bottom-24 md:bottom-28 lg:bottom-36 z-30 pointer-events-none guitar-smooth"
           style={{ width: "32%", maxWidth: 380, minWidth: 180 }}>
        {/* Use a wrapper with responsive width; Image with layout 'fill' to preserve ratio */}
        <div className="relative w-full aspect-[3/4]">
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
      <div className="h-36 md:h-32 lg:h-40" />
    </section>
  );
}
