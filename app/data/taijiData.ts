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
  chineseTitle: "陳氏太極拳",
  tagline: "Methodology-Oriented Gongfu Jia",
  subtitle: "A concrete, methodology-driven internal discipline rooted in leg foundation, scalable intensity, and authentic Yin/Yang balance for all generations.",
  
  announcement: {
    badge: "Methodology-Driven",
    message: "Authentic Chen Family Gongfu Jia practice & form refinement.",
    linkText: "Explore Philosophy & Schedule"
  },

  hero: {
    philosophyQuote: "Methodology contains principles, but principles do not contain methodology.",
    subText: "We teach the concrete 'how'—not vague abstract slogans. Built on solid leg mechanics and scalable physical exertion, our practice is designed for health-seekers and challenge-seekers of all ages.",
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
      title: "Methodology Over Vague Slogans",
      accentColor: "#243B45",
      summary: "We teach the concrete 'how' rather than abstract concepts like 'be like water'. Methodology contains principles, providing a clear progression roadmap.",
      description: "Mainstream classes often dwell on vague slogans without providing a physical roadmap. Our school focuses on concrete mechanics, posture breakdowns, and clear physical feedback so students know exactly how to progress."
    },
    {
      id: "leg-foundation",
      title: "Leg Foundation as Priority #1",
      accentColor: "#9B3D2E",
      summary: "Grounded leg strength is the root of both health (preventing fall-related injuries) and martial power.",
      description: "The legs are the fundamental engine of Taijiquan. Health-wise, leg stability is the single most important factor in balance and fall prevention. Martially, structural stability in the legs enables all upper-body movement and force transmission."
    },
    {
      id: "tree-metaphor",
      title: "Selective Relaxation: The Tree Metaphor",
      accentColor: "#8A7250",
      summary: "The lower body is solid and hard like roots and trunk (Yang), allowing the upper body to yield softly like branches in the wind (Yin).",
      description: "Indiscriminate softness leads to physical collapse. Like a tree, your lower body must remain dense, solid, and rooted (Yang) so that your upper body and arms can remain light, sensitive, and yielding (Yin) without collapsing under pressure."
    },
    {
      id: "reciprocal-yin-yang",
      title: "Two-Way Reciprocal Partner Work",
      accentColor: "#303331",
      summary: "Push Hands is a playful craft where both partners practice initiating and reacting, avoiding scripted roleplay.",
      description: "Instead of one person acting as defender while the other roleplays an attacker, both practitioners cultivate competent Yin (reacting/yielding) and Yang (initiating/issuing) methods. This creates a supportive, non-ego feedback loop where how you move matters far more than winning or losing."
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
      myth: "Tai 'Chi' means mystical 'Qi' energy manipulation.",
      reality: "'Tai Chi' (or Taiji) refers to the interplay of Yin and Yang (the ultimate extremes). 'Taijiquan' means 'Yin-Yang Fist'—a martial art based on opposing physical mechanics, not abstract energy manipulation."
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
