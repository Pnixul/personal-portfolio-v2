import type { Localized } from "./i18n";

type ProjectStory = {
  summary: string;
  contribution: string;
  overview: string;
  role: string;
  decisions: { title: string; text: string }[];
  challenge: string | null;
  learning: string | null;
  outcome: string;
};
export type Project = {
  slug: string;
  title: string;
  category: "internship" | "personal";
  organization?: string;
  status: "documented" | "inProgress";
  technologies: string[];
  media: {
    src: Localized<string>;
    alt: Localized<string>;
    approved: boolean;
  } | null;
  content: Localized<ProjectStory>;
};

// Internship facts come from V1's portfolio/data/portfolio.ts. Media needs a separate publication decision.
export const projects: Project[] = [
  {
    slug: "gemini-tts",
    title: "Gemini TTS",
    category: "internship",
    organization: "BOTNOI",
    status: "documented",
    technologies: ["Angular", "TypeScript", "Tailwind CSS"],
    media: null,
    content: {
      en: {
        summary:
          "Small interface improvements in a real product. During my BOTNOI internship, I helped refine the existing text-to-speech experience.",
        contribution: "Interface refinement, layout, and visual consistency",
        overview:
          "Gemini TTS is a web-based text-to-speech feature in BOTNOI Voice. Users can choose a model, language, and voice, adjust settings, and manage generated audio in one interface.",
        role: "As a frontend intern, I contributed to the existing interface alongside the development team. My work focused on layouts, UI components, and a more consistent experience.",
        decisions: [
          {
            title: "Clearer choices",
            text: "Refined the model and language selection interface to make settings easier to understand.",
          },
          {
            title: "Points before generating",
            text: "Added point usage information to the Generate button so users could see the required points before creating audio.",
          },
          {
            title: "A more consistent interface",
            text: "Improved the header styling and reviewed interface details with the development team.",
          },
        ],
        challenge:
          "Joining a real development environment meant learning an existing codebase, its structure, and the team's workflow. Becoming familiar with these took time and helped me contribute more confidently.",
        learning:
          "I learned to understand a project before changing it. Working with the team also showed me that software development involves communication, listening, and making progress together.",
        outcome:
          "My contribution was a set of focused UI improvements to an existing feature: clearer model and language selection, visible point usage, and more consistent header styling.",
      },
      th: {
        summary:
          "ปรับรายละเอียดของหน้าจอในผลิตภัณฑ์จริง ระหว่างฝึกงานที่ BOTNOI ผมมีส่วนช่วยปรับปรุงประสบการณ์ใช้งานฟีเจอร์แปลงข้อความเป็นเสียงที่มีอยู่เดิม",
        contribution: "ปรับส่วนติดต่อ เลย์เอาต์ และความสอดคล้องของหน้าจอ",
        overview:
          "Gemini TTS เป็นฟีเจอร์แปลงข้อความเป็นเสียงบนเว็บของ BOTNOI Voice ผู้ใช้สามารถเลือกโมเดล ภาษา และเสียง ปรับการตั้งค่า และจัดการเสียงที่สร้างไว้ได้ในหน้าจอเดียว",
        role: "ในฐานะผู้ฝึกงานด้านฟรอนต์เอนด์ ผมช่วยปรับปรุงส่วนติดต่อที่มีอยู่เดิมร่วมกับทีมพัฒนา โดยเน้นเลย์เอาต์ คอมโพเนนต์ และความสอดคล้องของประสบการณ์ใช้งาน",
        decisions: [
          {
            title: "ตัวเลือกที่ชัดเจนขึ้น",
            text: "ปรับส่วนเลือกโมเดลและภาษา เพื่อให้ผู้ใช้เข้าใจการตั้งค่าได้ง่ายขึ้น",
          },
          {
            title: "เห็นพอยต์ก่อนสร้างเสียง",
            text: "เพิ่มจำนวนพอยต์ที่ต้องใช้บนปุ่มสร้างเสียง เพื่อให้ผู้ใช้ทราบก่อนเริ่มสร้างเสียง",
          },
          {
            title: "หน้าจอที่สอดคล้องกัน",
            text: "ปรับรูปแบบส่วนหัวและทบทวนรายละเอียดของหน้าจอร่วมกับทีมพัฒนา",
          },
        ],
        challenge:
          "การทำงานจริงต้องเรียนรู้ทั้งโค้ดเดิม โครงสร้างโปรเจกต์ และขั้นตอนการทำงานของทีม ผมใช้เวลาทำความเข้าใจสิ่งเหล่านี้ และค่อย ๆ มั่นใจในการมีส่วนร่วมมากขึ้น",
        learning:
          "ผมได้เรียนรู้ว่าควรทำความเข้าใจโปรเจกต์ก่อนลงมือเปลี่ยนแปลง และการพัฒนาซอฟต์แวร์ยังต้องอาศัยการสื่อสาร การรับฟัง และการทำงานร่วมกัน",
        outcome:
          "ผลงานในส่วนของผมคือการปรับปรุง UI เฉพาะจุดของฟีเจอร์เดิม ทั้งส่วนเลือกโมเดลและภาษา การแสดงพอยต์ก่อนสร้างเสียง และรูปแบบส่วนหัวที่สอดคล้องกันมากขึ้น",
      },
    },
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio V2",
    category: "personal",
    status: "inProgress",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    media: {
      src: {
        th: "/projects/portfolio-v2-th-overview.png",
        en: "/projects/portfolio-v2-en-overview.png",
      },
      alt: { th: "หน้าแรกของพอร์ตโฟลิโอ V2", en: "Portfolio V2 home page" },
      approved: true,
    },
    content: {
      en: {
        summary:
          "An evolving record of work and learning. A second version of this portfolio, with clearer project stories and space for what comes next.",
        contribution: "Personal responsibility notes are being prepared",
        overview:
          "This portfolio is being developed for university admission. It brings together project evidence, education context, and a direction for continued learning in Thai and English.",
        role: "The site is in development. A personal account of responsibilities and decisions will be added after review.",
        decisions: [
          {
            title: "Evidence comes first",
            text: "Project summaries lead into dedicated pages with context, contributions, and learning.",
          },
          {
            title: "Two languages, one structure",
            text: "Thai and English share the same page components, with translatable content kept in one place.",
          },
          {
            title: "Room for sensitive work",
            text: "Case studies can stand on their written context without requiring private screenshots or product links.",
          },
        ],
        challenge: null,
        learning: null,
        outcome:
          "A working second version with localized pages and a structure for future case studies. Personal reflections are still in progress.",
      },
      th: {
        summary:
          "บันทึกผลงานและการเรียนรู้ที่ค่อย ๆ เติบโต พอร์ตโฟลิโอเวอร์ชันที่สองที่เล่าเรื่องแต่ละงานให้ชัดขึ้น และเว้นพื้นที่ไว้ให้ประสบการณ์ต่อไป",
        contribution: "อยู่ระหว่างเตรียมบันทึกบทบาทส่วนตัว",
        overview:
          "พอร์ตโฟลิโอนี้กำลังพัฒนาสำหรับการสมัครเข้ามหาวิทยาลัย รวบรวมหลักฐานผลงาน บริบทการศึกษา และทิศทางการเรียนรู้ต่อ ทั้งภาษาไทยและภาษาอังกฤษ",
        role: "เว็บไซต์อยู่ระหว่างพัฒนา โดยจะเพิ่มบันทึกบทบาทและการตัดสินใจส่วนตัวหลังทบทวนผลงาน",
        decisions: [
          {
            title: "ให้ผลงานเป็นหลักฐาน",
            text: "จากบทสรุปสั้น ๆ ไปสู่หน้าเฉพาะที่เล่าบริบท ส่วนที่รับผิดชอบ และสิ่งที่ได้เรียนรู้",
          },
          {
            title: "สองภาษาในโครงสร้างเดียว",
            text: "ภาษาไทยและภาษาอังกฤษใช้คอมโพเนนต์ร่วมกัน โดยแยกเนื้อหาที่แปลได้ไว้อย่างเป็นระบบ",
          },
          {
            title: "รองรับงานที่มีข้อจำกัด",
            text: "กรณีศึกษาสามารถเล่าผ่านบริบทและบทบาทได้ โดยไม่จำเป็นต้องเปิดเผยภาพหน้าจอหรือลิงก์ผลิตภัณฑ์ที่เป็นส่วนตัว",
          },
        ],
        challenge: null,
        learning: null,
        outcome:
          "พอร์ตโฟลิโอเวอร์ชันที่สองที่ใช้งานได้ทั้งสองภาษา พร้อมโครงสร้างสำหรับกรณีศึกษาเพิ่มเติม ส่วนบันทึกการเรียนรู้ส่วนตัวยังอยู่ระหว่างเตรียม",
      },
    },
  },
];

// Add only confirmed, public contact details. Null renders a localized placeholder.
export const contactEmail: string | null = null;
