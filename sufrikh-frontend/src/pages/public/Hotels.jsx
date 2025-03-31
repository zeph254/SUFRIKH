import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaPray, FaUtensils } from 'react-icons/fa';
import { GiMeal, GiPrayer } from 'react-icons/gi';
const hotel1 = "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
const hotel2 = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
const hotel3 = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";

const Hotels = () => {
  const hotels = [
    {
      id: 1,
      name: "Sufrikh Grand Dubai",
      location: "Downtown Dubai",
      description: "Luxury 5-star hotel with stunning Burj Khalifa views and premium Islamic amenities",
      price: "$350/night",
      rating: 5,
      image: hotel1,
      amenities: [
        { icon: <FaPray />, name: "Prayer Room" },
        { icon: <GiMeal />, name: "Halal Dining" },
        { icon: <FaSwimmingPool />, name: "Private Pool" },
        { icon: <FaWifi />, name: "High-Speed WiFi" }
      ]
    },
    {
      id: 2,
      name: "Sufrikh Palace Abu Dhabi",
      location: "Corniche Road",
      description: "Opulent waterfront property with separate family and business facilities",
      price: "$420/night",
      rating: 5,
      image: hotel2,
      amenities: [
        { icon: <GiPrayer />, name: "Masjid" },
        { icon: <FaUtensils />, name: "24/7 Halal Kitchen" },
        { icon: <FaSwimmingPool />, name: "Infinity Pool" },
        { icon: <FaWifi />, name: "Business Center" }
      ]
    },
    {
      id: 3,
      name: "Sufrikh Oasis Riyadh",
      location: "King Abdullah Road",
      description: "Modern desert-inspired retreat with private prayer spaces in every suite",
      price: "$380/night",
      rating: 5,
      image: hotel3,
      amenities: [
        { icon: <FaPray />, name: "Qibla in Rooms" },
        { icon: <GiMeal />, name: "Gourmet Halal" },
        { icon: <FaSwimmingPool />, name: "Spa Pool" },
        { icon: <FaWifi />, name: "Lounge Access" }
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
            Our Luxury Hotels
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Experience Islamic hospitality at its finest with our premium accommodations
          </p>
        </div>
      </section>

      {/* Hotel Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-playfair mb-2">
              Halal Luxury Accommodations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each property is meticulously designed to meet Islamic requirements while providing world-class comfort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center">
                    <FaStar className="mr-1" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-playfair">{hotel.name}</h3>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-medium">
                      {hotel.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2 text-emerald-600" />
                    <span>{hotel.location}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{hotel.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="text-emerald-600 mr-2">{amenity.icon}</span>
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-playfair mb-2">
              Islamic-Centric Amenities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go beyond standard halal requirements to ensure complete comfort
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <GiPrayer className="text-4xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prayer Facilities</h3>
              <p className="text-gray-600">
                Dedicated prayer rooms with Qibla direction, prayer mats, and Quran in every room
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <GiMeal className="text-4xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Halal Dining</h3>
              <p className="text-gray-600">
                Certified halal kitchens with separate preparation areas and dedicated utensils
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <FaSwimmingPool className="text-4xl text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Private Facilities</h3>
              <p className="text-gray-600">
                Gender-segregated swimming pools and spa facilities for complete privacy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-playfair mb-4">
            Ready to Experience Islamic Luxury?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay at one of our premium hotels today
          </p>
          <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-full font-medium transition-all shadow-lg">
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hotels;