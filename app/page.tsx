"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
        className="relative py-20 z-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Car - Peeking In */}
        <img
          src="/images/will_faded.png"
          alt="Car background"
          className="absolute -right-12 sm:-left-20 lg:-left-32 top-1/4 sm:top-1/2 transform -translate-y-1/2 w-72 sm:w-96 lg:w-[500px] h-64 sm:h-96 lg:h-[500px] opacity-50 sm:opacity-60 lg:opacity-70 pointer-events-none object-contain"
        />

        {/* Right Car - Peeking In */}
        <img
          src="/images/z06_faded.png"
          alt="Car background"
          className="absolute -right-8 sm:-right-2 lg:-right-16 -bottom-20 w-72 sm:w-96 lg:w-[600px] h-72 sm:h-96 lg:h-[520px] opacity-50 sm:opacity-60 lg:opacity-70 pointer-events-none object-contain"
        />

        {/* Middle Car - behind cards centered */}
        <img
          src="/images/nubboi_faded.png"
          alt="Car background"
          className="absolute left-1/2 -translate-x-1/2 top-20 sm:top-32 lg:top-[450px] w-56 sm:w-80 lg:w-[900px] h-56 sm:h-80 lg:h-96 opacity-30 sm:opacity-40 lg:opacity-50 z-10 pointer-events-none object-contain"
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
                enthusiasts who share your love for cars.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <Link
                  href="/calendar"
                  className="px-8 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-all text-center"
                >
                  View Events
                </Link>

                <a
                  href="https://www.facebook.com/groups/idlesundayswisconsin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center"
                >
                  Join Community
                </a>
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
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            Why Join <span className="text-cyan-400">Idle Sundays?</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                icon: "🛣️",
                title: "Scenic Routes",
                description: "Explore beautiful backroads through Wisconsin",
              },
              {
                icon: "👥",
                title: "Community",
                description: "Connect with passionate car enthusiasts",
              },
              {
                icon: "🎯",
                title: "Events",
                description: "Regular organized meet-ups and cruises",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="backdrop-blur-sm p-6 rounded border border-gray-700 hover:border-cyan-400 transition-colors relative z-30"
                variants={itemVariants}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-lg text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="bg-gray-900 py-16 border-t border-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            variants={itemVariants}
          >
            Ready for Your Next Adventure?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Check out our upcoming events and join the Idle Sundays community
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/calendar"
              className="px-10 py-4 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-all inline-block"
            >
              Explore Events
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
