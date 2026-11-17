// Confirmed one-time event. Pure data shared by the static site and confirmations.
export const introClass = {
  title: "First Free Introductory Chen Taijiquan Class",
  date: "Saturday, November 21, 2026",
  time: "11:00 AM–12:30 PM EST",
  startAt: "2026-11-21T16:00:00.000Z",
  endAt: "2026-11-21T17:30:00.000Z",
  location: "Lake Ontario Park, 920 King St. W., Kingston, Ontario",
  meeting: "Meet at the pavilion at Lake Ontario Park. We'll gather there before moving together to a nearby grassy area for practice.",
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Lake+Ontario+Park%2C+920+King+St.+W.%2C+Kingston%2C+Ontario",
  practice: "Optional additional practice and questions afterward.",
  weather: "Class is weather-dependent; registered participants will be notified of changes or cancellation.",
  preparation: "Please dress in comfortable layers suitable for the weather and wear stable, relatively flat-soled shoes appropriate for practicing on grass. Bring water. No uniform or special equipment is required.",
  description: "Outdoor group instruction with Robin Wu, focusing on foundational movements, posture, weight shifting, and leg mechanics, with optional introductory Push Hands for interested participants. Beginners welcome; no prior experience required.",
  future: "This is a one-time introductory class to gauge community interest. Recurring classes and future indoor sessions are not yet confirmed.",
} as const;

export function isIntroClass(session: { start_at: string; location?: string | null }) {
  return session.start_at === introClass.startAt && !!session.location?.includes("Lake Ontario Park");
}
