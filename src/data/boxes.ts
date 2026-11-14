/**
 * Party boxes, as supplied by Acoustic. Every box links to online ordering.
 * English names and flavours are Acoustic's own; the Arabic is a translation.
 */

type Localized = { en: string; ar: string };

export type PartyBox = {
  id: string;
  name: Localized;
  flavours?: Localized[];
};

export type BoxCategory = {
  id: "savory" | "desserts";
  title: Localized;
  boxes: PartyBox[];
};

const l = (en: string, ar: string): Localized => ({ en, ar });

export const BOX_CATEGORIES: BoxCategory[] = [
  {
    id: "savory",
    title: l("Savory Boxes", "الصناديق المالحة"),
    boxes: [
      {
        id: "brioche-mini-sandwiches",
        name: l("Brioche Mini Sandwiches", "ميني ساندويتشات بريوش"),
        flavours: [
          l("Brie, Date & Walnut", "بري وتمر وجوز"),
          l("Creamy Chicken", "دجاج بالكريمة"),
          l("Spicy Tuna", "تونة حارة"),
        ],
      },
      {
        id: "focaccia-sandwiches",
        name: l("Focaccia Sandwiches", "ساندويتشات فوكاتشيا"),
        flavours: [
          l("Chicken Pesto Mayo", "دجاج بمايونيز البيستو"),
          l("Halloumi & Olive", "حلوم وزيتون"),
          l("Grilled Vegetable & Pesto", "خضار مشوية وبيستو"),
        ],
      },
      {
        id: "mini-croissant-sandwiches",
        name: l("Mini Croissant Sandwiches", "ميني ساندويتشات كرواسون"),
        flavours: [
          l("Zaatar Feta", "زعتر وفيتا"),
          l("Spicy Feta", "فيتا حارة"),
          l("Beetroot Feta", "شمندر وفيتا"),
          l("Halloumi & Olive", "حلوم وزيتون"),
        ],
      },
      {
        id: "tortilla-wraps",
        name: l("Tortilla Wraps", "لفائف التورتيلا"),
        flavours: [
          l("Falafel", "فلافل"),
          l("Chicken Quesadilla", "كاساديا الدجاج"),
          l("Egg & Spinach", "بيض وسبانخ"),
        ],
      },
      {
        id: "mini-burger-sandwiches",
        name: l("Mini Burger Sandwiches", "ميني ساندويتشات برغر"),
        flavours: [
          l("Zaatar Feta", "زعتر وفيتا"),
          l("Spicy Feta & Makdous", "فيتا حارة ومكدوس"),
          l("Halloumi, Pesto & Tomato", "حلوم وبيستو وطماطم"),
          l("Egg", "بيض"),
        ],
      },
    ],
  },
  {
    id: "desserts",
    title: l("Dessert Boxes", "صناديق الحلويات"),
    boxes: [
      {
        id: "mini-choux",
        name: l("Mini Choux", "ميني شو"),
        flavours: [l("Rose", "ورد"), l("Chocolate", "شوكولاتة"), l("Pistachio", "فستق")],
      },
      { id: "mini-basbousa", name: l("Mini Basbousa", "ميني بسبوسة") },
      { id: "mini-ogaily", name: l("Mini Ogaily", "ميني عقيلي") },
      { id: "ogaily-basbousa-mix", name: l("Mini Ogaily & Basbousa Mix", "تشكيلة ميني عقيلي وبسبوسة") },
      {
        id: "mini-brownies",
        name: l("Mini Brownies", "ميني براوني"),
        flavours: [l("Dark", "داكن"), l("White", "أبيض"), l("Caramel Drizzle", "بصوص الكراميل")],
      },
      { id: "mini-honey-cake", name: l("Mini Honey Cake", "ميني كيكة العسل") },
      { id: "mini-tart", name: l("Mini Tart", "ميني تارت") },
      { id: "mini-ghraybeh", name: l("Mini Ghraybeh", "ميني غريبة") },
    ],
  },
];
