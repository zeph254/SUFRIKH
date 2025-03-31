import { useState } from 'react';
import { 
  FaHotel, 
  FaUtensils, 
  FaPrayingHands, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaTripadvisor,
  FaStar
} from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#2E5266] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <GiMeal className="text-3xl text-emerald-400" />
              <span className="ml-2 text-2xl font-bold font-playfair">Sufrikh</span>
              <FaStar className="ml-1 text-yellow-400 text-sm" />
            </div>
            <p className="text-gray-300">
              Premium Halal hospitality experiences blending modern luxury with Islamic traditions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110">
                <FaTripadvisor className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-emerald-500 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <FaHotel className="mr-2 transition-transform group-hover:translate-x-1" /> 
                  <span className="group-hover:underline">Hotels</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <FaUtensils className="mr-2 transition-transform group-hover:translate-x-1" /> 
                  <span className="group-hover:underline">Restaurants</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <FaPrayingHands className="mr-2 transition-transform group-hover:translate-x-1" /> 
                  <span className="group-hover:underline">Prayer Facilities</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:underline">Halal Certification</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-emerald-500 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
                <span className="group-hover:underline cursor-pointer">123 Islamic Avenue, Dubai, UAE</span>
              </li>
              <li className="flex items-center group">
                <FaPhone className="mr-3 group-hover:text-emerald-400 transition-colors" />
                <span className="group-hover:underline cursor-pointer">+971 4 123 4567</span>
              </li>
              <li className="flex items-center group">
                <FaEnvelope className="mr-3 group-hover:text-emerald-400 transition-colors" />
                <span className="group-hover:underline cursor-pointer">info@sufrikh.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Language */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-emerald-500 pb-2">Stay Updated</h3>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded bg-[#3a647a] border border-gray-500 focus:outline-none focus:border-emerald-400 text-white placeholder-gray-300"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Join
                </button>
              </div>
              {isSubscribed && (
                <p className="mt-2 text-emerald-400 text-sm">Thank you for subscribing!</p>
              )}
            </form>

            <div className="flex items-center">
              <span className="mr-2 text-gray-300">Language:</span>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-[#3a647a] text-white px-3 py-1 rounded text-sm border border-gray-500 focus:outline-none focus:border-emerald-400"
              >
                <option value="EN">English</option>
                <option value="AR">العربية</option>
                <option value="UR">اردو</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#3a647a] pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sufrikh Hotels & Restaurants. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Halal Compliance</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">Careers</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;