"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { DELIVERY_APPS } from "@/data/site";
import { asset } from "@/lib/asset";

/**
 * Delivery-app logos. Each logo links to Acoustic's store page on that app;
 * an app without a link yet shows as a plain badge rather than a dead link.
 */
export function DeliveryApps({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "sm" | "md" }) {
  const { t, locale } = useLanguage();
  const onDark = tone === "dark";
  const icon = size === "sm" ? "size-10" : "size-14";

  return (
    <ul className="flex flex-wrap gap-2 sm:gap-3">
      {DELIVERY_APPS.map((app) => {
        const label = app.name[locale];
        const content = (
          <>
            <Image
              src={asset(app.logo)}
              alt=""
              width={96}
              height={96}
              className={`${icon} shrink-0`}
            />
            <span className={size === "sm" ? "sr-only" : "text-sm font-semibold"}>{label}</span>
          </>
        );
        const box = `flex items-center gap-3 border transition-colors duration-300 ${
          size === "sm" ? "p-1.5" : "py-2 ps-2 pe-4"
        } ${onDark ? "border-cream/20 text-paper" : "border-ink/20 text-ink"}`;

        return (
          <li key={app.id}>
            {app.url ? (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.delivery.orderOn} ${label}`}
                className={`${box} ${onDark ? "hover:border-cream/70" : "hover:border-ink"}`}
              >
                {content}
              </a>
            ) : (
              <span className={box} title={label}>
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
