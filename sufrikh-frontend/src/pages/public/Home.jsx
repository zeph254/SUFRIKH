import { FaArrowRight, FaMapMarkerAlt, FaPhone, FaStar, FaPray } from 'react-icons/fa';
import { GiMeal, GiPrayer } from 'react-icons/gi';

// Using placeholder images
const hero_image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";
const hotel = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
const restaurantImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

const Home = () => {
  const features = [
    {
      icon: <GiMeal className="text-3xl text-emerald-600" />,
      title: "Halal Certified",
      description: "100% Halal ingredients and preparation"
    },
    {
      icon: <GiPrayer className="text-3xl text-emerald-600" />,
      title: "Prayer Facilities",
      description: "Dedicated prayer rooms with Qibla direction"
    },
    {
      icon: <FaStar className="text-3xl text-emerald-600" />,
      title: "Luxury Experience",
      description: "5-star service with Islamic values"
    }
  ];

  return (
    <div className="pt-2">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={hero_image} 
          alt="Sufrikh Luxury Hotel" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="container mx-auto px-4 z-20 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center mb-4">
              <GiMeal className="text-4xl text-emerald-400" />
              <span className="ml-3 text-4xl font-bold font-playfair">Sufrikh</span>
              <FaStar className="ml-2 text-yellow-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-playfair mb-6 leading-tight">
              Islamic Luxury <br/>Redefined
            </h1>
            
            <p className="text-xl mb-8 max-w-lg">
              Experience premium hospitality that harmonizes modern comfort with Islamic traditions
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center">
                Book Now <FaArrowRight className="ml-2" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-all border border-white/20">
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-playfair mb-4">Our Islamic Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine luxury hospitality with authentic Islamic principles for a truly halal experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src={hotel} 
                alt="Sufrikh Hotel" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-playfair mb-6">Luxury Accommodations</h2>
              <p className="text-gray-700 mb-6">
                Our boutique hotels offer meticulously designed spaces with prayer facilities in every room, 
                Quran availability, and gender-segregated amenities according to Islamic principles.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Private prayer spaces
                </li>
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Halal room service
                </li>
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Islamic art and architecture
                </li>
              </ul>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                View Hotels
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src={restaurantImage} 
                alt="Sufrikh Restaurant" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-playfair mb-6">Halal Gourmet Dining</h2>
              <p className="text-gray-700 mb-6">
                Experience culinary excellence with our halal-certified restaurants featuring international 
                cuisines prepared by award-winning chefs, all while maintaining strict Islamic dietary standards.
              </p>
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-emerald-600 mr-2" />
                  <span>123 Islamic Avenue, Dubai, UAE</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-emerald-600 mr-2" />
                  <span>+971 4 123 4567</span>
                </div>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                View Restaurants
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-6">Ready for an Authentic Islamic Luxury Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay or reserve a table at our award-winning restaurants today
          </p>
          <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all shadow-lg">
            Contact Us Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;