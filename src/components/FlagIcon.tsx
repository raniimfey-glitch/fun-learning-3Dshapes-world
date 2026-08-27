import React from 'react';

interface FlagIconProps {
  country: 'dz' | 'gb';
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ country, className = 'w-6 h-4' }) => {
  if (country === 'dz') {
    // Flag of Algeria: Green on hoist (left), White on fly (right), Red crescent and 5-pointed star in center
    return (
      <svg
        viewBox="0 0 900 600"
        className={`inline-block rounded-xs shadow-xs shrink-0 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="450" height="600" fill="#006233" />
        <rect x="450" width="450" height="600" fill="#FFFFFF" />
        {/* Red Crescent */}
        <circle cx="450" cy="300" r="150" fill="#D21034" />
        <circle cx="486" cy="300" r="120" fill="#FFFFFF" />
        {/* Red Star in Center */}
        <polygon
          points="450,225 464,268 509,268 473,294 487,337 450,311 413,337 427,294 391,268 436,268"
          fill="#D21034"
          transform="rotate(-90 450 300) translate(25 0)"
        />
      </svg>
    );
  }

  // Flag of the United Kingdom / Great Britain (Union Jack)
  return (
    <svg
      viewBox="0 0 60 30"
      className={`inline-block rounded-xs shadow-xs shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-flag-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        {/* Blue background */}
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        {/* White Saltire (St Andrew / St Patrick base) */}
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        {/* Red Saltire (St Patrick) */}
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
        {/* St George white background */}
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        {/* St George red cross */}
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
};
