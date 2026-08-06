"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InstagramIcon from "@mui/icons-material/Instagram";

// Official Instagram brand gradient: yellow -> orange -> pink -> purple -> blue
const IG_GRADIENT =
  "linear-gradient(45deg, #FCAF45 0%, #F56040 25%, #E1306C 50%, #833AB4 75%, #405DE6 100%)";

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div
        className="relative py-10 z-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Side Cars Container - clipped */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left Car - Peeking In */}
          <motion.img
            src="/images/will_faded.png"
            alt="Car background"
            className="absolute -left-10 sm:-left-20 lg:-left-32 -top-16 transform -translate-y-1/2 w-72 sm:w-96 lg:w-[500px] h-64 sm:h-96 lg:h-[500px] opacity-40 pointer-events-none object-contain"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />

          {/* Right Car - Peeking In */}
          <motion.img
            src="/images/z06_faded.png"
            alt="Car background"
            className="absolute -right-16 sm:-right-2 lg:-right-16 top-[85px] lg:-top-[60px] w-72 sm:w-96 lg:w-[600px] h-72 sm:h-96 lg:h-[520px] opacity-40 pointer-events-none object-contain"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        {/* Middle Car - behind cards centered */}
        <motion.img
          src="/images/nubboi_faded.png"
          alt="Car background"
          className="absolute right-2 -translate-x-1/2 lg:right-1/4 top-[420px] lg:top-[300px] w-[900px] lg:w-[900px] h-56 sm:h-80 lg:h-96 opacity-40 z-10 pointer-events-none object-contain"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-12"
            variants={itemVariants}
          >
            {/* Text Content */}
            <div className="flex-1">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white"
                variants={itemVariants}
              >
                Idle <span className="text-cyan-400">Sundays</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Join us for scenic backroads cruises through Wisconsin.
                Experience the thrill of automotive passion with a community of
                enthusiasts who share your love for cars and bikes alike.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <Link
                  href="/calendar"
                  className="px-8 py-3 bg-cyan-400 text-black font-bold rounded border border-cyan-300 hover:border-cyan-300 hover:bg-black hover:text-white transition-all text-center"
                >
                  View Events
                </Link>

                <a
                  href="https://www.facebook.com/share/g/18Q3Uf6vyR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center"
                >
                  Join Community
                </a>

                <Link
                  href="/instagram"
                  className="flex items-center justify-center gap-2 px-8 py-3 text-white font-bold rounded transition-all hover:text-black text-center"
                  style={{ background: IG_GRADIENT }}
                >
                  <InstagramIcon sx={{ fontSize: 22 }} />
                  Follow Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-16 border-t border-gray-700 relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-8"
            variants={itemVariants}
          >
            Why Join <span className="text-cyan-400">Idle Sundays?</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-4"
            variants={containerVariants}
          >
            {[
              {
                icon: <AltRouteIcon sx={{ fontSize: 48, color: "#06B6D4" }} />,
                title: "Scenic Routes",
                description: "Explore beautiful backroads through Wisconsin",
              },
              {
                icon: <PeopleAltIcon sx={{ fontSize: 48, color: "#06B6D4" }} />,
                title: "Community",
                description: "Connect with passionate car enthusiasts",
              },
              {
                icon: (
                  <EmojiEventsIcon sx={{ fontSize: 48, color: "#06B6D4" }} />
                ),
                title: "Events",
                description: "Regular organized meet-ups and cruises",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="backdrop-blur-sm p-3 rounded border border-gray-700 hover:border-cyan-400 transition-colors relative z-30"
                variants={itemVariants}
              >
                <div className="text-5xl mb-2">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-1.5">{feature.title}</h3>
                <p className="text-lg text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="py-6 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Car */}
        <img
          src="/images/neela_faded.png"
          alt="Car background"
          className="absolute right-4 top-16 transform -translate-y-1/2 lg:right-1/3 lg:top-32 w-80 lg:w-[500px] h-72 lg:h-[480px] opacity-30 pointer-events-none object-contain z-0"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Still not sure?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Check out our upcoming events, the Idle Sundays Facebook community,
            and our Instagram
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link
              href="/calendar"
              className="px-10 py-4 bg-cyan-400 text-black font-bold rounded border border-cyan-300 hover:border-cyan-300 hover:bg-black hover:text-white transition-all text-center"
            >
              Explore Events
            </Link>
            <a
              href="https://www.facebook.com/share/g/18Q3Uf6vyR/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center"
            >
              Join on Facebook
            </a>
            <Link
              href="/instagram"
              className="flex items-center justify-center gap-2 px-10 py-4 text-white font-bold rounded transition-all hover:text-black text-center"
              style={{ background: IG_GRADIENT }}
            >
              <InstagramIcon sx={{ fontSize: 24 }} />
              Follow on Instagram
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
