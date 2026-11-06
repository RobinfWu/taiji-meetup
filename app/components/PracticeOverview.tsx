import { ChevronDown } from "lucide-react";
import { TAIJI_DATA } from "../data/taijiData";
import styles from "./EditorialContent.module.css";

// Keep the complete instructor-authored explanations in taijiData; these native
// disclosures change only their presentation and can be opened independently.
export function PracticeOverview() {
  const groups = [
    {
      id: "why-taijiquan",
      title: "Why Taijiquan?",
      subtitle: "A traditional martial art with a lifetime of depth to explore.",
      practices: TAIJI_DATA.editorialPractices,
    },
    {
      id: "our-approach",
      title: "What Makes Our Approach Different?",
      subtitle: "Different Taijiquan traditions emphasize different training methods and interpretations. Here's what we emphasize.",
      practices: TAIJI_DATA.specialPractices,
    },
  ];

  return (
    <div id="practice-overview" className={`${styles.content} py-12 sm:py-16 bg-[#DFD9CC]/40 border-y border-[#D5CEBF]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`${group.id}-heading`} className="min-w-0 bg-[#FAF8F5] rounded-3xl border border-[#D5CEBF] p-6 sm:p-8">
            <div className="space-y-3 mb-6">
              <h2 id={`${group.id}-heading`} className="font-serif text-3xl sm:text-4xl font-light text-[#171918] leading-tight">{group.title}</h2>
              <p className="text-sm sm:text-base text-[#5A5E5B] leading-relaxed font-light">{group.subtitle}</p>
            </div>
            <div className="border-t border-[#D5CEBF] divide-y divide-[#D5CEBF]">
              {group.practices.map((practice) => (
                <details key={practice.number} className={styles.disclosure}>
                  <summary className="flex items-center gap-3 sm:gap-4 py-5 cursor-pointer">
                    <span aria-hidden="true" className="shrink-0 text-sm text-[#9B3D2E] tabular-nums">{practice.number}</span>
                    <span className="flex-1 text-base sm:text-lg font-semibold text-[#171918]">{practice.title}</span>
                    <ChevronDown aria-hidden="true" className="w-4 h-4 shrink-0 text-[#243B45]" />
                  </summary>
                  <div className="pb-5 text-sm sm:text-base text-[#303331] leading-relaxed font-light break-words">{practice.description}</div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
