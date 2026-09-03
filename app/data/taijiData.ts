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

export const TAIJI_DATA = {
  groupName: "Chen Family Taijiquan Group",
  tagline: "Gongfu Jia (Gongfu Frame)",
  subtitle: "A concrete, methodology-driven internal discipline rooted in leg foundation, scalable intensity, and authentic Yin/Yang balance for all generations.",

  hero: {
    philosophyQuote: "Methodology contains principles, but principles do not contain methodology.",
    subText: "Learn Chen Family Taijiquan through a concrete, progressive training method—developing balance, leg strength, coordination and whole-body movement.",
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
      badge: "Only for the Elderly",
      myth: "Tai Chi is only slow exercise for older people.",
      reality: "Taijiquan can certainly be practiced well into old age, but it was not historically conceived as an elderly exercise program. Many prominent practitioners began training while young: Chen Yu began at approximately age seven, Fu Zhongwen at nine, and Chen Fake in his youth. The practice is scalable and adaptable with age."
    },
    {
      id: "qi-myth",
      badge: "Linguistic Myth",
      myth: "The ‘Chi’ in Tai Chi refers to mystical ‘Chi energy.’",
      reality: "This misconception largely comes from older romanization. In Wade–Giles, Taiji was written 'T'ai Chi,' but the 'Chi' here represents ji (極/极), not qi (氣/气). They are different words with different Chinese characters. Taiji is a classical Chinese philosophical concept associated with the complementary relationship and transformation of Yin and Yang, while Qi is a separate concept. Taijiquan does contain practices that overlap with Qigong, but the word Taiji itself does not mean 'Qi energy.'"
    },
    {
      id: "thousand-myth",
      badge: "1000 Year Myth",
      myth: "Tai Chi is a 1000-year-old art.",
      reality: "The concept of Taiji is ancient, but Taijiquan as a distinct martial system was assembled during the Ming–Qing transition in the 17th century. Some of the martial material from which it was assembled can be traced to earlier sources, but the age of those components should not be confused with the age of Taijiquan itself. This is not unusual: many Chinese martial arts practiced today emerged in recognizable form during the late imperial period. Xingyiquan is traditionally associated with Ji Jike (Ji Longfeng) in the 17th century, while Baguazhang is traced to Dong Haichuan in the 19th century."
    },
    {
      id: "internal-myth",
      badge: "Internal vs External",
      myth: "Because Taijiquan is an ‘internal’ martial art, you need to study an ‘external’ martial art for your training to be complete.",
      reality: "This line of practice is both 'Internal' and 'External'. The 'Internal' should complement the 'External', not replace the 'External'. Our training doesn't pursue 'internal' qualities by eliminating their apparent opposites. They are complementary aspects of one practice, not two halves that require studying separate martial arts. An art named after Taiji should perhaps be expected to resist one-sidedness."
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
      title: "Built for the Long Term",
      text: "Traditionally taught to children and practiced into old age. The same form can be trained with physical demand earlier in life and refined into sustainable practice later—serving both health and martial utility."
    },
    {
      icon: "Compass",
      title: "A Specific Tradition",
      text: "Chen Family Gongfu Jia is a specific, structured system with its own methodology. It is taught as a concrete physical skill rather than the soft, generalized “Tai Chi” most people encounter."
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

  lineageInfo: {
    instructorName: "Robin Wu",
    title: "Chen Family Taijiquan Practitioner",
    bio: "Robin first encountered Chen Family Gongfu Jia in 2019 after a long period of searching for authentic traditional training. What drew him was the school’s reputation for extreme physical demand — a method that challenged even experienced martial artists. He has trained exclusively in this lineage ever since, becoming an indoor student of Marin Spivack.",
    teacherName: "Marin Spivack",
    teacherWebsite: "https://molingtaiji.com/",
    teacherSiteName: "Mo Ling Taiji",
  },

  lineageTree: [
    {
      generation: "Founder",
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
      description: "Publicized Chen Family Taijiquan in Beijing in the year 1928; started serious training at age 14."
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
      description: "Only son of Chen Zhaokui; leading master of traditional Gongfu Jia. Began training under his father at age 7."
    },
    {
      generation: "20th Generation",
      era: "1971–Present",
      figures: ["Marin Spivack"],
      description: "A senior disciple of Chen Yu."
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
      title: "Traditional Taijiquan — Form (Yilu) & Push Hands (Tuishou)",
      day: "Saturdays",
      time: "10:00 AM – 11:30 AM",
      openPracticeNote: "11:30 AM onward — Open Practice & Hangout. Class officially ends at 11:30, but there's no need to rush off. You're welcome to stay afterward to practice, ask questions, work with training partners, or simply hang out with the group. Leave whenever you like.",
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
      scheduleNote: "Saturdays 10:00 AM – 11:30 AM (Weather Permitting)",
      tips: "Wear flat-soled shoes (ideally thin and hard-soled), comfortable pants, and dress in weather-appropriate layers."
    }
  ],

  contact: {
    email: "[Placeholder: contact@chen-taiji-local.com]",
    phone: "[Placeholder: (555) 019-2831]",
    note: "For questions about class structure, location details, or joining practice sessions, please send an email directly to the address above.",
    teacherWebsite: "https://molingtaiji.com/",
    teacherSiteName: "Mo Ling Taiji (Marin Spivack)",
    social: {
      instagram: "[Placeholder: @chen_taiji_community]",
      youtube: "[Placeholder: ChenTaijiLocal]"
    }
  }
};
