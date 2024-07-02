import logo from "../Assets/logo-transparent-png.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div
      className="bg-no-repeat bg-cover h-screen text-white"
      style={{
        backgroundImage: `url(${"https://images.unsplash.com/photo-1615680022647-99c397cbcaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG9wZW4lMjB3b3JsZCUyMGdhbWVzfGVufDB8fDB8fHww"})`,
        textShadow: "2px 2px 4px #000000",
      }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -75 }}
        animate={{ opacity: 1, y: 25 }}
        transition={{ duration: 1 }}
        className="p-5"
      >
        <motion.img
          src={logo}
          className="h-24 w-1/10 rounded-full"
          alt="Logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        ></motion.img>
        <motion.h1
          className="text-center flex justify-center text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Welcome to Open World Gaming!
        </motion.h1>
        <motion.p
          className="text-center flex justify-center text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Experience the thrill of exploration and adventure in our vast
          selection of open-world games.
        </motion.p>
      </motion.nav>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <Link to="/login">
          <motion.button
            className="py-3 px-4 border-[10px] border-transparent ml-[45%] mt-[20%] rounded-[0.45em] text-[#373B44] bg-gradient-conic-90deg-from-[#0000]-[#373B44] hover:bg-[#373B44] hover:text-white focus-visible:outline-[#373B44] focus-visible:outline-offset-[0.05em] focus-visible:outline-[3px] focus-visible:border-transparent transition-all duration-300 select-none touch-manipulation"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Games
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingPage;
