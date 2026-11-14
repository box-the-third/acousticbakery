import { menu } from "@/data/menu";
import { dictionaries } from "@/i18n/dictionary";
import { BUSINESS, INSTAGRAM_URL, MAPS_URL, PHONE_TEL, SITE_URL } from "@/data/site";

/**
 * schema.org JSON-LD describing the business, its menu and catering, so search
 * engines and AI assistants can read the facts directly. Built from site data.
 */
export function StructuredData() {
  const en = dictionaries.en;
  const prices = menu.flatMap((g) => g.sections.flatMap((s) => s.items.map((i) => i.price)));
  const id = `${SITE_URL}/#bakery`;

  const bakery = {
    "@type": "Bakery",
    "@id": id,
    name: BUSINESS.name,
    alternateName: [BUSINESS.nameAr, BUSINESS.mapsListingName, BUSINESS.mapsListingNameAr, "Acoustic Bakery Riyadh"],
    description:
      "Bakery, pâtisserie and café on Olaya Street in Al Olaya, Riyadh. Fresh croissants, breads, healthy breakfast, specialty coffee, desserts, party boxes, and catering including airline catering.",
    url: `${SITE_URL}/`,
    telephone: PHONE_TEL,
    image: [`${SITE_URL}/images/hero-sign.webp`],
    logo: `${SITE_URL}/brand/logo-slate.png`,
    foundingDate: BUSINESS.foundingDate,
    priceRange: `SAR ${Math.min(...prices)}-${Math.max(...prices)}`,
    currenciesAccepted: "SAR",
    servesCuisine: ["Bakery", "Pâtisserie", "Café", "Breakfast", "Desserts", "Coffee"],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.latitude, longitude: BUSINESS.longitude },
    hasMap: MAPS_URL,
    areaServed: { "@type": "City", name: "Riyadh" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: BUSINESS.opens,
      closes: BUSINESS.closes,
    },
    sameAs: [INSTAGRAM_URL, MAPS_URL],
    hasMenu: {
      "@type": "Menu",
      name: "Acoustic Café Menu",
      inLanguage: ["en", "ar"],
      hasMenuSection: menu.map((group) => ({
        "@type": "MenuSection",
        name: group.title.en,
        alternateName: group.title.ar,
        hasMenuItem: group.sections.flatMap((section) =>
          section.items.map((item) => ({
            "@type": "MenuItem",
            name: item.name.en,
            alternateName: item.name.ar,
            ...(item.description ? { description: item.description.en } : {}),
            offers: { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "SAR" },
          })),
        ),
      })),
    },
    makesOffer: [en.catering.airline, ...en.catering.services.map((s) => ({ label: s.title, body: s.body }))].map(
      (service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "label" in service ? service.label : "",
          description: service.body,
          provider: { "@id": id },
        },
      }),
    ),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BUSINESS.name,
    inLanguage: ["en", "ar"],
    publisher: { "@id": id },
  };

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [bakery, website] }).replace(
    /</g,
    "\\u003c",
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
