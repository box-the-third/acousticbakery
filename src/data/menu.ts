/**
 * Read-only café menu, transcribed from the bilingual Acoustic Café menu.
 * Groups follow the menu's pages, sections follow its headings. Prices in SAR.
 */

type Localized = { en: string; ar: string };

export type MenuItem = {
  id: string;
  name: Localized;
  price: number;
  /** Energy per serving, in kcal. */
  calories: number;
  description?: Localized;
};

export type MenuSection = {
  id: string;
  title: Localized;
  note?: Localized;
  items: MenuItem[];
};

export type MenuGroup = {
  id: string;
  title: Localized;
  sections: MenuSection[];
};

/**
 * Calories per serving (kcal), keyed by item id.
 * ESTIMATES based on typical café recipes and portion sizes — replace each value
 * with the figure from the kitchen's own recipe analysis before relying on it.
 */
const calories: Record<string, number> = {
  // Acoustic Bakery Specialities
  "plain-croissant": 320,
  "zaatar-croissant": 380,
  "cheese-croissant": 430,
  "artisan-croissant": 480,
  "cinnamon-roll": 420,
  "cardamom-roll": 400,
  // Healthy Breakfast
  "yogurt-parfait": 350,
  "english-muffin": 380,
  "acai-bowl": 450,
  // Pancakes & French Toast
  "classic-pancakes": 520,
  "granola-pancakes": 600,
  "arabian-pancake": 560,
  "classic-french-toast": 540,
  "cornflake-french-toast": 620,
  // Sandwiches
  "tuna-avocado": 520,
  "halloumi-bliss": 560,
  "chicken-caesar": 580,
  "egg-ham": 450,
  "chicken-pesto": 590,
  // High Energy Protein Drinks
  "vanilla-protein": 280,
  "chocolate-protein": 300,
  // Coffee Bar
  "spanish-latte": 260,
  v60: 5,
  "matcha-latte": 190,
  "caffe-latte": 190,
  cappuccino: 130,
  "single-espresso": 3,
  "double-espresso": 5,
  "flat-white": 120,
  cortado: 80,
  mocha: 290,
  americano: 10,
  "turkish-coffee": 15,
  "hot-chocolate": 300,
  "coffee-of-the-day": 5,
  // Tea
  "dilmah-tea": 2,
  "moroccan-tea": 160,
  "chai-karak": 180,
  // Juices & Coolers
  hibiscus: 120,
  "zest-on-the-beach": 150,
  "tropical-delight": 200,
  "very-berry": 180,
  "pina-colada": 280,
  // Soft Drinks & Water
  "still-water": 0,
  "soft-drinks": 150,
  // Desserts
  "san-sebastian": 480,
  "brulee-cheesecake": 460,
  "honey-cake": 420,
  "brownie-lovers": 400,
};

const item = (id: string, en: string, ar: string, price: number, description?: Localized): MenuItem => {
  const kcal = calories[id];
  if (kcal === undefined) throw new Error(`Missing calories for menu item "${id}"`);
  return {
    id,
    name: { en, ar },
    price,
    calories: kcal,
    ...(description ? { description } : {}),
  };
};

export const menu: MenuGroup[] = [
  {
    id: "bakery",
    title: { en: "Bakery & healthy breakfast", ar: "المخبوزات والإفطار الصحي" },
    sections: [
      {
        id: "specialities",
        title: { en: "Acoustic Bakery Specialities", ar: "مخبوزات أكوستك المميزة" },
        items: [
          item("plain-croissant", "Plain Croissant", "كرواسون سادة", 12),
          item("zaatar-croissant", "Za’atar Croissant", "كرواسون بالزعتر", 15),
          item("cheese-croissant", "Cheese Croissant", "كرواسون بالجبن", 16),
          item("artisan-croissant", "Artisan Croissant", "كرواسون أكوستك المميز", 18, {
            en: "Filled with rose, chocolate or pistachio.",
            ar: "محشي بالورد، الشوكولاتة أو الفستق.",
          }),
          item("cinnamon-roll", "Cinnamon Roll", "لفائف القرفة", 15),
          item("cardamom-roll", "Cardamom Roll", "لفائف الهيل", 16),
        ],
      },
      {
        id: "healthy-breakfast",
        title: { en: "Healthy Breakfast", ar: "الإفطار الصحي" },
        items: [
          item("yogurt-parfait", "Greek Yogurt & Granola Parfait", "بارفيه الزبادي اليوناني والغرانولا", 29),
          item("english-muffin", "English Muffin with Eggs & Cheese", "مافن إنجليزي بالبيض والجبن", 28),
          item("acai-bowl", "Açaí Power Bowl", "وعاء الآساي", 32),
        ],
      },
    ],
  },
  {
    id: "pancakes",
    title: { en: "Pancakes & sandwiches", ar: "البانكيك والساندويتشات" },
    sections: [
      {
        id: "pancakes-french-toast",
        title: { en: "Pancakes & French Toast", ar: "البانكيك والفرنش توست" },
        items: [
          item("classic-pancakes", "Classic Pancakes", "بانكيك كلاسيك", 32),
          item("granola-pancakes", "Granola Pancakes", "بانكيك بالغرانولا", 35),
          item("arabian-pancake", "Arabian Pancake with Za’atar & Feta", "بانكيك عربي بالزعتر وجبن الفيتا", 39),
          item("classic-french-toast", "Classic French Toast", "فرنش توست كلاسيك", 32),
          item("cornflake-french-toast", "Cornflake French Toast", "فرنش توست بالكورن فليكس", 34),
        ],
      },
      {
        id: "sandwiches",
        title: { en: "Sandwiches", ar: "الساندويتشات" },
        note: {
          en: "Choose fresh homemade Focaccia or our fresh oven-baked Panuozzo (Fold).",
          ar: "اختيارك من الفوكاتشيا المحضّرة لدينا أو البانوزو المطوي والمخبوز طازجاً في الفرن.",
        },
        items: [
          item("tuna-avocado", "Tuna & Avocado", "تونة وأفوكادو", 36),
          item("halloumi-bliss", "Halloumi Bliss", "حلوم بليس", 36),
          item("chicken-caesar", "Chicken Caesar", "دجاج سيزر", 37),
          item("egg-ham", "Egg & Ham", "بيض وهام", 29),
          item("chicken-pesto", "Chicken Pesto", "دجاج بالبيستو", 37),
        ],
      },
    ],
  },
  {
    id: "coffee",
    title: { en: "Coffee & Healthy drinks", ar: "القهوة والمشروبات الصحية" },
    sections: [
      {
        id: "protein-drinks",
        title: { en: "High Energy Protein Drinks", ar: "مشروبات البروتين عالية الطاقة" },
        items: [
          item("vanilla-protein", "Vanilla Protein Drink", "مشروب البروتين بالفانيليا", 27),
          item("chocolate-protein", "Chocolate Protein Drink", "مشروب البروتين بالشوكولاتة", 28),
        ],
      },
      {
        id: "coffee-bar",
        title: { en: "Coffee Bar", ar: "ركن القهوة" },
        items: [
          item("spanish-latte", "Flavored Spanish Latte", "سبانش لاتيه بالنكهات", 16),
          item("v60", "Specialty V60", "قهوة مختصة V60", 15),
          item("matcha-latte", "Matcha Latte", "ماتشا لاتيه", 19),
          item("caffe-latte", "Caffè Latte", "كافيه لاتيه", 16),
          item("cappuccino", "Cappuccino", "كابتشينو", 16),
          item("single-espresso", "Single Espresso Shot", "إسبريسو سينجل", 9),
          item("double-espresso", "Double Espresso", "إسبريسو دبل", 12),
          item("flat-white", "Flat White", "فلات وايت", 16),
          item("cortado", "Cortado", "كورتادو", 16),
          item("mocha", "Mocha", "موكا", 15),
          item("americano", "Americano", "أمريكانو", 13),
          item("turkish-coffee", "Turkish Coffee", "قهوة تركية", 14),
          item("hot-chocolate", "Hot Chocolate", "شوكولاتة ساخنة", 15),
          item("coffee-of-the-day", "Coffee of the Day", "قهوة اليوم", 12),
        ],
      },
    ],
  },
  {
    id: "tea",
    title: { en: "Tea & cold drinks", ar: "الشاي والمشروبات الباردة" },
    sections: [
      {
        id: "tea",
        title: { en: "Tea", ar: "الشاي" },
        items: [
          item("dilmah-tea", "Dilmah Tea", "شاي ديلما", 8, {
            en: "Earl Grey, green tea or English breakfast",
            ar: "إيرل غراي، شاي أخضر أو شاي الإفطار الإنجليزي",
          }),
          item("moroccan-tea", "Moroccan Tea for Two", "شاي مغربي لشخصين", 16),
          item("chai-karak", "Chai Karak", "شاي كرك", 12),
        ],
      },
      {
        id: "juices",
        title: { en: "Juices & Coolers", ar: "العصائر والمشروبات المنعشة" },
        items: [
          item("hibiscus", "Hibiscus", "كركديه", 19),
          item("zest-on-the-beach", "Zest on the Beach", "زيست أون ذا بيتش", 15),
          item("tropical-delight", "Tropical Delight", "تروبيكال ديلايت", 19),
          item("very-berry", "Very Berry", "فيري بيري", 19),
          item("pina-colada", "Piña Colada", "بينا كولادا", 19),
        ],
      },
      {
        id: "soft-drinks",
        title: { en: "Soft Drinks & Water", ar: "المشروبات الغازية والمياه" },
        items: [
          item("still-water", "Still Water", "مياه معدنية", 5),
          item("soft-drinks", "Pepsi, 7UP or Cola", "بيبسي، سفن أب أو كولا", 5),
        ],
      },
    ],
  },
  {
    id: "desserts",
    title: { en: "Desserts", ar: "الحلويات" },
    sections: [
      {
        id: "desserts",
        title: { en: "Desserts", ar: "الحلويات" },
        items: [
          item("san-sebastian", "San Sebastián Cheesecake", "تشيز كيك سان سيباستيان", 25, {
            en: "A creamy cheesecake with a deeply browned top.",
            ar: "تشيز كيك كريمي بسطح محمّر غني.",
          }),
          item("brulee-cheesecake", "Brûlée Cheesecake", "تشيز كيك بروليه", 25, {
            en: "Topped with caramelized sugar.",
            ar: "مغطى بطبقة من السكر المكرمل.",
          }),
          item("honey-cake", "Russian Honey Cake", "كيكة العسل الروسية", 25, {
            en: "Thin cake layers filled with honey cream.",
            ar: "طبقات رقيقة من الكيك محشوة بكريمة العسل.",
          }),
          item("brownie-lovers", "Brownie Lovers", "براوني لافرز", 17, {
            en: "Chocolate, tahini or white chocolate.",
            ar: "شوكولاتة، طحينة أو شوكولاتة بيضاء.",
          }),
        ],
      },
    ],
  },
];
