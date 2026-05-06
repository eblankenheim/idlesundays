"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Event } from "@/types";
import { useCalendarEvents } from "@/utils/useCalendarEvents";
import { playAudio } from "@/utils/audioPlayer";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { events, loading } = useCalendarEvents();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = monthStart.getDay();
  const paddedDays = [...Array(startDayOfWeek).fill(null), ...daysInMonth];

  const eventsByDate = useMemo(() => {
    const map: { [key: string]: Event[] } = {};
    events.forEach((event) => {
      const dateStr = format(new Date(event.start), "yyyy-MM-dd");
      if (!map[dateStr]) {
        map[dateStr] = [];
      }
      map[dateStr].push(event);
    });
    return map;
  }, [events]);

  const upcomingEvents = useMemo(() => {
    return events
      .filter((event) => new Date(event.start) >= new Date())
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
  }, [events]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="mt-4 text-gray-300">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-400">
            Browse our calendar and find your next Idle Sundays adventure
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Widget */}
          <motion.div className="lg:col-span-2">
            <div className="bg-gray-900 rounded border border-gray-700 p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-800 rounded transition-colors text-cyan-400"
                >
                  ← Prev
                </button>
                <h2 className="text-2xl font-bold">
                  {format(currentDate, "MMMM yyyy")}
                </h2>
                <button
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-800 rounded transition-colors text-cyan-400"
                >
                  Next →
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-semibold text-gray-400 py-2 text-sm sm:text-base"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 bg-black p-2 rounded">
                {paddedDays.map((day, idx) => {
                  const dateStr = day ? format(day, "yyyy-MM-dd") : null;
                  const dayEvents = dateStr ? eventsByDate[dateStr] || [] : [];
                  const isToday = day && isSameDay(day, new Date());

                  return (
                    <div
                      key={idx}
                      className={`min-h-16 sm:min-h-20 p-1 sm:p-2 rounded text-xs sm:text-sm border ${
                        day
                          ? isToday
                            ? "bg-cyan-400 text-black border-cyan-300"
                            : dayEvents.length > 0
                              ? "bg-green-900 border-green-700"
                              : "bg-gray-800 border-gray-700"
                          : "bg-black border-transparent"
                      }`}
                    >
                      {day && (
                        <>
                          <div className="font-bold mb-1">
                            {format(day, "d")}
                          </div>
                          {dayEvents.length > 0 && (
                            <div className="space-y-1">
                              {dayEvents.slice(0, 1).map((event) => (
                                <Link
                                  key={event.id}
                                  href={`/events/${event.id}`}
                                  className="text-xs bg-cyan-400 text-black p-1 rounded block truncate hover:bg-cyan-300 font-semibold"
                                  title={event.title}
                                >
                                  {event.title.substring(0, 10)}...
                                </Link>
                              ))}
                              {dayEvents.length > 1 && (
                                <div className="text-xs text-gray-300 pl-1">
                                  +{dayEvents.length - 1}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events Sidebar */}
          <motion.div className="lg:col-span-1">
            <div className="bg-gray-900 rounded border border-gray-700 p-6 sticky top-24 max-h-96 overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                Upcoming
              </h3>
              <div className="space-y-3">
                {upcomingEvents.slice(0, 8).map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="block border-l-4 border-cyan-400 p-3 hover:bg-gray-800 rounded transition-colors"
                  >
                    <div className="font-semibold text-white hover:text-cyan-400">
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      {format(new Date(event.start), "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {format(new Date(event.start), "h:mm a")}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
