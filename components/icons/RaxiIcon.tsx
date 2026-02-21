interface RaxiIconProps {
  size?: number;
  className?: string;
}

export default function RaxiIcon({ size = 24, className = '' }: RaxiIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer hexagon — engine housing */}
      <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" />
      {/* Inner core — AI nucleus */}
      <circle cx="12" cy="12" r="3" />
      {/* Three radiating spokes — energy / processing */}
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="20" y1="17" x2="14.6" y2="13.5" />
      <line x1="4" y1="17" x2="9.4" y2="13.5" />
    </svg>
  );
}
