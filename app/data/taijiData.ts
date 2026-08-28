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
  tagline: "Methodology-Oriented Gongfu Jia",
  subtitle: "A concrete, methodology-driven internal discipline rooted in leg foundation, scalable intensity, and authentic Yin/Yang balance for all generations.",

  hero: {
    philosophyQuote: "Methodology contains principles, but principles do not contain methodology.",
    subText: "We teach the concrete 'how' instead of just vague slogans. Built on solid leg mechanics and scalable physical exertion, this group is designed for health-seekers and challenge-seekers of all ages.",
    ctaPrimary: "Inquire via Email",
    ctaSecondary: "Explore Methodology & Myths",
    quickStats: [
      { label: "Approach", value: "Methodology First" },
      { label: "Foundation", value: "Leg Stability & Root" },
      { label: "Audience", value: "Scalable for All Ages" },
      { label: "System", value: "Gongfu Jia (First Road)" }
    ]
  },

  differences: [
    {
      id: "methodology",
      title: "Methodology Before Principles",
      accentColor: "#243B45",
      summary: "Principles describe what should happen; methodology provides the path for developing the ability to make it happen.",
      description: "There is a common fallacy that the path to learning Taijiquan is through understanding its “principles.” Principles are important, but studying principles by themselves does not provide a viable path for learning the art. A principle may describe what should happen, but it does not necessarily teach you how to make it happen."
      + "\n\nThere is a methodology to Taijiquan—the actual how of the art. Methodology provides a path of development: what to train, how to train it, what must be developed first, and how one stage of training leads into the next. Without this path, practitioners are left with vagueness."
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
      description: "A common interpretation is that the goal of sōng (to loosen) is to eliminate muscular tension as completely as possible. Taken far enough, this produces the familiar criticism of some Taijiquan practitioners as being limp or “noodle-like.”"
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
      description: "In Taijiquan, Yang against Yang (strength against strength) is frowned upon because it's inefficient."
      + "\n\nYin against Yang (soft overcomes hard) is very respected because it's efficient but also very romanticized."
      + "\n\nYang against Yin (hard against soft) can also be very efficient, yet there's a common false generalization that because “Yang against Yang” is undesirable, Yang itself is inherently bad."
      + "\n\nThis creates a problem with the stereotypical image of “Tai Chi” as an exclusively soft (Yin), slow (Yin), defensive (Yin), and reactionary (Yin) art. In that model, the Taijiquan practitioner becomes the embodiment of Yin while the training partner is expected to roleplay as the embodiment of Yang."
      + "\n\nBut if both people are actually practicing Taijiquan, why should only one of them possess the Taijiquan methods?"
      + "\n\nIn this line of practice, both partners are assumed to have access to both Yin and Yang methods. Better Yang forces the development of better Yin; better Yin forces the development of better Yang. The result is a positive feedback loop in which both sides improve together. Neither Yin nor Yang is inherently superior to the other."
      + "\n\nIf an art teaches Yin methods but does not develop equally competent Yang methods, then its practitioners eventually become very skilled at defending against a version of Yang that no competent opponent would actually use."
    }
  ],

  mythsAndRealities: [
    {
      id: "elderly-myth",
      badge: "Age Stereotype",
      myth: "Tai Chi is only slow exercise for the elderly.",
      reality: "Traditionally, Taijiquan was taught to children and youth—Chen Yu began training at age 7, Fu Zhongwen at 9, and Chen Fake at 14. The practice is fully scalable with age, offering gentle low-exertion options for seniors and deep physical challenges for adolescents and adults."
    },
    {
      id: "qi-myth",
      badge: "Linguistic Myth",
      myth: "Tai 'Chi' means mystical 'Chi' energy manipulation.",
      reality: "'Tai Chi' (or Taiji) refers to the interplay of Yin and Yang. 'Taijiquan' means 'Yin-Yang Fist'—a martial art based on opposing physical mechanics, not abstract energy manipulation."
    },
    {
      id: "song-myth",
      badge: "Structure Myth",
      myth: "Relaxation (Song) means being completely loose and floppy.",
      reality: "Indiscriminate floppiness causes total structural collapse. True 'Song' is active structure: the lower body remains dense and rooted like a tree trunk (Yang), enabling the upper body to yield softly (Yin)."
    },
    {
      id: "partner-myth",
      badge: "Push Hands Myth",
      myth: "One person attacks while the other 'does Tai Chi'.",
      reality: "Passive roleplay prevents real growth. Genuine partner work requires both partners to be skilled in both initiating and reacting, fostering a playful, non-ego feedback loop."
    }
  ] as MythItem[],

  scalableTiers: [
    {
      id: "health-tier",
      title: "Health & Mobility Focus",
      subtitle: "Comfortable Exertion & Fall Prevention",
      description: "Focuses on leg foundation, joint alignment, posture improvement, and comfortable movement. Stance height is kept higher to avoid knee strain while building balance and vitality.",
      icon: "Shield"
    },
    {
      id: "challenge-tier",
      title: "Martial & Craft Focus",
      subtitle: "Deep Stances & Structural Mastery",
      description: "For practitioners seeking a physical challenge. Features deeper stances, rigorous posture precision, kinetic power generation, and cooperative Push Hands partner drills.",
      icon: "Flame"
    }
  ] as ScalableTier[],

  benefits: [
    {
      icon: "Shield",
      title: "Leg Foundation & Fall Prevention",
      text: "Targeted leg work builds deep lower-body stability—the single most effective defense against balance loss and fall-related injuries."
    },
    {
      icon: "Activity",
      title: "Postural Alignment & Joint Integrity",
      text: "Rooted hip and waist mechanics open joints, relieve chronic postural tension, and fortify tendon structure."
    },
    {
      icon: "Feather",
      title: "Selective Relaxation (Song)",
      text: "Learn to distinguish solid structural support in the legs from upper-body softness, quieting nervous system tension."
    },
    {
      icon: "Sun",
      title: "Scalable Physical Conditioning",
      text: "Train on a single shared routine adapted seamlessly to your personal physical capacity—from low exertion to high intensity."
    }
  ],

  lineageInfo: {
    instructorName: "Robin Wu",
    title: "Chen Family Taijiquan Practitioner",
    bio: "Trained directly under Marin Spivack as an indoor student/disciple since the year 2020.",
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
      title: "Chen Style Gongfu Jia Yilu (First Road)",
      day: "Saturdays",
      time: "10:00 AM - 11:30 AM",
      location: "[Placeholder: City Park Lawn / Outdoor Training Grounds]",
      level: "All Levels",
      description: "Detailed instruction in the classic 89-movement routine. Step-by-step posture breakdowns, leg foundation, body mechanics, and scalable exertion.",
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

  faqs: [
    {
      question: "Is Tai Chi only for the elderly?",
      answer: "No. Traditionally, Taijiquan was taught to children and youth (Chen Yu started at age 7, Fu Zhongwen at 9). Because the core routine is built on a scalable skeleton, intensity can be adjusted from gentle low-exertion health practice to rigorous physical conditioning."
    },
    {
      question: "Does Tai Chi involve mystical 'Qi' energy?",
      answer: "No. 'Tai Chi' (Taiji) refers to the interplay of Yin and Yang physical forces—not mystical energy. Our teaching is strictly methodology-driven, focusing on concrete leg foundation and structural mechanics."
    },
    {
      question: "What is your approach to Push Hands / partner work?",
      answer: "We treat Push Hands as a playful craft focused on mutual learning. Both partners practice initiating (Yang) and reacting (Yin) methods in a non-ego environment where how you move matters far more than winning or losing."
    },
    {
      question: "What footwear and attire should I wear?",
      answer: "It is highly advised to wear flat-soled shoes, ideally thin and hard-soled. Wear loose, comfortable clothing allowing unhindered hip and shoulder movement."
    },
    {
      question: "How do I inquire about joining or asking questions?",
      answer: "Send an email directly to our instructor at [Placeholder: contact@chen-taiji-local.com]. We welcome serious inquiries regarding training focus, locations, and schedule."
    }
  ] as FAQItem[],

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
