import type { IconName } from "@/types";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const paths: Record<IconName, string> = {
  workflow:
    "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm13 0a3 3 0 100 6 3 3 0 000-6zM13 7h-3m3 0v4m0-4h3",
  crosschain:
    "M8 12h8m-4-4v8M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  shield:
    "M12 2l8 4v6c0 5.25-3.5 10.74-8 12-4.5-1.26-8-6.75-8-12V6l8-4zm-1 10.5l-2-2-1.5 1.5L11 15.5l5-5-1.5-1.5L11 12.5z",
  monitor:
    "M4 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm4 14h8m-4-2v2",
  globe:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 0 4.5 4.48 4.5 10S14.5 22 12 22s-4.5-4.48-4.5-10S9.5 2 12 2zM2 12h20",
  home: "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10",
  settings:
    "M12 15a3 3 0 100-6 3 3 0 000 6zm7.94-2.06a1.06 1.06 0 00.21-.88l-.78-3.05a1.06 1.06 0 00-.66-.73l-1.28-.46a7.06 7.06 0 00-.53-.92l.24-1.33a1.06 1.06 0 00-.32-.84L14.6 2.85a1.06 1.06 0 00-.87-.25l-1.32.27a7.06 7.06 0 00-.94-.5L11.03.99A1.06 1.06 0 0010.3.3L7.25 1.08a1.06 1.06 0 00-.73.66l-.46 1.28c-.32.16-.63.34-.92.53l-1.33-.24a1.06 1.06 0 00-.84.32L1.09 5.85a1.06 1.06 0 00-.25.87l.27 1.32c-.18.3-.35.62-.5.94L.99 9.42a1.06 1.06 0 00-.69.73l.78 3.05c.08.31.32.57.62.7",
  "chevron-left": "M15 18l-6-6 6-6",
  "chevron-right": "M9 18l6-6-6-6",
  wallet:
    "M19 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2v-2m2-4h-6a2 2 0 010-4h6a1 1 0 011 1v2a1 1 0 01-1 1z",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6L6 18M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  minus: "M5 12h14",
  "external-link":
    "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3",
};

export function Icon({ name, className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
