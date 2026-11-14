/**
 * Business details and external links in one place.
 * Paste each delivery app's Acoustic store link into DELIVERY_APPS below.
 */

export const PHONE_DISPLAY = "+966 53 785 9708";
export const PHONE_TEL = "+966537859708";
export const WHATSAPP_NUMBER = "966537859708";

export const INSTAGRAM_URL = "https://www.instagram.com/acousticbakerysa?obrf=MTh0bWRmdnpkNG5wOA==";
export const INSTAGRAM_HANDLE = "@acousticbakerysa";

export type DeliveryApp = {
  id: string;
  name: { en: string; ar: string };
  logo: string;
  /** Acoustic's store page on the app. Leave empty until the link is ready: the logo then shows without a link. */
  url: string;
};

/** Delivery apps Acoustic is on. Logos are each app's official App Store icon. */
export const DELIVERY_APPS: DeliveryApp[] = [
  { id: "jahez", name: { en: "Jahez", ar: "جاهز" }, logo: "/images/apps/jahez.webp", url: "" },
  { id: "thechefz", name: { en: "The Chefz", ar: "ذا شفز" }, logo: "/images/apps/thechefz.webp", url: "" },
  { id: "toyou", name: { en: "ToYou", ar: "تويو" }, logo: "/images/apps/toyou.webp", url: "" },
  { id: "keeta", name: { en: "Keeta", ar: "كيتا" }, logo: "/images/apps/keeta.webp", url: "" },
  { id: "hungerstation", name: { en: "HungerStation", ar: "هنقرستيشن" }, logo: "/images/apps/hungerstation.webp", url: "" },
];

/** The live site. Hostinger serves it at this domain; GitHub Pages overrides it at build time. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://acousticbakery.com").replace(/\/$/, "");

export const BUSINESS = {
  name: "Acoustic Bakery & Pâtisserie",
  nameAr: "أكوستيك للمخبوزات والحلويات",
  /** How the business is listed on Google Maps, so search engines can match the two. */
  mapsListingName: "M'AVO / Acoustic Deli & Bakery",
  mapsListingNameAr: "مافو / اكوستك مقهى ومخبز",
  foundingDate: "2007",
  street: "Olaya St, Al Olaya",
  city: "Riyadh",
  region: "Riyadh Province",
  postalCode: "12221",
  country: "SA",
  latitude: 24.6857,
  longitude: 46.6894888,
  opens: "07:00",
  /** Open until midnight. */
  closes: "23:59",
} as const;

/** Acoustic's Google Maps listing (stable link by place ID). */
export const MAPS_URL = "https://www.google.com/maps?cid=471321159353955623";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Enquiry types shared by the catering buttons and the enquiry form. */
export type EnquiryType = "party" | "airline" | "buffet" | "gifting" | "other";

export const ENQUIRY_EVENT = "acoustic:enquire";

/** Scrolls to the enquiry form and preselects a topic. */
export function openEnquiry(type: EnquiryType) {
  window.dispatchEvent(new CustomEvent<EnquiryType>(ENQUIRY_EVENT, { detail: type }));
  document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
