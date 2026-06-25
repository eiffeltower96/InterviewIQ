import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import Badge from "./ui/Badge";

const toneAccent = {
  success: "text-success",
  warning: "text-warning",
  brand: "text-brand-300",
  neutral: "text-ink-tertiary",
};

const toneDot = {
  success: "bg-success",
  warning: "bg-warning",
  brand: "bg-brand-400",
  neutral: "bg-ink-quaternary",
};

/**
 * AnalysisListCard
 * Used for Strengths / Weaknesses / Missing Keywords / Suggestions on the
 * ATS Analysis page. Previously the tone and glyph were both parsed out of
 * an emoji-prefixed title string ("✅ Strengths"); now passed explicitly
 * as `icon` + `tone`, with `title` as plain text. Same `items` contract
 * (array of strings) — no change to what data flows in.
 */
function AnalysisListCard({ icon, title, tone = "neutral", items = [] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-border">
        <span className={`inline-flex shrink-0 [&>svg]:w-4 [&>svg]:h-4 ${toneAccent[tone]}`}>
          {icon}
        </span>
        <h3 className="text-[13.5px] font-semibold text-ink-primary">{title}</h3>
        <Badge tone={tone === "neutral" ? "neutral" : tone} className="ml-auto">
          {items.length}
        </Badge>
      </div>

      <ul className="flex flex-col gap-2.5 px-4 py-3.5">
        {items.length === 0 && (
          <li className="text-[13px] text-ink-quaternary py-2">Nothing to show here.</li>
        )}
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="flex items-start gap-2.5"
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-[7px] ${toneDot[tone]}`} />
            <span className="text-[13.5px] text-ink-secondary leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

export default AnalysisListCard;
