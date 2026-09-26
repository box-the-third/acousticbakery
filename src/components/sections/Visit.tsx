"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, Clock, MapPin, Phone, Send } from "@/components/ui/Icons";
import {
  ENQUIRY_EVENT,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappLink,
  type EnquiryType,
} from "@/data/site";

const TOPICS: EnquiryType[] = ["party", "airline", "buffet", "gifting", "other"];

const fieldClass =
  "mt-2 w-full border border-ink/25 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-ink focus:outline-none";
const labelClass = "text-[0.68rem] font-bold tracking-[0.14em] text-ink uppercase rtl:text-sm rtl:tracking-normal";

export function Visit() {
  const { t, locale } = useLanguage();
  const [topic, setTopic] = useState<EnquiryType | "">("");

  // Catering buttons elsewhere on the page preselect the topic.
  useEffect(() => {
    const onEnquire = (event: Event) => setTopic((event as CustomEvent<EnquiryType>).detail);
    window.addEventListener(ENQUIRY_EVENT, onEnquire);
    return () => window.removeEventListener(ENQUIRY_EVENT, onEnquire);
  }, []);

  // No backend: the form composes a WhatsApp message for the team.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const chosen = topic ? t.enquire.topics[topic] : "";
    const lines = [
      `${t.enquire.greeting} ${chosen}.`,
      `${t.enquire.name}: ${data.get("name")}`,
      data.get("date") ? `${t.enquire.date}: ${data.get("date")}` : "",
      `${data.get("message")}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  const details = [
    {
      icon: <MapPin />,
      label: t.visit.addressLabel,
      content: (
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block hover:underline">
          <span lang="en" dir="ltr" className="block text-start">
            {t.visit.addressEn}
          </span>
          <span lang="ar" dir="rtl" className="mt-1 block text-start font-[system-ui,sans-serif] text-ink-night/70">
            {t.visit.addressAr}
          </span>
        </a>
      ),
    },
    {
      icon: <Phone />,
      label: t.visit.phoneLabel,
      content: (
        <a href={`tel:${PHONE_TEL}`} dir="ltr" className="hover:underline">
          {PHONE_DISPLAY}
        </a>
      ),
    },
    { icon: <Clock />, label: t.visit.hoursLabel, content: <span>{t.visit.hours}</span> },
  ];

  return (
    <section id="visit" className="bg-shell py-24 sm:py-32">
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={t.visit.eyebrow}
            title={t.visit.title}
            titleClassName="max-w-xl text-5xl sm:text-6xl lg:text-[5rem]"
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-night/75">{t.visit.body}</p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-10 border-t border-ink/25">
              {details.map((detail) => (
                <div key={detail.label} className="flex gap-5 border-b border-ink/25 py-5">
                  <span className="mt-0.5 text-coral">{detail.icon}</span>
                  <div>
                    <dt className={labelClass}>{detail.label}</dt>
                    <dd className="mt-2 font-semibold text-ink">{detail.content}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-link mt-8 text-ink">
              {t.visit.directions}
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            id="enquire"
            onSubmit={onSubmit}
            className="border border-ink/25 bg-paper p-7 sm:p-10"
          >
            <h3 className="display-title text-4xl text-ink sm:text-5xl">{t.enquire.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-night/70">{t.enquire.body}</p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>{t.enquire.name}</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t.enquire.namePlaceholder}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className={labelClass}>{t.enquire.date}</span>
                <input name="date" type="date" className={fieldClass} lang={locale} />
              </label>
            </div>

            <label className="mt-5 block">
              <span className={labelClass}>{t.enquire.topic}</span>
              <select
                name="topic"
                required
                value={topic}
                onChange={(event) => setTopic(event.target.value as EnquiryType)}
                className={`${fieldClass} appearance-none bg-[length:12px] bg-[position:right_1rem_center] bg-no-repeat rtl:bg-[position:left_1rem_center]`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%234b585a' stroke-width='1.5'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="" disabled>
                  {t.enquire.topicPlaceholder}
                </option>
                {TOPICS.map((value) => (
                  <option key={value} value={value}>
                    {t.enquire.topics[value]}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 block">
              <span className={labelClass}>{t.enquire.message}</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.enquire.messagePlaceholder}
                className={`${fieldClass} resize-y`}
              />
            </label>

            <button type="submit" className="btn btn-dark mt-7 w-full sm:w-auto">
              {t.enquire.submit}
              <Send />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
