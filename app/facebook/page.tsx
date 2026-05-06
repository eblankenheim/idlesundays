'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Join Our <span className="text-cyan-400">Community</span>
            </h1>
            <p className="text-xl text-gray-400">
              Connect with Idle Sundays enthusiasts on Facebook
            </p>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border-2 border-cyan-400 p-8 mb-12"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-3xl font-bold mb-4">Idle Sundays Wisconsin</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join our exclusive Facebook group to:
              </p>
              <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                {[
                  'Get early access to event announcements',
                  'Connect with other car enthusiasts',
                  'Share photos and videos from events',
                  'Discuss upcoming cruises and meet-ups',
                  'Stay updated on all Idle Sundays news',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://www.facebook.com/groups/idlesundayswisconsin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-lg"
              >
                Join Group
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {[
              { icon: '👤', label: 'Members', value: '500+' },
              { icon: '📸', label: 'Posts Monthly', value: '50+' },
              { icon: '🎉', label: 'Events Yearly', value: '30+' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900 p-6 rounded border border-gray-700 text-center hover:border-cyan-400 transition-colors"
                variants={itemVariants}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Join */}
          <motion.div className="mb-12" variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-6 text-cyan-400">Why Join?</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                The Idle Sundays community is more than just an events group—it's a movement
                of passionate car enthusiasts who share a love for scenic backroads and quality
                time with fellow drivers.
              </p>
              <p>
                Our Facebook group is the hub of all activity. Members share event photos,
                plan trips, discuss automotive topics, and build lasting friendships with
                like-minded individuals across Wisconsin.
              </p>
              <p>
                Whether you're a seasoned car enthusiast or just looking for a fun way to
                spend your Sundays, you'll find a welcoming community ready to cruise.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <a
              href="https://www.facebook.com/groups/idlesundayswisconsin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all text-center"
            >
              Join on Facebook
            </a>
            <Link
              href="/calendar"
              className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center"
            >
              View Events
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
