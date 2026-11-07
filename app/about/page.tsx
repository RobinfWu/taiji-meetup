import Image from "next/image";
import styles from "../components/EditorialContent.module.css";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TAIJI_DATA } from "../data/taijiData";
import { ExternalLink, ArrowRight, Video } from "lucide-react";

export default function AboutPage() {
  const { lineageInfo, lineageTree } = TAIJI_DATA;

  return (
    <main className={`${styles.content} min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]`}>
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        {/* Page Hero Header */}
        <section className="py-12 md:py-16 bg-[#DFD9CC]/60 border-b border-[#D5CEBF] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#171918]">
                About <span className="font-normal italic text-[#243B45]">Robin Wu</span> & Lineage
              </h1>
              <p className="text-lg text-[#303331] leading-relaxed font-light">
                Taijiquan relies on direct teacher-to-student transmission. Learn about the teacher and the lineage.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <section aria-labelledby="instructor-heading" className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <figure className="lg:col-span-5 space-y-3">
              <Image src="/baishi1.jpg" alt="Marin Spivack and Robin Wu" width={480} height={480} priority className="w-full h-auto rounded-3xl border border-[#D5CEBF]" />
              <figcaption className="text-sm text-[#5A5E5B] font-serif italic">Marin Spivack and Robin Wu</figcaption>
            </figure>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9B3D2E]">Your instructor</p>
              <div className="space-y-2">
                <h2 id="instructor-heading" className="font-serif text-3xl sm:text-4xl font-light">{lineageInfo.instructorName}</h2>
                <p className="text-sm font-semibold text-[#243B45]">{lineageInfo.title}</p>
              </div>
              <p className="text-base sm:text-lg text-[#303331] leading-relaxed font-light">{lineageInfo.bio}</p>
              <div className="border-t border-[#D5CEBF] pt-6 space-y-3">
                <h3 className="font-serif text-2xl">Training with {lineageInfo.teacherName}</h3>
                <p className="text-sm text-[#303331] leading-relaxed">Marin Spivack is a senior disciple of Chen Yu, the only son of Chen Zhaokui.</p>
                <a href={lineageInfo.teacherWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#243B45] underline underline-offset-4">
                  Visit Mo Ling Taiji Official Website ({lineageInfo.teacherSiteName})<ExternalLink aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </section>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8">{/* Teaching Motivation — separate from instructor credentials */}
              <section aria-labelledby="why-teach-heading" className="max-w-3xl border-l-2 border-[#9B3D2E]/60 pl-6 sm:pl-10 space-y-6">
                <h2 id="why-teach-heading" className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Why I&apos;m Building This Community
                </h2>
                <div className="space-y-4 text-base text-[#303331] leading-relaxed font-light">
                  <p>
                    My motivation for starting this Taijiquan community is partly self-interested: I want good training partners.
                  </p>
                  <p>
                    The better my training partners become, the more they can challenge me. So I have a personal interest in helping others develop their skills, just as I hope to continue improving myself.
                  </p>
                  <p>
                    Of course, not everyone needs to pursue Taijiquan with the same intensity. Whether someone is interested in gentle practice or deeper martial development, they&apos;re welcome to train at their own pace.
                  </p>
                  <p>
                    For now, my hope is simply to plant a seed: to bring together people interested in learning and practicing Chen Taijiquan, and gradually cultivate a community where we can help one another grow.
                  </p>
                </div>
              </section>
            </div>
            <figure className="lg:col-span-4 space-y-3 max-w-sm">
              <Image src="/baishi2.jpg" alt="Baishi Ceremony" width={360} height={640} className="w-full h-auto rounded-2xl border border-[#D5CEBF]" />
              <figcaption className="text-sm font-serif italic text-[#5A5E5B]">Baishi Ceremony</figcaption>
            </figure>
          </div>

          {/* Full Lineage Tree Timeline */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8A7250]">
                Historical context & direct transmission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                Our Taijiquan Lineage
              </h2>
              <p className="text-sm text-[#303331]">
                From 17th Century Chenjiagou origin down to local instruction today.
              </p>
              <p className="text-sm text-[#303331] font-medium border-l-2 border-[#9B3D2E]/60 pl-4 py-2 text-left">
                Selected generations are shown; gaps between entries do not imply direct personal instruction.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: "Historical Foundations", entries: lineageTree.slice(0, 2) },
                { title: "Our Teaching Lineage", entries: lineageTree.slice(2) },
              ].map((group) => (
                <section key={group.title} aria-label={group.title} className="bg-[#DFD9CC]/60 p-5 sm:p-8 rounded-3xl border border-[#D5CEBF] space-y-5">
                  <h3 className="font-serif text-2xl text-[#243B45]">{group.title}</h3>
                  <ol className="space-y-4">
                    {group.entries.map((item) => (
                      <li key={item.generation} className="bg-[#E8E4DA] p-5 sm:p-6 rounded-2xl border border-[#D5CEBF] space-y-3">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="font-serif text-xl font-semibold">{item.figures.join(", ")}</h4>
                          <span className="text-sm text-[#243B45]">{item.era}</span>
                        </div>
                        <p className="text-xs font-semibold tracking-wide text-[#9B3D2E]">{item.generation}</p>
                        <p className="text-sm text-[#303331] leading-relaxed">{item.description}</p>
                        {item.linkUrl && <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#243B45] underline underline-offset-4">{item.linkLabel || "Learn more"}<ExternalLink aria-hidden="true" className="w-3.5 h-3.5 shrink-0" /></a>}
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </div>

          {/* Push Hands Video Demonstration - Tall Vertical Frame */}
          <section id="push-hands-demonstration" aria-labelledby="demo-heading" className="scroll-mt-28 bg-[#DFD9CC] p-6 sm:p-10 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-6 max-w-3xl mx-auto w-full text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-semibold uppercase tracking-wider border border-[#9B3D2E]/20">
                <Video className="w-3.5 h-3.5" />
                <span>Video Demonstration</span>
              </div>
              <h2 id="demo-heading" className="font-serif text-2xl sm:text-3xl font-semibold text-[#171918]">
                Push Hands (Ding Bu Tuishou) in Action
              </h2>
              <p className="text-sm text-[#57625B] max-w-xl mx-auto font-light">
                Robin Wu engaging in friendly <em>Ding Bu Tuishou</em> (Fixed-Step Push Hands) with the head judge at the Chinese Martial Arts Autumn Invitational.
              </p>
            </div>

            <div
              className="max-w-sm mx-auto w-full aspect-[9/16] rounded-3xl overflow-hidden border-2 border-[#D5CEBF] bg-[#171918] shadow-lg relative"
            >
              <iframe
                loading="lazy"
                src="https://www.youtube-nocookie.com/embed/MXMZOEoV49M"
                title="Robin Wu - Push Hands (Ding Bu Tuishou) with Head Judge"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <p className="text-sm text-[#57625B] max-w-xl mx-auto font-light">
                Note: Competition Push Hands uses a restricted ruleset. Some methods found in our Fixed-Step Push Hands practice, including head control and joint locks, are therefore absent from this exchange.
            </p>
          <a href="https://www.youtube.com/watch?v=MXMZOEoV49M" target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-[#243B45] underline underline-offset-4">Watch the demonstration on YouTube</a>
          </section>

          {/* Navigation CTA */}
          <div className="bg-[#171918] text-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#303331] text-center space-y-6">
            <h3 className="font-serif text-3xl font-light">
              Interested in joining a practice session?
            </h3>
            <p className="text-sm text-[#DFD9CC] max-w-xl mx-auto font-light">
              Check out our class schedule, training location, and what to expect in your very first class.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/classes"
                className="px-6 py-3 rounded-full bg-[#DFD9CC] text-[#171918] text-xs font-semibold hover:bg-[#D5CEBF] transition-colors"
              >
                View Classes & Schedule →
              </Link>
              <Link
                href="/start"
                className="px-6 py-3 rounded-full bg-[#9B3D2E] text-white text-xs font-bold hover:bg-[#7D3024] transition-colors flex items-center space-x-2"
              >
                <span>Start Here — Your First Class</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </section>
      </div>

      <Footer />
    </main>
  );
}
