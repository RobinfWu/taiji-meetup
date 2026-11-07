export interface ClassSession {
  id: string;
  title: string;
  day: string;
  time: string;
  openPracticeNote?: string;
  location: string;
  level: "All Levels" | "Beginner" | "Intermediate / Advanced";
  description: string;
  instructor: string;
}

export interface LineageGeneration {
  generation: string;
  era: string;
  figures: string[];
  description: string;
  linkUrl?: string;
  linkLabel?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MythItem {
  id: string;
  myth: string;
  reality: string;
  badge: string;
}

export interface ScalableTier {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface EditorialPracticeItem {
  number: string;
  title: string;
  description: string;
}

export interface SpecialPracticeItem {
  number: string;
  title: string;
  description: string;
}

export const TAIJI_DATA = {
  groupName: "Classes taught by Robin Wu",

  hero: {
    subText: "Learn a traditional craft that develops stability, strength, coordination, and whole-body connection. Train at an intensity suited to your ability, through structured solo exercises and optional partner work.",
    ctaPrimary: "Try a Class",
    ctaSecondary: "How We Train",
    quickStats: [
      { label: "Practice", value: "Traditional practice" },
      { label: "Flexibility", value: "Scalable intensity" },
      { label: "Audience", value: "All experience levels" }
    ]
  },

  differences: [
    {
      id: "methodology",
      title: "Taijiquan Is a Language of the Body",
      accentColor: "#243B45",
      summary: "Principles describe what should happen; methodology provides the path for developing the ability to make it happen.",
      description: "Learning Taijiquan is like learning a language of the body. Principles are its grammar (the rules). Jins are its vocabulary, the building blocks. Sequences and martial applications are its sentences. Tuishou (Push Hands) is conversation. Just as you cannot learn to speak English by studying grammar alone, you cannot fully learn Taijiquan by studying principles alone."
      + "\n\nThere is a methodology to Taijiquan—the actual how of the art. Methodology provides a path of development: what to train, how to train it, what must be developed first, and how one stage of training leads into the next. Methodology provides a structured path for building physical capability step by step."
    },
    {
      id: "leg-foundation",
      title: "The Legs as Foundation",
      accentColor: "#9B3D2E",
      summary: "The legs provide the structural and energetic foundation from which the rest of the art is developed.",
      description: "In this line of practice, the legs are the foundation for everything. The practice is “energetically” bottom-heavy."
      + "\n\nFrom a health perspective, strength, balance, and stability in the legs become increasingly important with age, particularly in reducing the risk of falls. This parallels the traditional Chinese observation that, as people age, the legs are often the first thing to weaken."
      + "\n\nFrom a martial perspective, a well-developed lower body provides the structural stability necessary to receive pressure without being easily manipulated, while also providing the foundation from which pressure and force can be expressed."
      + "\n\nThe architecture and mechanics of the legs are very detailed and specific to this line of practice."
    },
    {
      id: "tree-metaphor",
      title: "Distribution of Tension",
      accentColor: "#8A7250",
      summary: "The goal is not maximum relaxation, but the appropriate distribution of softness and hardness according to function.",
      description: "In this line of practice, sōng (to loosen) is the removal of unnecessary tension, but necessary tension still exists. Tension is neither indiscriminately removed nor uniformly distributed throughout the body."
      + "\n\nConsider a tree."
      + "\n\nThe roots and lower trunk must possess considerable structural integrity relative to the thinner and more flexible branches above. If the entire tree possessed the softness and flexibility of its smallest branches, it could not remain standing when subjected to force."
      + "\n\nThe same general relationship exists in the body. As a gross oversimplification, this line of practice emphasizes a relatively Yang lower body and a relatively Yin upper body."
    },
    {
      id: "reciprocal-yin-yang",
      title: "Yin & Yang in Partner Work",
      accentColor: "#303331",
      summary: "Both partners develop Yin and Yang methods, so each becomes the training ground for improving the other.",
      description: "In Taijiquan, Yang against Yang (strength against strength) is inefficient."
      + "\n\nYin against Yang (soft overcomes hard) is efficient and highly valued."
      + "\n\nYang against Yin (hard against soft) can also be effective, yet there is sometimes a misconception that because “Yang against Yang” is undesirable, Yang itself is inherently bad."
      + "\n\nIn this line of practice, both partners are assumed to have access to both Yin and Yang methods. Better Yang forces the development of better Yin; better Yin forces the development of better Yang. The result is a positive feedback loop in which both sides improve together. Neither Yin nor Yang is inherently superior to the other."
      + "\n\nIf an art teaches Yin methods but does not develop equally competent Yang methods, then its practitioners eventually become very skilled at defending against a version of Yang that no competent opponent would actually use."
    }
  ],

  editorialPractices: [
    {
      number: "01",
      title: "Portability",
      description: "Taijiquan requires no special equipment or dedicated facilities. It is a lifelong practice. You can practice almost anywhere.",
    },
    {
      number: "02",
      title: "Adaptable Across Ages",
      description: "Taijiquan can be practiced by people of different ages. Its training can range from gentle, controlled movement to physically demanding exercises that challenge strength, coordination, and endurance.",
    },
    {
      number: "03",
      title: "Health and Martial Synergies",
      description: "Taijiquan is both a martial art and a discipline for cultivating physical health. Many of its training methods serve both purposes. For example, the weight-bearing aspect of the practice develops strength and stability in the legs, qualities that are valuable both for managing external pressure in partner practice and for maintaining physical capability as we age.",
    },
  ] as EditorialPracticeItem[],

    specialPractices: [
    {
      number: "01",
      title: "Stability Beyond Balance",
      description: "Balance is often understood as maintaining equilibrium. Our training goes further, emphasizing the ability to preserve one's structure and stability under external pressure. Rather than balancing like a game of Jenga, we seek to develop a root like a sturdy tree. Our line of practice has a uniquely detailed approach to the lower body that cultivates stability.",
    },
    {
      number: "02",
      title: "Methodology",
      description: (
        <>
          We teach through a concrete, step-by-step methodology rather than
          relying on abstract principles alone. Each stage of training builds
          upon the last, giving students a clear path toward developing their
          skills. Principles explain <em>what</em> we seek to achieve;
          methodology teaches <em>how</em> to achieve it.
        </>
        ),
    },
    {
      number: "03",
      title: "Yin and Yang",
      description: (
        <>
          Consider these contrasting qualities:
          <br />
          <br />
          <strong>Yin:</strong> Slow · Internal · Soft · Defensive · Passive · Reactive
          <br />
          <strong>Yang:</strong> Fast · External · Hard · Offensive · Active · Proactive
          <br />
          <br />
          Contrary to the common perception of Tai Chi as a slow, soft,
          passive, and purely internal martial art, our line of practice
          emphasizes the development of both Yin and Yang.
          <br />
          <br />
          We train both sides of Yin and Yang, recognizing that neither is complete without the other.
          <br />
          <br />
          <strong>
            After all, Taiji (Tai Chi) itself is defined by the interplay of Yin and Yang.
          </strong>
        </>
      ),
    },
  ] as SpecialPracticeItem[],


  lineageInfo: {
    instructorName: "Robin Wu",
    title: "Chen Family Taijiquan Practitioner",
    bio: "Robin began studying Chen Family Taijiquan - Gongfu Jia in 2019, drawn by accounts of its extraordinary physical demands. With no prior martial arts background, he entered the tradition as a blank slate and has trained exclusively within the lineage ever since, becoming an indoor student of Marin Spivack.",
    teacherName: "Marin Spivack",
    teacherWebsite: "https://molingtaiji.com/",
    teacherSiteName: "Mo Ling Taiji",
  },

  lineageTree: [
    {
      generation: "9th Generation",
      era: "1580–1660",
      figures: ["Chen Wangting"],
      description: "Accredited as the founder of Chen Family Taijiquan. It was said that Taijiquan used to have 7 bare-handed forms."
    },
    {
      generation: "14th Generation",
      era: "1771–1853",
      figures: ["Chen Changxing"],
      description: "Teacher of Yang Luchan (Founder of Yang Family Taijiquan)."
    },
    {
      generation: "17th Generation",
      era: "1887–1957",
      figures: ["Chen Fake"],
      description: "Moved from Chen Village to Beijing in 1928, bringing Chen-family practice into a major public martial-arts community and teaching extensively outside the village."
    },
    {
      generation: "18th Generation",
      era: "1928–1981",
      figures: ["Chen Zhaokui"],
      description: "Younger son of Chen Fake; preserved traditional Gongfu Jia."
    },
    {
      generation: "19th Generation",
      era: "1962–Present",
      figures: ["Chen Yu"],
      description: "He was the only son of Chen Zhaokui. Began training under his father at age 7.",
      linkUrl: "https://taijigongfu.com/chenyu-%e9%99%88%e7%91%9c/",
      linkLabel: "Learn more about Chen Yu",
    },
    {
      generation: "20th Generation",
      era: "1971–Present",
      figures: ["Marin Spivack"],
      description: "Marin learned Chen Family Taijiquan from Chen Jinhong (Gene Chen) and Feng Zhiqiang before becoming a senior disciple of Chen Yu.",
      linkUrl: "https://molingtaiji.com/marinspivack/",
      linkLabel: "Learn more about Marin Spivack",
    },
    {
      generation: "Current Local Teaching",
      era: "Present",
      figures: ["Robin Wu"],
      description: "Disciple of Marin Spivack."
    }
  ] as LineageGeneration[],

  classes: [
    {
      id: "class-1",
      title: "Taijiquan — Form (Yilu) & Push Hands (Tuishou)",
      day: "Saturdays",
      time: "10:30 AM – 12:00 PM",
      openPracticeNote: "12:00 PM onward — Open Practice & Hangout. Class officially ends at 12:00 PM, but there's no need to rush off. You're welcome to stay afterward to practice, ask questions, work with training partners, or simply hang out with the group.",
      location: "Kingston, Ontario",
      level: "All Levels",
      description: "A single, comprehensive training session combining both form practice and Tuishou (Push Hands).",
      instructor: "Robin Wu"
    }
  ] as ClassSession[],

  locations: [
    {
      name: "Outdoor Park Location",
      address: "Kingston, Ontario",
      scheduleNote: "Saturdays 10:30 AM – 12:00 PM (Weather Permitting)",
      tips: "Wear flat-soled shoes (ideally thin and hard-soled), comfortable pants, and dress in weather-appropriate layers."
    }
  ],

  contact: {
    email: "chentaijilab@gmail.com",
    note: "For questions about class structure, location details, or joining practice sessions, please send an email directly to the address above.",
    teacherWebsite: "https://molingtaiji.com/",
    teacherSiteName: "Mo Ling Taiji (Marin Spivack)",
    social: {
      instagram: "[Placeholder: @chen_taiji_community]",
      youtube: "[Placeholder: ChenTaijiLocal]"
    }
  }
};
