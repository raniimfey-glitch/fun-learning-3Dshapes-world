import React from 'react';

interface RealWorldVisualProps {
  itemId: string;
  className?: string;
}

export const RealWorldVisual: React.FC<RealWorldVisualProps> = ({ itemId, className = 'w-24 h-24' }) => {
  switch (itemId) {
    // 1. CUBE
    case 'dice':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="diceTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="diceLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="diceRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.2" />
            </filter>
          </defs>
          <g filter="url(#shadow)">
            {/* Top Face */}
            <polygon points="50,15 85,32 50,48 15,32" fill="url(#diceTop)" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Dots on Top Face (e.g., 3) */}
            <circle cx="50" cy="31.5" r="3.2" fill="#DC2626" />
            <circle cx="35" cy="24" r="2.6" fill="#1E293B" />
            <circle cx="65" cy="39" r="2.6" fill="#1E293B" />

            {/* Left Face */}
            <polygon points="15,32 50,48 50,85 15,68" fill="url(#diceLeft)" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Dots on Left Face (e.g., 2) */}
            <circle cx="32" cy="48" r="2.8" fill="#1E293B" />
            <circle cx="32" cy="68" r="2.8" fill="#1E293B" />

            {/* Right Face */}
            <polygon points="50,48 85,32 85,68 50,85" fill="url(#diceRight)" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Dots on Right Face (e.g., 4) */}
            <circle cx="62" cy="48" r="2.8" fill="#1E293B" />
            <circle cx="74" cy="42" r="2.8" fill="#1E293B" />
            <circle cx="62" cy="72" r="2.8" fill="#1E293B" />
            <circle cx="74" cy="64" r="2.8" fill="#1E293B" />
          </g>
        </svg>
      );

    case 'rubik':
    case 'rubik_cube':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <filter id="rubikShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#rubikShadow)">
            {/* Base cube frame */}
            {/* Top Face - Yellow & White tiles */}
            {/* Row 1 */}
            <polygon points="50,15 62,21 50,26 38,20" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="62,21 74,27 62,32 50,26" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="74,27 86,33 74,38 62,32" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
            {/* Row 2 */}
            <polygon points="38,20 50,26 38,32 26,26" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="50,26 62,32 50,37 38,32" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="62,32 74,38 62,43 50,37" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            {/* Row 3 */}
            <polygon points="26,26 38,32 26,38 14,32" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="38,32 50,37 38,43 26,38" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="50,37 62,43 50,49 38,43" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />

            {/* Left Face - Blue & Orange tiles */}
            <polygon points="14,32 26,38 26,50 14,44" fill="#3B82F6" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="26,38 38,43 38,56 26,50" fill="#EA580C" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="38,43 50,49 50,62 38,56" fill="#3B82F6" stroke="#0F172A" strokeWidth="1.5" />

            <polygon points="14,44 26,50 26,62 14,56" fill="#EA580C" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="26,50 38,56 38,68 26,62" fill="#3B82F6" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="38,56 50,62 50,74 38,68" fill="#EA580C" stroke="#0F172A" strokeWidth="1.5" />

            <polygon points="14,56 26,62 26,74 14,68" fill="#3B82F6" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="26,62 38,68 38,80 26,74" fill="#EA580C" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="38,68 50,74 50,86 38,80" fill="#3B82F6" stroke="#0F172A" strokeWidth="1.5" />

            {/* Right Face - Red & Green tiles */}
            <polygon points="50,49 62,43 62,56 50,62" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="62,43 74,38 74,50 62,56" fill="#22C55E" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="74,38 86,33 86,44 74,50" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />

            <polygon points="50,62 62,56 62,68 50,74" fill="#22C55E" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="62,56 74,50 74,62 62,68" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="74,50 86,44 86,56 74,62" fill="#22C55E" stroke="#0F172A" strokeWidth="1.5" />

            <polygon points="50,74 62,68 62,80 50,86" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="62,68 74,62 74,74 62,80" fill="#22C55E" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="74,62 86,56 86,68 74,74" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
          </g>
        </svg>
      );

    // 2. CUBOID
    case 'tissue_box':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="boxTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#7DD3FC" />
            </linearGradient>
            <linearGradient id="boxFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="boxSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>
          {/* Tissue Box */}
          {/* Top Face */}
          <polygon points="10,42 60,25 90,38 40,55" fill="url(#boxTop)" stroke="#0369A1" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Tissue opening slit */}
          <ellipse cx="50" cy="40" rx="16" ry="6" fill="#0369A1" opacity="0.6" />
          {/* Tissue paper sticking out */}
          <path d="M 42,40 Q 45,22 52,18 Q 60,26 56,38 Q 48,34 42,40 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M 48,36 Q 52,24 58,22 Q 62,30 54,39 Z" fill="#F8FAFC" opacity="0.9" />

          {/* Front Face (Long Rectangle) */}
          <polygon points="10,42 40,55 40,82 10,68" fill="url(#boxFront)" stroke="#0369A1" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Pattern on Front */}
          <circle cx="25" cy="62" r="5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="32" cy="70" r="3" fill="#FFFFFF" opacity="0.4" />
          <circle cx="18" cy="54" r="3" fill="#FFFFFF" opacity="0.4" />

          {/* Side Face (Rectangle) */}
          <polygon points="40,55 90,38 90,65 40,82" fill="url(#boxSide)" stroke="#0369A1" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 46,65 L 84,52" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2,2" opacity="0.4" />
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="bookPages" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
          </defs>
          {/* Top cover */}
          <polygon points="12,38 58,22 92,34 46,52" fill="url(#bookCover)" stroke="#7F1D1D" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Math emblem on book cover */}
          <ellipse cx="52" cy="37" rx="8" ry="4" fill="#FEF08A" />
          <text x="52" y="39" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#B91C1C">1+2=3</text>

          {/* Spine (Left cuboid thickness) */}
          <polygon points="12,38 46,52 46,68 12,54" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" strokeLinejoin="round" />

          {/* Pages (Bottom edge) */}
          <polygon points="46,52 92,34 92,48 46,66" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" strokeLinejoin="round" />
          {/* Page lines */}
          <line x1="48" y1="56" x2="90" y2="39" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="48" y1="60" x2="90" y2="43" stroke="#CBD5E1" strokeWidth="1" />

          {/* Bottom cover rim */}
          <polygon points="46,66 92,48 92,52 46,70" fill="url(#bookCover)" stroke="#7F1D1D" strokeWidth="1" />
          <polygon points="12,54 46,68 46,70 12,56" fill="#7F1D1D" />
        </svg>
      );

    // 3. SPHERE
    case 'football':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <radialGradient id="ballShade" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </radialGradient>
            <filter id="ballDrop">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#ballDrop)">
            {/* Sphere Body */}
            <circle cx="50" cy="50" r="38" fill="url(#ballShade)" stroke="#334155" strokeWidth="2" />
            {/* Center Pentagon */}
            <polygon points="50,38 60,46 56,58 44,58 40,46" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Surrounding Lines & Patches */}
            <line x1="50" y1="38" x2="50" y2="24" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="42,16 58,16 50,24" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

            <line x1="60" y1="46" x2="72" y2="42" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="72,42 84,36 86,48 76,54" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

            <line x1="56" y1="58" x2="66" y2="70" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="66,70 78,66 74,78 62,82" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

            <line x1="44" y1="58" x2="34" y2="70" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="34,70 38,82 26,78 22,66" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />

            <line x1="40" y1="46" x2="28" y2="42" stroke="#1E293B" strokeWidth="1.5" />
            <polygon points="28,42 24,54 14,48 16,36" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'globe':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <radialGradient id="oceanGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </radialGradient>
          </defs>
          {/* Globe Stand Base */}
          <ellipse cx="50" cy="88" rx="22" ry="5" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
          <path d="M 47,88 L 47,78 L 53,78 L 53,88 Z" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />

          {/* Semi-circular Arch */}
          <path d="M 50,14 A 36 36 0 0 0 50,78" fill="none" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />

          {/* Sphere (The Earth) */}
          <circle cx="50" cy="46" r="28" fill="url(#oceanGrad)" stroke="#0369A1" strokeWidth="1.5" />
          {/* Continents (Green) */}
          {/* Africa & Europe */}
          <path d="M 44,30 Q 52,28 54,34 Q 56,44 48,56 Q 42,50 44,40 Z" fill="#22C55E" opacity="0.95" />
          {/* Asia / Arabia */}
          <path d="M 56,32 Q 68,30 70,40 Q 64,48 58,42 Z" fill="#22C55E" opacity="0.95" />
          {/* Americas */}
          <path d="M 28,34 Q 36,36 34,44 Q 30,52 26,48 Z" fill="#22C55E" opacity="0.95" />
          {/* Axis Pin */}
          <line x1="50" y1="14" x2="50" y2="18" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="74" x2="50" y2="78" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // 4. CYLINDER
    case 'soda_can':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="canBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="35%" stopColor="#EF4444" />
              <stop offset="70%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="canRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
          {/* Bottom circular rim */}
          <ellipse cx="50" cy="78" rx="24" ry="7" fill="url(#canRim)" stroke="#64748B" strokeWidth="1" />

          {/* Curved Cylinder Body */}
          <path d="M 26,30 L 26,78 A 24 7 0 0 0 74,78 L 74,30 Z" fill="url(#canBody)" stroke="#991B1B" strokeWidth="1.5" />

          {/* White wave logo */}
          <path d="M 30,52 Q 45,62 55,48 Q 65,38 72,46" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          <path d="M 34,60 Q 48,68 58,56 Q 66,48 70,52" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

          {/* Top circular base / rim */}
          <ellipse cx="50" cy="30" rx="24" ry="7" fill="url(#canRim)" stroke="#64748B" strokeWidth="1.5" />
          {/* Inner lid */}
          <ellipse cx="50" cy="30" rx="19" ry="5.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          {/* Pull tab */}
          <rect x="47" y="27" width="6" height="5" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <circle cx="50" cy="29" r="1.5" fill="#E2E8F0" />
        </svg>
      );

    case 'drum':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="drumBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="40%" stopColor="#A78BFA" />
              <stop offset="80%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="drumSkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          {/* Bottom circular rim */}
          <ellipse cx="50" cy="74" rx="28" ry="8" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />

          {/* Cylindrical Drum Body */}
          <path d="M 22,34 L 22,74 A 28 8 0 0 0 78,74 L 78,34 Z" fill="url(#drumBody)" stroke="#6D28D9" strokeWidth="1.5" />

          {/* Drum Zigzag cords */}
          <polyline points="24,34 33,76 42,34 51,76 60,34 69,76 76,34" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinejoin="round" />

          {/* Top rim and circular skin face */}
          <ellipse cx="50" cy="34" rx="28" ry="8" fill="url(#drumSkin)" stroke="#D97706" strokeWidth="2" />
          <ellipse cx="50" cy="34" rx="24" ry="6.5" fill="#FEF9C3" stroke="#FBBF24" strokeWidth="1" />

          {/* Drumsticks */}
          <line x1="20" y1="16" x2="44" y2="30" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="44" cy="30" r="3" fill="#B45309" />
          <line x1="80" y1="16" x2="56" y2="30" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="56" cy="30" r="3" fill="#B45309" />
        </svg>
      );

    // 5. CONE
    case 'traffic_cone':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="coneOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="40%" stopColor="#F97316" />
              <stop offset="70%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="whiteBand" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <filter id="coneShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#coneShadow)">
            {/* Square Base (Perspective) */}
            <polygon points="18,80 50,72 82,80 50,88" fill="#1E293B" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="20,80 50,74 80,80 50,86" fill="#334155" />

            {/* Circular transition mound */}
            <ellipse cx="50" cy="80" rx="20" ry="5" fill="url(#coneOrange)" />

            {/* Orange Cone Body */}
            <path d="M 50,18 L 28,78 A 22 5 0 0 0 72,78 Z" fill="url(#coneOrange)" stroke="#C2410C" strokeWidth="1.5" />

            {/* Bottom White Reflective Band */}
            <path d="M 37,54 L 32,68 A 18 4 0 0 0 68,68 L 63,54 A 14 3.5 0 0 1 37,54 Z" fill="url(#whiteBand)" stroke="#94A3B8" strokeWidth="0.8" />

            {/* Top White Reflective Band */}
            <path d="M 43,36 L 39,48 A 12 3 0 0 0 61,48 L 57,36 A 8 2.5 0 0 1 43,36 Z" fill="url(#whiteBand)" stroke="#94A3B8" strokeWidth="0.8" />

            {/* Cone Apex point / rounded tip */}
            <ellipse cx="50" cy="18" rx="2.5" ry="1.5" fill="#FDBA74" stroke="#EA580C" strokeWidth="1" />
          </g>
        </svg>
      );

    case 'ice_cream':
    case 'ice_cream_cone':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="waffleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <radialGradient id="vanillaScoop" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="80%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </radialGradient>
            <radialGradient id="berryScoop" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="80%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </radialGradient>
          </defs>
          {/* The Conical Waffle Body (Tapering to pointed apex at bottom) */}
          <polygon points="30,52 70,52 50,92" fill="url(#waffleGrad)" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Waffle Crosshatch Pattern */}
          <line x1="36" y1="52" x2="56" y2="80" stroke="#78350F" strokeWidth="1" />
          <line x1="44" y1="52" x2="53" y2="86" stroke="#78350F" strokeWidth="1" />
          <line x1="52" y1="52" x2="47" y2="86" stroke="#78350F" strokeWidth="1" />
          <line x1="64" y1="52" x2="44" y2="80" stroke="#78350F" strokeWidth="1" />
          <line x1="56" y1="52" x2="38" y2="68" stroke="#78350F" strokeWidth="1" />
          <line x1="44" y1="52" x2="62" y2="68" stroke="#78350F" strokeWidth="1" />

          {/* Ice Cream Bottom Scoop (Vanilla) */}
          <circle cx="50" cy="46" r="18" fill="url(#vanillaScoop)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Ruffle on bottom scoop */}
          <ellipse cx="50" cy="52" rx="20" ry="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />

          {/* Top Scoop (Strawberry / Berry) */}
          <circle cx="50" cy="28" r="16" fill="url(#berryScoop)" stroke="#9D174D" strokeWidth="1.5" />
          {/* Cherry on top */}
          <circle cx="50" cy="14" r="5" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1" />
          <path d="M 50,14 Q 56,6 62,8" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 6. SQUARE PYRAMID
    case 'giza_pyramid':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="pyramidSun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="pyramidShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>
          {/* Desert ground */}
          <path d="M 5,82 Q 50,78 95,82 L 95,95 L 5,95 Z" fill="#FDE68A" />
          {/* Distant small pyramid */}
          <polygon points="22,78 28,62 38,78" fill="#F59E0B" />
          <polygon points="28,62 38,78 44,78" fill="#D97706" />

          {/* Main Great Pyramid (Apex at (50, 24)) */}
          {/* Sunlit Triangular Face */}
          <polygon points="50,24 15,80 50,82" fill="url(#pyramidSun)" stroke="#B45309" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Stone block tiered lines on sunlit face */}
          <line x1="43" y1="36" x2="50" y2="36" stroke="#D97706" strokeWidth="1" />
          <line x1="35" y1="48" x2="50" y2="48" stroke="#D97706" strokeWidth="1" />
          <line x1="27" y1="60" x2="50" y2="61" stroke="#D97706" strokeWidth="1" />
          <line x1="20" y1="72" x2="50" y2="73" stroke="#D97706" strokeWidth="1" />

          {/* Shadowed Triangular Face */}
          <polygon points="50,24 50,82 85,74" fill="url(#pyramidShadow)" stroke="#78350F" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Stone block tiered lines on shadow face */}
          <line x1="50" y1="36" x2="57" y2="34" stroke="#451A03" strokeWidth="1" />
          <line x1="50" y1="48" x2="65" y2="46" stroke="#451A03" strokeWidth="1" />
          <line x1="50" y1="61" x2="73" y2="58" stroke="#451A03" strokeWidth="1" />
          <line x1="50" y1="73" x2="80" y2="70" stroke="#451A03" strokeWidth="1" />

          {/* Golden Capstone at Apex */}
          <polygon points="50,24 46,31 50,32 54,30" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
        </svg>
      );

    case 'camping_tent':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="tentFront" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="tentSide" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>
          {/* Ground grass */}
          <path d="M 5,82 Q 50,80 95,82 L 95,95 L 5,95 Z" fill="#86EFAC" />

          {/* Side Triangular Slanted Canvas */}
          <polygon points="45,22 88,72 52,82" fill="url(#tentSide)" stroke="#0C4A6E" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Guy rope to peg */}
          <line x1="88" y1="72" x2="94" y2="82" stroke="#64748B" strokeWidth="1.5" />
          <line x1="45" y1="22" x2="8" y2="82" stroke="#64748B" strokeWidth="1.5" />

          {/* Front Triangular Face with Door flap */}
          <polygon points="45,22 14,78 52,82" fill="url(#tentFront)" stroke="#0C4A6E" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Open tent door interior */}
          <polygon points="45,34 30,79 50,82" fill="#0F172A" />
          {/* Orange Door Flap rolled back */}
          <polygon points="45,34 30,79 36,79" fill="#F97316" stroke="#C2410C" strokeWidth="1" />

          {/* Top Apex Flag */}
          <line x1="45" y1="22" x2="45" y2="14" stroke="#0F172A" strokeWidth="1.5" />
          <polygon points="45,14 55,17 45,20" fill="#EF4444" />
        </svg>
      );

    // 7. TRIANGULAR PRISM
    case 'toblerone':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="toblPack" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="toblSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>
          </defs>
          {/* Triangular Prism Box (Horizontal) */}
          {/* Triangular End Face (Front-Left) */}
          <polygon points="20,72 40,32 52,65" fill="url(#toblPack)" stroke="#854D0E" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Red Toblerone Logo on End Triangle */}
          <polygon points="36,44 44,44 40,36" fill="#DC2626" />
          <text x="36" y="60" fontSize="5" fontWeight="bold" fill="#DC2626" textAnchor="middle">TOBL</text>

          {/* Top Slanted Rectangular Face */}
          <polygon points="40,32 86,20 92,48 52,65" fill="url(#toblPack)" stroke="#854D0E" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Bold Brand Label on Long Rectangular Face */}
          <text x="68" y="44" fontSize="6.5" fontWeight="900" fill="#DC2626" transform="rotate(-15, 68, 44)" letterSpacing="1">
            TOBLERONE
          </text>
          {/* Chocolate Triangle Ridges printed */}
          <line x1="58" y1="36" x2="64" y2="58" stroke="#CA8A04" strokeWidth="1" strokeDasharray="1,2" />
          <line x1="72" y1="32" x2="78" y2="54" stroke="#CA8A04" strokeWidth="1" strokeDasharray="1,2" />

          {/* Bottom Slanted Rectangular Face */}
          <polygon points="20,72 52,65 92,48 64,82" fill="url(#toblSide)" stroke="#713F12" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );

    case 'roof':
    case 'pitched_roof':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="tileSlopes" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
            <linearGradient id="gableWall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>
          {/* Lower House Walls */}
          <polygon points="18,62 48,72 88,58 88,85 48,92 18,85" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.5" />
          {/* Door and windows on house body */}
          <rect x="28" y="72" width="10" height="15" fill="#0284C7" />
          <rect x="60" y="68" width="12" height="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />

          {/* Triangular Gable End (The Triangle Base of the Prism) */}
          <polygon points="18,62 33,26 48,72" fill="url(#gableWall)" stroke="#7C2D12" strokeWidth="2" strokeLinejoin="round" />
          {/* Attic round window in triangular gable */}
          <circle cx="33" cy="48" r="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="33" y1="42" x2="33" y2="54" stroke="#0284C7" strokeWidth="1" />
          <line x1="27" y1="48" x2="39" y2="48" stroke="#0284C7" strokeWidth="1" />

          {/* Rectangular Pitched Roof Slope (Long Face of the Prism) */}
          <polygon points="33,26 76,14 88,58 48,72" fill="url(#tileSlopes)" stroke="#7C2D12" strokeWidth="2" strokeLinejoin="round" />
          {/* Tile rows on roof */}
          <line x1="37" y1="38" x2="79" y2="26" stroke="#FED7AA" strokeWidth="1" />
          <line x1="41" y1="49" x2="82" y2="37" stroke="#FED7AA" strokeWidth="1" />
          <line x1="45" y1="60" x2="85" y2="48" stroke="#FED7AA" strokeWidth="1" />

          {/* Chimney */}
          <polygon points="62,18 68,16 68,28 62,30" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1" />
        </svg>
      );

    // 8. TRIANGULAR PYRAMID (Tetrahedron)
    case 'dice_d4':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="d4Front" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="d4Left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <linearGradient id="d4Right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <filter id="d4Shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#d4Shadow)">
            {/* The 3 visible triangular faces meeting at center-apex */}
            {/* Top-Front Triangle */}
            <polygon points="50,16 18,72 50,56" fill="url(#d4Left)" stroke="#9A3412" strokeWidth="1.5" strokeLinejoin="round" />
            <text x="36" y="44" fontSize="7" fontWeight="900" fill="#FFFFFF">4</text>
            <text x="28" y="66" fontSize="5" fontWeight="bold" fill="#FFFFFF">1</text>
            <text x="46" y="52" fontSize="5" fontWeight="bold" fill="#FFFFFF">2</text>

            {/* Right Triangle */}
            <polygon points="50,16 50,56 82,72" fill="url(#d4Right)" stroke="#9A3412" strokeWidth="1.5" strokeLinejoin="round" />
            <text x="64" y="44" fontSize="7" fontWeight="900" fill="#FFFFFF">4</text>
            <text x="72" y="66" fontSize="5" fontWeight="bold" fill="#FFFFFF">3</text>
            <text x="54" y="52" fontSize="5" fontWeight="bold" fill="#FFFFFF">2</text>

            {/* Bottom-Base Triangle */}
            <polygon points="18,72 50,56 82,72 50,86" fill="url(#d4Front)" stroke="#9A3412" strokeWidth="1.5" strokeLinejoin="round" />
            <text x="50" y="74" fontSize="7" fontWeight="900" fill="#FFFFFF" textAnchor="middle">2</text>
          </g>
        </svg>
      );

    case 'milk_pack':
    case 'tetra_pack':
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="tetraMilk1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="tetraMilk2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="tetraMilk3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
          </defs>
          {/* Classic Tetra-Classic Tetrahedral Drink Carton */}
          {/* Top Sealed Ridge */}
          <line x1="30" y1="20" x2="70" y2="20" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />

          {/* Left Triangular Panel */}
          <polygon points="30,20 70,20 18,78" fill="url(#tetraMilk1)" stroke="#0369A1" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Blue decorative cow/milk drop icon */}
          <circle cx="42" cy="40" r="6" fill="#38BDF8" />
          <path d="M 42,34 Q 46,38 42,44 Q 38,38 42,34 Z" fill="#FFFFFF" />

          {/* Right Triangular Panel */}
          <polygon points="70,20 82,78 18,78" fill="url(#tetraMilk2)" stroke="#0369A1" strokeWidth="1.5" strokeLinejoin="round" />
          <text x="56" y="58" fontSize="6.5" fontWeight="900" fill="#0369A1">MILK</text>

          {/* Bottom Ridge Seal (Perpendicular 90deg to top ridge) */}
          <line x1="18" y1="78" x2="82" y2="78" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />

          {/* Straw hole */}
          <circle cx="48" cy="28" r="2.5" fill="#EF4444" stroke="#991B1B" strokeWidth="0.8" />
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center text-4xl ${className}`}>
          ✨
        </div>
      );
  }
};
