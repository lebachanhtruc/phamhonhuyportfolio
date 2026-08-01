// Touch Device Detection
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia("(pointer: coarse)").matches);

// Initialize Lenis for smooth scrolling (via CDN global) ONLY ON DESKTOP
let lenis = null;
if (!isTouchDevice && window.innerWidth > 768) {
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.warn("Lenis failed to initialize. Smooth scrolling disabled.", e);
  }
}

// Custom Cursor Logic (Desktop Only)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (!isTouchDevice) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
    }
    
    // Slight delay for the outline for a fluid effect
    if (cursorOutline) {
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    }
  });
} else {
  // Hide completely on mobile
  if (cursorDot) cursorDot.style.display = 'none';
  if (cursorOutline) cursorOutline.style.display = 'none';
}

// Intersection Observer for Reveal Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Select all elements to animate
const revealElements = document.querySelectorAll('.fade-up');
revealElements.forEach(el => observer.observe(el));

// --- JAPANESE ATMOSPHERIC LOGIC ---

// 1. Noren Loader Trigger
function dismissLoader() {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
}

if (document.readyState === 'complete') {
  dismissLoader();
} else {
  window.addEventListener('load', dismissLoader);
}
// Fallback just in case load event gets swallowed or hangs
setTimeout(() => document.body.classList.add('loaded'), 2500);

// 2. Parallax effect, Red Thread Scrollbar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
  
  // Red Thread
  const thread = document.getElementById('red-thread');
  if(thread) {
    thread.style.height = `${progress * 100}%`;
  }
}, { passive: true });

// Desktop-only Lenis parallax
if (lenis) {
  lenis.on('scroll', (e) => {
    const scrolled = e.animatedScroll;
    const heroImage = document.querySelector('.hero-image');
    if(heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
}

// --- i18n Translation Logic ---
const translations = {
  en: {
    nav_about: "Profile",
    nav_experience: "Experience",
    nav_education: "Education",
    nav_gallery: "Gallery",
    hero_title: "EVE PHAM",
    hero_subtitle: "vol.1",
    about_title: "PROFILE",
    badge_featured: "FEATURED EXPERIENCE",
    about_name: "Ho Nhu Y Pham (Eve)",
    about_info: "Longueuil, QC | (438) 835-8686 | phamhonhuy@gmail.com",
    about_p1: "Motivated and highly adaptable professional with a diverse background in office administration, customer service, and language education.",
    about_p2: "Multilingual (Vietnamese, Japanese, English, French) with a JLPT N1 certification. Proven ability to thrive in fast-paced environments, deliver excellent client service, and manage administrative tasks efficiently.",
    about_p3: "Eager to re-enter the workforce and contribute strong communication, organizational, and cross-cultural skills to a dynamic organization.",
    exp_title: "EXPERIENCE",
    job1_date: "Oct 2021 – Sept 2023",
    job1_title: "Office Administrator | LXR&Co",
    job1_desc: "Managed daily office operations, provided administrative support to staff, and ensured a smooth workflow. Organized files, handled data entry, and maintained accurate records. Assisted with internal communications, demonstrating adaptability in a Canadian professional environment.",
    job2_date: "Jun 2022 – Aug 2024",
    job2_title: "Server / Customer Service",
    job2_sub: "Lime Griffintown (7/2023-8/2024) & Shushu Bar à Poke (6/2022-9/2022)",
    job2_desc: "Delivered high-quality customer service in a fast-paced and multicultural dining environment. Communicated effectively utilizing English and basic French. Managed orders, handled transactions, and ensured a positive dining experience.",
    job3_date: "Sept 2022 – Dec 2022",
    job3_title: "Kitchen Staff - Makiman | Sushi Ville Lajeunesse Montreal",
    job4_date: "2015-2016 / 2017 – Aug 2021",
    job4_title: "Japanese Language Teacher | Sakura Japanese Center - Ho Chi Minh City",
    job4_desc: "Taught Japanese language and culture to diverse groups of students, from beginner to intermediate levels. Developed comprehensive lesson plans, prepared teaching materials, and evaluated student progress. Fostered an engaging and supportive learning environment to help students achieve their language goals.",
    edu_title: "EDUCATION",
    edu_sub1: "Education & Certifications",
    edu_1: "JLPT N1 Certification (Japanese Language Proficiency Test)",
    edu_2: "Bachelor’s Degree in Japanese Language | HCMC University of Education, Vietnam",
    edu_3: "Japanese Study Abroad Program (1 Year) | ISeifu Institute of Information Technology, Osaka, Japan",
    edu_sub2: "Languages & Soft Skills",
    skill_lang: "Languages: Vietnamese (Native), Japanese (Fluent/N1), English (Intermediate - conversational and written), French (Beginner - hospitality and daily life)",
    skill_soft: "Soft Skills: Customer Service, Cross-cultural Communication, Office Administration, Organization, Adaptability, Teaching & Mentoring",
    gallery_title: "GALLERY",
    gallery_desc: "A collection of moments and memories, capturing the essence of life's journey."
  },
  fr: {
    nav_about: "Profil",
    nav_experience: "Expérience",
    nav_education: "Éducation",
    nav_gallery: "Galerie",
    hero_title: "EVE PHAM",
    hero_subtitle: "vol.1",
    about_title: "PROFIL",
    badge_featured: "EXPÉRIENCE PHARE",
    about_name: "Ho Nhu Y Pham (Eve)",
    about_info: "Longueuil, QC | (438) 835-8686 | phamhonhuy@gmail.com",
    about_p1: "Professionnelle dynamique et hautement adaptable, forte d'une expérience polyvalente en administration de bureau, service à la clientèle et enseignement des langues.",
    about_p2: "Multilingue (vietnamien, japonais, anglais, français) et titulaire de la certification JLPT N1. Je possède une capacité démontrée à exceller dans des environnements exigeants, à offrir un service client d'exception et à optimiser la gestion des tâches administratives.",
    about_p3: "Impatiente de réintégrer le marché du travail, je suis déterminée à mettre mes solides compétences communicationnelles, organisationnelles et interculturelles au service d'une entreprise dynamique et innovante.",
    exp_title: "EXPÉRIENCE",
    job1_date: "Oct 2021 – Sept 2023",
    job1_title: "Administratrice de bureau | LXR&Co",
    job1_desc: "Gestion des opérations quotidiennes et soutien administratif afin de garantir la fluidité des processus internes. Responsable de l'organisation des dossiers, de la saisie des données et de la tenue rigoureuse des registres. Coordination des communications internes, illustrant une grande capacité d'adaptation au sein du milieu professionnel canadien.",
    job2_date: "Juin 2022 – Août 2024",
    job2_title: "Serveuse / Service à la clientèle",
    job2_sub: "Lime Griffintown (7/2023-8/2024) & Shushu Bar à Poke (6/2022-9/2022)",
    job2_desc: "Prestation d'un service client de premier ordre dans un environnement de restauration multiculturel au rythme soutenu. Communication fluide et efficace en anglais et en français de base. Gestion rigoureuse des commandes et des transactions financières, garantissant une expérience culinaire optimale et l'entière satisfaction de la clientèle.",
    job3_date: "Sept 2022 – Déc 2022",
    job3_title: "Personnel de cuisine - Makiman | Sushi Ville Lajeunesse Montréal",
    job4_date: "2015-2016 / 2017 – Août 2021",
    job4_title: "Professeure de japonais | Centre de japonais Sakura - Hô Chi Minh-Ville",
    job4_desc: "Enseignement de la langue et de la culture japonaises auprès d'un public varié, du niveau débutant au niveau intermédiaire. Conception de plans de cours structurés, création de matériel pédagogique sur mesure et évaluation continue des progrès. Mise en place d'un environnement d'apprentissage bienveillant et stimulant, favorisant l'atteinte des objectifs linguistiques des apprenants.",
    edu_title: "ÉDUCATION",
    edu_sub1: "Éducation et Certifications",
    edu_1: "Certification JLPT N1 (Test d'aptitude en japonais)",
    edu_2: "Baccalauréat en langue japonaise | Université de Pédagogie de HCMC, Vietnam",
    edu_3: "Programme d'études à l'étranger en japonais (1 an) | Institut de technologie de l'information ISeifu, Osaka, Japon",
    edu_sub2: "Langues et Compétences",
    skill_lang: "Langues: Vietnamien (Langue maternelle), Japonais (Courant/N1), Anglais (Intermédiaire - conversationnel et écrit), Français (Débutant - hôtellerie et vie quotidienne)",
    skill_soft: "Compétences: Service à la clientèle, Communication interculturelle, Administration de bureau, Organisation, Adaptabilité, Enseignement et mentorat",
    gallery_title: "GALERIE",
    gallery_desc: "Une collection de moments et de souvenirs, capturant l'essence du voyage de la vie."
  },
  ja: {
    nav_about: "プロフィール",
    nav_experience: "職歴",
    nav_education: "学歴",
    nav_gallery: "ギャラリー",
    hero_title: "EVE PHAM",
    hero_subtitle: "第1巻",
    about_title: "プロフィール",
    badge_featured: "主な経歴",
    about_name: "ファム・ホ・ニュ・イ (Eve)",
    about_info: "ケベック州ロンゲール | (438) 835-8686 | phamhonhuy@gmail.com",
    about_p1: "オフィス管理、顧客サービス、および語学教育において多彩な経歴と高い適応力を有するプロフェッショナルです。",
    about_p2: "ベトナム語を母語とし、日本語（JLPT N1取得）、英語、フランス語を操るマルチリンガル。変化の激しい環境下でも迅速に対応し、卓越した顧客サービスの提供と、効率的な業務管理を遂行する確かな実績があります。",
    about_p3: "これまでの経験で培った高度なコミュニケーション能力、組織運営力、そして異文化理解力を最大限に活かし、革新的でダイナミックな組織の発展に貢献したいと強く願っております。",
    exp_title: "職歴",
    job1_date: "2021年10月 – 2023年9月",
    job1_title: "オフィス管理者 | LXR&Co",
    job1_desc: "日常のオフィス運営およびスタッフへの事務サポートを統括し、円滑な業務フローの構築に貢献。書類管理、データ入力、正確な記録保持を徹底するとともに、社内コミュニケーションを円滑にサポートし、カナダのビジネス環境における高い適応力を証明しました。",
    job2_date: "2022年6月 – 2024年8月",
    job2_title: "サーバー / カスタマーサービス",
    job2_sub: "Lime Griffintown (2023年7月-2024年8月) & Shushu Bar à Poke (2022年6月-9月)",
    job2_desc: "多文化が交差する多忙な飲食業界において、質の高い接客サービスを提供。英語および基礎的なフランス語を駆使して顧客と円滑なコミュニケーションを図り、受注管理や会計処理を迅速かつ正確に遂行して、顧客満足度の向上に大きく貢献しました。",
    job3_date: "2022年9月 – 2022年12月",
    job3_title: "キッチンスタッフ - Makiman | Sushi Ville Lajeunesse モントリオール",
    job4_date: "2015-2016 / 2017 – 2021年8月",
    job4_title: "日本語教師 | さくら日本語センター - ホーチミン市",
    job4_desc: "初級者から中級者まで、幅広いレベルの学習者に対し日本語および日本文化を指導。体系的なレッスンプランの策定、独自の教材作成、および学習進捗の的確な評価を実施しました。学習者がそれぞれの語学目標を達成できるよう、対話重視でサポートの行き届いた魅力的な学習環境を提供しました。",
    edu_title: "学歴",
    edu_sub1: "学歴および資格",
    edu_1: "日本語能力試験 N1 認定",
    edu_2: "日本語学学士 | ホーチミン市師範大学、ベトナム",
    edu_3: "日本への留学プログラム（1年間） | 清風情報工科学院、大阪、日本",
    edu_sub2: "言語およびソフトスキル",
    skill_lang: "言語：ベトナム語（母語）、日本語（流暢/N1）、英語（中級 - 会話と読み書き）、フランス語（初級 - 接客と日常生活）",
    skill_soft: "ソフトスキル：カスタマーサービス、異文化コミュニケーション、オフィス管理、組織力、適応力、教育・メンタリング",
    gallery_title: "ギャラリー",
    gallery_desc: "人生の旅のエッセンスを捉えた、瞬間と思い出のコレクション。"
  }
};

window.setLanguage = function(lang) {
  // Update translation text
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update active state of buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`btn-${lang}`).classList.add('active');
  
  // Set html lang attribute
  document.documentElement.lang = lang;
}

// Mobile Hamburger Menu Logic
window.toggleMobileMenu = function() {
  const navRight = document.querySelector('.nav-right');
  const hamburger = document.querySelector('.hamburger');
  if (navRight && hamburger) {
    navRight.classList.toggle('active');
    hamburger.classList.toggle('active');
  }
}

// Close menu when clicking a nav link
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-right .nav-item').forEach(link => {
    link.addEventListener('click', () => {
      const navRight = document.querySelector('.nav-right');
      const hamburger = document.querySelector('.hamburger');
      if (navRight && navRight.classList.contains('active')) {
        navRight.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
});
