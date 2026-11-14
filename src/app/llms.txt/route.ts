import { menu } from "@/data/menu";
import { BOX_CATEGORIES } from "@/data/boxes";
import { dictionaries } from "@/i18n/dictionary";
import {
  BUSINESS,
  DELIVERY_APPS,
  INSTAGRAM_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/data/site";

export const dynamic = "force-static";

/**
 * llms.txt: a plain-text fact sheet for AI assistants (GEO). Generated from the
 * same data as the page, so the menu, prices and hours never drift.
 */
export function GET() {
  const en = dictionaries.en;
  const lines: string[] = [];
  const add = (...l: string[]) => lines.push(...l);

  add(
    `# ${BUSINESS.name} (${BUSINESS.nameAr})`,
    "",
    `> Bakery, pâtisserie and café on Olaya Street in Al Olaya, Riyadh, Saudi Arabia. Part of Acoustic, founded in ${BUSINESS.foundingDate}. Fresh croissants, breads, healthy breakfast, specialty coffee, desserts, party boxes, and catering including airline catering.`,
    "",
    `Also listed on Google Maps as "${BUSINESS.mapsListingName}" (${BUSINESS.mapsListingNameAr}).`,
    "",
    "## Visit",
    `- Address: ${en.visit.addressEn} (${en.visit.addressAr})`,
    `- Coordinates: ${BUSINESS.latitude}, ${BUSINESS.longitude}`,
    `- Google Maps: ${MAPS_URL}`,
    `- Hours: ${en.visit.hours}`,
    `- Phone: ${PHONE_DISPLAY}`,
    `- WhatsApp: https://wa.me/${WHATSAPP_NUMBER}`,
    `- Instagram: ${INSTAGRAM_URL}`,
    `- Website: ${SITE_URL}/`,
    `- Delivery apps: ${DELIVERY_APPS.map((app) => app.name.en).join(", ")}`,
    "",
    "## Story",
    ...en.story.timeline.map((entry) => `- ${entry.year}, ${entry.title}: ${entry.body}`),
    "",
    `Mission: ${en.purpose.mission}`,
    `Vision: ${en.purpose.vision}`,
    "",
    "## Menu (prices in SAR)",
  );

  for (const group of menu) {
    add("", `### ${group.title.en} (${group.title.ar})`);
    for (const section of group.sections) {
      if (section.title.en !== group.title.en) add("", `#### ${section.title.en} (${section.title.ar})`);
      if (section.note) add(section.note.en);
      for (const item of section.items) {
        const description = item.description ? `. ${item.description.en}` : "";
        add(`- ${item.name.en} (${item.name.ar}): SAR ${item.price}${description}`);
      }
    }
  }

  add("", "## Party boxes", "Ordered on WhatsApp for gatherings, offices and celebrations.");
  for (const category of BOX_CATEGORIES) {
    add("", `### ${category.title.en} (${category.title.ar})`);
    for (const box of category.boxes) {
      const flavours = box.flavours ? `: ${box.flavours.map((f) => f.en).join(", ")}` : "";
      add(`- ${box.name.en}${flavours}`);
    }
  }

  add(
    "",
    "## Catering",
    `- ${en.catering.airline.label}: ${en.catering.airline.body}`,
    ...en.catering.services.map((service) => `- ${service.title}: ${service.body}`),
    "",
    "## Clients",
    ...en.clients.groups.map((group) => `- ${group.title}: ${group.body}`),
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
