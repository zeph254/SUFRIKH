import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHotel, 
  FaUtensils, 
  FaPrayingHands as FaPray, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaStar
} from "react-icons/fa";
import { GiMeal } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add shadow when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Hotels", path: "/hotels", icon: <FaHotel className="mr-2" /> },
    { name: "Restaurants", path: "/restaurants", icon: <FaUtensils className="mr-2" /> },
    { name: "Prayer Times", path: "/prayer-times", icon: <FaPray className="mr-2" /> },
    { name: "Account", path: "/account", icon: <FaUser className="mr-2" /> },
  ];

  return (
    <>
      {/* This empty div acts as a spacer to prevent content overlap */}
      <div className="h-20"></div>
      
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg" : "bg-white bg-opacity-90 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo - More modern with hover effect */}
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <GiMeal className="text-3xl text-emerald-600 group-hover:text-emerald-700 transition-colors" />
              <span className="ml-2 text-2xl font-bold font-playfair text-primary-dark group-hover:text-emerald-700 transition-colors">
                Sufrikh
              </span>
              <FaStar className="ml-1 text-yellow-400 text-sm group-hover:rotate-12 transition-transform" />
            </Link>

            {/* Desktop Navigation - More spacious and modern */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                Book Now
              </button>
            </nav>

            {/* Mobile Menu Button - More visible */}
            <button
              className="md:hidden text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? (
                <FaTimes size={24} className="text-emerald-600" />
              ) : (
                <FaBars size={24} />
              )}
            </button>
          </div>

          {/* Mobile Menu - Improved spacing and design */}
          {isOpen && (
            <div className="md:hidden bg-white mt-4 rounded-xl shadow-xl p-4 border border-gray-100">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "bg-emerald-100 text-emerald-700 font-medium"
                        : "text-gray-700 hover:bg-emerald-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
                <button 
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-full font-medium mt-2 shadow-md hover:shadow-lg transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;