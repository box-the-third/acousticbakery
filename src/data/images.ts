/**
 * Every photo on the page, in one place. Food photography lives in
 * public/images/food, brand and packaging mockups in public/images/pack.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: { en: string; ar: string };
};

const food = (name: string, width: number, height: number, en: string, ar: string): Photo => ({
  src: `/images/food/${name}.webp`,
  width,
  height,
  alt: { en, ar },
});

/** Offerings: a main photo and a square detail inset per card. */
export const OFFERING_PHOTOS = [
  {
    main: food("almond-croissants", 900, 1182, "Almond croissants stacked on a plate", "كرواسون باللوز مكدّس على طبق"),
    detail: food("steaming-croissant", 804, 1200, "A warm croissant", "كرواسون دافئ"),
  },
  {
    main: food("dusting-dough", 900, 1048, "Flour sifted over proofing loaves", "دقيق يُنخل فوق أرغفة تتخمّر"),
    detail: food("kneading-dough", 900, 965, "Hands shaping dough", "أيدٍ تشكّل العجين"),
  },
  {
    main: food("mini-cakes", 900, 1072, "Individual cakes topped with fresh berries", "كعكات فردية مزيّنة بالتوت الطازج"),
    detail: food("petits-fours", 900, 1136, "Petits fours", "بيتي فور"),
  },
  {
    main: food("cheesecake-selection", 900, 993, "A selection of mini cheesecakes", "تشكيلة من التشيز كيك الصغير"),
    detail: food("iced-cinnamon-rolls", 714, 1200, "Iced cinnamon rolls", "لفائف القرفة المزيّنة"),
  },
];

/** Party boxes, keyed by box id. */
export const BOX_PHOTOS: Record<string, Photo> = {
  celebration: food("pastry-spread", 900, 909, "A spread of pastries around a coffee", "تشكيلة معجنات حول فنجان قهوة"),
  viennoiserie: food("croissant-tray", 900, 794, "A tray of freshly baked croissants", "صينية كرواسون طازج"),
  sweet: food("dessert-cups", 900, 898, "Trays of layered dessert cups", "صواني أكواب حلويات متعددة الطبقات"),
  breakfast: food("pastry-basket", 847, 1200, "A basket of breakfast pastries", "سلة معجنات الفطور"),
};

export const AIRLINE_PHOTO = food(
  "airline-cabin",
  1000,
  1270,
  "A catering spread laid out in a private jet cabin",
  "بوفيه ضيافة مُعدّ داخل مقصورة طائرة خاصة",
);

/** "Moments from our tables" gallery. */
export const GALLERY_PHOTOS: Photo[] = [
  food("bakery-display", 801, 1200, "A bakery counter of cakes and cookies", "كاونتر مخبز بالكعك والكوكيز"),
  food("viennoiserie-rack", 900, 1048, "Viennoiserie cooling on a rack", "معجنات تبرد على الرف"),
  food("pistachio-croissants", 900, 1039, "Pistachio croissants", "كرواسون بالفستق"),
  food("proofing-rack", 773, 1200, "Croissants proofing on the rack", "كرواسون يتخمّر على الرف"),
  food("chocolate-croissant", 900, 1029, "A chocolate croissant", "كرواسون بالشوكولاتة"),
  food("babka-swirl", 837, 1200, "A sugared babka swirl", "بابكا ملفوفة بالسكر"),
  food("piping-eclairs", 805, 1200, "Cream piped onto pastries", "كريمة تُزيّن المعجنات"),
  food("glazing-croissants", 880, 640, "Croissants brushed with egg wash", "كرواسون يُدهن قبل الخَبز"),
  food("pastry-flatlay", 596, 1200, "An assortment of pastries from above", "تشكيلة معجنات من الأعلى"),
  food("seeded-croissants", 900, 992, "Seeded croissants", "كرواسون بالبذور"),
  food("cinnamon-buns", 900, 1166, "Cinnamon buns with star anise", "لفائف القرفة مع اليانسون النجمي"),
  food("baked-rack", 804, 1200, "Golden croissants fresh from the oven", "كرواسون ذهبي خارج من الفرن"),
  food("almond-croissant-stack", 727, 1200, "A stack of almond croissants", "كومة كرواسون باللوز"),
  food("pecan-buns", 889, 1200, "Caramel pecan buns", "لفائف البقان بالكراميل"),
  food("cinnamon-tray", 803, 1200, "A tray of chocolate swirls", "صينية لفائف الشوكولاتة"),
  food("chocolate-drizzle", 898, 1200, "Croissants drizzled with chocolate", "كرواسون مغطى بالشوكولاتة"),
  food("croissants-served", 900, 587, "A chef carrying a tray of croissants", "طاهٍ يحمل صينية كرواسون"),
];

/** Brand mockups from the guidelines and packaging proposal. */

/** Chef's hat, cut out of its mockup backdrop (transparent), used behind the intro. */
export const CHEF_HAT = {
  src: "/images/pack/chef-hat.webp",
  width: 944,
  height: 742,
};

export const VAN_PHOTO = {
  src: "/images/pack/van.webp",
  alt: { en: "The Acoustic Bakery & Pâtisserie delivery van", ar: "شاحنة توصيل أكوستيك للمخبوزات والحلويات" },
};

export type PackKey =
  | "croissant"
  | "bread"
  | "cakeBox"
  | "giftTin"
  | "cup"
  | "pastryBox"
  | "baguette"
  | "plate";

/** Packaging tiles, in layout order. `wide` tiles span two columns. */
export const PACK_TILES: { key: PackKey; src: string; wide?: boolean }[] = [
  { key: "croissant", src: "/images/pack/croissant-sleeve.webp" },
  { key: "bread", src: "/images/pack/bread-bag.webp" },
  { key: "cakeBox", src: "/images/pack/cake-box.webp", wide: true },
  { key: "giftTin", src: "/images/pack/gift-tin.webp", wide: true },
  { key: "cup", src: "/images/pack/coffee-cup.webp" },
  { key: "pastryBox", src: "/images/pack/pastry-box.webp" },
  { key: "baguette", src: "/images/pack/baguette-bag.webp" },
  { key: "plate", src: "/images/pack/plate.webp" },
];
