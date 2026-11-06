import type { InstructorCopy } from "./trainingContent";

export interface HomepageFaqEntry {
  id: string;
  question: string;
  answer: InstructorCopy;
  relatedLink?: { href: string; label: string };
}

/** Reorder or add entries here. Draft entries are entirely hidden from visitors.
 * To publish, replace answer with { status: "published", text: "Your approved answer" }.
 * Separate paragraphs with \n\n. Never publish an instructor prompt. Rebuild/deploy
 * after editing. The first answer is migrated verbatim from the existing About page.
 */
export const homepageFaq: HomepageFaqEntry[] = [
  {
    id: "what-is-taijiquan",
    question: "What is Taijiquan?",
    answer: { status: "published", text: "Many Chinese martial arts follow a naming scheme: Taijiquan, Xingyiquan, Bajiquan, Tanglangquan, Hung Ga Kuen, etc...\n\n“Quan”, or “Kuen” in Cantonese, translates to mean fist which denotes a martial art or fighting system. It does not literally mean an art about using fists. Taijiquan therefore means “Taiji Fist” — a martial art named after the concept of Taiji (the interplay of Yin and Yang). It is a Northern Chinese martial art that originated from the Chen Village (Chenjiagou) in Henan Province.\n\nTaijiquan is a family art. It was commonly passed down from father to son or from “master” to “apprentice”. The Chen family developed it first. The founder of the Yang family learned from the Chen family; the founder of the Wu family later learned from the Yang family.\n\nThis is the historical root of what most people today simply call “Tai Chi.”" },
  },
  {
    id: "taiji-and-tai-chi",
    question: "What's the difference between Taiji and Tai Chi?",
    answer: { status: "draft", prompt: "[Instructor: Explain the relationship between Taiji and Tai Chi terminology.]" },
  },
  {
    id: "previous-experience",
    question: "Do I need previous martial arts experience?",
    answer: { status: "draft", prompt: "[Instructor: Explain how beginners are introduced to training.]" },
  },
  {
    id: "entire-form",
    question: "Do I have to learn the entire traditional form?",
    answer: { status: "draft", prompt: "[Instructor: Explain the modular Yilu curriculum and whether students need to learn the full form.]" },
    relatedLink: { href: "/method#yilu", label: "Explore the Yilu curriculum" },
  },
  {
    id: "push-hands",
    question: "What is Push Hands (Tuishou)?",
    answer: { status: "draft", prompt: "[Instructor: Explain Push Hands in accessible language.]" },
    relatedLink: { href: "/method#partner-training", label: "Explore partner training" },
  },
  {
    id: "what-to-bring",
    question: "What should I wear or bring to class?",
    answer: { status: "draft", prompt: "[Instructor: Specify appropriate clothing, footwear, and anything students should bring.]" },
  },
];
