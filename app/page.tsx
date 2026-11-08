import Image from "next/image";
import { PracticeOverview } from "./components/PracticeOverview";
import { HomepageFaq } from "./components/HomepageFaq";
import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import { ArrowRight, BookOpen, Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E8E4DA] text-[#171918] relative flex flex-col font-sans selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
      <Navbar />

      <div className="flex-1">
        {/* Step 1: Hero */}
        <HeroSection />

        {/* Step 6: Your First Class (Doorway to /start) */}
        <section className="py-20 bg-[#DFD9CC]/50 border-y border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#E8E4DA] p-8 sm:p-12 rounded-3xl border border-[#D5CEBF] shadow-xs space-y-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#9B3D2E]">
                  No Experience Needed
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Your First Class
                </h2>
                <p className="text-base text-[#303331] font-light">
                  We make starting as straightforward and reassuring as possible. No uniform, no special flexibility, no expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#DFD9CC] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#9B3D2E]">1. Come as you are</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Comfortable clothes and flat shoes. No uniform required.
                  </p>
                </div>
                <div className="bg-[#DFD9CC] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#243B45]">2. Step-by-step instruction</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Basic stance, posture, weight shifting, and movement fundamentals.
                  </p>
                </div>
                <div className="bg-[#DFD9CC] p-5 rounded-2xl border border-[#D5CEBF] space-y-2">
                  <span className="font-serif text-xl font-bold text-[#8A7250]">3. Scalable exertion</span>
                  <p className="text-xs text-[#303331] leading-relaxed font-light">
                    Start gently, or ask how to make the exercises more physically demanding.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/start"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-[#9B3D2E] text-white text-sm font-bold hover:bg-[#7D3024] transition-colors shadow-md"
                >
                  <span>What to Expect in Your First Class →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: Meet Robin (Doorway to /about) */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 space-y-4 w-full max-w-lg mx-auto lg:max-w-none">
                <div className="rounded-3xl overflow-hidden border border-[#D5CEBF] shadow-md bg-[#DFD9CC]">
                  <Image
                    src="/baishi1.jpg"
                    width={1024}
                    height={1024}
                    alt="Marin Spivack and Robin Wu"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-xs text-[#8A7250] italic text-center font-serif">
                  Marin Spivack & Robin Wu
                </p>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  Meet Robin
                </h2>
                <p className="text-base sm:text-lg text-[#303331] leading-relaxed font-light">
                  Robin Wu is a Chen Family Taijiquan practitioner and formal disciple of Marin Spivack. His training follows the Gongfu Jia tradition transmitted through Chen Yu, and he hopes to cultivate a community of practitioners who can learn and improve together.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center space-x-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-7 py-3.5 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer border border-[#303331]"
                  >
                    <span>Learn About Robin & Lineage</span>
                    <ArrowRight className="w-4 h-4 text-[#8A7250]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PracticeOverview />

        {/* Step 3: How We Teach (Doorway to /method) */}
        <section className="py-20 bg-[#DFD9CC]/50 border-t border-[#D5CEBF] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/10 text-[#9B3D2E] text-xs font-semibold uppercase tracking-widest border border-[#9B3D2E]/20">
                  <span>Physical Methodology</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#171918]">
                  How We Teach
                </h2>
                <div className="pt-2">
                  <Link
                    href="/method"
                    className="inline-flex items-center space-x-2.5 bg-[#171918] hover:bg-[#303331] text-[#E8E4DA] px-7 py-3.5 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer border border-[#303331]"
                  >
                    <span>Explore How We Train</span>
                    <ArrowRight className="w-4 h-4 text-[#8A7250]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#DFD9CC] p-8 rounded-3xl border border-[#D5CEBF] space-y-4 shadow-xs">
                <div className="flex items-center space-x-3 text-[#9B3D2E]">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">THE YILU CURRICULUM</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#171918]">
                  A Form Learned in Stages
                </h3>
                <p className="text-xs text-[#303331] leading-relaxed font-light">
                  Students begin with a six-sequence routine that can be practised on its own, with room for continued refinement or additional sequences.
                </p>
                <div className="pt-2 border-t border-[#D5CEBF] flex justify-between items-center text-xs">
                  <Link href="/method#yilu" className="text-[#9B3D2E] font-semibold hover:underline">
                    Explore the curriculum
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Step 7: Schedule / Location */}
        <section className="py-20 bg-[#E8E4DA] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#243B45]">
                  Practice Details
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#171918]">
                  Planned Schedule & Location
                </h2>
              </div>
              <Link
                href="/start#ask-robin"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#243B45] hover:underline"
              >
                <span>Share your weekend availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#DFD9CC] p-6 rounded-3xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex items-center space-x-3 text-[#171918]">
                  <Calendar className="w-5 h-5 text-[#8A7250]" />
                  <h3 className="font-serif text-lg font-semibold">Weekend Classes</h3>
                </div>
                <div className="text-xs text-[#303331] space-y-1.5 font-light">
                  <p>Classes are planned for weekends. I’ll use student feedback and studio availability to choose the day and time.</p>
                </div>
              </div>

              <div className="bg-[#DFD9CC] p-6 rounded-3xl border border-[#D5CEBF] space-y-3 shadow-xs">
                <div className="flex items-center space-x-3 text-[#171918]">
                  <MapPin className="w-5 h-5 text-[#243B45]" />
                  <h3 className="font-serif text-lg font-semibold">Possible Venue</h3>
                </div>
                <div className="text-xs text-[#303331] space-y-1 font-light">
                  <p className="font-semibold text-[#171918]">The Yoga Loft Kingston</p>
                  <p>Kingston, Ontario</p>
                  <p>Venue to be confirmed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomepageFaq />

        {/* Step 10: Try a Class CTA */}
        <section className="py-20 bg-[#171918] text-[#E8E4DA] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#9B3D2E]/20 text-[#9B3D2E] text-xs font-bold uppercase tracking-widest border border-[#9B3D2E]/40">
              <span>Take the First Step</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light">
              Try Your First Class
            </h2>
            <p className="text-base text-[#DFD9CC] max-w-xl mx-auto font-light leading-relaxed">
              No long-term commitment or prior experience required. Come experience Chen Family Taijiquan practice for yourself.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start#ask-robin"
                className="px-9 py-4 rounded-full bg-[#9B3D2E] text-white text-base font-bold hover:bg-[#7D3024] transition-colors shadow-lg flex items-center space-x-2"
              >
                <span>Share your weekend availability</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
