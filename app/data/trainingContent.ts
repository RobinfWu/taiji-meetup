/**
 * How We Train content. Technical drafts are deliberately excluded from public HTML.
 * To publish an entry, replace its draft with instructor-authored text and change
 * status to "published". Never publish a bracketed instructor prompt.
 * See docs/how-we-train-content.md for the editing checklist.
 */
export type InstructorCopy =
  | { status: "draft"; prompt: string }
  | { status: "published"; text: string };

export function publishedCopy(copy: InstructorCopy): string | undefined {
  return copy.status === "published" ? copy.text : undefined;
}

const draft = (prompt: string): InstructorCopy => ({ status: "draft", prompt });

export const classPractices = [
  { id: "foundations", title: "Foundational exercises & warm-ups", detail: { status: "published" as const, text: "Warm up, stretch, and practise fundamental basics." } },
  { id: "form", title: "Form practice (Yilu)", detail: { status: "published" as const, text: "Learn a short section of Yilu and revisit it as your coordination develops." } },
  { id: "partners", title: "Partner exercises & Push Hands", detail: { status: "published" as const, text: "Work with a partner to explore balance and how you respond to pressure." } },
  { id: "feedback", title: "Individual feedback & questions", detail: { status: "published" as const, text: "Practise with individual feedback and ask questions." } },
];

export interface YiluSequence {
  number: number;
  name: InstructorCopy;
  description: InstructorCopy;
}

export const yiluSequences: YiluSequence[] = [
  {
    number: 1,
    name: {
      status: "published",
      text: "1. Qǐ shì — Commencing form",
    },
    description: draft("[Instructor: Optional description for sequence 1; leave as draft for a names-only list.]"),
  },
  {
    number: 2,
    name: {
      status: "published",
      text: "2. Jīngāng dǎo duì — Jingang (arhat) pounds mortar",
    },
    description: draft("[Instructor: Optional description for sequence 2; leave as draft for a names-only list.]"),
  },
  {
    number: 3,
    name: {
      status: "published",
      text: "3. Lǎn zhā yī — Lazily tying robe",
    },
    description: draft("[Instructor: Optional description for sequence 3; leave as draft for a names-only list.]"),
  },
  {
    number: 4,
    name: {
      status: "published",
      text: "4. Liù fēng sì bì — Six sealing four closing",
    },
    description: draft("[Instructor: Optional description for sequence 4; leave as draft for a names-only list.]"),
  },
  {
    number: 5,
    name: {
      status: "published",
      text: "5. Dān biān — Single whip",
    },
    description: draft("[Instructor: Optional description for sequence 5; leave as draft for a names-only list.]"),
  },
  {
    number: 6,
    name: {
      status: "published",
      text: "6. Dì èr gè jīngāng dǎo duì — Jingang (arhat) pounds mortar",
    },
    description: draft("[Instructor: Optional description for sequence 6; leave as draft for a names-only list.]"),
  },
  {
    number: 7,
    name: {
      status: "published",
      text: "7. Báihè liàng chì — White crane shows wings",
    },
    description: draft("[Instructor: Optional description for sequence 7; leave as draft for a names-only list.]"),
  },
  {
    number: 8,
    name: {
      status: "published",
      text: "8. Xié xíng — Oblique form",
    },
    description: draft("[Instructor: Optional description for sequence 8; leave as draft for a names-only list.]"),
  },
  {
    number: 9,
    name: {
      status: "published",
      text: "9. Chū shōu — First closing",
    },
    description: draft("[Instructor: Optional description for sequence 9; leave as draft for a names-only list.]"),
  },
  {
    number: 10,
    name: {
      status: "published",
      text: "10. Qiánzú tāng ǎo bù — Wade forward twist step",
    },
    description: draft("[Instructor: Optional description for sequence 10; leave as draft for a names-only list.]"),
  },
  {
    number: 11,
    name: {
      status: "published",
      text: "11. Dì èr gè xié xíng — Obligue form",
    },
    description: draft("[Instructor: Optional description for sequence 11; leave as draft for a names-only list.]"),
  },
  {
    number: 12,
    name: {
      status: "published",
      text: "12. Zài shōu — Second closing",
    },
    description: draft("[Instructor: Optional description for sequence 12; leave as draft for a names-only list.]"),
  },
  {
    number: 13,
    name: {
      status: "published",
      text: "13. Dì èr gè qiánzú tāng ǎo bù — Wade forward twist step",
    },
    description: draft("[Instructor: Optional description for sequence 13; leave as draft for a names-only list.]"),
  },
  {
    number: 14,
    name: {
      status: "published",
      text: "14. Yǎn shǒu hong chuí — Covered hand bicep punch",
    },
    description: draft("[Instructor: Optional description for sequence 14; leave as draft for a names-only list.]"),
  },
  {
    number: 15,
    name: {
      status: "published",
      text: "15. Shízì shǒu — Cross hands",
    },
    description: draft("[Instructor: Optional description for sequence 15; leave as draft for a names-only list.]"),
  },
  {
    number: 16,
    name: {
      status: "published",
      text: "16. Dì sān gè jīngāng dǎo duì — Jingang (arhat) pounds mortar",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 17,
    name: {
      status: "published",
      text: "17. Bì shēn chuí — Shelter body fist",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 18,
    name: {
      status: "published",
      text: "18. Bèi zhé kào — Lean & Fold the back",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 19,
    name: {
      status: "published",
      text: "19. Qīnglóng chūshuǐ — Green Dragon out of the water",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 20,
    name: {
      status: "published",
      text: "20. Shuāng tuīshǒu — Two hands push",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 21,
    name: {
      status: "published",
      text: "21. Sān huàn zhǎng — Three palm changes",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 22,
    name: {
      status: "published",
      text: "22. Zhǒu dǐ chuí — Fist under elbow",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 23,
    name: {
      status: "published",
      text: "23. Dào juǎn hong (3 repetitions) — Whirling upper arms (3 repetitions)",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 24,
    name: {
      status: "published",
      text: "24. Tuìbù yā zhǒu — Step back press elbow",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 25,
    name: {
      status: "published",
      text: "25. Zhōng pán — Middle plate",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 26,
    name: {
      status: "published",
      text: "26. Báihè liàng chì — White crane shows wings",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 27,
    name: {
      status: "published",
      text: "27. Xié xíng ào bù — Oblique form twist step",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 28,
    name: {
      status: "published",
      text: "28. Shǎn tōng bèi — Flash the back",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 29,
    name: {
      status: "published",
      text: "29. Yǎn shǒu hong chuí — Covered hand bicep punch",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 30,
    name: {
      status: "published",
      text: "30. Dà liù fēng sì bì — Big six sealing four closing",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
  {
    number: 31,
    name: {
      status: "published",
      text: "31. Dān biān — Single Whip",
    },
    description: draft("[Instructor: Optional description for sequence 16; leave as draft for a names-only list.]"),
  },
];

interface YiluMilestone {
  id: string;
  title: string;
  range: string;
  summary: string;
  sequences: YiluSequence[];
  sequenceListLabel: string;
  detail: InstructorCopy;
}

// Add milestones here when defined; the page layout does not need to change.
export const yiluMilestones: YiluMilestone[] = [
  {
    id: "short", title: "Short Form", range: "Sequences 1–6",
    summary: "A compact, self-contained routine that introduces the foundational movements of Yilu. A meaningful practice in its own right.",
    sequences: yiluSequences.slice(0, 6),
    sequenceListLabel: "View 6 sequences",
    detail: draft("[Instructor: Describe the Short Form, its ending landmark, and your teaching emphasis. Confirm the relationship to Jingang Dao Dui.]"),
  },
  {
    id: "medium", title: "Medium Form", range: "Sequences 1–16",
    summary: "Builds upon the Short Form with ten additional sequences, expanding the movement vocabulary while continuing to develop the same underlying foundations.",
    sequences: yiluSequences.slice(6, 16),
    sequenceListLabel: "View 10 additional sequences",
    detail: draft("[Instructor: Describe the Medium Form, its ending landmark, and your teaching emphasis. Confirm the relationship to Jingang Dao Dui.]"),
  },
];

export const partnerMethods = [
  { id: "dan-tuishou", videoId: "K4HODp7daVA", title: "Dan Tuishou", translation: "Single-Hand Push Hands", detail: draft("[Instructor: Explain the purpose of Dan Tuishou and how you practise and introduce it in this school.]") },
  { id: "da-lun", videoId: "mjpq-0psZt8", title: "Da Lun", translation: "Hit/Do the Wheel Tuishou\n", detail: draft("[Instructor: Explain the purpose of Da Lu and how you practise and introduce it in this school.]") },
  { id: "ding-bu-tuishou", videoId: "Y1ex4zqk19s", title: "Ding Bu Tuishou", translation: "Fixed-Step Push Hands", detail: draft("[Instructor: Explain the purpose of Ding Bu Tuishou and how you practise and introduce it in this school.]") },
];

// The full explanations below preserve the previous page's instructor-authored
// wording. Summaries are new navigation aids; details retain technical nuance.
export const languageAnalogy = [
  {
    id: "principles", title: "Principles", analogy: "Grammar",
    summary: "What is fundamental to the system.",
    explanation: "Principles describe that which is fundamental to the system. They are like the grammar of the art, the rules that govern the structure and arrangement of the art. Just as languages contain exceptions and nuances, applying these principles requires sensitivity to context rather than rigidly following formulas.",
  },
  {
    id: "jins", title: "Jins", analogy: "Vocabulary",
    summary: "The building blocks of sequences and applications.",
    explanation: "Jins refer to trained expressions of energies or forces that Taijiquan categorizes according to their qualities and desired effects. They are the vocabulary of the art from which sequences and martial applications are constructed by stringing them together like sentences. How well a jin has been cultivated is akin to how well a word is pronounced.",
  },
  {
    id: "sequences", title: "Sequences", analogy: "Sentences",
    summary: "Movements that string together several jins.",
    explanation: "A sequence of movement strings together several jins. Traditional forms contain many named sequences; for example, Yilu (First Road) is traditionally organized into 83 sequences, while Erlu (Second Road) contains 71. By design, sequences train multiple applications at the same time.",
  },
  {
    id: "form", title: "Form (Taolu)", analogy: "Textbook",
    summary: "A repeatable training format that preserves the art.",
    explanation: "A form is a structured collection of sequences. It preserves the lexicon of the art, mechanics, and relationships in a repeatable training format for cultivation.",
  },
  {
    id: "applications", title: "Martial Applications", analogy: "Speaking with the Language",
    summary: "Established expressions, with room for new combinations.",
    explanation: 'Some applications are traditionally taught, much like a language has established sayings and expressions that are passed down. But those examples do not exhaust what the language can express. The same jins can be recombined to create new applications appropriate to the situation. Asking whether something is "the official application" is therefore a little like asking for the one correct sentence that can be made from a particular set of words.',
  },
  {
    id: "tuishou", title: "Push Hands (Tuishou)", analogy: "Conversation",
    summary: "Partnered practice, from patterned exchanges to freestyle responses.",
    explanation: 'Push Hands is like a conversation between two people. It refers to a collection of partnered practices built around sustained physical contact. Some Push Hand drills are patterned, with a prescribed "script" for each player—but mistakes can still be punished. Freestyle Push Hands removes the script, allowing both players to respond freely to each other while remaining within the constraints of the practice.',
  },
];
