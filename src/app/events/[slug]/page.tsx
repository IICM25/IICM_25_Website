"use client";

import { useParams } from "next/navigation";
import { EventDetails } from "./eventDetails";
import eventsData from "./events.json" assert { type: "json" };

const data = eventsData as Record<string, any>;

const IndividualEventPage = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const eventData = data[slug];

  if (!eventData) {
    return (
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/mid.png')" }}
      >
        <h2 className="text-2xl text-primary">Event not found</h2>
      </section>
    );
  }

  const category =
    slug === "MnM" ? "Management & Marketing" : "Technology Event";
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <section
      className="min-h-screen pt-32 pb-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/mid.png')" }}
    >
      <div className="container mx-auto px-6 text-center">
        {/* <p className="text-lg font-semibold uppercase tracking-widest text-secondary">
          {category}
        </p>
        <h1 className="font-title text-6xl md:!text-8xl text-red mt-2">
          {title}
        </h1> */}

        <div >
          <EventDetails slug={slug} />
        </div>
      </div>
    </section>
  );
};

export default IndividualEventPage;

