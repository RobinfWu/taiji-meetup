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
  groupName: "Kingston Chen Taijiquan Practice Group",

  hero: {
    subText: "Learn a traditional craft that develops stability, strength, coordination, and whole-body connection. Train at an intensity suited to your ability, through structured solo exercises and interactive partner work.",
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

  mythsAndRealities: [
    {
      id: "elderly-myth",
      badge: "Practice For All Ages",
      myth: "You don't need to be elderly—or young and athletic.",
      reality: "Taijiquan can certainly be practiced well into old age, but it was not historically conceived as an elderly exercise program. Many prominent practitioners began training while young: Chen Yu began at approximately age seven, Fu Zhongwen at nine, and Chen Fake in his youth. The practice is scalable and adaptable with age."
    },
    {
      id: "qi-myth",
      badge: "Linguistic Myth",
      myth: "The ‘Chi’ in Tai Chi does not refer to ‘Chi energy.’",
      reality: "This misconception largely comes from older romanization. In Wade–Giles, Taiji was written 'T'ai Chi,' but the 'Chi' here represents ji (極/极), not qi (氣/气). They are different words with different Chinese characters. Taiji is a classical Chinese philosophical concept associated with the complementary relationship and transformation of Yin and Yang, while Qi is a separate concept. Taijiquan does contain practices that overlap with Qigong, but the word Taiji itself does not mean 'Qi energy.'"
    },
    {
      id: "thousand-myth",
      badge: "Historical Context",
      myth: "Taijiquan isn't thousands of years old.",
      reality: "Taijiquan as a distinct physical martial art was assembled in the 17th century in Chenjiagou during the Ming–Qing transition. The cosmological concept of 'Taiji' is much older than the martial art named after it."
    },
    {
      id: "internal-myth",
      badge: "Unified Mechanics",
      myth: "This Taijiquan is both 'Internal' and 'External'",
      reality: "The 'Internal' should complement the 'External', not replace the 'External'. They are complementary aspects of one practice, not two halves that require studying separate martial arts. An art named after Taiji should perhaps be expected to resist one-sidedness."
    }
  ] as MythItem[],

  scalableTiers: [
    {
      id: "gentle-practice",
      title: "Gentle practice",
      subtitle: "Balance & Coordination",
      description: "Higher stances and comfortable exertion, with an emphasis on balance, coordination and movement quality.",
      icon: "Shield"
    },
    {
      id: "demanding-practice",
      title: "More demanding practice",
      subtitle: "Depth & Physical Challenge",
      description: "Progressively deeper stances, greater leg loading and increasingly challenging physical mechanics.",
      icon: "Flame"
    }
  ] as ScalableTier[],

  benefits: [
    {
      icon: "Clock",
      title: "Build a Body You Can Keep Using",
      text: "Develop stability, leg strength, coordination, mobility, and whole-body movement through a practice designed to grow with you for decades."
    },
    {
      icon: "Compass",
      title: "Learn Something With Real Depth",
      text: "Each stage becomes the foundation for the next. The basics aren't something you leave behind—they become increasingly sophisticated."
    },
    {
      icon: "User",
      title: "Both Solo and Partner",
      text: "Fully portable—no special equipment or fixed location required. The core form can be practiced alone; partner work (Push Hands) adds another dimension when training with others."
    },
    {
      icon: "Layers",
      title: "Progressive Layers of Practice",
      text: "This practice of Taijiquan is built in layers with each stage becoming the foundation for the next. The basics aren't something you leave behind—they become increasingly sophisticated."
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
      description: "Balance is often understood as the ability to maintain equilibrium. Our training goes further, emphasizing the ability to preserve one's structure and stability under external pressure. Rather than balancing like a game of Jenga, we seek to develop a root like a sturdy tree. Our line of practice has a uniquely detailed approach to the architecture and mechanics of the lower body that cultivates stability.",
    },
    {
      number: "02",
      title: "Methodology",
      description: "Our approach is driven by methodology, meaning there is an actual concrete, step by step, how-to — as opposed to leaving students with vague abstract principles that are open to interpretation. There are many stages of practice, each serving as the foundation for the next stage. Methodology contains principles, but principles do not contain methodology. And that is a big weakness of any principle-only Tai Chi because the 'how' is lacking.",
    },
    {
      number: "03",
      title: "Yin and Yang",
      description: "Taijiquan is rooted in the interplay of Yin and Yang. Some practitioners view themselves as the embodiment of Yin (soft, reactive, internal) while viewing the opponent as the embodiment of Yang (hard, proactive, external). This leads to problems. For example, one cannot practice 'soft overcomes hard' if no training partner has learned to express competent hardness. Our approach develops Yin and Yang both within our own bodies and in relation to a partner. Just as soft can overcome hard, hard can also overcome soft. Our Taijiquan is both soft and hard. It's also both internal and external. We believe that the 'internal' should complement the 'external', not replace it.",
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
      description: "He was the only son of Chen Zhaokui. Began training under his father at age 7."
    },
    {
      generation: "20th Generation",
      era: "1971–Present",
      figures: ["Marin Spivack"],
      description: "Marin learned Chen Family Taijiquan from Chen Jinhong (Gene Chen) and Feng Zhiqiang before becoming a senior disciple of Chen Yu."
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
      location: "[Placeholder: City Park Lawn / Outdoor Training Grounds]",
      level: "All Levels",
      description: "A single, comprehensive training session combining both form practice and Tuishou (Push Hands).",
      instructor: "Robin Wu"
    }
  ] as ClassSession[],

  locations: [
    {
      name: "Outdoor Park Location",
      address: "[Placeholder: Central Park North Lawn, Gate 4 entrance]",
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
