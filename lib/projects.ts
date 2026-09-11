import type { Localized } from "./i18n";
import portfolioThai from "@/public/projects/portfolio-v2-th-coding.png";
import portfolioEnglish from "@/public/projects/portfolio-v2-en-coding.png";

type ProjectStory = {
  summary: string;
  contribution: string;
  overview: string;
  role: string;
  decisions: { title: string; text: string }[];
  decisionsLabel?: string;
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
  homeLayout: "lead" | "feature" | "note";
  media: {
    src: Localized<string>;
    alt: Localized<string>;
    approved: boolean;
  } | null;
  samples?: {
    src: string;
    width: number;
    height: number;
    caption: Localized<string>;
  }[];
  content: Localized<ProjectStory>;
};

// Internship facts come from V1 and the owner's integration brief.
// Only the three visually reviewed, supplied screenshots are published here.
export const projects: Project[] = [
  // Verified against cp-department-clean/PRODUCT.md, package.json, pages/index.vue,
  // AppNavbar.vue and FaqSection.vue. Image is its existing local production build.
  // The brief establishes this as a personal/school project; personal scope is unconfirmed.
  {
    slug: "cp-department",
    title: "Computer Programmer Department",
    category: "personal",
    status: "inProgress",
    homeLayout: "lead",
    technologies: ["Nuxt 3", "Vue 3", "Tailwind CSS"],
    media: {
      src: {
        th: "/projects/cp-department-overview.webp",
        en: "/projects/cp-department-overview.webp",
      },
      alt: {
        th: "หน้าแรกเว็บไซต์แผนกคอมพิวเตอร์โปรแกรมเมอร์ จากเวอร์ชันทดสอบในเครื่อง มีพื้นที่ภาพประกอบที่ยังรอเติม",
        en: "Computer Programmer Department home page from the local build, with an illustration placeholder still awaiting content",
      },
      approved: true,
    },
    content: {
      th: {
        summary:
          "เว็บไซต์แนะนำแผนกคอมพิวเตอร์โปรแกรมเมอร์ ให้ผู้สนใจเรียนและผู้ปกครองได้เห็นทั้งแนวทางการเรียน ผลงาน และประสบการณ์ฝึกงานในที่เดียว",
        contribution:
          "[ยืนยันส่วนที่รับผิดชอบ — Frontend, UX/UI และ Responsive Design]",
        overview:
          "โปรเจกต์ส่วนตัวที่เกี่ยวข้องกับแผนกคอมพิวเตอร์โปรแกรมเมอร์ เนื้อหาหลักเป็นภาษาไทย ครอบคลุมการเรียน ผลงานผู้เรียน การฝึกงาน เส้นทางอาชีพ และ FAQ สำหรับผู้สนใจเรียนและผู้ปกครอง",
        role: "[ระบุงานที่ลงมือทำเอง การตัดสินใจที่รับผิดชอบ และส่วนที่ทำร่วมกับผู้อื่น]",
        decisionsLabel: "สิ่งที่มีในเวอร์ชันนี้",
        decisions: [
          {
            title: "เริ่มจากสิ่งที่ผู้สนใจเรียนอยากรู้",
            text: "โครงสร้างเว็บไซต์เชื่อมการเรียน ผลงาน การฝึกงาน และเส้นทางต่อไป พร้อมเมนูนำทางไปยังแต่ละส่วน",
          },
          {
            title: "รองรับการอ่านบนหลายหน้าจอ",
            text: "เลย์เอาต์ปรับตามขนาดหน้าจอ และมีเมนูสำหรับมือถือ เพื่อให้เข้าถึงเนื้อหาชุดเดียวกันได้",
          },
          {
            title: "ค้นหาคำตอบตามเรื่องที่สนใจ",
            text: "FAQ แยกคำถามตามหัวข้อ และเปิดอ่านคำตอบเป็นรายข้อได้",
          },
        ],
        challenge: null,
        learning: null,
        outcome:
          "มีเวอร์ชันทดสอบในเครื่องที่เปิดดูได้ ภาพในหน้านี้มาจากเวอร์ชันนั้น โดยภาพประกอบและเนื้อหาบางส่วนยังเป็น placeholder [ยืนยันสถานะเผยแพร่และผลจากการใช้งานจริง]",
      },
      en: {
        summary:
          "A website introducing the Computer Programmer department to prospective students and parents, bringing coursework, student projects, and internship context together.",
        contribution:
          "[Confirm personal scope — Frontend, UX/UI, and Responsive Design]",
        overview:
          "A personal, school-related website for the Computer Programmer department. Thai content covers the learning experience, student work, internships, career directions, and FAQs for prospective students and parents.",
        role: "[Describe the work completed personally, decisions owned, and any shared responsibilities]",
        decisionsLabel: "In this version",
        decisions: [
          {
            title: "Organized around prospective students' questions",
            text: "The site connects learning, projects, internships, and future pathways, with navigation to each part of the page.",
          },
          {
            title: "Reading across screen sizes",
            text: "Responsive layouts and mobile navigation give access to the same content across devices.",
          },
          {
            title: "Answers grouped by topic",
            text: "The FAQ groups questions into topics, with answers that can be opened individually.",
          },
        ],
        challenge: null,
        learning: null,
        outcome:
          "A working local build, shown in the preview here. Some illustrations and content still use placeholders. [Confirm publication status and any findings from real use]",
      },
    },
  },
  {
    slug: "gemini-tts",
    title: "BOTNOI",
    category: "internship",
    organization: "BOTNOI",
    status: "documented",
    homeLayout: "feature",
    technologies: ["Angular", "TypeScript", "Tailwind CSS"],
    media: {
      src: { th: "/projects/botnoi/tts-interface.webp", en: "/projects/botnoi/tts-interface.webp" },
      alt: {
        th: "หน้าจอ TTS: ตัวเลือกโมเดลและภาษา พื้นที่ข้อความ และพอยต์ที่ใช้สร้างเสียง",
        en: "TTS interface with model and language settings, a text editor, and generation points",
      },
      approved: true,
    },
    samples: [
      {
        src: "/projects/botnoi/image-interface.webp", width: 1588, height: 795,
        caption: {
          th: "หน้าจอสร้างภาพ: การตั้งค่าและพื้นที่แสดงผล",
          en: "Image interface: settings and the result preview",
        },
      },
      {
        src: "/projects/botnoi/video-mobile-design.webp", width: 265, height: 726,
        caption: {
          th: "แบบหน้าจอมือถือ: ตัวเลือกโหมดวิดีโอและการตั้งค่า",
          en: "Mobile interface design: video modes and settings",
        },
      },
    ],
    content: {
      en: {
        summary:
          "A few examples of the frontend and UX/UI redesign work I contributed to during my internship at BOTNOI.",
        contribution: "Interface refinement, layout, and visual consistency",
        overview:
          "My frontend internship at BOTNOI involved several pieces of interface redesign work. One was Gemini TTS in BOTNOI Voice, where users choose a model, language, and voice, adjust settings, and manage generated audio.",
        role: "As a frontend intern, I contributed to existing interfaces alongside the development team. My work focused on layouts, UI components, and a more consistent experience.",
        decisionsLabel: "What I changed in Gemini TTS",
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
          "In Gemini TTS, my contribution was a set of focused UI improvements to the existing feature: clearer model and language selection, visible point usage, and more consistent header styling.",
      },
      th: {
        summary:
          "บางส่วนของงาน Frontend และการปรับ UX/UI ที่ผมมีส่วนร่วมระหว่างฝึกงานที่ BOTNOI",
        contribution: "ปรับ UI, Layout และความสอดคล้องของหน้าจอ",
        overview:
          "ระหว่างฝึกงาน Frontend ที่ BOTNOI ผมได้มีส่วนร่วมปรับหน้าจอหลายส่วน หนึ่งในนั้นคือ Gemini TTS ใน BOTNOI Voice ซึ่งผู้ใช้เลือกโมเดล ภาษา และเสียง ปรับการตั้งค่า และจัดการเสียงที่สร้างไว้ได้",
        role: "ในฐานะ Frontend Intern ผมช่วยปรับ UI เดิมร่วมกับทีมพัฒนา โดยเน้น Layout, Components และความสอดคล้องของประสบการณ์ใช้งาน",
        decisionsLabel: "ส่วนที่ผมปรับใน Gemini TTS",
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
          "ในส่วนของ Gemini TTS ผมได้ปรับปรุง UI เฉพาะจุดของฟีเจอร์เดิม ทั้งส่วนเลือกโมเดลและภาษา การแสดงพอยต์ก่อนสร้างเสียง และรูปแบบส่วนหัวที่สอดคล้องกันมากขึ้น",
      },
    },
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio V2",
    category: "personal",
    status: "inProgress",
    homeLayout: "note",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    media: {
      src: {
        th: portfolioThai.src,
        en: portfolioEnglish.src,
      },
      alt: { th: "หน้าแรกของพอร์ตโฟลิโอ V2", en: "Portfolio V2 home page" },
      approved: true,
    },
    content: {
      en: {
        summary:
          "This university-admission portfolio: shared Thai/English pages, project case studies, and an editorial sketch direction.",
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
          "พอร์ตโฟลิโอสำหรับสมัครมหาวิทยาลัยที่กำลังอ่านอยู่นี้ ใช้โครงสร้างร่วมกันทั้งไทยและอังกฤษ พร้อม Case Study และแนวทางภาพแบบ editorial × sketch",
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
            text: "Case Study เล่าผ่านบริบทและบทบาทได้ โดยไม่จำเป็นต้องเปิดเผยภาพหน้าจอหรือลิงก์ผลิตภัณฑ์ที่เป็นส่วนตัว",
          },
        ],
        challenge: null,
        learning: null,
        outcome:
          "พอร์ตโฟลิโอเวอร์ชันที่สองที่ใช้งานได้ทั้งสองภาษา พร้อมโครงสร้างสำหรับ Case Study เพิ่มเติม ส่วนบันทึกการเรียนรู้ส่วนตัวยังอยู่ระหว่างเตรียม",
      },
    },
  },
];

// Add only confirmed, public contact details. Otherwise the Footer shows the college.
export const contactEmail: string | null = null;
