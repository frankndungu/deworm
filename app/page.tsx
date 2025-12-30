"use client";

import { useState } from "react";
import { Calendar, Download, Bell, Info } from "lucide-react";

export default function DewormReminder() {
  const [lastDewormDate, setLastDewormDate] = useState("");
  const [nextDate, setNextDate] = useState<Date | null>(null);
  const [showResult, setShowResult] = useState(false);

  const calculateNextDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + 3);
    return date;
  };

  const handleCalculate = () => {
    const next = calculateNextDate(lastDewormDate);
    setNextDate(next);
    setShowResult(true);

    // Track calculate button click
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "calculate_click", {
        event_category: "engagement",
        event_label: "calculate_next_date",
      });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const downloadCalendar = () => {
    if (!nextDate) return;

    // Track download event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "calendar_download", {
        event_category: "engagement",
        event_label: "ics_file",
      });
    }

    // Generate .ics file
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Deworm Reminder//EN
BEGIN:VEVENT
UID:${Date.now()}@dewormreminder.com
DTSTAMP:${nextDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${nextDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:Time to Deworm 💊
DESCRIPTION:Reminder to take your deworming medication. WHO recommends deworming every 3 months in endemic areas.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deworm-reminder.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Success moment after download
    setTimeout(() => {
      alert(
        "✅ Calendar reminder added! Don't forget to deworm in 3 months 💊"
      );
    }, 500);
  };

  const copyToClipboard = () => {
    if (!nextDate) return;
    const text = `Reminder: Deworm on ${formatDate(nextDate)}`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 sm:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Karla:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Karla', sans-serif;
        }
        
        h1, h2 {
          font-family: 'DM Serif Display', serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(43%) sepia(96%) saturate(1352%) hue-rotate(140deg) brightness(95%) contrast(101%);
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-teal-600 rounded-full mb-4 sm:mb-6 shadow-lg">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-900 mb-3 sm:mb-4 tracking-tight px-4">
            When Did You Last Deworm?
          </h1>
          <p className="text-base sm:text-lg text-teal-700 max-w-xl mx-auto font-medium px-4">
            I know you haven't since you were a kid.
          </p>
        </div>

        {/* Info Card */}
        <div
          className="bg-white/60 backdrop-blur-sm border-2 border-teal-200 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-teal-900 mb-2 text-sm sm:text-base">
                Wait, what?
              </h3>
              <p className="text-teal-700 text-xs sm:text-sm leading-relaxed">
                Most people haven't dewormed since they were kids. <br />
                Turns out you're supposed to keep doing it.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div
          className="bg-white rounded-3xl shadow-2xl shadow-teal-200/50 p-6 sm:p-8 md:p-10 animate-fadeInUp"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
            When was the last time?
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-teal-800 mb-3">
                Last Deworming Date
              </label>
              <input
                type="date"
                value={lastDewormDate}
                onChange={(e) => {
                  setLastDewormDate(e.target.value);
                  setShowResult(false);
                }}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-teal-300 rounded-xl text-base sm:text-lg focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={!lastDewormDate}
              className="w-full bg-teal-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:bg-teal-700 disabled:bg-teal-600 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:shadow-none"
            >
              Calculate Next Date
            </button>
          </div>

          {/* Results */}
          {showResult && nextDate && (
            <div className="mt-8 pt-8 border-t-2 border-teal-100 animate-fadeInUp">
              <div className="bg-linear-to-br from-teal-50 to-emerald-50 rounded-2xl p-5 sm:p-6 mb-6">
                <p className="text-xs sm:text-sm font-semibold text-teal-700 mb-2 uppercase tracking-wide">
                  Your Next Deworming Date
                </p>
                <p className="text-3xl sm:text-4xl font-bold text-teal-900 mb-1">
                  {formatDate(nextDate)}
                </p>
                <p className="text-xs sm:text-sm text-teal-600">
                  {Math.ceil(
                    (nextDate.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days from now
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={downloadCalendar}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white border-2 border-teal-600 text-teal-700 py-3 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base hover:bg-teal-50 transition-all"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Calendar Reminder (.ics)
                </button>

                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-white border-2 border-emerald-600 text-emerald-700 py-3 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base hover:bg-emerald-50 transition-all"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  Copy Reminder
                </button>
              </div>

              {/* Donation CTA in results section */}
              <div className="mt-6 p-4 bg-teal-50/50 border border-teal-200 rounded-xl">
                <p className="text-xs sm:text-sm text-teal-800 text-center">
                  This tool is free and always will be. If it helped you,{" "}
                  <a
                    href="https://buymeacoffee.com/doshafrancc"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      // Track coffee donation click
                      if (
                        typeof window !== "undefined" &&
                        (window as any).gtag
                      ) {
                        (window as any).gtag("event", "donation_click", {
                          event_category: "conversion",
                          event_label: "buy_me_coffee",
                        });
                      }
                    }}
                    className="font-semibold underline hover:text-teal-950"
                  >
                    buy me a coffee
                  </a>{" "}
                  or{" "}
                  <button
                    onClick={() => {
                      // Track crypto donation click
                      if (
                        typeof window !== "undefined" &&
                        (window as any).gtag
                      ) {
                        (window as any).gtag("event", "donation_click", {
                          event_category: "conversion",
                          event_label: "usdt_crypto",
                        });
                      }
                      navigator.clipboard.writeText(
                        "TC1xVYzpPdgkXS8ipXWMbURTz7uLGzBp4T"
                      );
                      alert(
                        "USDT wallet address copied! Thanks for the support 💚"
                      );
                    }}
                    className="font-semibold underline hover:text-teal-950"
                  >
                    send USDT
                  </button>
                </p>
              </div>

              <div className="mt-4 p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
                <p className="text-xs sm:text-sm text-amber-900">
                  <span className="font-semibold">
                    Email reminders coming soon.
                  </span>{" "}
                  For now, just add this to your calendar before you forget
                  again.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="mt-8 sm:mt-12 text-center animate-fadeInUp px-4"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="mb-6 sm:mb-8 pb-6 border-b border-teal-200">
            <p className="text-xs sm:text-sm text-teal-700 mb-3 font-medium">
              This tool is free. If it helped you, consider:
            </p>
            <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
              <a
                href="https://buymeacoffee.com/doshafrancc"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Track coffee donation click from footer
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "donation_click_footer", {
                      event_category: "conversion",
                      event_label: "buy_me_coffee_footer",
                    });
                  }
                }}
                className="text-xs sm:text-sm font-semibold text-teal-800 hover:text-teal-950 underline decoration-2 underline-offset-2 transition-colors"
              >
                Buy me a coffee ☕
              </a>
              <button
                onClick={() => {
                  // Track crypto donation click from footer
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "donation_click_footer", {
                      event_category: "conversion",
                      event_label: "usdt_crypto_footer",
                    });
                  }
                  navigator.clipboard.writeText(
                    "TC1xVYzpPdgkXS8ipXWMbURTz7uLGzBp4T"
                  );
                  alert(
                    "USDT wallet address copied! Thanks for the support 💚"
                  );
                }}
                className="text-xs sm:text-sm font-semibold text-teal-800 hover:text-teal-950 underline decoration-2 underline-offset-2 transition-colors cursor-pointer"
              >
                Send USDT 💎
              </button>
            </div>
          </div>

          {/* Construction Company CTA */}
          <div className="mb-6 sm:mb-8 p-4 bg-teal-50 border border-teal-200 rounded-xl max-w-xl mx-auto">
            <p className="text-xs sm:text-sm text-teal-800">
              <span className="font-semibold">Construction company?</span> I
              built{" "}
              <a
                href="https://lobocon.co?utm_source=deworm&utm_medium=footer&utm_campaign=construction_cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Track Lobocon clicks from CTA
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "lobocon_click_cta", {
                      event_category: "outbound",
                      event_label: "construction_cta",
                    });
                  }
                }}
                className="font-semibold underline hover:text-teal-950"
              >
                Lobocon
              </a>{" "}
              to help you predict project profitability before it's too late.{" "}
              <a
                href="https://lobocon.co?utm_source=deworm&utm_medium=footer&utm_campaign=construction_cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Track Lobocon learn more clicks
                  if (typeof window !== "undefined" && (window as any).gtag) {
                    (window as any).gtag("event", "lobocon_learn_more", {
                      event_category: "outbound",
                      event_label: "learn_more_link",
                    });
                  }
                }}
                className="font-semibold underline hover:text-teal-950"
              >
                Learn more
              </a>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-teal-800 mb-2 font-medium">
            Built by{" "}
            <a
              href="https://frank-ndungu.vercel.app"
              className="font-semibold hover:text-teal-950 underline decoration-2 underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // Track portfolio clicks
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "portfolio_click", {
                    event_category: "outbound",
                    event_label: "frank_portfolio",
                  });
                }
              }}
            >
              Frank
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
