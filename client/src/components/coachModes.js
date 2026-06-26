/**
 * Future-feature modes. Each mode swaps the system prompt server-side and
 * changes the suggested follow-ups — this list is the seam where
 * "Dream Company Match," "Resume Roast," etc. plug in later without any
 * layout change, only new entries here + a backend prompt.
 *
 * Shared by CoachSidebar and Composer — kept in its own module (rather
 * than exported alongside the CoachSidebar component) so both files only
 * export components, which fixes a react-refresh lint warning.
 */
export const COACH_MODES = [
  { id: "general", label: "Career Coach", description: "Ask anything about your resume", icon: "spark", available: true },
  { id: "roast", label: "Resume Roast", description: "Brutally honest, no sugar-coating", icon: "flame", available: true },
  { id: "ats", label: "ATS Improvement", description: "Get past the filters", icon: "filter", available: true },
  { id: "interview", label: "Interview Prep", description: "Practice for your next round", icon: "mic", available: false },
  { id: "dream-match", label: "Dream Company Match", description: "See where you fit best", icon: "target", available: false },
  { id: "roadmap", label: "Career Roadmap", description: "Your path to the next level", icon: "map", available: false },
];
