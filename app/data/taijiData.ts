export interface ClassSession {
  id: string;
  title: string;
  day: string;
  time: string;
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
      title: "Methodology Before Principles",
      accentColor: "#243B45",
      summary: "Principles describe what should happen; methodology provides the path for developing the ability to make it happen.",
      description: "There is a common fallacy that the path to learning Taijiquan is through understanding its “principles.” Principles are important, but studying principles by themselves does not provide a viable path for learning the art. A principle may describe what should happen, but it does not necessarily teach you how to make it happen."
      + "\n\nThere is a methodology to Taijiquan—the actual how of the art. Methodology provides a path of development: what to train, how to train it, what must be developed first, and how one stage of training leads into the next. Methodology provides a structured path for building physical capability step by step."
      + "\n\nConsider the common saying, “soft overcomes hard.” Treated as a universal principle, softness can easily become the objective of the art. But understood as a tactic within the larger relationship of Yin and Yang, it describes only one side of the relationship: soft (yin) overcomes hard (yang), but hard (yang) can also overcome soft (yin). What seems like a minor confusion between principle and tactic can therefore result in an entire half of the art being neglected."
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
      title: "Yin & Yang in the Body",
      accentColor: "#8A7250",
      summary: "The goal is not maximum relaxation, but the appropriate distribution of softness and hardness according to function.",
      description: "A common interpretation is that the goal of sōng (to loosen) is to eliminate muscular tension as completely as possible. Taken far enough, this can be misunderstood as total relaxation without structure."
      + "\n\nIn this line of practice, sōng is understood more specifically as the removal of unnecessary tension. Necessary tension still exists. Tension is neither indiscriminately removed nor uniformly distributed throughout the body."
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
      reality: "This misconception largely comes from older English romanization. The ji in Taiji (太极) is not the same word or Chinese character as qi (气). Taiji is a classical Chinese philosophical concept associated with the complementary relationship and transformation of yin and yang. Qi is a separate concept entirely. Taijiquan training may include practices concerned with breathing, awareness, relaxation, intention, and other qualities also encountered in qigong, but the word Taiji itself does not mean “qi energy.”"
    },
    {
      id: "principle-myth",
      badge: "Principle-Only Myth",
      myth: "Taijiquan is just a set of principles.",
      reality: "Learning Taijiquan is like learning a language of the body. Principles are its grammar (the rules). Jins are its vocabulary. Sequences and martial applications are its sentences. Tuishou (Push Hands) is conversation. Just as you cannot learn to speak English by studying grammar alone, you cannot fully learn Taijiquan by studying principles alone."
    },
    {
      id: "internal-myth",
      badge: "Internal vs External",
      myth: "Because Taijiquan is an ‘internal’ martial art, you need to study an ‘external’ martial art for your training to be complete.",
      reality: "Within our lineage, the practice is both 'Internal' (Yin) and 'External' (Yang). The 'Internal' should complement the 'External', not replace the 'External'. One would think that an art about Yin and Yang would advocate for having both sides of the coin, not just one."
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
      description: "Accredited as the founder of Chen Family Taijiquan."
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
      description: "A senior disciple of Chen Yu. Founder of Mo Ling Taiji (https://molingtaiji.com/)."
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
      title: "Gongfu Jia Yilu — First Road",
      day: "Saturdays",
      time: "10:00 AM - 11:30 AM",
      location: "[Placeholder: City Park Lawn / Outdoor Training Grounds]",
      level: "All Levels",
      description: "Learn the traditional form progressively, beginning with foundational stance, weight shifting and body mechanics. Each section builds upon skills developed earlier.",
      instructor: "Robin Wu"
    },
    {
      id: "class-2",
      title: "Push Hands (Tui Shou) & Structure Drills",
      day: "Sundays",
      time: "6:30 PM - 7:45 PM",
      location: "[Placeholder: Community Park Lawn / Outdoor Grounds]",
      level: "All Levels",
      description: "Playful, cooperative partner work exploring structure, yielding, sensitivity, and reciprocal Yin/Yang methods.",
      instructor: "Robin Wu"
    }
  ] as ClassSession[],

  locations: [
    {
      name: "Outdoor Park Location",
      address: "[Placeholder: Central Park North Lawn, Gate 4 entrance]",
      scheduleNote: "Saturdays 10:00 AM - 11:30 AM & Sundays 6:30 PM (Weather Permitting)",
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
