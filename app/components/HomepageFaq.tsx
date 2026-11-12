import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { homepageFaq } from "../data/homepageFaq";
import { publishedCopy } from "../data/trainingContent";
import styles from "./EditorialContent.module.css";

export function HomepageFaq() {
  const entries = homepageFaq.flatMap((entry) => {
    const answer = publishedCopy(entry.answer);
    return answer?.trim() ? [{ ...entry, answer }] : [];
  });

  if (entries.length === 0) return null;

  return (
    <section id="faq" aria-labelledby="faq-heading" className={`${styles.content} py-16 sm:py-20 border-t border-[#D5CEBF] bg-[#DFD9CC]/40`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9B3D2E]">Questions about the practice</p>
          <h2 id="faq-heading" className="font-serif text-3xl sm:text-4xl font-light">Frequently Asked Questions</h2>
        </div>
        <div className="rounded-2xl border border-[#D5CEBF] bg-[#E8E4DA] divide-y divide-[#D5CEBF]">
          {entries.map((entry) => (
            <details key={entry.id} id={`faq-${entry.id}`} className={styles.disclosure}>
              <summary aria-controls={`faq-answer-${entry.id}`} className="flex items-center justify-between gap-5 px-5 sm:px-7 py-5 cursor-pointer font-serif text-xl sm:text-2xl">
                {entry.question}
                <ChevronDown aria-hidden="true" className="w-4 h-4 shrink-0 text-[#243B45]" />
              </summary>
              <div id={`faq-answer-${entry.id}`} className="px-5 sm:px-7 pb-7 space-y-4 text-sm sm:text-base text-[#303331] leading-relaxed">
                {entry.answer.split(/\n\s*\n/).map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.split(/(\*\*[^*]+\*\*)/).map((part, partIndex) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </p>
                ))}
                {entry.relatedLink && <Link href={entry.relatedLink.href} className="inline-block text-sm font-semibold text-[#243B45] underline underline-offset-4">{entry.relatedLink.label}</Link>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
