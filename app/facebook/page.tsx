"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { People, DirectionsCar, Map } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function FacebookPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-6 py-2 px-8 rounded-lg relative overflow-hidden"
            style={{
              backgroundImage: "url(/images/fb_banner.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            variants={itemVariants}>
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Join Our <span className="text-cyan-400">Community</span>
              </h1>
              <p className="text-xl text-gray-400">
                Connect with Idle Sundays members on Facebook
              </p>
            </div>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border-2 border-cyan-400 p-8 mb-12"
            variants={itemVariants}>
            <div className="text-center">
              <FacebookIcon
                sx={{ fontSize: 96, color: "#06B6D4", marginBottom: 2 }}
              />
              <h2 className="text-3xl font-bold">Idle Sundays</h2>
              <p className="text-gray-300 mb-8 text-lg">Wisconsin</p>
              <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                {[
                  "Get event announcements and route details",
                  "Share photos and stories from cruises",
                  "Chat with other car lovers",
                  "Plan the next meet-up",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.facebook.com/share/g/18Q3Uf6vyR/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-lg">
                View on Facebook
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            variants={containerVariants}>
            {[
              { icon: People, label: "Members", value: "50+" },
              { icon: DirectionsCar, label: "Car Meets", value: "Monthly" },
              { icon: Map, label: "that rolls", value: "Anything" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900 p-6 rounded border border-gray-700 text-center hover:border-cyan-400 transition-colors"
                variants={itemVariants}>
                <stat.icon className="text-4xl mb-3 text-cyan-400" />
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* About Us */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-6 text-cyan-400">
              What It's About
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Idle Sundays is just a group of friends who love a good drive.
                We cruise scenic backroads, enjoy great company, and maybe stop
                for coffee or a bite. No drama, no exclusive vibes—just people
                who appreciate cars and good times.
              </p>

              <img
                src="/images/event2.jpg"
                alt="Idle Sundays event"
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6 justify-center"
            variants={itemVariants}>
            <p>
              Join us on Facebook to stay in the loop on our monthly meets and
              see where we're headed next.
            </p>
            <a
              href="https://www.facebook.com/share/g/18Q3Uf6vyR/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all text-center">
              Join on Facebook
            </a>
            <Link
              href="/calendar"
              className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center">
              View Events
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
