export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];

export const DIRECTION: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

const en = {
  meta: {
    skip: "Skip to content",
  },
  nav: {
    story: "Our Story",
    menu: "Menu",
    visit: "Visit",
    cta: "Visit Us",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    language: "Language",
    switchTo: "العربية",
  },
  hero: {
    eyebrow: "Bakery & Patisserie in Riyadh",
    title: "Everyday moments deserve exceptional quality",
    body: "Slow-fermented breads, delicate French pastry and specialty coffee, made by hand each morning on Olaya Street.",
    primary: "Explore the Menu",
    secondary: "Find Us",
    hint: "Play the strings",
    scroll: "Scroll",
  },
  story: {
    eyebrow: "Our Story",
    title: "Baking, played unplugged.",
    lead: "An acoustic instrument hides nothing. Every note is real, shaped by hand and heard exactly as it was made. We bake the same way.",
    body: "Acoustic began with a simple idea: strip baking back to its honest essentials. Flour, water, butter, time. No shortcuts, no noise. Our dough rests for up to forty-eight hours, our laminated pastry is folded by hand, and our ovens set the rhythm of every morning in Al Olaya.",
    quote: "A little everyday joy, made with care.",
    pillars: [
      {
        title: "Slow Fermentation",
        body: "Long, cool proofing for depth of flavour and a crust that sings.",
      },
      {
        title: "Honest Ingredients",
        body: "Cultured butter, stone-milled flours and seasonal fruit, nothing artificial.",
      },
      {
        title: "Crafted by Hand",
        body: "Every croissant rolled, every tart piped by our pastry team, daily.",
      },
    ],
  },
  craft: {
    eyebrow: "The Details",
    title: "Wrapped with the same care it was baked with",
    items: ["Fresh loaves", "Pastry boxes", "Cookie sleeves", "Gift tins", "Baguette wraps", "Bread bags"],
  },
  menu: {
    eyebrow: "The Menu",
    title: "Made fresh, every morning",
    body: "A seasonal selection from our ovens and our bar. Menu items and prices may change with the season.",
    currency: "SAR",
    signature: "Signature",
    note: "All prices in Saudi Riyal and inclusive of VAT. Please ask our team about allergens.",
    categories: {
      bakery: "Bakery",
      patisserie: "Patisserie",
      drinks: "Drinks",
    },
  },
  visit: {
    eyebrow: "Visit Us",
    title: "Come in, stay a while",
    body: "Find us on Olaya Street, in the heart of Riyadh. Pull up a chair, the coffee is on.",
    addressLabel: "Address",
    addressEn: "Olaya St, Al Olaya, Riyadh 12221, Saudi Arabia",
    addressAr: "شارع العليا، حي العليا، الرياض 12221، المملكة العربية السعودية",
    hoursLabel: "Opening Hours",
    hours: [
      { days: "Saturday to Thursday", time: "6:30 AM to 11:00 PM" },
      { days: "Friday", time: "1:00 PM to 11:30 PM" },
    ],
    directions: "Get Directions",
    note: "Hours may vary during Ramadan and public holidays.",
  },
  footer: {
    tagline: "Everyday moments deserve exceptional quality.",
    explore: "Explore",
    find: "Find Us",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  meta: {
    skip: "انتقل إلى المحتوى",
  },
  nav: {
    story: "قصتنا",
    menu: "القائمة",
    visit: "زورونا",
    cta: "زورونا",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    language: "اللغة",
    switchTo: "English",
  },
  hero: {
    eyebrow: "مخبز وحلويات في الرياض",
    title: "كل لحظة يومية تستحق جودة استثنائية",
    body: "خبز مخمّر ببطء، ومعجنات فرنسية رقيقة، وقهوة مختصة، نصنعها يدويًا كل صباح في شارع العليا.",
    primary: "استكشف القائمة",
    secondary: "موقعنا",
    hint: "اعزف على الأوتار",
    scroll: "مرّر",
  },
  story: {
    eyebrow: "قصتنا",
    title: "خَبزٌ على إيقاعٍ صادق.",
    lead: "الآلة الموسيقية الأكوستيكية لا تُخفي شيئًا. كل نغمة حقيقية، تصنعها اليد وتُسمع كما هي تمامًا. وهكذا نخبز.",
    body: "بدأت أكوستيك بفكرة بسيطة: أن نعود بالخَبز إلى جوهره الصادق. دقيق وماء وزبدة ووقت. بلا اختصارات وبلا ضجيج. تستريح عجينتنا حتى ثمانٍ وأربعين ساعة، وتُطوى معجناتنا يدويًا، وتضبط أفراننا إيقاع كل صباح في حي العليا.",
    quote: "لمسة فرح يومية، مصنوعة بعناية.",
    pillars: [
      {
        title: "تخمير بطيء",
        body: "تخمير طويل وبارد لنكهة أعمق وقشرة مقرمشة مميزة.",
      },
      {
        title: "مكونات صادقة",
        body: "زبدة مخمّرة، ودقيق مطحون بالحجر، وفواكه موسمية، بلا أي إضافات صناعية.",
      },
      {
        title: "صُنع يدويًا",
        body: "كل كرواسون يُلف وكل تارت يُزيَّن بأيدي فريق الحلويات لدينا، يوميًا.",
      },
    ],
  },
  craft: {
    eyebrow: "التفاصيل",
    title: "نغلّفه بالعناية ذاتها التي خبزناه بها",
    items: ["أرغفة طازجة", "علب المعجنات", "أغلفة الكوكيز", "علب الهدايا", "أغلفة الباغيت", "أكياس الخبز"],
  },
  menu: {
    eyebrow: "القائمة",
    title: "طازج كل صباح",
    body: "تشكيلة موسمية من أفراننا ومن ركن القهوة. قد تتغير الأصناف والأسعار بحسب الموسم.",
    currency: "ر.س",
    signature: "مميّز",
    note: "جميع الأسعار بالريال السعودي وتشمل ضريبة القيمة المضافة. يُرجى سؤال فريقنا عن مسببات الحساسية.",
    categories: {
      bakery: "المخبوزات",
      patisserie: "الحلويات",
      drinks: "المشروبات",
    },
  },
  visit: {
    eyebrow: "زورونا",
    title: "تفضّلوا، وخذوا وقتكم",
    body: "تجدوننا في شارع العليا، في قلب الرياض. اختر مقعدك، والقهوة جاهزة.",
    addressLabel: "العنوان",
    addressEn: "Olaya St, Al Olaya, Riyadh 12221, Saudi Arabia",
    addressAr: "شارع العليا، حي العليا، الرياض 12221، المملكة العربية السعودية",
    hoursLabel: "ساعات العمل",
    hours: [
      { days: "السبت إلى الخميس", time: "6:30 صباحًا إلى 11:00 مساءً" },
      { days: "الجمعة", time: "1:00 ظهرًا إلى 11:30 مساءً" },
    ],
    directions: "احصل على الاتجاهات",
    note: "قد تختلف ساعات العمل خلال شهر رمضان والعطلات الرسمية.",
  },
  footer: {
    tagline: "كل لحظة يومية تستحق جودة استثنائية.",
    explore: "استكشف",
    find: "موقعنا",
    rights: "جميع الحقوق محفوظة.",
    backToTop: "العودة للأعلى",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ar };
