import type { InstructorCopy } from "./trainingContent";

export interface HomepageFaqEntry {
  id: string;
  question: string;
  answer: InstructorCopy;
  relatedLink?: { href: string; label: string };
}

/** Reorder or add entries here. Draft entries are entirely hidden from visitors.
 * To publish, replace answer with { status: "published", text: "Your approved answer" }.
 * Separate paragraphs with \n\n; wrap bold text in **double asterisks**.
 * Never publish an instructor prompt. Rebuild/deploy
 * after editing. The "What is Taijiquan?" answer originated on the About page.
 */
export const homepageFaq: HomepageFaqEntry[] = [
  {
    "id": "previous-experience",
    "question": "Can beginners learn Chen-style Taijiquan?",
    "answer": {
      "status": "published",
      "text": "Absolutely. No previous Tai Chi experience is necessary. In fact, being a complete beginner can sometimes be an advantage. Sometimes, an empty cup is easier to fill. Beginners often arrive without ingrained habits from other movement disciplines that may need to be unlearned or temporarily set aside."
    }
  },
  {
    "id": "first-class",
    "question": "What should I expect at my first class?",
    "answer": {
      "status": "published",
      "text": "Classes begin with a group warm-up and stretching.\n\nFor your first class, expect to start with the most important part of learning any art: the fundamentals.\n\nIn this school, that means starting from the ground up, with an emphasis on the legs. You'll be introduced to foot placement, stance angles, alignment, and the mechanics of shifting your weight.\n\nThese foundations underpin nearly everything else you'll learn in Taijiquan."
    }
  },
  {
    "id": "tai-chi-workout",
    "question": "Is Tai Chi a good workout?",
    "answer": {
      "status": "published",
      "text": "The particular method of Taijiquan we practice can be extremely physically demanding, especially on the legs.\n\nThis is usually the part where people either don't believe us or gravely underestimate the difficulty.\n\nCounterintuitively, the physical demands come primarily from the precision of the stance, rather than simply how low one holds a stance.\n\nOf course, training intensity can be adjusted to accommodate different levels of physical ability."
    }
  },
  {
    "id": "what-to-bring",
    "question": "What should I wear or bring to class?",
    "answer": {
      "status": "published",
      "text": "Wear comfortable clothing appropriate for the weather and freedom of movement. There are no uniforms or belts required.\n\nFor outdoor training, shoes with relatively flat, stable soles are recommended. Avoid heavily cushioned shoes or those with strongly curved, rocker-style soles, as they can make it harder to feel the ground and maintain stable foot placement.\n\nBring water to stay hydrated."
    }
  },
  {
    "id": "optional-push-hands",
    "question": "Do I have to participate in Push Hands?",
    "answer": {
      "status": "published",
      "text": "No. Push Hands is entirely optional and available to students who are interested in partner training.\n\nYou're welcome to focus on solo practice instead."
    }
  },
  {
    "id": "entire-form",
    "question": "Do I need to memorize the entire Taijiquan form?",
    "answer": {
      "status": "published",
      "text": "Not at all!\n\nOur curriculum divides the traditional Yilu into two manageable practice routines: the Short Form (sequences 1–6) and the Medium Form (sequences 1–16).\n\nYou don't need to memorize the entire 89-sequence Yilu to develop meaningful skill. Even the shorter routines offer plenty of room for continued practice and refinement.\n\nLearning more movements is always an option, not a requirement."
    },
    "relatedLink": {
      "href": "/method#yilu",
      "label": "Explore the Yilu curriculum"
    }
  },
  {
    "id": "what-is-taijiquan",
    "question": "What is Taijiquan?",
    "answer": {
      "status": "published",
      "text": "Many Chinese martial arts have names ending in **quan** (拳), such as Taiji**quan**, Xingyi**quan**, Baji**quan**, Tanglang**quan**, Hung Ga **Kuen**, etc...\n\n“Quan”, or “Kuen” in Cantonese, translates to mean fist which denotes a martial art or fighting system. It does not literally mean an art about using fists. Taijiquan therefore means “Taiji Fist” — a martial art named after the concept of Taiji (the interplay of Yin and Yang). It is a Northern Chinese martial art that originated from the Chen Village (Chenjiagou) in Henan Province.\n\nTaijiquan is a family art. It was commonly passed down from father to son or from “master” to “apprentice”. The Chen family developed it first. The founder of the Yang family learned from the Chen family; the founder of the Wu family later learned from the Yang family.\n\nThis is the historical root of what most people today simply call “Tai Chi.”"
    }
  },
  {
    "id": "push-hands",
    "question": "What is Push Hands (Tuishou)?",
    "answer": {
      "status": "published",
      "text": "Push Hands refers to a set of partner exercises practiced under the paradigm of sustained physical contact.\n\nThese exercises can involve traditional choreographed patterns or freestyle exchanges. They can also be practiced cooperatively, semi-cooperatively, or non-cooperatively.\n\nPush Hands serves as a laboratory where two people can explore the interaction of forces and pressure. Many martial applications can be practiced within this format, with numerous ways to exploit errors, create opportunities, and test one's ability to respond to another person's actions."
    },
    "relatedLink": {
      "href": "/method#partner-training",
      "label": "Explore partner training"
    }
  },
  {
    "id": "tai-chi-and-qigong",
    "question": "What is the difference between Tai Chi and Qigong?",
    "answer": {
      "status": "published",
      "text": "First, let's clarify a common misunderstanding: the Chi in Tai Chi is not the same Chinese character as the Chi (Qi) in Qigong.\n\nTaiji (太極) refers to a Chinese cosmological concept, while Qi (氣) refers to the concept of vital energy in traditional Chinese thought.\n\nTai Chi can also be a shortened name for Tai Chi Chuan (Taijiquan), a martial art named after the Taiji concept.\n\nQigong, meanwhile, is a broad category of practices traditionally associated with cultivating and regulating Qi. It is not, by itself, a martial art.\n\nTaijiquan may incorporate practices that overlap with Qigong, but it also has a martial curriculum involving forms, partner training, and applications."
    }
  }
];
