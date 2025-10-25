// src/pages/ForbiddenAccess.jsx
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ForbiddenAccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center space-y-6 p-10 bg-deepG/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-deepG"
      >
        <FaLock className="text-6xl text-red-500" />
        <h1 className="text-3xl font-bold">403 - Forbidden Access</h1>
        <p className="text-gray-300 text-center max-w-md">
          You don’t have permission to access this page. Please contact an administrator if you believe this is a mistake.
        </p>

        <Link
          to="/"
          className="px-6 py-3 bg-lightG hover:bg-deepG hover:text-lightG rounded-lg text-deepG font-semibold transition-all duration-300 shadow-lg"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
