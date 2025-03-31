import { FaStar, FaHandsHelping, FaLeaf, FaQuran } from 'react-icons/fa';
import { GiMeal, GiFamilyHouse } from 'react-icons/gi';
import aboutHero from '../assets/about-hero.jpg'; // Replace with your image
import founder from '../assets/founder.jpg'; // Replace with your image

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
              <div className="bg-gray-200 h-64 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold">Omar Al-Mansoori</h3>
              <p className="text-emerald-600 mb-2">CEO & Founder</p>
              <p className="text-gray-600">
                20+ years in halal hospitality management
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold">Aisha Rahman</h3>
              <p className="text-emerald-600 mb-2">Head Chef</p>
              <p className="text-gray-600">
                Certified halal cuisine specialist
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gray-200 h-64 rounded-full mx-auto mb-4"></div>
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