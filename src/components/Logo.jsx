export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-indigo-400"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-indigo-400"
      />
      <path
        d="M8 8H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-indigo-300"
      />
      <path
        d="M8 18H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-indigo-300"
      />
    </svg>
  );
} 