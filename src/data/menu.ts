/**
 * Read-only menu data. The supplied MENU.pdf only contains layout placeholders,
 * so these items are a curated starting point. Edit names, copy and prices here.
 */

type Localized = { en: string; ar: string };

export type MenuItem = {
  id: string;
  name: Localized;
  description: Localized;
  price: number;
  signature?: boolean;
};

export type MenuCategoryId = "bakery" | "patisserie" | "drinks";

export type MenuCategory = {
  id: MenuCategoryId;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "bakery",
    items: [
      {
        id: "sourdough",
        name: { en: "Country Sourdough", ar: "خبز العجين المخمّر" },
        description: {
          en: "48-hour naturally leavened loaf with a deep, blistered crust.",
          ar: "رغيف مخمّر طبيعيًا لمدة 48 ساعة بقشرة ذهبية عميقة.",
        },
        price: 32,
        signature: true,
      },
      {
        id: "croissant",
        name: { en: "Butter Croissant", ar: "كرواسون بالزبدة" },
        description: {
          en: "Hand-laminated with cultured French butter, 27 delicate layers.",
          ar: "مطويّ يدويًا بالزبدة الفرنسية المخمّرة، 27 طبقة رقيقة.",
        },
        price: 14,
        signature: true,
      },
      {
        id: "pain-au-chocolat",
        name: { en: "Pain au Chocolat", ar: "بان أو شوكولا" },
        description: {
          en: "Flaky pastry folded around two bars of dark Valrhona chocolate.",
          ar: "عجينة هشّة ملفوفة حول قطعتين من شوكولاتة فالرونا الداكنة.",
        },
        price: 16,
      },
      {
        id: "baguette",
        name: { en: "Traditional Baguette", ar: "باغيت تقليدي" },
        description: {
          en: "Crackling crust, open crumb, baked fresh throughout the day.",
          ar: "قشرة مقرمشة ولبّ هشّ، يُخبز طازجًا طوال اليوم.",
        },
        price: 12,
      },
      {
        id: "zaatar-croissant",
        name: { en: "Za'atar & Labneh Croissant", ar: "كرواسون زعتر ولبنة" },
        description: {
          en: "Our croissant filled with whipped labneh, wild za'atar and olive oil.",
          ar: "كرواسوننا محشو باللبنة المخفوقة والزعتر البري وزيت الزيتون.",
        },
        price: 19,
      },
      {
        id: "cardamom-bun",
        name: { en: "Cardamom Knot", ar: "عقدة الهيل" },
        description: {
          en: "Soft brioche twisted with cardamom sugar and a hint of saffron.",
          ar: "بريوش طري ملتف بسكر الهيل مع لمسة من الزعفران.",
        },
        price: 15,
      },
    ],
  },
  {
    id: "patisserie",
    items: [
      {
        id: "pistachio-tart",
        name: { en: "Pistachio Rose Tart", ar: "تارت الفستق والورد" },
        description: {
          en: "Sablé shell, pistachio cream and a whisper of Taif rose.",
          ar: "قاعدة سابليه وكريمة الفستق مع لمسة من ورد الطائف.",
        },
        price: 34,
        signature: true,
      },
      {
        id: "dates-entremet",
        name: { en: "Sukkari Date Entremet", ar: "إنتروميه تمر السكري" },
        description: {
          en: "Layered date caramel, vanilla mousse and almond dacquoise.",
          ar: "طبقات من كراميل التمر وموس الفانيليا وداكواز اللوز.",
        },
        price: 38,
        signature: true,
      },
      {
        id: "lemon-tart",
        name: { en: "Lemon Meringue Tart", ar: "تارت الليمون بالميرينغ" },
        description: {
          en: "Bright lemon curd beneath torched Italian meringue.",
          ar: "كريمة ليمون منعشة تحت ميرينغ إيطالي محمّص.",
        },
        price: 29,
      },
      {
        id: "mille-feuille",
        name: { en: "Vanilla Mille-Feuille", ar: "ميل فوي الفانيليا" },
        description: {
          en: "Caramelised puff pastry and Madagascan vanilla crème diplomate.",
          ar: "عجينة منفوخة مكرملة مع كريمة ديبلومات بفانيليا مدغشقر.",
        },
        price: 32,
      },
      {
        id: "chocolate-cookie",
        name: { en: "Brown Butter Cookie", ar: "كوكيز الزبدة المحمّصة" },
        description: {
          en: "Chewy centre, crisp edges, dark chocolate and sea salt flakes.",
          ar: "قلب طري وأطراف مقرمشة مع شوكولاتة داكنة ورقائق ملح البحر.",
        },
        price: 13,
      },
      {
        id: "canele",
        name: { en: "Canelé de Bordeaux", ar: "كانيليه بوردو" },
        description: {
          en: "Caramelised shell with a tender vanilla custard heart.",
          ar: "قشرة مكرملة وقلب كاسترد طري بنكهة الفانيليا.",
        },
        price: 12,
      },
    ],
  },
  {
    id: "drinks",
    items: [
      {
        id: "flat-white",
        name: { en: "Flat White", ar: "فلات وايت" },
        description: {
          en: "Double ristretto of our house espresso with silky steamed milk.",
          ar: "جرعة ريستريتو مزدوجة من إسبريسو المنزل مع حليب مخملي.",
        },
        price: 19,
      },
      {
        id: "v60",
        name: { en: "V60 Pour Over", ar: "في 60 بالتقطير" },
        description: {
          en: "Single-origin beans, rotating weekly, brewed slowly by hand.",
          ar: "حبوب أحادية المصدر تتغير أسبوعيًا، تُحضّر يدويًا وببطء.",
        },
        price: 24,
        signature: true,
      },
      {
        id: "saudi-coffee",
        name: { en: "Saudi Coffee", ar: "قهوة سعودية" },
        description: {
          en: "Lightly roasted with cardamom and saffron, served with dates.",
          ar: "محمّصة تحميصًا خفيفًا بالهيل والزعفران، تُقدَّم مع التمر.",
        },
        price: 22,
      },
      {
        id: "spanish-latte",
        name: { en: "Spanish Latte", ar: "سبانش لاتيه" },
        description: {
          en: "Espresso, condensed milk and fresh milk, served hot or iced.",
          ar: "إسبريسو مع الحليب المكثف والحليب الطازج، ساخن أو مثلّج.",
        },
        price: 21,
      },
      {
        id: "matcha",
        name: { en: "Ceremonial Matcha", ar: "ماتشا فاخرة" },
        description: {
          en: "Stone-ground Uji matcha whisked with your choice of milk.",
          ar: "ماتشا أوجي مطحونة بالحجر تُخفق مع الحليب الذي تختاره.",
        },
        price: 24,
      },
      {
        id: "hot-chocolate",
        name: { en: "Signature Hot Chocolate", ar: "شوكولاتة ساخنة مميزة" },
        description: {
          en: "Melted 70% dark chocolate, steamed milk and a touch of sea salt.",
          ar: "شوكولاتة داكنة 70% مذابة مع حليب ساخن ولمسة من ملح البحر.",
        },
        price: 23,
      },
    ],
  },
];
