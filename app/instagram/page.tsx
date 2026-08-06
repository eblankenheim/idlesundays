"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PhotoCamera, DirectionsCar, Map } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";

const INSTAGRAM_URL = "https://www.instagram.com/idlesundays.wi/";
const INSTAGRAM_HANDLE = "@idlesundays.wi";
const INSTAGRAM_REEL_URL = "https://www.instagram.com/reel/DbYxaSGAUqR/";
const INSTAGRAM_EMBED_SCRIPT = "https://www.instagram.com/embed.js";

// Official Instagram brand gradient: yellow -> orange -> pink -> purple -> blue
const IG_GRADIENT =
  "linear-gradient(45deg, #FCAF45 0%, #F56040 25%, #E1306C 50%, #833AB4 75%, #405DE6 100%)";

export default function InstagramPage() {
  // Instagram renders the embed by rewriting the blockquote below, so the
  // script has to run (or re-run) after this page has mounted.
  useEffect(() => {
    if (document.querySelector(`script[src="${INSTAGRAM_EMBED_SCRIPT}"]`)) {
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = INSTAGRAM_EMBED_SCRIPT;
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

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
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div
            className="text-center mb-6 py-2 sm:py-8 px-2 sm:px-8 rounded-lg relative overflow-hidden"
            style={{ background: IG_GRADIENT }}
            variants={itemVariants}
          >
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 h-18">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
                Follow{" "}
                <span
                  className="bg-clip-text text-transparent break-words"
                  style={{ backgroundImage: IG_GRADIENT }}
                >
                  {INSTAGRAM_HANDLE}
                </span>
              </h1>
              <p className="text-md sm:text-xl px-3 text-gray-300">
                Photos, clips, and route recaps from Idle Sundays cruises
              </p>
            </div>
          </motion.div>

          {/* About Us */}
          <motion.div
            className="grid lg:grid-cols-2 gap-8 items-center mb-12"
            variants={itemVariants}
          >
            {/* Text */}
            <div>
              <h3
                className="text-3xl font-bold mb-2 sm:mb-6 bg-clip-text text-transparent inline-block"
                style={{ backgroundImage: IG_GRADIENT }}
              >
                What You'll See
              </h3>
              <div className="space-y-4 text-gray-300 text-lg ">
                <p>
                  Idle Sundays is just a group of friends who love a good drive.
                  Our Instagram is where the ride lives on. We've got rollout
                  shots, backroad clips, parking lots at golden hour, and
                  whoever showed up that meet. No drama, no exclusive vibes.
                  Just people who appreciate cars and good times.
                </p>
                <p>
                  Follow us at{" "}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold bg-clip-text text-transparent brightness-90 hover:text-white"
                    style={{ backgroundImage: IG_GRADIENT }}
                  >
                    {INSTAGRAM_HANDLE}
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Portrait reel, embedded straight from Instagram */}
            <div className="mx-auto w-full max-w-[340px]">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${INSTAGRAM_REEL_URL}?utm_source=ig_embed`}
                data-instgrm-version="14"
                style={{
                  background: "#000",
                  border: 0,
                  borderRadius: "1rem",
                  margin: 0,
                  padding: 0,
                  width: "100%",
                  minWidth: 0,
                }}
              >
                {/* Shown only until embed.js swaps in the real reel */}
                <a
                  href={INSTAGRAM_REEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex aspect-[9/16] flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center font-bold text-white"
                  style={{ background: IG_GRADIENT }}
                >
                  <InstagramIcon sx={{ fontSize: 48 }} />
                  Watch this reel on Instagram
                </a>
              </blockquote>
            </div>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            className="flex justify-center rounded-lg p-[2px] mx-auto mb-12 items-center w-full max-w-lg"
            style={{ background: IG_GRADIENT }}
            variants={itemVariants}
          >
            <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-[calc(0.5rem-2px)] p-2 py-4 sm:p-8">
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-4"
                  style={{
                    background: IG_GRADIENT,
                    boxShadow: "0 12px 40px -12px rgba(225, 48, 108, 0.8)",
                  }}
                >
                  <InstagramIcon sx={{ fontSize: 64, color: "#FFFFFF" }} />
                </div>
                <h2 className="text-3xl font-bold">Idle Sundays</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  {INSTAGRAM_HANDLE} &middot; Wisconsin
                </p>
                <ul className="space-y-3 mb-8 text-center max-w-xs mx-auto">
                  {[
                    "See photos and reels from every cruise",
                    "Catch route teasers before we roll out",
                    "Tag us in your shots from the meet",
                    "Follow the builds in our community",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="font-bold mt-1"
                        style={{ color: "#E1306C" }}
                      >
                        ✓
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-4 text-white font-bold rounded-lg text-md sm:text-lg transition-all hover:brightness-80 hover:text-black hover:scale-105"
                  style={{ background: IG_GRADIENT }}
                >
                  <InstagramIcon sx={{ fontSize: 28 }} />
                  View on Instagram
                </a>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            variants={containerVariants}
          >
            {[
              { icon: PhotoCamera, label: "Posts", value: "Weekly" },
              { icon: DirectionsCar, label: "Car Meets", value: "Monthly" },
              { icon: Map, label: "that rolls", value: "Anything" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-900 p-6 rounded border border-gray-700 text-center transition-colors hover:border-[#E1306C]"
                variants={itemVariants}
              >
                <stat.icon
                  className="text-4xl mb-3"
                  sx={{ color: "#F56040" }}
                />
                <div
                  className="text-2xl font-bold mb-2 bg-clip-text text-transparent"
                  style={{ backgroundImage: IG_GRADIENT }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-6 justify-center items-center"
            variants={itemVariants}
          >
            <p>
              Follow us on Instagram so you never miss a rollout, and tag us in
              your shots from the meet.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 text-white font-bold rounded transition-all hover:brightness-80 hover:text-black text-center whitespace-nowrap"
              style={{ background: IG_GRADIENT }}
            >
              <InstagramIcon sx={{ fontSize: 22 }} />
              Follow on Instagram
            </a>
            <Link
              href="/calendar"
              className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center whitespace-nowrap"
            >
              View Events
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
