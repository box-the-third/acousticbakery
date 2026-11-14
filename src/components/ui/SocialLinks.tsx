"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { Instagram, WhatsApp } from "@/components/ui/Icons";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/data/site";

/** Square icon buttons for Acoustic's social channels. */
export function SocialLinks({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const { t } = useLanguage();
  const onDark = tone === "dark";
  const links = [
    { href: INSTAGRAM_URL, label: t.social.instagram, icon: <Instagram /> },
    { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: t.social.whatsapp, icon: <WhatsApp /> },
  ];

  return (
    <ul className="flex gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className={`flex size-11 items-center justify-center border transition-colors duration-300 ${
              onDark
                ? "border-cream/30 text-paper hover:bg-paper hover:text-ink"
                : "border-ink/25 text-ink hover:bg-ink hover:text-paper"
            }`}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
