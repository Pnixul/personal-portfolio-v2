export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export const messages = {
  en: {
    meta: "Student portfolio · Chitipat Rittichot",
    description:
      "What I have explored, built, and learned as a Computer Programmer student, from frontend work at BOTNOI to an interest in Computer Engineering and Cybersecurity.",
    name: "Chitipat Rittichot",
    nickname: "Pang Pond",
    portfolio: "A portfolio of work & learning",
    home: "Home",
    nav: "Main navigation",
    menu: "Menu",
    close: "Close menu",
    language: "Language",
    skip: "Skip to content",
    work: "Selected work",
    journey: "Learning & direction",
    contact: "Get in touch",
    heroLine: "Learning by building.",
    heroAccent: "Growing through curiosity.",
    intro:
      "I'm a Computer Programmer student with frontend internship experience. I enjoy making interfaces clearer, understanding how things work, and finding the next question to explore.",
    viewWork: "Explore my work",
    aboutLink: "A little about me",
    currentLabel: "Where I am",
    current: "Vocational student",
    currentDetail: "Computer Programming",
    nextLabel: "Where I'm looking",
    next: "Computer Engineering",
    nextDetail: "Networks & Cybersecurity",
    workEyebrow: "Selected work",
    workTitle: "A closer look at what I've done.",
    workIntro:
      "Real contributions, the decisions behind them, and what I took away.",
    caseStudy: "Read the case study",
    projectNotes: "View project notes",
    responsibility: "My contribution",
    inProgress: "In progress",
    internship: "Internship project",
    personal: "Personal project",
    privateMedia: "Project imagery withheld",
    privateNote:
      "The contribution and learning are documented below. Screenshots are not published here.",
    journeyTitle: "Each experience opens up another question.",
    journeyIntro:
      "I like learning through things people can actually use. My experience so far is in frontend development; my curiosity also reaches into the systems underneath it.",
    stages: [
      {
        label: "Foundation",
        title: "Learning to build",
        text: "I'm studying for a Vocational Certificate in Computer Programming, developing my understanding through practical projects.",
      },
      {
        label: "Experience",
        title: "Contributing to a real product",
        text: "At BOTNOI, I learned to read an existing codebase, refine an interface, and work with a development team.",
      },
      {
        label: "Direction",
        title: "Looking beneath the interface",
        text: "I want to continue into Computer Engineering and Cybersecurity, exploring how software, networks, and security fit together.",
      },
    ],
    practiceTitle: "What I'm working with",
    practiceIntro: "Tools I've used, and areas I'm still exploring.",
    practice: [
      {
        title: "Development",
        text: "HTML, CSS, JavaScript, TypeScript, Vue, Nuxt, Angular, Tailwind CSS",
      },
      {
        title: "Design & collaboration",
        text: "Figma, Git, GitHub · responsive design, interface design, and UX fundamentals",
      },
      {
        title: "Exploring",
        text: "Network fundamentals, Linux, web security, and OWASP",
      },
    ],
    closingTitle: "More to learn.\nMore to build.",
    closingText:
      "I'm looking forward to continuing my education, asking better questions, and learning alongside people with different perspectives.",
    contactPending: "Contact details to be added.",
    backTop: "Back to top",
    footerNote: "Work, learning, and a direction still taking shape.",
    backWork: "Back to selected work",
    overview: "Context",
    role: "My responsibility",
    decisions: "What changed",
    challenge: "The challenge",
    learning: "What I learned",
    outcome: "Outcome",
    nextProject: "Next project",
    draft: "Notes in progress",
    pending: "Personal reflection to be added after review.",
    mediaAlt: "Portfolio V2 home page",
    notFound: "Page not found",
    notFoundText:
      "This page isn't part of the portfolio. You can return to the selected work below.",
  },
  th: {
    meta: "แฟ้มสะสมผลงาน · ชิติพัฒน์ ฤทธิโชติ",
    description:
      "สิ่งที่ได้ลองทำ สร้าง และเรียนรู้ของนักเรียนสาขาคอมพิวเตอร์โปรแกรมเมอร์ จากประสบการณ์ฝึกงานด้านฟรอนต์เอนด์ที่ BOTNOI สู่ความสนใจด้านวิศวกรรมคอมพิวเตอร์และความมั่นคงปลอดภัยไซเบอร์",
    name: "ชิติพัฒน์ ฤทธิโชติ",
    nickname: "ปังปอนด์",
    portfolio: "บันทึกผลงานและการเรียนรู้",
    home: "หน้าแรก",
    nav: "เมนูหลัก",
    menu: "เมนู",
    close: "ปิดเมนู",
    language: "ภาษา",
    skip: "ข้ามไปยังเนื้อหา",
    work: "ผลงานที่คัดสรร",
    journey: "การเรียนรู้และเป้าหมาย",
    contact: "ติดต่อ",
    heroLine: "เรียนรู้ผ่านการลงมือทำ",
    heroAccent: "เติบโตผ่านความสงสัย",
    intro:
      "ผมเป็นนักเรียนสาขาคอมพิวเตอร์โปรแกรมเมอร์ที่มีประสบการณ์ฝึกงานด้านฟรอนต์เอนด์ ชอบปรับหน้าจอให้ใช้งานง่ายขึ้น ทำความเข้าใจว่าสิ่งต่าง ๆ ทำงานอย่างไร และค้นหาคำถามใหม่ให้ได้เรียนรู้ต่อ",
    viewWork: "สำรวจผลงาน",
    aboutLink: "รู้จักผมอีกนิด",
    currentLabel: "ในวันนี้",
    current: "นักเรียนระดับ ปวช.",
    currentDetail: "สาขาคอมพิวเตอร์โปรแกรมเมอร์",
    nextLabel: "เส้นทางที่สนใจ",
    next: "วิศวกรรมคอมพิวเตอร์",
    nextDetail: "เครือข่ายและความมั่นคงปลอดภัยไซเบอร์",
    workEyebrow: "ผลงานที่คัดสรร",
    workTitle: "สิ่งที่ได้ลงมือทำจริง",
    workIntro:
      "บทบาทที่รับผิดชอบ แนวคิดเบื้องหลัง และสิ่งที่ได้เรียนรู้จากแต่ละงาน",
    caseStudy: "อ่านกรณีศึกษา",
    projectNotes: "อ่านบันทึกโปรเจกต์",
    responsibility: "ส่วนที่ผมรับผิดชอบ",
    inProgress: "กำลังพัฒนา",
    internship: "โปรเจกต์ฝึกงาน",
    personal: "โปรเจกต์ส่วนตัว",
    privateMedia: "ยังไม่เผยแพร่ภาพโปรเจกต์",
    privateNote:
      "อ่านรายละเอียดบทบาทและสิ่งที่ได้เรียนรู้ได้ โดยยังไม่แสดงภาพหน้าจอของผลงาน",
    journeyTitle: "ทุกประสบการณ์\nพาไปสู่คำถามใหม่",
    journeyIntro:
      "ผมชอบเรียนรู้ผ่านการสร้างสิ่งที่คนใช้งานได้จริง ประสบการณ์ที่ผ่านมาของผมอยู่ในงานฟรอนต์เอนด์ และความสนใจยังขยายไปถึงระบบที่อยู่เบื้องหลัง",
    stages: [
      {
        label: "พื้นฐาน",
        title: "เรียนรู้ที่จะสร้าง",
        text: "ผมกำลังศึกษาระดับประกาศนียบัตรวิชาชีพ สาขาคอมพิวเตอร์โปรแกรมเมอร์ และพัฒนาความเข้าใจผ่านการทำโปรเจกต์",
      },
      {
        label: "ประสบการณ์",
        title: "มีส่วนร่วมกับผลิตภัณฑ์จริง",
        text: "การฝึกงานที่ BOTNOI ทำให้ผมได้ฝึกอ่านโค้ดเดิม ปรับปรุงหน้าจอ และทำงานร่วมกับทีมพัฒนา",
      },
      {
        label: "ทิศทาง",
        title: "เรียนรู้ให้ลึกกว่าหน้าจอ",
        text: "ผมอยากเรียนต่อด้านวิศวกรรมคอมพิวเตอร์และความมั่นคงปลอดภัยไซเบอร์ เพื่อเข้าใจความเชื่อมโยงของซอฟต์แวร์ เครือข่าย และความปลอดภัย",
      },
    ],
    practiceTitle: "เครื่องมือและสิ่งที่กำลังเรียนรู้",
    practiceIntro: "สิ่งที่เคยใช้ทำงาน และเรื่องที่อยากทำความเข้าใจให้มากขึ้น",
    practice: [
      {
        title: "การพัฒนา",
        text: "HTML, CSS, JavaScript, TypeScript, Vue, Nuxt, Angular, Tailwind CSS",
      },
      {
        title: "การออกแบบและทำงานร่วมกัน",
        text: "Figma, Git, GitHub · การออกแบบให้รองรับหลายหน้าจอ การออกแบบส่วนติดต่อ และพื้นฐาน UX",
      },
      {
        title: "กำลังศึกษา",
        text: "พื้นฐานเครือข่าย, Linux, ความปลอดภัยบนเว็บ และ OWASP",
      },
    ],
    closingTitle: "ยังมีสิ่งให้เรียนรู้\nและลงมือทำอีกมาก",
    closingText:
      "ผมอยากต่อยอดการเรียน ตั้งคำถามให้ดีขึ้น และได้เรียนรู้ร่วมกับคนที่มีมุมมองแตกต่างกัน",
    contactPending: "อยู่ระหว่างเพิ่มช่องทางติดต่อ",
    backTop: "กลับด้านบน",
    footerNote: "ผลงาน การเรียนรู้ และเส้นทางที่ค่อย ๆ ชัดเจนขึ้น",
    backWork: "กลับไปดูผลงาน",
    overview: "บริบทของโปรเจกต์",
    role: "บทบาทของผม",
    decisions: "สิ่งที่ได้ปรับปรุง",
    challenge: "ความท้าทาย",
    learning: "สิ่งที่ได้เรียนรู้",
    outcome: "ผลลัพธ์",
    nextProject: "โปรเจกต์ถัดไป",
    draft: "บันทึกระหว่างพัฒนา",
    pending: "อยู่ระหว่างเพิ่มบันทึกการเรียนรู้ส่วนตัวหลังทบทวนผลงาน",
    mediaAlt: "หน้าแรกของพอร์ตโฟลิโอ V2",
    notFound: "ไม่พบหน้านี้",
    notFoundText:
      "หน้านี้ไม่ได้อยู่ในแฟ้มสะสมผลงาน สามารถกลับไปดูผลงานได้จากลิงก์ด้านล่าง",
  },
};
export const getMessages = (locale: Locale) => messages[locale];
