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

export const TAIJI_DATA = {
  groupName: "Chen Family Taijiquan Group",
  chineseTitle: "陳氏太極拳",
  tagline: "Traditional Gongfu Jia",
  subtitle: "Authentic Chen Style Taijiquan focused on internal mechanics, spiral energy (Chan Si Jin), structural power, and traditional form practice.",
  
  announcement: {
    badge: "Traditional Training",
    message: "Outdoor group practice & form refinement sessions forming.",
    linkText: "View Schedule & Inquire"
  },

  hero: {
    philosophyQuote: "Rooted in structure, expressed through spiraling force.",
    subText: "Traditional Chen Style Taijiquan Gongfu Jia—an internal martial discipline combining precise biomechanics, structural integrity (Peng Jin), and spiraling energy.",
    ctaPrimary: "Inquire via Email",
    ctaSecondary: "Explore Lineage & Art",
    quickStats: [
      { label: "Tradition", value: "Chen Family Gongfu" },
      { label: "System", value: "Gongfu Jia (First Road)" },
      { label: "Focus", value: "Internal Mechanics" },
      { label: "Teaching", value: "Direct Lineage" }
    ]
  },

  differences: [
    {
      id: "chansi",
      title: "Spiral Energy (Chan Si Jin)",
      accentColor: "#243B45",
      summary: "Continuous whole-body spiral rotations connecting feet, legs, waist, and arms into unified kinetic energy.",
      description: "Chan Si Jin is the core kinetic foundation of Chen Taijiquan. Through spiraling movement, force travels unbroken through the body structure like twisted silk thread, generating resilient internal elasticity."
    },
    {
      id: "pengjin",
      title: "Structural Elasticity (Peng Jin)",
      accentColor: "#8A7250",
      summary: "An expansive, outward-supporting internal framework that maintains balance and deflects incoming force.",
      description: "Peng Jin is the fundamental quality present in all Taiji movements. Like a fully inflated ball that yields under pressure without collapsing, it provides structural resilience without muscular tension."
    },
    {
      id: "song",
      title: "Sinking & Grounding (Song & Root)",
      accentColor: "#303331",
      summary: "Releasing unnecessary muscular tension so body weight sinks directly into the ground through the feet.",
      description: "Song is active release. By sinking the hips (Kua) and relaxing postural tension, weight roots deeply into the earth, enabling quiet physical presence and explosive power transmission."
    },
    {
      id: "fajin",
      title: "Explosive Force (Fajin)",
      accentColor: "#9B3D2E",
      summary: "Coordinated, lightning-fast release of internal power originating from the heels, guided by the waist, and expressed through the limbs.",
      description: "Fajin distinguishes Chen Style gongfu. Born from deep relaxation and total body unification, force is released instantly with crisp, whipped momentum."
    }
  ],

  benefits: [
    {
      icon: "Shield",
      title: "Joint Fortification & Alignment",
      text: "Deep weight-shifting and waist-driven rotation strengthen tendons, open joints, and correct postural imbalances."
    },
    {
      icon: "Feather",
      title: "Calm Intent & Nervous System Balance",
      text: "Rigorous focus on internal mechanics quietens the active mind, sharpening focus and physical awareness."
    },
    {
      icon: "Activity",
      title: "Rooted Core Strength",
      text: "Builds deep leg stamina, hip mobility (Kua opening), and resilient core stability."
    },
    {
      icon: "Sun",
      title: "Internal Vitality & Circulation",
      text: "Encourages deep abdominal breath (Dantian breathing) and smooth vascular microcirculation."
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
      description: "Publicized Chen Family Taijiquan in Beijing in the year 1928."
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
      description: "Only son of Chen Zhaokui; leading master of traditional Gongfu Jia."
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
      level: "Beginner",
      description: "Detailed instruction in the classic 89-movement routine. Step-by-step posture breakdowns, weight shifting, body mechanics, and application awareness.",
      instructor: "Robin Wu"
    },
    {
      id: "class-2",
      title: "Push Hands (Tui Shou) & Structure Drills",
      day: "Sundays",
      time: "6:30 PM - 7:45 PM",
      location: "[Placeholder: Community Park Lawn / Outdoor Grounds]",
      level: "Intermediate / Advanced",
      description: "Exploring structure, yielding, sensitivity drills, and cooperative partner work to test and deepen internal balance.",
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
      answer: "Contrary to modern stereotypes, traditional Taijiquan is a rigorous martial art. Chen Yu, for example, started training at 7 years old. However, the internal principles are scalable for practitioners of all ages and fitness levels."
    },
    {
      question: "What footwear and attire should I wear?",
      answer: "It is highly advised to wear flat-soled shoes, ideally on the thin and hard side. Wear loose, comfortable clothing allowing unhindered hip and shoulder movement."
    },
    {
      question: "How do I inquire about joining or asking questions?",
      answer: "Send an email directly to our instructor at [Placeholder: contact@chen-taiji-local.com]. We welcome serious inquiries regarding training focus, locations, and schedule."
    },
    {
      question: "What if weather is unfavorable during outdoor sessions?",
      answer: "In case of heavy rain or extreme cold, outdoor sessions are rescheduled or moved to a covered area. Inquirers receive direct email notifications beforehand."
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
