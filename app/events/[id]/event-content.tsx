"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { format } from "date-fns";
import EastIcon from "@mui/icons-material/East";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Event } from "@/types";

export function EventContent({ event }: { event: Event }) {
  return (
    <motion.div
      className="min-h-screen bg-black text-white py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/calendar"
            className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2">
            ← Back to Calendar
          </Link>
        </div>

        <motion.div
          className="bg-gray-900 rounded border border-gray-700 overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}>
          {/* Event Image */}
          {event.locationImageUrl && (
            <div className="relative h-44 sm:h-80 bg-black">
              <Image
                src={event.locationImageUrl}
                alt={event.title}
                fill
                className="object-contain object-center opacity-80"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="p-3 sm:p-8">
            {/* Title & Date */}
            <motion.div
              className="mb-6"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                {event.title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 text-lg text-gray-300">
                <div className="flex items-center gap-2">
                  <CalendarTodayIcon sx={{ fontSize: "22px", color: "cyan" }} />
                  {format(new Date(event.start), "EEEE, MMMM d, yyyy")}
                </div>
                <div className="flex items-center gap-2">
                  <AccessTimeIcon sx={{ fontSize: "22px", color: "cyan" }} />
                  {format(new Date(event.start), "h:mm a")}
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-gray-700 my-3"></div>

            {/* Description */}
            {event.description && (
              <motion.div
                className="mb-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold mb-1.5 text-cyan-400">
                  About
                </h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </motion.div>
            )}

            {/* Location */}
            {event.location && (
              <motion.div
                className="mb-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}>
                <h2 className="text-2xl font-bold mb-1.5 text-cyan-400">
                  Location
                </h2>
                <p className="text-gray-300 text-lg">{event.location}</p>
              </motion.div>
            )}

            {/* Links */}
            {(event.url || event.facebookEventId) && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}>
                {event.facebookEventId && (
                  <a
                    href={`https://www.facebook.com/events/${event.facebookEventId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-all text-center">
                    View on Facebook
                  </a>
                )}
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded hover:bg-cyan-400 hover:text-black transition-all text-center">
                    Directions <EastIcon sx={{ fontSize: "18px" }} />
                  </a>
                )}
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              className="mt-8 p-4 bg-gray-800 rounded border border-cyan-400"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}>
              <p className="text-gray-300">
                Want to stay updated? Join our{" "}
                <a
                  href="https://www.facebook.com/share/g/18Q3Uf6vyR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 font-bold hover:text-cyan-300">
                  Facebook community
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
