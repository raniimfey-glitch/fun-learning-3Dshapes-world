import React from 'react';
import { ShapeId } from '../types';

interface ShapeIconProps {
  shapeId: ShapeId;
  color?: string;
  className?: string;
}

export const ShapeIcon: React.FC<ShapeIconProps> = ({
  shapeId,
  color,
  className = 'w-12 h-12'
}) => {
  const idPrefix = `shape-icon-${shapeId}-${Math.random().toString(36).substring(2, 7)}`;

  // Default color fallbacks based on geometric identity if not provided
  const baseColor = color || (
    shapeId === 'cube' ? '#6366F1' :
    shapeId === 'cuboid' ? '#3B82F6' :
    shapeId === 'cylinder' ? '#10B981' :
    shapeId === 'cone' ? '#F59E0B' :
    shapeId === 'sphere' ? '#EC4899' :
    shapeId === 'square_pyramid' ? '#8B5CF6' :
    shapeId === 'triangular_pyramid' ? '#F97316' :
    '#06B6D4'
  );

  switch (shapeId) {
    case 'cube':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-top`} x1="20" y1="18" x2="80" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-left`} x1="20" y1="32" x2="50" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-right`} x1="50" y1="46" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {/* Base drop shadow */}
          <ellipse cx="50" cy="84" rx="34" ry="10" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Top Face */}
          <polygon points="50,18 80,33 50,48 20,33" fill={baseColor} />
          <polygon points="50,18 80,33 50,48 20,33" fill={`url(#${idPrefix}-top)`} />
          {/* Left Face */}
          <polygon points="20,33 50,48 50,78 20,63" fill={baseColor} />
          <polygon points="20,33 50,48 50,78 20,63" fill={`url(#${idPrefix}-left)`} />
          {/* Right Face */}
          <polygon points="50,48 80,33 80,63 50,78" fill={baseColor} />
          <polygon points="50,48 80,33 80,63 50,78" fill={`url(#${idPrefix}-right)`} />
          {/* Crisp Highlight Borders */}
          <polyline points="20,33 50,48 80,33" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
          <line x1="50" y1="48" x2="50" y2="78" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
          <polygon points="50,18 80,33 80,63 50,78 20,63 20,33" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
        </svg>
      );

    case 'cuboid':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-top`} x1="14" y1="20" x2="86" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-left`} x1="14" y1="36" x2="58" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-right`} x1="58" y1="44" x2="86" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="82" rx="38" ry="10" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Top Face */}
          <polygon points="42,20 86,28 58,44 14,36" fill={baseColor} />
          <polygon points="42,20 86,28 58,44 14,36" fill={`url(#${idPrefix}-top)`} />
          {/* Front/Left Face */}
          <polygon points="14,36 58,44 58,74 14,66" fill={baseColor} />
          <polygon points="14,36 58,44 58,74 14,66" fill={`url(#${idPrefix}-left)`} />
          {/* Right Face */}
          <polygon points="58,44 86,28 86,58 58,74" fill={baseColor} />
          <polygon points="58,44 86,28 86,58 58,74" fill={`url(#${idPrefix}-right)`} />
          {/* Highlight Borders */}
          <polyline points="14,36 58,44 86,28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="58" y1="44" x2="58" y2="74" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
          <polygon points="42,20 86,28 86,58 58,74 14,66 14,36" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
        </svg>
      );

    case 'cylinder':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-body`} x1="18" y1="50" x2="82" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="70%" stopColor={baseColor} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-top`} x1="50" y1="14" x2="50" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="80" rx="34" ry="11" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Body */}
          <path d="M 18,28 L 18,70 A 32 12 0 0 0 82,70 L 82,28 Z" fill={baseColor} />
          <path d="M 18,28 L 18,70 A 32 12 0 0 0 82,70 L 82,28 Z" fill={`url(#${idPrefix}-body)`} />
          {/* Bottom curve border */}
          <path d="M 18,70 A 32 12 0 0 0 82,70" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          {/* Top Cap */}
          <ellipse cx="50" cy="28" rx="32" ry="12" fill={baseColor} />
          <ellipse cx="50" cy="28" rx="32" ry="12" fill={`url(#${idPrefix}-top)`} />
          <ellipse cx="50" cy="28" rx="32" ry="12" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
        </svg>
      );

    case 'cone':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-body`} x1="16" y1="50" x2="84" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="70%" stopColor={baseColor} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="80" rx="36" ry="11" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Base bottom */}
          <ellipse cx="50" cy="74" rx="34" ry="11" fill={baseColor} />
          <ellipse cx="50" cy="74" rx="34" ry="11" fill="#000000" fillOpacity="0.2" />
          {/* Cone Body */}
          <path d="M 50,16 L 16,74 A 34 11 0 0 0 84,74 Z" fill={baseColor} />
          <path d="M 50,16 L 16,74 A 34 11 0 0 0 84,74 Z" fill={`url(#${idPrefix}-body)`} />
          {/* Highlight & Base Border */}
          <path d="M 16,74 A 34 11 0 0 0 84,74" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
          <line x1="50" y1="16" x2="38" y2="78" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" />
          <circle cx="50" cy="16" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'sphere':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id={`${idPrefix}-sphere`} cx="38%" cy="36%" r="60%" fx="34%" fy="32%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="25%" stopColor={baseColor} />
              <stop offset="75%" stopColor={baseColor} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="84" rx="34" ry="9" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Sphere Body with 3D highlight */}
          <circle cx="50" cy="50" r="35" fill={`url(#${idPrefix}-sphere)`} />
          {/* Crisp 3D edge glow */}
          <circle cx="50" cy="50" r="35" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        </svg>
      );

    case 'square_pyramid':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-left`} x1="18" y1="45" x2="50" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-right`} x1="50" y1="45" x2="82" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="83" rx="34" ry="10" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Left triangular face */}
          <polygon points="50,16 18,68 50,82" fill={baseColor} />
          <polygon points="50,16 18,68 50,82" fill={`url(#${idPrefix}-left)`} />
          {/* Right triangular face */}
          <polygon points="50,16 50,82 82,68" fill={baseColor} />
          <polygon points="50,16 50,82 82,68" fill={`url(#${idPrefix}-right)`} />
          {/* Center ridge & borders */}
          <line x1="50" y1="16" x2="50" y2="82" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
          <polygon points="50,16 18,68 50,82 82,68" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
          <circle cx="50" cy="16" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'triangular_pyramid':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-left`} x1="20" y1="45" x2="52" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-right`} x1="52" y1="45" x2="80" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="83" rx="33" ry="10" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Left triangular face */}
          <polygon points="50,16 20,70 52,82" fill={baseColor} />
          <polygon points="50,16 20,70 52,82" fill={`url(#${idPrefix}-left)`} />
          {/* Right triangular face */}
          <polygon points="50,16 52,82 80,62" fill={baseColor} />
          <polygon points="50,16 52,82 80,62" fill={`url(#${idPrefix}-right)`} />
          {/* Base border and center edge */}
          <line x1="50" y1="16" x2="52" y2="82" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
          <polygon points="50,16 20,70 52,82 80,62" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
          <circle cx="50" cy="16" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'triangular_prism':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`${idPrefix}-front`} x1="20" y1="40" x2="54" y2="76" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-top`} x1="36" y1="24" x2="88" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id={`${idPrefix}-side`} x1="54" y1="45" x2="88" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <ellipse cx="54" cy="80" rx="36" ry="10" fill="#000000" fillOpacity="0.25" filter="blur(3px)" />
          {/* Front triangular face */}
          <polygon points="36,30 18,74 54,74" fill={baseColor} />
          <polygon points="36,30 18,74 54,74" fill={`url(#${idPrefix}-front)`} />
          {/* Slanted top rectangular face */}
          <polygon points="36,30 74,20 88,58 54,74" fill={baseColor} />
          <polygon points="36,30 74,20 88,58 54,74" fill={`url(#${idPrefix}-top)`} />
          {/* Slanted side face */}
          <polygon points="54,74 88,58 88,64 54,78" fill={baseColor} fillOpacity="0.7" />
          {/* Highlights */}
          <line x1="36" y1="30" x2="54" y2="74" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
          <line x1="36" y1="30" x2="74" y2="20" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
          <polygon points="36,30 74,20 88,58 54,74 18,74" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
        </svg>
      );

    default:
      return null;
  }
};
