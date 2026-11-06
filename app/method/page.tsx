import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown, Compass } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  classPractices,
  languageAnalogy,
  partnerMethods,
  publishedCopy,
  yiluMilestones,
} from "../data/trainingContent";
import styles from "./method.module.css";
import { VideoDemonstration } from "../components/VideoDemonstration";

export const metadata: Metadata = {
  title: "How We Train | Chen Taiji Lab",
  description: "Explore Chen Taijiquan training: foundational exercises, Yilu practice routines, and Push Hands. Learn at your own pace in Kingston, Ontario.",
};

const container = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
const heading = "font-serif text-3xl sm:text-4xl font-light leading-tight";
const eyebrow = "text-xs font-semibold uppercase tracking-widest text-[#9B3D2E]";

export default function MethodPage() {
  return (
    <div className={`${styles.page} min-h-screen bg-[#E8E4DA] text-[#171918] font-sans`}>
      <a href="#training-content" className={styles.skipLink}>Skip to training content</a>
      <Navbar />
      <main id="training-content" className="pt-28 pb-20" tabIndex={-1}>
        <section aria-labelledby="training-title" className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF]">
          <div className={`${container} grid lg:grid-cols-12 gap-10 lg:gap-16 items-center`}>
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#243B45]/10 text-[#243B45] text-xs font-semibold uppercase tracking-widest border border-[#243B45]/20">
                <Compass aria-hidden="true" className="w-3.5 h-3.5" />
                Our approach to Taijiquan
              </div>
              <h1 id="training-title" className="font-serif text-4xl sm:text-5xl md:text-6xl font-light leading-tight">
                How We <span className="font-normal italic text-[#243B45]">Train</span>
              </h1>
              <p className="max-w-2xl text-lg text-[#303331] leading-relaxed font-light">
                Learn Chen Taijiquan through foundational exercises, form practice,
                and partner training. Begin with a manageable body of material,
                with room to explore and refine it over time.
              </p>
            </div>
            <nav aria-label="Explore our training" className="lg:col-span-4 border-l-2 border-[#9B3D2E]/50 pl-6">
              <p className="text-xs uppercase tracking-widest text-[#5A5E5B] mb-3">Explore the practice</p>
              <ul className="divide-y divide-[#D5CEBF]">
                {[
                  { href: "#in-class", label: "Inside a class" },
                  { href: "#yilu", label: "A Form Learned in Stages" },
                  { href: "#partner-training", label: "Learning with a partner" },
                ].map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="flex items-center justify-between gap-4 py-3 text-sm hover:text-[#9B3D2E]">
                      {item.label}<ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <div className={`${container} pt-14 sm:pt-20 space-y-16 sm:space-y-24`}>
          <section id="in-class" aria-labelledby="class-heading" className="space-y-8">
            <div className="max-w-2xl space-y-3">
              <p className={eyebrow}>The practice</p>
              <h2 id="class-heading" className={heading}>What to Expect in Class</h2>
              <p className="text-[#303331] leading-relaxed">
                These are the main parts of our training, rather than a fixed timetable for every class.
                You do not need previous Taijiquan experience to begin.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {classPractices.map((practice, index) => (
                <div key={practice.id} className="p-6 rounded-2xl border border-[#D5CEBF] bg-[#DFD9CC]/50 space-y-4">
                  <span aria-hidden="true" className="font-serif text-2xl text-[#9B3D2E]">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-xl font-semibold leading-snug">{practice.title}</h3>
                  {publishedCopy(practice.detail) && <p className="text-sm text-[#303331] leading-relaxed">{publishedCopy(practice.detail)}</p>}
                </div>
              ))}
            </div>
          </section>

          <section id="yilu" aria-labelledby="yilu-heading" className="rounded-3xl overflow-hidden border border-[#D5CEBF] bg-[#FAF8F5]">
            <div className="bg-[#243B45] text-[#E8E4DA] p-6 sm:p-10 lg:p-12 grid lg:grid-cols-12 gap-6 lg:gap-12">
              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#E0C9A2]">The Yilu curriculum</p>
                <h2 id="yilu-heading" className={heading}>Learn in Sections, Grow in Depth</h2>
              </div>
              <div className="lg:col-span-7 space-y-4 leading-relaxed text-[#E8E4DA]">
                <p>The traditional Chen-style Yilu can be divided into shorter, self-contained practice routines. Each draws from the same traditional sequence rather than constituting a separate form.</p>
              </div>
            </div>
            <div className="p-6 sm:p-10 lg:p-12 space-y-8">
              <div className="grid lg:grid-cols-2 gap-5 items-start">
                {yiluMilestones.map((milestone) => (
                  <article key={milestone.id} className="min-w-0 rounded-2xl bg-[#E8E4DA]/60 border border-[#D5CEBF] p-5 sm:p-6 space-y-4">
                    <div className="w-8 h-0.5 bg-[#9B3D2E]" aria-hidden="true" />
                    <h3 className="font-serif text-2xl font-semibold">{milestone.title}</h3>
                    <p className="text-xs font-semibold tracking-wide text-[#243B45]">{milestone.range}</p>
                    <p className="text-sm leading-relaxed text-[#303331]">{milestone.summary}</p>
                    {publishedCopy(milestone.detail) && <p className="text-sm leading-relaxed text-[#303331]">{publishedCopy(milestone.detail)}</p>}
                    {milestone.sequences.length > 0 && (
                      <details className={`${styles.disclosure} border-t border-[#D5CEBF] pt-1`}>
                        <summary className="flex justify-between items-center gap-3 py-3 text-sm font-semibold text-[#243B45] cursor-pointer">
                          {milestone.sequenceListLabel}
                          <ChevronDown aria-hidden="true" className="w-4 h-4 shrink-0" />
                        </summary>
                        <ul className="divide-y divide-[#D5CEBF]">
                          {milestone.sequences.map((sequence) => (
                            <li key={sequence.number} className="py-3 text-sm space-y-1">
                              <p className="font-medium">{publishedCopy(sequence.name) ?? `Sequence ${sequence.number}`}</p>
                              {publishedCopy(sequence.description) && <p className="text-[#303331] leading-relaxed">{publishedCopy(sequence.description)}</p>}
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </article>
                ))}
              </div>
              <section aria-labelledby="beyond-medium-heading" className="border-t border-[#D5CEBF] pt-6 space-y-2">
                <h3 id="beyond-medium-heading" className="font-serif text-xl text-[#303331]">Beyond the Medium Form</h3>
                <p className="text-sm leading-relaxed text-[#303331]">Further exploration of the traditional Yilu may be offered according to student interest and progression.</p>
              </section>
            </div>
          </section>

          <section id="partner-training" aria-labelledby="partner-heading" className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 space-y-4">
              <p className={eyebrow}>Learning together</p>
              <h2 id="partner-heading" className={heading}>Push Hands &amp;<br className="hidden sm:block" /> Partner Training</h2>
              <p className="text-[#303331] leading-relaxed">Push Hands (Tuishou) is the conversation in our language of the body: a collection of partnered practices built around sustained physical contact.</p>
              <p className="text-sm text-[#303331] leading-relaxed">These are examples of partner methods, rather than a complete curriculum or a prescribed order.</p>
              <Link href="/about#push-hands-demonstration" className="inline-block text-sm text-[#243B45] underline underline-offset-4">Watch Robin’s Push Hands demonstration</Link>
            </div>
            <div className="lg:col-span-7 border-t border-[#D5CEBF] divide-y divide-[#D5CEBF]">
              {partnerMethods.map((method) => (
                <VideoDemonstration
                  key={method.id}
                  videoId={method.videoId}
                  methodName={method.title}
                  translation={method.translation}
                  description={publishedCopy(method.detail)}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="language-heading" className="space-y-8">
            <div className="max-w-2xl space-y-3">
              <p className={eyebrow}>Connecting the practice</p>
              <h2 id="language-heading" className={heading}>Taijiquan as a Language of the Body</h2>
              <p className="text-[#303331] leading-relaxed">Learning this Taijiquan is like learning a language for the body. Explore each connection below.</p>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {languageAnalogy.map((item) => (
                <details key={item.id} className={`${styles.disclosure} bg-[#DFD9CC]/60 rounded-2xl border border-[#D5CEBF]`}>
                  <summary className="p-6 cursor-pointer">
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block text-xs font-semibold text-[#9B3D2E] mb-2">{item.analogy}</span>
                        <span className="block font-serif text-xl font-semibold">{item.title}</span>
                      </span>
                      <ChevronDown aria-hidden="true" className="w-4 h-4 mt-1 shrink-0 text-[#243B45]" />
                    </span>
                    <span className="block text-sm text-[#303331] leading-relaxed mt-3">{item.summary}</span>
                    <span className="block mt-4 text-xs font-semibold text-[#243B45]">Learn more</span>
                  </summary>
                  <p className="mx-6 pb-6 pt-4 border-t border-[#D5CEBF] text-sm leading-relaxed text-[#303331]">{item.explanation}</p>
                </details>
              ))}
            </div>
          </section>

          <section aria-labelledby="pace-heading" className="border-l-2 border-[#9B3D2E]/60 pl-6 sm:pl-8 max-w-3xl space-y-4">
            <h2 id="pace-heading" className={heading}>Learning at Your Own Pace</h2>
            <p className="text-[#303331] leading-relaxed">Some students enjoy learning more sequences; others prefer refining a smaller body of material. Your interests can also change over time.</p>
            <p className="text-[#303331] leading-relaxed">There is room for both approaches. Together with the instructor, choose what to work on while developing appropriate foundations. You do not need to share someone else’s goals or pace.</p>
          </section>

          <section aria-labelledby="try-heading" className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-5">
            <h2 id="try-heading" className="font-serif text-3xl sm:text-4xl font-light">Begin with a class.</h2>
            <p className="text-[#DFD9CC] max-w-xl mx-auto leading-relaxed">You do not need to know the form or the terminology to get started. Come meet the instructor and experience the practice.</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
              <Link href="/start" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#9B3D2E] text-white text-sm font-bold hover:bg-[#7D3024] transition-colors">
                Try a Class<ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <Link href="/classes" className="px-7 py-3.5 rounded-full bg-[#DFD9CC] text-[#171918] text-sm font-semibold hover:bg-[#D5CEBF] transition-colors">View Classes &amp; Schedule</Link>
              <Link href="/about" className="px-3 py-3.5 text-sm text-[#DFD9CC] underline underline-offset-4 hover:text-white">About Robin &amp; Lineage</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
