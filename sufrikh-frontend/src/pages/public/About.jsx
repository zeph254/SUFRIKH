import { FaStar, FaHandsHelping, FaLeaf, FaQuran } from 'react-icons/fa';
import { GiMeal, GiFamilyHouse } from 'react-icons/gi';
const aboutHero = "https://image-tc.galaxy.tf/wijpeg-atmlti3s77143nc01j0qrxhwn/terrace-dining-at-zanzibar-serena-hotel.jpg?width=1600&height=1066"
const founder ="https://media.worldnomads.com/social-share-images/africa/etiquette-in-tanzania-socials.jpg"

const About = () => {
  const values = [
    {
      icon: <FaQuran className="text-4xl text-emerald-600" />,
      title: "Quranic Principles",
      description: "We operate on Islamic business ethics and halal standards"
    },
    {
      icon: <GiMeal className="text-4xl text-emerald-600" />,
      title: "Halal Excellence",
      description: "100% halal-certified ingredients and preparation"
    },
    {
      icon: <FaHandsHelping className="text-4xl text-emerald-600" />,
      title: "Community Service",
      description: "Giving back through zakat and sadaqah initiatives"
    },
    {
      icon: <FaLeaf className="text-4xl text-emerald-600" />,
      title: "Sustainable Luxury",
      description: "Eco-friendly practices that honor Allah's creation"
    }
  ];

  return (
    <div className="pt-2">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/80 z-10"></div>
        <img 
          src={aboutHero} 
          alt="Sufrikh Luxury Property" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 z-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            Our Islamic Hospitality Journey
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Where premium comfort meets authentic Islamic values
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-playfair mb-6">
                The Sufrikh Legacy
              </h2>
              <p className="text-gray-700 mb-4">
                Founded in 2015, Sufrikh Hotels & Restaurants began with a simple vision: to create 
                spaces where Muslim travelers could experience uncompromising luxury without 
                compromising their deen.
              </p>
              <p className="text-gray-700 mb-6">
                What started as a single boutique hotel in Dubai has grown into an award-winning 
                international hospitality brand, all while maintaining our core commitment to 
                Islamic principles and exceptional service.
              </p>
              <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-600">
                <p className="italic text-gray-700">
                  "We don't just serve guests - we honor them as Allah's guests, with the highest 
                  standards of halal hospitality and genuine care."
                </p>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src={founder} 
                alt="Sufrikh Founder" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-playfair mb-4">
              Our Islamic Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide every aspect of our hospitality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-playfair mb-4">
              Our Dedicated Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Muslim hospitality professionals who embody our values
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 h-64 rounded-full mx-auto mb-4">
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt="Omar Al-Mansoori" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Omar Al-Mansoori</h3>
              <p className="text-emerald-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600">
                20+ years in halal hospitality management
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 rounded-full mx-auto mb-4">
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt="Aisha Rahman" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Aisha Rahman</h3>
              <p className="text-emerald-600 mb-2">Head Chef</p>
              <p className="text-gray-600">
                Certified halal cuisine specialist
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 rounded-full mx-auto mb-4">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC6KGUH5kL0gtXYinUL-KAJdrhSsKcydgMjg&s" 
                  alt="Yusuf Abdullah" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Yusuf Abdullah</h3>
              <p className="text-emerald-600 mb-2">Guest Experience Director</p>
              <p className="text-gray-600">
                Ensures Islamic-compliant services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">
            Experience Our Hospitality
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the difference of truly halal luxury accommodation and dining
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all shadow-lg">
              Book a Stay
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-medium transition-all">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;