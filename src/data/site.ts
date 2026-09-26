/**
 * Business details and external links in one place.
 * Replace ORDER_URL with the live online-ordering link before launch.
 */

export const PHONE_DISPLAY = "+966 53 785 9708";
export const PHONE_TEL = "+966537859708";
export const WHATSAPP_NUMBER = "966537859708";

/** Online ordering page for pickup and delivery (party boxes, everyday orders). */
export const ORDER_URL = "https://order.acousticbakery.sa";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Olaya+St%2C+Al+Olaya%2C+Riyadh+12221%2C+Saudi+Arabia";

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
