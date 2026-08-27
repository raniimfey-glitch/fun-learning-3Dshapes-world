import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShapeId, Language } from '../types';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { useTranslation } from '../utils/i18n';
import {
  Play,
  RotateCcw,
  Volume2,
  Sparkles,
  Sliders,
  Eye,
  Info,
  Maximize2
} from 'lucide-react';

interface UnfoldingNetProps {
  shapeId: ShapeId;
  color?: string;
  lang?: Language;
}

export const UnfoldingNet: React.FC<UnfoldingNetProps> = ({
  shapeId,
  color = '#3B82F6',
  lang = 'ar'
}) => {
  const t = useTranslation(lang);
  const isAr = lang === 'ar';

  // 0 = 3D Solid Folded, 1 = 2D Flat Net
  const [unfoldProgress, setUnfoldProgress] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [orbitRotX, setOrbitRotX] = useState<number>(25);
  const [orbitRotY, setOrbitRotY] = useState<number>(-25);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: 25,
    rotY: -25
  });

  // Auto-play interval
  useEffect(() => {
    let animTimer: NodeJS.Timeout;
    if (isAutoPlaying) {
      animTimer = setInterval(() => {
        setUnfoldProgress(prev => {
          if (prev >= 1) return 0;
          return Number((prev + 0.05).toFixed(2));
        });
      }, 80);
    }
    return () => clearInterval(animTimer);
  }, [isAutoPlaying]);

  // Handle pointer drag for 3D viewing angle
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: orbitRotX,
      rotY: orbitRotY
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setOrbitRotY(dragStartRef.current.rotY + deltaX * 0.5);
    setOrbitRotX(Math.max(-60, Math.min(80, dragStartRef.current.rotX - deltaY * 0.5)));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const reset3DView = () => {
    soundEffects.playPop();
    setOrbitRotX(25);
    setOrbitRotY(-25);
  };

  const handleToggleFold = () => {
    soundEffects.playPop();
    setIsAutoPlaying(false);
    const next = unfoldProgress > 0.5 ? 0 : 1;
    setUnfoldProgress(next);

    if (next === 1) {
      appSpeech.speak(
        isAr ? 'فَرْدُ شَبَكَةِ المُجَسَّمِ إِلَى شَكْلٍ مُسْتَوٍ ثُنَائِيِّ الأَبْعَادِ!' : 'Unfolding the net into a 2D flat pattern!',
        lang
      );
    } else {
      appSpeech.speak(
        isAr ? 'طَيُّ الشَّبَكَةِ لِتَكْوِينِ مُجَسَّمٍ ثُلاثِيِّ الأَبْعَادِ مُغْلَقٍ!' : 'Folding the net into a closed 3D solid!',
        lang
      );
    }
  };

  // Helper strings
  const faceText = isAr ? 'وَجْهٌ' : 'Face';
  const baseText = isAr ? 'قَاعِدَةٌ' : 'Base';
  const topBaseText = isAr ? 'قَاعِدَةٌ عُلْيَا' : 'Top Base';
  const bottomBaseText = isAr ? 'قَاعِدَةٌ سُفْلَى' : 'Bottom Base';
  const sideFaceText = isAr ? 'وَجْهٌ جَانِبِيٌّ' : 'Side Face';

  // Fold angle factor: foldFactor = 1 (flat net, angle 0), foldFactor = 0 (folded solid, max angle)
  const foldAngle = (maxAngle: number) => maxAngle * (1 - unfoldProgress);

  /* -------------------------------------------------------------
     RENDER NET PER SHAPE
  ------------------------------------------------------------- */
  const renderShapeNet = () => {
    switch (shapeId) {
      /* ==================== CUBE ==================== */
      case 'cube': {
        const size = 68; // px
        const foldA = foldAngle(90);

        return (
          <div className="flex flex-col items-center justify-center select-none">
            <div
              className="relative flex items-center justify-center select-none"
              style={{
                width: size * 4,
                height: size * 3,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Center Base Face (Face 1) */}
              <div
                className="absolute rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: color,
                  left: size,
                  top: size
                }}
              >
                <span>{baseText}</span>
                <span className="text-[10px] opacity-90">1</span>
              </div>

              {/* Top Face (Face 2): hinges on center's top edge */}
              <div
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  left: size,
                  top: 0,
                  transformOrigin: 'bottom center',
                  transform: `rotateX(${-foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{faceText}</span>
                  <span className="text-[10px] opacity-90">2</span>
                </div>
              </div>

              {/* Bottom Face (Face 3): hinges on center's bottom edge */}
              <div
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  left: size,
                  top: size * 2,
                  transformOrigin: 'top center',
                  transform: `rotateX(${foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{faceText}</span>
                  <span className="text-[10px] opacity-90">3</span>
                </div>
              </div>

              {/* Left Face (Face 4): hinges on center's left edge */}
              <div
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  left: 0,
                  top: size,
                  transformOrigin: 'right center',
                  transform: `rotateY(${foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{faceText}</span>
                  <span className="text-[10px] opacity-90">4</span>
                </div>
              </div>

              {/* Right Face (Face 5): hinges on center's right edge */}
              <div
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  left: size * 2,
                  top: size,
                  transformOrigin: 'left center',
                  transform: `rotateY(${-foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{faceText}</span>
                  <span className="text-[10px] opacity-90">5</span>
                </div>

                {/* Far Right Top-Cap Face (Face 6): hinges on Face 5's right edge */}
                <div
                  className="absolute"
                  style={{
                    width: size,
                    height: size,
                    left: size,
                    top: 0,
                    transformOrigin: 'left center',
                    transform: `rotateY(${-foldA}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span>{faceText}</span>
                    <span className="text-[10px] opacity-90">6</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      /* ==================== CUBOID ==================== */
      case 'cuboid': {
        const w = 90; // width of base
        const h = 55; // depth of base
        const d = 50; // height of cuboid sides
        const foldA = foldAngle(90);

        return (
          <div className="flex flex-col items-center justify-center select-none">
            <div
              className="relative flex items-center justify-center select-none"
              style={{
                width: (w + d) * 2,
                height: h + d * 2,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Center Base (Bottom base w x h) */}
              <div
                className="absolute rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                style={{
                  width: w,
                  height: h,
                  backgroundColor: color,
                  left: d,
                  top: d
                }}
              >
                <span>{baseText}</span>
                <span className="text-[10px] opacity-90">{isAr ? 'قَاعِدَةٌ سُفْلَى (1)' : 'Bottom Base (1)'}</span>
              </div>

              {/* Top Side (w x d): hinges on center's top */}
              <div
                className="absolute"
                style={{
                  width: w,
                  height: d,
                  left: d,
                  top: 0,
                  transformOrigin: 'bottom center',
                  transform: `rotateX(${-foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{sideFaceText}</span>
                  <span className="text-[10px] opacity-90">2</span>
                </div>
              </div>

              {/* Bottom Side (w x d): hinges on center's bottom */}
              <div
                className="absolute"
                style={{
                  width: w,
                  height: d,
                  left: d,
                  top: d + h,
                  transformOrigin: 'top center',
                  transform: `rotateX(${foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{sideFaceText}</span>
                  <span className="text-[10px] opacity-90">3</span>
                </div>
              </div>

              {/* Left Side (d x h): hinges on center's left */}
              <div
                className="absolute"
                style={{
                  width: d,
                  height: h,
                  left: 0,
                  top: d,
                  transformOrigin: 'right center',
                  transform: `rotateY(${foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{sideFaceText}</span>
                  <span className="text-[10px] opacity-90">4</span>
                </div>
              </div>

              {/* Right Side (d x h): hinges on center's right */}
              <div
                className="absolute"
                style={{
                  width: d,
                  height: h,
                  left: d + w,
                  top: d,
                  transformOrigin: 'left center',
                  transform: `rotateY(${-foldA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{sideFaceText}</span>
                  <span className="text-[10px] opacity-90">5</span>
                </div>

                {/* Far Right Top Base (w x h): hinges on right side */}
                <div
                  className="absolute"
                  style={{
                    width: w,
                    height: h,
                    left: d,
                    top: 0,
                    transformOrigin: 'left center',
                    transform: `rotateY(${-foldA}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div
                    className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span>{topBaseText}</span>
                    <span className="text-[10px] opacity-90">{isAr ? 'قَاعِدَةٌ عُلْيَا (6)' : 'Top Base (6)'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      /* ==================== SQUARE PYRAMID (الهرم الرباعي) ==================== */
      case 'square_pyramid': {
        const baseSide = 92;
        const triHeight = 84;
        // Dihedral fold angle to close: 180 - acos(baseSide / (2 * triHeight))
        const maxFoldRad = (180 - Math.acos((baseSide / 2) / triHeight) * (180 / Math.PI)) * (Math.PI / 180);
        const theta = (1 - unfoldProgress) * maxFoldRad;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Vertices of Base Square
        const halfB = baseSide / 2;
        const v0 = { x: -halfB, y: -halfB, z: 0 }; // Top-Left
        const v1 = { x: halfB, y: -halfB, z: 0 };  // Top-Right
        const v2 = { x: halfB, y: halfB, z: 0 };   // Bottom-Right
        const v3 = { x: -halfB, y: halfB, z: 0 };  // Bottom-Left

        // Apexes of 4 Triangles
        const pTop = { x: 0, y: -halfB - triHeight * cosT, z: triHeight * sinT };
        const pBottom = { x: 0, y: halfB + triHeight * cosT, z: triHeight * sinT };
        const pLeft = { x: -halfB - triHeight * cosT, y: 0, z: triHeight * sinT };
        const pRight = { x: halfB + triHeight * cosT, y: 0, z: triHeight * sinT };

        // 3D Projection Helper
        const radX = (orbitRotX * Math.PI) / 180;
        const radY = (orbitRotY * Math.PI) / 180;
        const D = 600;
        const centerW = 190;
        const centerH = 175;

        const project = (pt: { x: number; y: number; z: number }) => {
          const x1 = pt.x * Math.cos(radY) + pt.z * Math.sin(radY);
          const z1 = -pt.x * Math.sin(radY) + pt.z * Math.cos(radY);
          const y1 = pt.y;

          const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
          const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);
          const x2 = x1;

          const scale = D / (D - z2);
          return {
            x: centerW + x2 * scale,
            y: centerH + y2 * scale,
            z: z2,
            orig: pt
          };
        };

        const faces = [
          {
            id: 'base',
            name: isAr ? 'قَاعِدَةٌ مُرَبَّعَةٌ 1' : 'Square Base 1',
            type: 'base',
            pts: [v0, v1, v2, v3].map(project),
            color: '#F59E0B',
            stroke: '#FFFFFF'
          },
          {
            id: 'top',
            name: isAr ? 'مُثَلَّثٌ 2' : 'Tri 2',
            type: 'side',
            pts: [v0, v1, pTop].map(project),
            color: '#EC4899',
            stroke: '#FFFFFF'
          },
          {
            id: 'right',
            name: isAr ? 'مُثَلَّثٌ 3' : 'Tri 3',
            type: 'side',
            pts: [v1, v2, pRight].map(project),
            color: '#3B82F6',
            stroke: '#FFFFFF'
          },
          {
            id: 'bottom',
            name: isAr ? 'مُثَلَّثٌ 4' : 'Tri 4',
            type: 'side',
            pts: [v2, v3, pBottom].map(project),
            color: '#10B981',
            stroke: '#FFFFFF'
          },
          {
            id: 'left',
            name: isAr ? 'مُثَلَّثٌ 5' : 'Tri 5',
            type: 'side',
            pts: [v3, v0, pLeft].map(project),
            color: '#8B5CF6',
            stroke: '#FFFFFF'
          }
        ];

        // Sort faces by average Z depth (painter's algorithm)
        faces.sort((a, b) => {
          const avgZA = a.pts.reduce((sum, p) => sum + p.z, 0) / a.pts.length;
          const avgZB = b.pts.reduce((sum, p) => sum + p.z, 0) / b.pts.length;
          return avgZA - avgZB;
        });

        return (
          <div className="relative flex flex-col items-center justify-center select-none">
            <svg
              width="380"
              height="350"
              viewBox="0 0 380 350"
              className="overflow-visible filter drop-shadow-xl"
            >
              {/* Internal Fold Hinge Lines (Dashed) */}
              {unfoldProgress > 0.05 && (
                <g stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="5 4" opacity={0.85}>
                  <line x1={project(v0).x} y1={project(v0).y} x2={project(v1).x} y2={project(v1).y} />
                  <line x1={project(v1).x} y1={project(v1).y} x2={project(v2).x} y2={project(v2).y} />
                  <line x1={project(v2).x} y1={project(v2).y} x2={project(v3).x} y2={project(v3).y} />
                  <line x1={project(v3).x} y1={project(v3).y} x2={project(v0).x} y2={project(v0).y} />
                </g>
              )}

              {/* Render Faces with 3D Depth */}
              {faces.map(face => {
                const pointsStr = face.pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
                const centroidX = face.pts.reduce((sum, p) => sum + p.x, 0) / face.pts.length;
                const centroidY = face.pts.reduce((sum, p) => sum + p.y, 0) / face.pts.length;

                return (
                  <g key={face.id}>
                    <polygon
                      points={pointsStr}
                      fill={face.color}
                      stroke={face.stroke}
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      opacity={0.94}
                    />
                    {/* Face Label Pill */}
                    <g transform={`translate(${centroidX}, ${centroidY})`}>
                      <rect
                        x="-38"
                        y="-11"
                        width="76"
                        height="22"
                        rx="11"
                        fill="rgba(0,0,0,0.45)"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="10"
                        fontWeight="900"
                        className="pointer-events-none select-none"
                      >
                        {face.name}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Vertices indicator dots */}
              {[v0, v1, v2, v3, pTop, pRight, pBottom, pLeft].map((v, i) => {
                const pv = project(v);
                return (
                  <circle
                    key={i}
                    cx={pv.x}
                    cy={pv.y}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#D97706"
                    strokeWidth="2"
                    className="filter drop-shadow-xs"
                  />
                );
              })}
            </svg>
          </div>
        );
      }

      /* ==================== TRIANGULAR PYRAMID / TETRAHEDRON (الهرم الثلاثي) ==================== */
      case 'triangular_pyramid': {
        const side = 104; // length of equilateral triangle edge
        const h = (side * Math.sqrt(3)) / 2; // ~90.06px

        // Dihedral folding angle of regular tetrahedron: 180 - acos(1/3) = ~109.4712 deg
        const maxFoldRad = (180 - Math.acos(1 / 3) * (180 / Math.PI)) * (Math.PI / 180);
        const theta = (1 - unfoldProgress) * maxFoldRad;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Center Base Equilateral Triangle T0 (at Z = 0)
        // Point A (Top vertex):
        const vA = { x: 0, y: -h * (2 / 3), z: 0 };
        // Point B (Bottom-Left vertex):
        const vB = { x: -side / 2, y: h * (1 / 3), z: 0 };
        // Point C (Bottom-Right vertex):
        const vC = { x: side / 2, y: h * (1 / 3), z: 0 };

        // Bottom Triangle T1 (hinges on horizontal edge vB-vC):
        // Flat (theta = 0): apex is at (0, h/3 + h, 0)
        // Folded: apex is at (0, h/3 + h*cosT, h*sinT)
        const p1 = {
          x: 0,
          y: h * (1 / 3) + h * cosT,
          z: h * sinT
        };

        // Left Triangle T2 (hinges on edge vA-vB):
        // Apex is p1 rotated by +120 deg around Z-axis
        const cos120 = -0.5;
        const sin120 = Math.sqrt(3) / 2;
        const p2 = {
          x: p1.x * cos120 - p1.y * sin120,
          y: p1.x * sin120 + p1.y * cos120,
          z: p1.z
        };

        // Right Triangle T3 (hinges on edge vA-vC):
        // Apex is p1 rotated by -120 deg around Z-axis
        const p3 = {
          x: p1.x * cos120 + p1.y * sin120,
          y: -p1.x * sin120 + p1.y * cos120,
          z: p1.z
        };

        // 3D Projection onto 2D Canvas
        const radX = (orbitRotX * Math.PI) / 180;
        const radY = (orbitRotY * Math.PI) / 180;
        const D = 600;
        const centerW = 190;
        const centerH = 175;

        const project = (pt: { x: number; y: number; z: number }) => {
          // 1. Yaw rotation around Y axis
          const x1 = pt.x * Math.cos(radY) + pt.z * Math.sin(radY);
          const z1 = -pt.x * Math.sin(radY) + pt.z * Math.cos(radY);
          const y1 = pt.y;

          // 2. Pitch rotation around X axis
          const y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
          const z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);
          const x2 = x1;

          // 3. Perspective projection
          const scale = D / (D - z2);
          return {
            x: centerW + x2 * scale,
            y: centerH + y2 * scale,
            z: z2,
            orig: pt
          };
        };

        // All 4 triangular faces
        const faces = [
          {
            id: 'base',
            name: isAr ? 'قَاعِدَةٌ مُثَلَّثَةٌ 1' : 'Tri Base 1',
            type: 'base',
            pts: [vA, vB, vC].map(project),
            color: '#F59E0B', // Warm Amber
            stroke: '#FFFFFF'
          },
          {
            id: 'bottom',
            name: isAr ? 'مُثَلَّثٌ 2' : 'Face 2',
            type: 'side',
            pts: [vB, vC, p1].map(project),
            color: '#EC4899', // Rose Pink
            stroke: '#FFFFFF'
          },
          {
            id: 'left',
            name: isAr ? 'مُثَلَّثٌ 3' : 'Face 3',
            type: 'side',
            pts: [vA, vB, p2].map(project),
            color: '#3B82F6', // Ocean Blue
            stroke: '#FFFFFF'
          },
          {
            id: 'right',
            name: isAr ? 'مُثَلَّثٌ 4' : 'Face 4',
            type: 'side',
            pts: [vA, vC, p3].map(project),
            color: '#10B981', // Emerald Green
            stroke: '#FFFFFF'
          }
        ];

        // Sort faces by average Z depth (painter's algorithm)
        faces.sort((a, b) => {
          const avgZA = a.pts.reduce((sum, p) => sum + p.z, 0) / a.pts.length;
          const avgZB = b.pts.reduce((sum, p) => sum + p.z, 0) / b.pts.length;
          return avgZA - avgZB;
        });

        return (
          <div className="relative flex flex-col items-center justify-center select-none">
            <svg
              width="380"
              height="350"
              viewBox="0 0 380 350"
              className="overflow-visible filter drop-shadow-xl"
            >
              {/* Internal Fold Hinge Lines (Dashed) */}
              {unfoldProgress > 0.05 && (
                <g stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="5 4" opacity={0.85}>
                  <line x1={project(vA).x} y1={project(vA).y} x2={project(vB).x} y2={project(vB).y} />
                  <line x1={project(vB).x} y1={project(vB).y} x2={project(vC).x} y2={project(vC).y} />
                  <line x1={project(vC).x} y1={project(vC).y} x2={project(vA).x} y2={project(vA).y} />
                </g>
              )}

              {/* Render 4 Faces with 3D Depth */}
              {faces.map(face => {
                const pointsStr = face.pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
                const centroidX = face.pts.reduce((sum, p) => sum + p.x, 0) / face.pts.length;
                const centroidY = face.pts.reduce((sum, p) => sum + p.y, 0) / face.pts.length;

                return (
                  <g key={face.id}>
                    <polygon
                      points={pointsStr}
                      fill={face.color}
                      stroke={face.stroke}
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      opacity={0.94}
                    />
                    {/* Face Label Pill */}
                    <g transform={`translate(${centroidX}, ${centroidY})`}>
                      <rect
                        x="-38"
                        y="-11"
                        width="76"
                        height="22"
                        rx="11"
                        fill="rgba(0,0,0,0.45)"
                        stroke="rgba(255,255,255,0.8)"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="10"
                        fontWeight="900"
                        className="pointer-events-none select-none"
                      >
                        {face.name}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Vertices indicator dots */}
              {[vA, vB, vC, p1, p2, p3].map((v, i) => {
                const pv = project(v);
                return (
                  <circle
                    key={i}
                    cx={pv.x}
                    cy={pv.y}
                    r="4.5"
                    fill="#FFFFFF"
                    stroke="#D97706"
                    strokeWidth="2"
                    className="filter drop-shadow-xs"
                  />
                );
              })}
            </svg>
          </div>
        );
      }

      /* ==================== TRIANGULAR PRISM ==================== */
      case 'triangular_prism': {
        const rectW = 76; // width of each rectangle
        const rectH = 100; // height of prism length
        const triH = Math.round((rectW * Math.sqrt(3)) / 2); // ~66px
        // In an equilateral triangular prism, interior angle is 60°, so exterior fold angle from flat is 180° - 60° = 120°!
        const foldSideA = foldAngle(120);
        const foldBaseA = foldAngle(90);

        return (
          <div className="flex flex-col items-center justify-center select-none">
            <div
              className="relative flex items-center justify-center select-none"
              style={{
                width: rectW * 3,
                height: rectH + triH * 2,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Center Rectangle Face (Face 1) */}
              <div
                className="absolute rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                style={{
                  width: rectW,
                  height: rectH,
                  backgroundColor: color,
                  left: rectW,
                  top: triH
                }}
              >
                <span>{faceText}</span>
                <span className="text-[10px] opacity-90">{isAr ? 'مُسْتَطِيلٌ أَوْسَطُ (1)' : 'Center Rect (1)'}</span>
              </div>

              {/* Top Triangle Base (Face 2): hinges on center's top */}
              <div
                className="absolute"
                style={{
                  width: rectW,
                  height: triH,
                  left: rectW,
                  top: 0,
                  transformOrigin: 'bottom center',
                  transform: `rotateX(${-foldBaseA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <svg width={rectW} height={triH} className="overflow-visible filter drop-shadow-md">
                  <polygon
                    points={`${rectW / 2},0 0,${triH} ${rectW},${triH}`}
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x={rectW / 2}
                    y={triH * 0.72}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {isAr ? 'قَاعِدَةٌ عُلْيَا (2)' : 'Top Base (2)'}
                  </text>
                </svg>
              </div>

              {/* Bottom Triangle Base (Face 3): hinges on center's bottom */}
              <div
                className="absolute"
                style={{
                  width: rectW,
                  height: triH,
                  left: rectW,
                  top: triH + rectH,
                  transformOrigin: 'top center',
                  transform: `rotateX(${foldBaseA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <svg width={rectW} height={triH} className="overflow-visible filter drop-shadow-md">
                  <polygon
                    points={`0,0 ${rectW},0 ${rectW / 2},${triH}`}
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <text
                    x={rectW / 2}
                    y={triH * 0.38}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {isAr ? 'قَاعِدَةٌ سُفْلَى (3)' : 'Bottom Base (3)'}
                  </text>
                </svg>
              </div>

              {/* Left Rectangle Face (Face 4): hinges on center's left */}
              <div
                className="absolute"
                style={{
                  width: rectW,
                  height: rectH,
                  left: 0,
                  top: triH,
                  transformOrigin: 'right center',
                  transform: `rotateY(${foldSideA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{faceText}</span>
                  <span className="text-[10px] opacity-90">{isAr ? 'مُسْتَطِيلٌ أَيْسَرُ (4)' : 'Left Rect (4)'}</span>
                </div>
              </div>

              {/* Right Rectangle Face (Face 5): hinges on center's right */}
              <div
                className="absolute"
                style={{
                  width: rectW,
                  height: rectH,
                  left: rectW * 2,
                  top: triH,
                  transformOrigin: 'left center',
                  transform: `rotateY(${-foldSideA}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className="w-full h-full rounded-xl border-2 border-white/90 shadow-md flex flex-col items-center justify-center text-white font-black text-xs"
                  style={{ backgroundColor: color }}
                >
                  <span>{faceText}</span>
                  <span className="text-[10px] opacity-90">{isAr ? 'مُسْتَطِيلٌ أَيْمَنُ (5)' : 'Right Rect (5)'}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      /* ==================== CYLINDER ==================== */
      case 'cylinder': {
        const radius = 34; // px
        const cylinderHeight = 84; // px
        const perimeter = Math.round(2 * Math.PI * radius); // ~214px
        const segmentCount = 12;
        const segW = perimeter / segmentCount;

        return (
          <div className="flex flex-col items-center justify-center select-none">
            <div
              className="relative flex flex-col items-center justify-center select-none"
              style={{
                width: perimeter + 40,
                height: cylinderHeight + radius * 4,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Top Circular Base */}
              <motion.div
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  transformOrigin: 'bottom center',
                  transform: `translateY(${unfoldProgress === 1 ? -15 : 10}px) rotateX(${-foldAngle(90)}deg)`,
                  backgroundColor: color
                }}
                className="rounded-full border-2 border-white shadow-md flex flex-col items-center justify-center text-white font-black text-xs z-20"
              >
                <span>{topBaseText}</span>
                <span className="text-[9px] opacity-90">⭕ (1)</span>
              </motion.div>

              {/* Rolled / Segmented Lateral Surface */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: cylinderHeight,
                  transformStyle: 'preserve-3d'
                }}
              >
                {Array.from({ length: segmentCount }).map((_, i) => {
                  // Curved rolling transform
                  const progressCurvature = (1 - unfoldProgress);
                  const angle = (i - segmentCount / 2) * (360 / segmentCount) * progressCurvature;
                  const rad = angle * (Math.PI / 180);
                  const zOffset = progressCurvature * radius * Math.cos(rad);
                  const xOffset = unfoldProgress === 1
                    ? (i - segmentCount / 2) * segW
                    : progressCurvature * radius * Math.sin(rad);

                  return (
                    <div
                      key={i}
                      className="absolute border-y-2 border-white/80 flex items-center justify-center text-[10px] text-white/90 font-bold"
                      style={{
                        width: segW + 1,
                        height: cylinderHeight,
                        backgroundColor: color,
                        transform: `translateX(${xOffset}px) translateZ(${zOffset}px) rotateY(${angle}deg)`,
                        transformStyle: 'preserve-3d',
                        opacity: 0.95
                      }}
                    >
                      {i === Math.floor(segmentCount / 2) && (
                        <span className="whitespace-nowrap px-2 py-0.5 bg-black/40 rounded-full text-[10px]">
                          {isAr ? 'سَطْحٌ جَانِبِيٌّ مُسْتَطِيلٌ (2)' : 'Lateral Rectangle (2)'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Circular Base */}
              <motion.div
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  transformOrigin: 'top center',
                  transform: `translateY(${unfoldProgress === 1 ? 15 : -10}px) rotateX(${foldAngle(90)}deg)`,
                  backgroundColor: color
                }}
                className="rounded-full border-2 border-white shadow-md flex flex-col items-center justify-center text-white font-black text-xs z-20"
              >
                <span>{bottomBaseText}</span>
                <span className="text-[9px] opacity-90">⭕ (3)</span>
              </motion.div>
            </div>
          </div>
        );
      }

      /* ==================== CONE ==================== */
      case 'cone': {
        const radius = 32; // base circle
        const slantHeight = 90;
        const foldProgressInv = 1 - unfoldProgress;

        return (
          <div className="flex flex-col items-center justify-center select-none">
            <div
              className="relative flex flex-col items-center justify-center select-none"
              style={{
                width: slantHeight * 2,
                height: slantHeight + radius * 3,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Sector / Fan Lateral Surface */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: slantHeight * 2,
                  height: slantHeight,
                  transformStyle: 'preserve-3d'
                }}
              >
                <svg
                  width={slantHeight * 2}
                  height={slantHeight + 20}
                  className="overflow-visible filter drop-shadow-md"
                  style={{
                    transform: `scale(${1 - foldProgressInv * 0.25}, ${1 + foldProgressInv * 0.1}) rotateX(${foldProgressInv * 30}deg)`,
                    transformOrigin: 'top center'
                  }}
                >
                  {/* Visual fan sector unfolding to flat pie */}
                  <path
                    d={
                      unfoldProgress > 0.5
                        ? `M ${slantHeight} 10 L ${slantHeight - 80} ${slantHeight} A ${slantHeight} ${slantHeight} 0 0 0 ${slantHeight + 80} ${slantHeight} Z`
                        : `M ${slantHeight} 10 L ${slantHeight - 40} ${slantHeight + 10} L ${slantHeight + 40} ${slantHeight + 10} Z`
                    }
                    fill={color}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <text
                    x={slantHeight}
                    y={slantHeight * 0.65}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {isAr ? 'سَطْحٌ قِطَاعِيٌّ (1)' : 'Sector Surface (1)'}
                  </text>
                </svg>
              </div>

              {/* Circular Base */}
              <motion.div
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  transformOrigin: 'top center',
                  transform: `translateY(${unfoldProgress === 1 ? 15 : -10}px) rotateX(${foldAngle(90)}deg)`,
                  backgroundColor: color
                }}
                className="rounded-full border-2 border-white shadow-md flex flex-col items-center justify-center text-white font-black text-xs z-20"
              >
                <span>{baseText} ⭕ (2)</span>
              </motion.div>
            </div>
          </div>
        );
      }

      /* ==================== SPHERE (EDUCATIONAL GORES) ==================== */
      case 'sphere': {
        const goreCount = 8;
        const goreWidth = 24;
        const goreHeight = 96;

        return (
          <div className="flex flex-col items-center justify-center select-none">
            <div
              className="relative flex flex-col items-center justify-center select-none"
              style={{
                width: goreCount * goreWidth + 40,
                height: goreHeight + 40,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* 2D Gores (Cartographic Peel) into Sphere */}
              <div
                className="flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {Array.from({ length: goreCount }).map((_, i) => {
                  const angle = (i / goreCount) * 360;
                  const foldFactor = 1 - unfoldProgress;
                  const rad = angle * (Math.PI / 180);
                  const x = unfoldProgress === 1
                    ? (i - goreCount / 2 + 0.5) * (goreWidth + 2)
                    : foldFactor * 32 * Math.sin(rad);
                  const z = foldFactor * 32 * Math.cos(rad);

                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${foldFactor * angle}deg)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <svg width={goreWidth} height={goreHeight} className="overflow-visible filter drop-shadow-xs">
                        <path
                          d={`M ${goreWidth / 2} 0 C ${goreWidth * 1.2} ${goreHeight * 0.3} ${goreWidth * 1.2} ${goreHeight * 0.7} ${goreWidth / 2} ${goreHeight} C ${-goreWidth * 0.2} ${goreHeight * 0.7} ${-goreWidth * 0.2} ${goreHeight * 0.3} ${goreWidth / 2} 0 Z`}
                          fill={color}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          opacity={0.92}
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 border-2 border-amber-200/90 shadow-lg flex flex-col items-center gap-4">
      {/* Top Banner Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-amber-100">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-tight">
              {t.net.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
              {t.net.subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEffects.playPop();
            const msg = isAr
              ? 'شَبَكَةُ المُجَسَّمِ هِيَ الشَّكْلُ المُسْتَوِي ثُنَائِيُّ الأَبْعَادِ الَّذِي نَحْصُلُ عَلَيْهِ عِنْدَ قَصِّ وَفَرْدِ أَوْجُهِ المُجَسَّمِ، وَعِنْدَ طَيِّهَا تُغْلَقُ لِتُشَكِّلَ المُجَسَّمَ!'
              : 'A geometric net is the 2D flat pattern you get when you unfold all faces of a 3D solid!';
            appSpeech.speak(msg, lang);
          }}
          className="px-3.5 py-2 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
        >
          <Volume2 className="w-4 h-4 text-amber-700" />
          <span>{isAr ? 'مَا هِيَ الشَّبَكَةُ؟ 🔊' : 'What is a Net? 🔊'}</span>
        </button>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full min-h-[300px] sm:min-h-[340px] bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-amber-100/50 rounded-3xl border-2 border-dashed border-amber-300 flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing p-4 shadow-inner"
        style={{
          perspective: 1200
        }}
      >
        {/* Floating Hint Overlay */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-xs pointer-events-none z-30">
          <Eye className="w-3.5 h-3.5 text-amber-600" />
          <span>{isAr ? 'اسْحَبْ بِالفَأْرَةِ لِتَدْوِيرِ زَاوِيَةِ الرُّؤْيَةِ 3D' : 'Drag to rotate 3D view'}</span>
        </div>

        {/* Reset 3D Angle Button */}
        <button
          onClick={reset3DView}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-slate-700 p-2 rounded-xl border border-amber-200 shadow-xs transition-all active:scale-95 text-xs font-bold flex items-center gap-1 z-30"
          title={isAr ? 'إِعَادَةُ زَاوِيَةِ الرُّؤْيَةِ' : 'Reset View'}
        >
          <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
          <span className="hidden sm:inline">{isAr ? 'إِعَادَةُ الزَّاوِيَةِ' : 'Reset Angle'}</span>
        </button>

        {/* Rotated 3D Stage */}
        <div
          style={{
            transform: `rotateX(${orbitRotX}deg) rotateY(${orbitRotY}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
          className="flex items-center justify-center"
        >
          {renderShapeNet()}
        </div>
      </div>

      {/* Continuous Slider & Quick Controls */}
      <div className="w-full bg-amber-50/90 rounded-2xl p-4 sm:p-5 border border-amber-200 flex flex-col gap-3.5">
        {/* State Label and Slider */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-sm font-black text-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>{isAr ? 'شَرِيطُ التَّحَكُّمِ فِي الفَرْدِ وَالطَّيِّ:' : 'Fold / Unfold Slider:'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${unfoldProgress === 1 ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' : unfoldProgress === 0 ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
              {unfoldProgress === 1
                ? (isAr ? 'شَبَكَةٌ مُنْبَسِطَةٌ 100% (2D)' : '100% Flat Net (2D)')
                : unfoldProgress === 0
                ? (isAr ? 'مُجَسَّمٌ مُغْلَقٌ تَامًّا (3D)' : 'Fully Folded Solid (3D)')
                : (isAr ? `نِسْبَةُ الفَرْدِ: ${Math.round(unfoldProgress * 100)}%` : `Unfolding: ${Math.round(unfoldProgress * 100)}%`)}
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs font-black text-slate-600 shrink-0">
            {isAr ? 'مُجَسَّمٌ 3D 🎲' : '3D Solid 🎲'}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={unfoldProgress}
            onChange={e => {
              setIsAutoPlaying(false);
              setUnfoldProgress(parseFloat(e.target.value));
            }}
            className="flex-1 h-3 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-xs font-black text-slate-600 shrink-0">
            {isAr ? 'شَبَكَةٌ 2D 📐' : '2D Net 📐'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={handleToggleFold}
            className="px-5 sm:px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 active:scale-95"
          >
            {unfoldProgress > 0.5 ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>{isAr ? 'طَيُّ المُجَسَّمِ 3D 📦' : 'Fold into 3D Solid 📦'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{isAr ? 'فَرْدُ الشَّبَكَةِ 2D 📐' : 'Unfold into 2D Net 📐'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundEffects.playPop();
              setIsAutoPlaying(!isAutoPlaying);
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center gap-2 active:scale-95 ${
              isAutoPlaying
                ? 'bg-rose-500 text-white border-rose-600 shadow-md animate-pulse'
                : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-200'
            }`}
          >
            <Play className={`w-4 h-4 ${isAutoPlaying ? 'fill-current' : ''}`} />
            <span>
              {isAutoPlaying
                ? (isAr ? 'إِيقَافُ التَّحْرِيكِ التِّلْقَائِيِّ ⏸️' : 'Pause Auto-Loop ⏸️')
                : (isAr ? 'تَشْغِيلُ التَّحْرِيكِ التِّلْقَائِيِّ ▶️' : 'Auto Playback ▶️')}
            </span>
          </button>
        </div>
      </div>

      {/* Pedagogical Shape Tip */}
      <div className="w-full p-3.5 sm:p-4 bg-indigo-50/80 rounded-2xl border border-indigo-100 flex items-start gap-2.5 text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-black text-indigo-900">
            {isAr ? 'مَعْلُومَةٌ هَنْدَسِيَّةٌ لِلأَبْطَالِ: ' : 'Geometry Insight: '}
          </span>
          {isAr ? (
            shapeId === 'cube'
              ? 'يَتَكَوَّنُ نَشْرُ المُكَعَّبِ مِنْ 6 مُرَبَّعَاتٍ مُتَطَابِقَةٍ تَمَامًا، تَلْتَقِي عِنْدَ طَيِّهَا لِتُكَوِّنَ 8 رُؤُوسٍ وَ12 حَرْفًا.'
              : shapeId === 'cuboid'
              ? 'يَتَكَوَّنُ نَشْرُ مُتَوَازِي المُسْتَطِيلاتِ مِنْ 6 أَوْجُهٍ مُسْتَطِيلَةٍ (كُلُّ وَجْهَيْنِ مُتَقَابِلَيْنِ مُتَطَابِقَانِ).'
              : shapeId === 'square_pyramid'
              ? 'يَتَكَوَّنُ نَشْرُ الهَرَمِ الرُّبَاعِيِّ مِنْ قَاعِدَةٍ مُرَبَّعَةٍ وَ4 مُثَلَّثَاتٍ جَانِبِيَّةٍ تَلْتَقِي رُؤُوسُهَا عِنْدَ قِمَّةِ الهَرَمِ (الأَيْبِكْس).'
              : shapeId === 'triangular_pyramid'
              ? 'يَتَكَوَّنُ نَشْرُ الهَرَمِ الثُّلاثِيِّ (رُبَاعِيِّ السُّطُوحِ) مِنْ 4 مُثَلَّثَاتٍ مُتَطَابِقَةٍ (قَاعِدَةٌ مُثَلَّثَةٌ وَ3 أَوْجُهٍ مُثَلَّثَةٍ جَانِبِيَّةٍ) تَلْتَقِي لِتُشَكِّلَ هَرَمًا بِـ 4 رُؤُوسٍ وَ6 أَحْرُفٍ.'
              : shapeId === 'triangular_prism'
              ? 'يَتَكَوَّنُ نَشْرُ المَوْشُورِ الثُّلاثِيِّ مِنْ قَاعِدَتَيْنِ مُثَلَّثَتَيْنِ وَ3 أَوْجُهٍ جَانِبِيَّةٍ مُسْتَطِيلَةٍ.'
              : shapeId === 'cylinder'
              ? 'يَتَكَوَّنُ نَشْرُ الأُسْطُوَانَةِ مِنْ سَطْحٍ مُسْتَطِيلٍ يُلَفُّ لِيُشَكِّلَ السَّطْحَ المُنْحَنِي، وَقَاعِدَتَيْنِ دَائِرِيَّتَيْنِ عُلْيَا وَسُفْلَى.'
              : shapeId === 'cone'
              ? 'يَتَكَوَّنُ نَشْرُ المَخْرُوطِ مِنْ قِطَاعٍ دَائِرِيٍّ (يُلَفُّ لِيُكَوِّنَ السَّطْحَ الجَانِبِيَّ) وَقَاعِدَةٍ دَائِرِيَّةٍ وَاحِدَةٍ.'
              : 'الكُرَةُ هِيَ مُجَسَّمٌ مُنْحَنٍ مُتَمَاثِلٌ تَمَامًا لَيْسَ لَهُ نَشْرٌ مُسْتَوٍ بَسِيطٌ، وَلَكِنْ يُمْكِنُ تَمْثِيلُ سَطْحِهَا بِقِطَاعَاتٍ كُرَوِيَّةٍ مِثْلَ قِشْرَةِ البُرْتُقَالِ.'
          ) : (
            shapeId === 'cube'
              ? 'A cube net consists of 6 congruent squares that fold up into 8 vertices and 12 equal edges.'
              : shapeId === 'cuboid'
              ? 'A rectangular prism net consists of 6 rectangular faces (opposite faces are equal in area).'
              : shapeId === 'square_pyramid'
              ? 'A square pyramid net has 1 square base surrounded by 4 triangles that meet together at the top apex.'
              : shapeId === 'triangular_pyramid'
              ? 'A triangular pyramid (tetrahedron) net consists of 4 congruent triangles (1 base + 3 sides) that meet into 4 vertices and 6 edges.'
              : shapeId === 'triangular_prism'
              ? 'A triangular prism net consists of 2 triangular bases and 3 rectangular lateral faces.'
              : shapeId === 'cylinder'
              ? 'A cylinder net consists of a rolled rectangular lateral sheet and 2 congruent circular flat bases.'
              : shapeId === 'cone'
              ? 'A cone net consists of 1 circular sector and 1 circular base.'
              : 'A sphere has a continuous curved surface with no flat polygonal net, represented cartographically by sinusoidal gores.'
          )}
        </div>
      </div>
    </div>
  );
};
