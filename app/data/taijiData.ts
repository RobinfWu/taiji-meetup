export interface ClassSession {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  level: "All Levels" | "Beginner" | "Intermediate / Advanced";
  description: string;
  openSpots: number;
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

export const TAIJI_DATA = {
  groupName: "Chen Family Taijiquan Group",
  chineseTitle: "陳氏太極拳",
  tagline: "Gongfu Jia",

  hero: {
    philosophyQuote: "Movement born from quietude, power yielded through stillness.",
    subText: "Explore authentic traditional martial art traditions designed to balance body, mind, and spirit. Guided by structured biomechanics and internal harmony.",
    ctaPrimary: "RSVP For Next Free Class",
    ctaSecondary: "Explore What is Taiji",
    quickStats: [
      { label: "Lineage Tradition", value: "Traditional Chen" },
      { label: "Weekly Sessions", value: "1 Class" },
      { label: "Class Environment", value: "Outdoor" },
      { label: "Community Size", value: "Small" }
    ]
  },

  differences: [
    {
      id: "chansi",
      title: "Silk Reeling (Chan Si Gong)",
      chinese: "纏絲功",
      accentColor: "#4A6B5D",
      summary: "Continuous, spiral rotational movements that gently open joints, release muscular tension, and harmonize total body effort.",
      description: "Silk Reeling is the core kinetic foundation of Chen Taijiquan. Like drawing out delicate silk threads from a cocoon, every movement requires unbroken focus, uniform speed, and seamless whole-body coordination."
    },
    {
      id: "song",
      title: "Active Relaxation (Song)",
      chinese: "鬆",
      accentColor: "#4C6275",
      summary: "Releasing unnecessary muscular tension while maintaining upright structural alignment and internal integrity.",
      description: "Song is not passive limpness, but mindful release. By relaxing deep postural muscles and trusting gravity, weight sinks naturally to the feet, enabling quiet presence and fluid energy flow."
    },
    {
      id: "yinyang",
      title: "Yin-Yang Equilibrium",
      chinese: "陰陽平衡",
      accentColor: "#9E7B56",
      summary: "Dynamic harmony between light and heavy, fast and slow, internal stillness and external expression.",
      description: "Every motion contains its complement: yield to overcome force, root deep to reach upward. Taiji practice cultivates mental adaptability and balance both on the mat and in daily living."
    },
    {
      id: "neigong",
      title: "Internal Cultivation (Neigong)",
      chinese: "內功",
      accentColor: "#57625B",
      summary: "Breathing, posture alignment, and intention-guided energy work for vitality, longevity, and calm focus.",
      description: "Through Standing Meditation (Zhan Zhuang) and synchronized abdominal breathing, practice calms the central nervous system, boosts internal circulation, and builds rooted strength."
    }
  ],

  benefits: [
    {
      icon: "Shield",
      title: "Joint Health & Mobility",
      text: "Gentle low-impact weight transfers strengthen ankles, knees, hips, and spinal rotation without strain."
    },
    {
      icon: "Feather",
      title: "Stress Reduction & Mind Clarity",
      text: "Meditative focus on breath and movement lowers cortisol, calms anxiety, and improves restful sleep."
    },
    {
      icon: "Activity",
      title: "Balance & Core Stability",
      text: "Deepens proprioception and single-leg grounding to improve posture, coordination, and physical confidence."
    },
    {
      icon: "Sun",
      title: "Vitality & Internal Energy",
      text: "Encourages smooth microcirculation and breath flow, enhancing daily stamina and natural resilience."
    }
  ],

  lineageInfo: {
    instructorName: "Robin Wu",
    title: "Chen Family Taijiquan Practitioner",
    bio: "Trained directly under Marin Spivack as an indoor student/disciple since the year 2020.",
  },
  lineageTree: [
    {
      generation: "Originator (17th Century)",
      era: "Chenjiagou Village, Henan",
      figures: ["Chen Wangting (陳王廷)"],
      description: "Accredited as the founder of Chen Family Taijiquan."
    },
    {
      generation: "14th Generation",
      era: "19th - 20th Century Masters",
      figures: ["Chen Changxing"],
      description: "Teacher of Yang Luchan (Founder of Yang Family Taijiquan)"
    },
    {
      generation: "17th Generation",
      era: "19th - 20th Century Masters",
      figures: ["Chen Fake"],
      description: "Publicized Chen Family Taijiquan in the year 1928."
    },
    {
      generation: "18th Generation",
      era: "19th - 20th Century Masters",
      figures: ["Chen Zhaokui"],
      description: "Younger son of Chen Fake."
    },
    {
      generation: "19th Generation",
      era: "19th - 20th Century",
      figures: ["Chen Yu"],
      description: "Only son of Chen Zhaokui."
    },
    {
      generation: "20th Generation",
      era: "Modern Grandmasters",
      figures: ["Marin Spivack"],
      description: "A senior disciple of Chen Yu."
    },
    {
      generation: "Current Local Teaching",
      era: "Present Community",
      figures: ["Robin Wu"],
      description: "Disciple of Marin Spivack"
    }
  ] as LineageGeneration[],

  classes: [
    {
      id: "class-1",
      title: "Chen Style Gongfu Jia Yilu (First Road)",
      day: "Saturdays",
      time: "10:00 AM - 11:30 AM",
      location: "[Placeholder: City Park Rose Garden Lawn / Indoor Studio]",
      level: "Beginner",
      description: "Detailed instruction in the classic 74-movement routine. Step-by-step posture breakdowns, weight shifting, and application awareness.",
      openSpots: 4,
      instructor: "Robin Wu"
    },
    {
      id: "class-2",
      title: "Push Hands (Tui Shou)",
      day: "Sundays",
      time: "6:30 PM - 7:45 PM",
      location: "[Placeholder: Community Martial Arts Studio / Civic Room]",
      level: "Intermediate / Advanced",
      description: "Exploring structure, yielding, sensitivity drills, and cooperative partner work to test and deepen internal balance.",
      openSpots: 5,
      instructor: "Robin Wu"
    }
  ] as ClassSession[],

  locations: [
    {
      name: "Outdoor Morning Park Location",
      address: "[Placeholder: Central Park North Lawn, Gate 4 entrance]",
      scheduleNote: "Saturdays 8:30 AM - 11:30 AM (Weather Permitting)",
      tips: "Bring water, wear comfortable flat-soled shoes, and dress in light layers."
    },
    {
      name: "Indoor Evening Studio",
      address: "[Placeholder: 123 Harmony Way, Suite 2B, Local City]",
      scheduleNote: "Wednesdays 6:30 PM - 7:45 PM",
      tips: "Shoe-free wood floor. Soft socks or clean indoor martial arts shoes requested."
    }
  ],

  faqs: [
    {
      question: "Is Tai Chi for the elderly?",
      answer: "Contrary to the stereotype, Taijiquan was traditionally taught to children in the family lines. Chen Yu, for example, started when he was 7 years old. However, the practice is scalable for all ages."
    },
    {
      question: "What should I wear?",
      answer: "It is highly advised to wear flat-soled shoes, ideally on the thin and harder side."
    },
    {
      question: "Can I try a drop-in trial class before committing?",
      answer: "Yes! Your first class is completely free to RSVP. Come experience the atmosphere, meet the instructor, and see if our teaching approach fits your goals."
    },
    {
      question: "What if it rains during an outdoor park class?",
      answer: "In case of rain, outdoor sessions move to our indoor backup studio space or are rescheduled. Group members receive notification 2 hours prior to class."
    }
  ] as FAQItem[],

  contact: {
    email: "[Placeholder: contact@chen-taiji-local.com]",
    phone: "[Placeholder: (555) 019-2831]",
    social: {
      instagram: "[Placeholder: @chen_taiji_community]",
      youtube: "[Placeholder: ChenTaijiLocal]"
    }
  }
};
