import React from "react";

function AboutIITK() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/iitk_image.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative text-center text-white">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
            IIT Kanpur
          </h1>
          <p className="text-2xl font-light tracking-wide">
            Legacy of Excellence
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#fefaf4] py-16 px-8 md:px-20">
        <h2
          className="text-4xl font-bold text-center mb-6"
          style={{ color: "rgb(89,126,130)" }}
        >
          About IIT Kanpur
        </h2>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed text-center mb-12 text-gray-700">
          The Indian Institute of Technology Kanpur (IIT Kanpur) is one of the
          premier engineering institutions in India. Established in 1959, IIT
          Kanpur has played a pivotal role in providing the technical manpower
          and know-how to the country for over six decades.
          <br />
          <br />
          With a strong emphasis on academic excellence, research, and
          innovation, IIT Kanpur continues to shape the future of technology and
          engineering education in India and beyond.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Excellence",
              desc: "Ranked among India's top technical institutions",
            },
            {
              title: "Research",
              desc: "Leading innovation and groundbreaking discoveries",
            },
            {
              title: "Community",
              desc: "Diverse and talented student body",
            },
            {
              title: "Global Impact",
              desc: "Alumni making difference worldwide",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition border-t-4"
              style={{ borderTopColor: "rgb(211,113,59)" }}
            >
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "rgb(89,126,130)" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <blockquote
          className="max-w-2xl mx-auto mt-10 italic text-lg text-center border-l-4 pl-4"
          style={{
            color: "rgb(211,113,59)",
            borderColor: "rgb(223,165,83)",
          }}
        >
            &quot;Freedom of thought and action is the cornerstone of our academic
            philosophy&quot;
        </blockquote>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-8 md:px-20 bg-[#fffdf8]">
        <h2
          className="text-4xl font-bold text-center mb-10"
          style={{ color: "rgb(89,126,130)" }}
        >
          Leadership Messages
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Director */}
          <div
            className="bg-white rounded-xl shadow-lg p-8 border-t-4"
            style={{ borderTopColor: "rgb(89,126,130)" }}
          >
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: "rgb(89,126,130)" }}
              >
                Director&apos;s Message
              </h3>
            <p className="font-semibold">Prof. [Director Name]</p>
            <p className="text-gray-600 mb-4">Director, IIT Kanpur</p>
            <p className="text-gray-700 leading-relaxed">
              Welcome to IIT Kanpur, where excellence meets innovation. Our
              commitment remains steadfast — to nurture brilliant minds, foster
              groundbreaking research, and create leaders who will shape the
              future of our nation and the world.
              <br />
              <br />
              <span
                className="font-semibold"
                style={{ color: "rgb(211,113,59)" }}
              >
                Together, we strive for excellence in every endeavor.
              </span>
            </p>
          </div>

          {/* Dean */}
          <div
            className="bg-white rounded-xl shadow-lg p-8 border-t-4"
            style={{ borderTopColor: "rgb(223,165,83)" }}
          >
              <h3
                className="text-2xl font-semibold mb-2"
                style={{ color: "rgb(89,126,130)" }}
              >
                Dean&apos;s Message
              </h3>
            <p className="font-semibold">Prof. [Dean Name]</p>
            <p className="text-gray-600 mb-4">
              Dean of Academic Affairs, IIT Kanpur
            </p>
            <p className="text-gray-700 leading-relaxed">
              At IIT Kanpur, we believe in holistic development that goes beyond
              textbooks and classrooms. We empower students to become critical
              thinkers, innovators, and problem solvers.
              <br />
              <br />
              <span
                className="font-semibold"
                style={{ color: "rgb(211,113,59)" }}
              >
                Join us in this exciting journey of learning and growth.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 px-8 md:px-20" style={{ background: "rgb(89,126,130,0.1)" }}>
        <h2
          className="text-4xl font-bold text-center mb-4"
          style={{ color: "rgb(89,126,130)" }}
        >
          Legacy of IIT Kanpur
        </h2>
        <p className="text-center text-gray-700 mb-10">
          Six decades of pioneering education, research, and innovation that
          shaped modern India
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
          <img
            src="/images/old_image.png"
            alt="Historic Campus"
            className="rounded-xl w-full md:w-1/2 shadow-md"
          />
          <div className="bg-white rounded-xl shadow p-6 md:w-1/2">
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: "rgb(211,113,59)" }}
            >
              A Historic Journey
            </h3>
            <p className="text-gray-700">
              Established in 1959, IIT Kanpur was one of the first IITs to be
              set up with international collaboration under the Kanpur
              Indo-American Programme (KIAP). It has since become a cradle of
              innovation and a symbol of excellence in engineering education.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3
            className="text-3xl font-bold text-center mb-8"
            style={{ color: "rgb(89,126,130)" }}
          >
            Historic Milestones
          </h3>
          <div
            className="border-l-4 pl-6 space-y-6"
            style={{ borderColor: "rgb(223,165,83)" }}
          >
            {[
              {
                year: 1959,
                text: "IIT Kanpur established with support from USA",
              },
              { year: 1963, text: "First batch of students graduated" },
              {
                year: 1972,
                text: "Computer Centre established – first in India",
              },
              { year: 1994, text: "Launched distance education initiatives" },
              { year: 2020, text: "Expanded global research collaborations" },
            ].map((item, i) => (
              <div key={i}>
                <h4
                  className="font-bold text-xl"
                  style={{ color: "rgb(211,113,59)" }}
                >
                  {item.year}
                </h4>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-8 md:px-20 bg-[#fffdf8] text-center">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: "rgb(89,126,130)" }}
        >
          Our Vision
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
          To be a premier institution of global standing that creates and
          disseminates knowledge, and provides leadership in technical
          education, basic and applied research, innovation, entrepreneurship,
          and related activities of relevance to India and the world.
        </p>
      </section>
    </div>
  );
}

export default AboutIITK;