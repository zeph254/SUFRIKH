import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Animated 404 Message */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-8xl font-bold text-red-500"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-4 text-lg text-gray-400"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Animated SVG */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="200"
          height="200"
          className="fill-current text-gray-500"
        >
          <path d="M11.6 1.2a1 1 0 0 1 .8 0l10 4A1 1 0 0 1 23 6v12a1 1 0 0 1-.6.9l-10 4a1 1 0 0 1-.8 0l-10-4A1 1 0 0 1 1 18V6a1 1 0 0 1 .6-.8zM21 7.38l-8-3.2v14.45l8-3.2zM11 4.18 3 7.38v10.05l8 3.2z"></path>
        </svg>
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NoPage;
