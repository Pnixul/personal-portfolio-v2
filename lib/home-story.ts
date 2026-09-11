import type { Localized } from "./i18n";

type HomeStory = {
  greeting: string;
  student: string;
  college: string;
  workTitle: string;
  workIntro: string;
  reflectionTitle: string;
  reflection: string[];
  journeyTitle: string;
  characterPending: string;
};

// Home copy follows the owner's admission-portfolio brief.
export const homeStory: Localized<HomeStory> = {
  th: {
    greeting: "สวัสดีครับ ผมปอน",
    student: "นักเรียนสาขาคอมพิวเตอร์โปรแกรมเมอร์",
    college: "วิทยาลัยเทคนิคนครพนม",
    workTitle: "ผลงานที่เลือกมา",
    workIntro: "3 งานที่ผมอยากหยิบมาเล่าให้ดู",
    reflectionTitle: "สิ่งที่ผมได้จากการฝึกงาน",
    reflection: [
      "การได้ฝึกงานในบริษัท Software ทำให้ผมรู้สึกว่าตัวเองโตขึ้นมาก ทั้งในเรื่องการคิดและการทำงาน ผมได้ลองทำหลายอย่างที่ไม่เคยทำมาก่อน และได้ทำงานร่วมกับคนหลายแบบมากขึ้น",
      "การต้องอัปเดตงานกับพี่เลี้ยงเป็นประจำ รวมถึงการสื่อสารกับพี่ต่างชาติและมีโอกาสได้คุยกับลูกค้าจริง ทำให้ผมกล้าพูด กล้าถาม และกล้าแสดงความคิดเห็นมากกว่าเมื่อก่อน",
    ],
    journeyTitle: "สิ่งที่ผมสนใจเรียนรู้ต่อ",
    characterPending: "[พื้นที่สำหรับภาพวาดตัวละคร]",
  },
  en: {
    greeting: "Hi, I'm Pon.",
    student: "Computer Programming Student",
    college: "Nakhon Phanom Technical College",
    workTitle: "Selected Work",
    workIntro: "Three projects I'd like to share.",
    reflectionTitle: "What I took from my internship",
    reflection: [
      "Interning at a software company helped me feel that I had grown a lot, both in how I think and how I work. I tried many things I hadn't done before and worked with a wider range of people.",
      "Giving my mentor regular work updates, communicating with colleagues from other countries, and having the chance to talk with real clients helped me feel more comfortable speaking up, asking questions, and sharing my opinions than before.",
    ],
    journeyTitle: "What I'd like to learn next",
    characterPending: "[Character illustration space]",
  },
};
