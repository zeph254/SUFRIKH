import { FaStar, FaMapMarkerAlt, FaClock, FaUtensils, FaWineGlassAlt } from 'react-icons/fa';
import { GiMeal, GiForkKnifeSpoon } from 'react-icons/gi';

// Using placeholder images (replace with your actual restaurant images)
const restaurant1 = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
const restaurant2 = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
const restaurant3 = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";

const Restaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Al-Noor Fine Dining",
      cuisine: "Arabic Fusion",
      description: "Halal-certified gourmet experience with panoramic city views",
      hours: "6:00 PM - 11:30 PM",
      rating: 4.9,
      image: restaurant1,
      features: [
        { icon: <GiMeal />, name: "100% Halal" },
        { icon: <FaUtensils />, name: "Chef's Tasting Menu" },
        { icon: <FaWineGlassAlt />, name: "Non-Alcoholic Bar" },
        { icon: <GiForkKnifeSpoon />, name: "Private Dining" }
      ]
    },
    {
      id: 2,
      name: "Saffron Terrace",
      cuisine: "Middle Eastern",
      description: "Authentic regional dishes in an elegant courtyard setting",
      hours: "12:00 PM - 11:00 PM",
      rating: 4.7,
      image: restaurant2,
      features: [
        { icon: <GiMeal />, name: "Halal Certified" },
        { icon: <FaUtensils />, name: "Family Section" },
        { icon: <FaWineGlassAlt />, name: "Date Night Specials" },
        { icon: <GiForkKnifeSpoon />, name: "Live Cooking Stations" }
      ]
    },
    {
      id: 3,
      name: "Zaitoun Lounge",
      cuisine: "Mediterranean",
      description: "Modern interpretations of classic dishes with premium ingredients",
      hours: "5:00 PM - 12:00 AM",
      rating: 4.8,
      image: restaurant3,
      features: [
        { icon: <GiMeal />, name: "Halal Meat Only" },
        { icon: <FaUtensils />, name: "Organic Produce" },
        { icon: <FaWineGlassAlt />, name: "Artisan Beverages" },
        { icon: <GiForkKnifeSpoon />, name: "Chef's Table" }
      ]
    }
  ];

  return (
    <div className="pt-2">
      {/* Hero Banner */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-emerald-800 to-emerald-600">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="container mx-auto px-4 z-20 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
            Halal Gourmet Dining
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Experience culinary excellence while maintaining strict Islamic dietary standards
          </p>
        </div>
      </section>

      {/* Restaurant Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-playfair mb-2">
              Our Signature Restaurants
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each venue offers a unique halal dining experience with premium ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center">
                    <FaStar className="mr-1" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-playfair">{restaurant.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                      {restaurant.cuisine}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaClock className="mr-2 text-emerald-600" />
                    <span>{restaurant.hours}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{restaurant.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {restaurant.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="text-emerald-600 mr-2">{feature.icon}</span>
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Reserve Table
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Philosophy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Halal Kitchen" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold font-playfair mb-6">Our Halal Commitment</h2>
              <p className="text-gray-700 mb-6">
                At Sufrikh, we go beyond basic halal certification. Our culinary team works exclusively with 
                ethical suppliers who meet our strict Islamic standards for animal welfare and food preparation.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Dedicated halal butchers on-site
                </li>
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Separate preparation areas
                </li>
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Alcohol-free environment
                </li>
                <li className="flex items-center">
                  <FaStar className="text-emerald-600 mr-2" /> Zabihah-certified meats only
                </li>
              </ul>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">
            Ready for an Exceptional Halal Dining Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Reserve your table at one of our award-winning restaurants today
          </p>
          <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all shadow-lg">
            Book a Table
          </button>
        </div>
      </section>
    </div>
  );
};

export default Restaurants;