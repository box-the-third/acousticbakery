type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

/** Diagonal arrow. Mirrored in RTL so it always points "forward". */
export function ArrowUpRight({ className = "size-4" }: IconProps) {
  return (
    <svg {...base} className={`${className} rtl:-scale-x-100`}>
      <path d="M7 7h10v10M7 17 17 7" />
    </svg>
  );
}

export function ArrowSide({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={`${className} rtl:-scale-x-100`}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MapPin({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
      <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </svg>
  );
}

export function Phone({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function Clock({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 7v5h4" />
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
    </svg>
  );
}

export function Plane({ className = "size-6" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 16l20-7-3-2-7 2-5-4-2 1 3 5-4 1-2-1-1 1 3 3Z" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function Send({ className = "size-4" }: IconProps) {
  return (
    <svg {...base} className={`${className} rtl:-scale-x-100`}>
      <path d="M21 3 3 10l7 3 3 7 8-17ZM10 13l5-5" />
    </svg>
  );
}

export function Close({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function Chevron({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} className={`${className} rtl:-scale-x-100`}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}
