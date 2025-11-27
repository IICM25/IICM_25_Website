import { eventsData } from '../../data/events';
import { StaggeredFadeIn } from '../../components/FadeIn';
import { Card } from '../../components/event-card';

const EventsHubPage = () => {
  return (
    <section
      className="relative min-h-screen pt-32 pb-20 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/top.png')" }} // 🔹 change this path to your actual image
    >
      {/* Overlay for better text visibility */}
      {/* <div className="absolute inset-0 bg-black/10"></div> */}

      {/* Main content */}
      <div className="relative container mx-auto px-6 text-center text-white">
        <h1 className="font-title retro-font retro-outline select-none text-[3.6rem] md:text-[6rem] lg:text-[5rem] leading-none tracking-wider text-primary drop-shadow-lg">
          Events & Competitions
        </h1>

        <p className="text-xl vintage-title  text-secondary mt-2 max-w-2xl mx-auto drop-shadow-md">
          The stage is set. The challenges await. Find your fire and compete with the best across a spectrum of cultural showcases.
        </p>

        <StaggeredFadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {eventsData.map((event) => (
              <Card
                key={event.slug}
                href={`/events/${event.slug}`}
                title={event.title}
                subtitle={event.category}
                imageUrl={event.imageUrl}
              />
            ))}
          </div>
        </StaggeredFadeIn>
      </div>
    </section>
  );
};

export default EventsHubPage;
