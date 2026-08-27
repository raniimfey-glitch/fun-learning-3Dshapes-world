import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ShapeId, Language } from '../types';
import { SHAPES_DATA } from '../data/shapes';
import { soundEffects } from '../utils/audio';
import { appSpeech } from '../utils/speech';
import { RotateCw, Eye, Sparkles, CheckCircle2, RefreshCw, Palette } from 'lucide-react';

interface ThreeDViewerProps {
  shapeId: ShapeId;
  color?: string;
  activeMode?: 'explore' | 'faces' | 'vertices' | 'edges' | 'paint' | 'unfold';
  onCountVertex?: (count: number) => void;
  onCountFace?: (count: number) => void;
  onCountEdge?: (count: number) => void;
  interactive?: boolean;
  heightClass?: string;
  lang?: Language;
}

// Helper to determine the logical face index of a geometric solid triangle
function getTriangleFaceId(shapeId: ShapeId, normal: THREE.Vector3, center: THREE.Vector3): number {

  switch (shapeId) {
    case 'cube':
    case 'cuboid': {
      const absX = Math.abs(normal.x);
      const absY = Math.abs(normal.y);
      const absZ = Math.abs(normal.z);
      if (absX >= absY && absX >= absZ) {
        return normal.x > 0 ? 0 : 1;
      } else if (absY >= absX && absY >= absZ) {
        return normal.y > 0 ? 2 : 3;
      } else {
        return normal.z > 0 ? 4 : 5;
      }
    }
    case 'cylinder': {
      if (normal.y > 0.6 || center.y >= 0.85) return 0; // Top circle
      if (normal.y < -0.6 || center.y <= -0.85) return 1; // Bottom circle
      return -1; // Curved lateral surface
    }
    case 'cone': {
      if (normal.y < -0.4 || center.y <= -0.95) return 0; // Base circle
      return -1; // Curved lateral surface
    }
    case 'sphere': {
      return -1; // All curved
    }
    case 'square_pyramid': {
      if (normal.y < -0.4 || center.y <= -0.9) return 0; // Base square
      if (Math.abs(normal.x) > Math.abs(normal.z)) {
        return normal.x > 0 ? 1 : 2;
      } else {
        return normal.z > 0 ? 3 : 4;
      }
    }
    case 'triangular_prism': {
      if (normal.y > 0.6 || center.y >= 0.85) return 0; // Top triangle
      if (normal.y < -0.6 || center.y <= -0.85) return 1; // Bottom triangle
      const angle = Math.atan2(normal.z, normal.x);
      if (angle >= -Math.PI / 6 && angle < Math.PI / 2) {
        return 2;
      } else if (angle >= Math.PI / 2 || angle < -5 * Math.PI / 6) {
        return 3;
      } else {
        return 4;
      }
    }
    case 'triangular_pyramid': {
      // 4 triangular faces
      if (normal.y < -0.5 || center.y <= -0.5) return 0; // Base triangular face
      const angle = Math.atan2(normal.z, normal.x);
      if (angle >= -Math.PI / 3 && angle < Math.PI / 3) {
        return 1;
      } else if (angle >= Math.PI / 3 && angle < Math.PI) {
        return 2;
      } else {
        return 3;
      }
    }
    default:
      return 0;
  }
}

function getFaceDescription(shapeId: ShapeId, faceId: number): string {
  switch (shapeId) {
    case 'cube':
    case 'cuboid': {
      const names = [
        'الوَجْهُ الأَيْمَنُ',
        'الوَجْهُ الأَيْسَرُ',
        'الوَجْهُ العُلْوِيُّ (القَاعِدَةُ العُلْيَا)',
        'الوَجْهُ السُّفْلِيُّ (القَاعِدَةُ السُّفْلَى)',
        'الوَجْهُ الأَمَامِيُّ',
        'الوَجْهُ الخَلْفِيُّ'
      ];
      return names[faceId] || `وَجْهٌ مُسْتَوٍ (${faceId + 1})`;
    }
    case 'cylinder': {
      return faceId === 0
        ? 'القَاعِدَةُ الدَّائِرِيَّةُ العُلْيَا (وَجْهٌ 1)'
        : 'القَاعِدَةُ الدَّائِرِيَّةُ السُّفْلَى (وَجْهٌ 2)';
    }
    case 'cone': {
      return 'القَاعِدَةُ الدَّائِرِيَّةُ المُسْتَوِيَةُ (الوَجْهُ الوَحِيدُ لِلْمَخْرُوطِ)';
    }
    case 'square_pyramid': {
      if (faceId === 0) return 'القَاعِدَةُ المُرَبَّعَةُ المُسْتَوِيَةُ (1)';
      return `وَجْهٌ مُثَلَّثٌ جَانِبِيٌّ (${faceId + 1})`;
    }
    case 'triangular_prism': {
      if (faceId === 0) return 'القَاعِدَةُ المُثَلَّثَةُ العُلْيَا (1)';
      if (faceId === 1) return 'القَاعِدَةُ المُثَلَّثَةُ السُّفْلَى (2)';
      return `وَجْهٌ مُسْتَطِيلٌ جَانِبِيٌّ (${faceId + 1})`;
    }
    case 'triangular_pyramid': {
      if (faceId === 0) return 'القَاعِدَةُ المُثَلَّثَةُ السُّفْلَى (1)';
      return `وَجْهٌ مُثَلَّثٌ جَانِبِيٌّ (${faceId + 1})`;
    }
    default:
      return `وَجْهٌ مُسْتَوٍ (${faceId + 1})`;
  }
}

function getCurvedSurfaceHint(shapeId: ShapeId): string {
  if (shapeId === 'cone') {
    return 'هَذَا سَطْحٌ مَخْرُوطِيٌّ مُنْحَنٍ! لِلْمَخْرُوطِ وَجْهٌ مُسْتَوٍ وَاحِدٌ فَقَطْ وَهُوَ القَاعِدَةُ الدَّائِرِيَّةُ.';
  }
  if (shapeId === 'cylinder') {
    return 'هَذَا سَطْحٌ جَانِبِيٌّ مُنْحَنٍ! لِلأُسْطُوَانَةِ وَجْهَانِ مُسْتَوِيَانِ فَقَطْ (القَاعِدَةُ العُلْيَا وَالسُّفْلَى).';
  }
  return 'الكُرَةُ سَطْحٌ مُنْحَنٍ مُغْلَقٌ بِالكَامِلِ، لَيْسَ لَهَا أَوْجُهٌ مُسْتَوِيَةٌ (0 أَوْجُهٍ).';
}

function createNumberBadgeTexture(number: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);

    // Circle background with crisp border and inner ring
    ctx.beginPath();
    ctx.arc(128, 128, 104, 0, Math.PI * 2);
    ctx.fillStyle = '#059669'; // High contrast vibrant emerald
    ctx.fill();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(128, 128, 88, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.stroke();

    // Number text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 115px "Segoe UI", system-ui, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(number), 128, 133);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ThreeDViewer: React.FC<ThreeDViewerProps> = ({
  shapeId,
  color = '#3B82F6',
  activeMode = 'explore',
  onCountVertex,
  onCountFace,
  onCountEdge,
  interactive = true,
  heightClass = 'h-72 sm:h-96',
  lang = 'ar'
}) => {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mainMeshRef = useRef<THREE.Mesh | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number>(0);

  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [countedVertices, setCountedVertices] = useState<number[]>([]);
  const [countedFaces, setCountedFaces] = useState<number[]>([]);
  const [countedEdges, setCountedEdges] = useState<number[]>([]);
  const [activeColor, setActiveColor] = useState<string>('#EC4899');
  const [feedbackHint, setFeedbackHint] = useState<string | null>(null);

  const shapeData = SHAPES_DATA.find(s => s.id === shapeId) || SHAPES_DATA[0];
  const maxFaces = shapeData.facesCount;
  const maxVertices = shapeData.verticesCount;
  const maxEdges = shapeData.edgesCount;

  // Auto clear hint
  useEffect(() => {
    if (!feedbackHint) return;
    const timer = setTimeout(() => {
      setFeedbackHint(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [feedbackHint]);

  const verticesMarkersRef = useRef<THREE.Mesh[]>([]);
  const edgesMeshesRef = useRef<THREE.Mesh[]>([]);
  const edgePairsRef = useRef<[THREE.Vector3, THREE.Vector3][]>([]);
  const vertexPositionsRef = useRef<THREE.Vector3[]>([]);
  const triangleFaceIdsRef = useRef<Int32Array>(new Int32Array(0));
  const faceCentroidsRef = useRef<{ [id: number]: THREE.Vector3 }>({});
  const faceNormalsRef = useRef<{ [id: number]: THREE.Vector3 }>({});
  const faceBadgesGroupRef = useRef<THREE.Group | null>(null);

  // Create geometry based on shapeId
  const getGeometryAndDetails = useCallback((id: ShapeId, baseShapeColor: string) => {
    let geom: THREE.BufferGeometry;
    const vertexPositions: THREE.Vector3[] = [];
    const edgePairs: [THREE.Vector3, THREE.Vector3][] = [];

    switch (id) {
      case 'cube': {
        const s = 1.8;
        geom = new THREE.BoxGeometry(s, s, s);
        const half = s / 2;
        // 8 vertices
        for (let x of [-half, half]) {
          for (let y of [-half, half]) {
            for (let z of [-half, half]) {
              vertexPositions.push(new THREE.Vector3(x, y, z));
            }
          }
        }
        // 12 edges
        edgePairs.push(
          // bottom square
          [new THREE.Vector3(-half, -half, -half), new THREE.Vector3(half, -half, -half)],
          [new THREE.Vector3(half, -half, -half), new THREE.Vector3(half, -half, half)],
          [new THREE.Vector3(half, -half, half), new THREE.Vector3(-half, -half, half)],
          [new THREE.Vector3(-half, -half, half), new THREE.Vector3(-half, -half, -half)],
          // top square
          [new THREE.Vector3(-half, half, -half), new THREE.Vector3(half, half, -half)],
          [new THREE.Vector3(half, half, -half), new THREE.Vector3(half, half, half)],
          [new THREE.Vector3(half, half, half), new THREE.Vector3(-half, half, half)],
          [new THREE.Vector3(-half, half, half), new THREE.Vector3(-half, half, -half)],
          // 4 vertical edges
          [new THREE.Vector3(-half, -half, -half), new THREE.Vector3(-half, half, -half)],
          [new THREE.Vector3(half, -half, -half), new THREE.Vector3(half, half, -half)],
          [new THREE.Vector3(half, -half, half), new THREE.Vector3(half, half, half)],
          [new THREE.Vector3(-half, -half, half), new THREE.Vector3(-half, half, half)]
        );
        break;
      }
      case 'cuboid': {
        const w = 2.4, h = 1.4, d = 1.6;
        geom = new THREE.BoxGeometry(w, h, d);
        const hw = w / 2, hh = h / 2, hd = d / 2;
        for (let x of [-hw, hw]) {
          for (let y of [-hh, hh]) {
            for (let z of [-hd, hd]) {
              vertexPositions.push(new THREE.Vector3(x, y, z));
            }
          }
        }
        edgePairs.push(
          [new THREE.Vector3(-hw, -hh, -hd), new THREE.Vector3(hw, -hh, -hd)],
          [new THREE.Vector3(hw, -hh, -hd), new THREE.Vector3(hw, -hh, hd)],
          [new THREE.Vector3(hw, -hh, hd), new THREE.Vector3(-hw, -hh, hd)],
          [new THREE.Vector3(-hw, -hh, hd), new THREE.Vector3(-hw, -hh, -hd)],
          [new THREE.Vector3(-hw, hh, -hd), new THREE.Vector3(hw, hh, -hd)],
          [new THREE.Vector3(hw, hh, -hd), new THREE.Vector3(hw, hh, hd)],
          [new THREE.Vector3(hw, hh, hd), new THREE.Vector3(-hw, hh, hd)],
          [new THREE.Vector3(-hw, hh, hd), new THREE.Vector3(-hw, hh, -hd)],
          [new THREE.Vector3(-hw, -hh, -hd), new THREE.Vector3(-hw, hh, -hd)],
          [new THREE.Vector3(hw, -hh, -hd), new THREE.Vector3(hw, hh, -hd)],
          [new THREE.Vector3(hw, -hh, hd), new THREE.Vector3(hw, hh, hd)],
          [new THREE.Vector3(-hw, -hh, hd), new THREE.Vector3(-hw, hh, hd)]
        );
        break;
      }
      case 'sphere': {
        geom = new THREE.SphereGeometry(1.3, 32, 32);
        break;
      }
      case 'cylinder': {
        const r = 1.0, h = 2.0;
        geom = new THREE.CylinderGeometry(r, r, h, 32);
        break;
      }
      case 'cone': {
        const r = 1.2, h = 2.2;
        geom = new THREE.ConeGeometry(r, h, 32);
        vertexPositions.push(new THREE.Vector3(0, h / 2, 0)); // 1 Apex Vertex
        break;
      }
      case 'square_pyramid': {
        const baseSize = 1.8;
        const height = 2.0;
        const half = baseSize / 2;
        const apex = new THREE.Vector3(0, height / 2, 0);
        const v0 = new THREE.Vector3(-half, -height / 2, -half);
        const v1 = new THREE.Vector3(half, -height / 2, -half);
        const v2 = new THREE.Vector3(half, -height / 2, half);
        const v3 = new THREE.Vector3(-half, -height / 2, half);

        // 5 vertices
        vertexPositions.push(apex, v0, v1, v2, v3);

        // 8 edges
        edgePairs.push(
          [v0, v1], [v1, v2], [v2, v3], [v3, v0],
          [apex, v0], [apex, v1], [apex, v2], [apex, v3]
        );

        // 4 triangular sides + 1 square base (2 triangles)
        geom = new THREE.ConeGeometry(baseSize * 0.707, height, 4);
        geom.rotateY(Math.PI / 4);
        break;
      }
      case 'triangular_prism': {
        const r = 1.2, h = 2.0;
        geom = new THREE.CylinderGeometry(r, r, h, 3);
        const topY = h / 2;
        const botY = -h / 2;

        // 3 top vertices and 3 bottom vertices matching Three.js CylinderGeometry angles: sin(theta), cos(theta)
        const t0 = new THREE.Vector3(r * Math.sin(0), topY, r * Math.cos(0));
        const t1 = new THREE.Vector3(r * Math.sin((2 * Math.PI) / 3), topY, r * Math.cos((2 * Math.PI) / 3));
        const t2 = new THREE.Vector3(r * Math.sin((4 * Math.PI) / 3), topY, r * Math.cos((4 * Math.PI) / 3));

        const b0 = new THREE.Vector3(r * Math.sin(0), botY, r * Math.cos(0));
        const b1 = new THREE.Vector3(r * Math.sin((2 * Math.PI) / 3), botY, r * Math.cos((2 * Math.PI) / 3));
        const b2 = new THREE.Vector3(r * Math.sin((4 * Math.PI) / 3), botY, r * Math.cos((4 * Math.PI) / 3));

        // 6 vertices
        vertexPositions.push(t0, t1, t2, b0, b1, b2);

        // 9 edges
        edgePairs.push(
          [t0, t1], [t1, t2], [t2, t0], // Top triangle (3 edges)
          [b0, b1], [b1, b2], [b2, b0], // Bottom triangle (3 edges)
          [t0, b0], [t1, b1], [t2, b2]  // 3 vertical edges
        );
        break;
      }
      case 'triangular_pyramid': {
        const r = 1.35;
        const baseY = -0.7;
        const apexY = 1.15;
        const vApex = new THREE.Vector3(0, apexY, 0);
        const v0 = new THREE.Vector3(r * Math.sin(0), baseY, r * Math.cos(0));
        const v1 = new THREE.Vector3(r * Math.sin((2 * Math.PI) / 3), baseY, r * Math.cos((2 * Math.PI) / 3));
        const v2 = new THREE.Vector3(r * Math.sin((4 * Math.PI) / 3), baseY, r * Math.cos((4 * Math.PI) / 3));

        // 4 vertices
        vertexPositions.push(vApex, v0, v1, v2);

        // 6 edges
        edgePairs.push(
          [v0, v1], [v1, v2], [v2, v0], // Base edges
          [vApex, v0], [vApex, v1], [vApex, v2] // Slanted edges
        );

        // 4 triangular faces (12 vertices non-indexed)
        const vertices = [
          // Face 0: Bottom base (facing down)
          v0.x, v0.y, v0.z,
          v2.x, v2.y, v2.z,
          v1.x, v1.y, v1.z,

          // Face 1: Side 1
          vApex.x, vApex.y, vApex.z,
          v0.x, v0.y, v0.z,
          v1.x, v1.y, v1.z,

          // Face 2: Side 2
          vApex.x, vApex.y, vApex.z,
          v1.x, v1.y, v1.z,
          v2.x, v2.y, v2.z,

          // Face 3: Side 3
          vApex.x, vApex.y, vApex.z,
          v2.x, v2.y, v2.z,
          v0.x, v0.y, v0.z,
        ];

        geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        break;
      }
      default:
        geom = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    }

    // Convert to non-indexed geometry so each triangle has independent vertices for crisp per-face coloring
    geom = geom.toNonIndexed();
    geom.computeVertexNormals();

    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const numVertices = posAttr.count;
    const numTriangles = Math.floor(numVertices / 3);
    const triangleFaceIds = new Int32Array(numTriangles);

    const facePointSums: { [id: number]: THREE.Vector3 } = {};
    const faceNormalSums: { [id: number]: THREE.Vector3 } = {};
    const faceTriCounts: { [id: number]: number } = {};

    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();
    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();

    for (let t = 0; t < numTriangles; t++) {
      pA.fromBufferAttribute(posAttr, t * 3);
      pB.fromBufferAttribute(posAttr, t * 3 + 1);
      pC.fromBufferAttribute(posAttr, t * 3 + 2);

      const center = new THREE.Vector3().add(pA).add(pB).add(pC).divideScalar(3);
      cb.subVectors(pC, pB);
      ab.subVectors(pA, pB);
      const normal = new THREE.Vector3().crossVectors(cb, ab).normalize();

      const fId = id === 'triangular_pyramid' ? t : getTriangleFaceId(id, normal, center);
      triangleFaceIds[t] = fId;

      if (fId >= 0) {
        if (!facePointSums[fId]) {
          facePointSums[fId] = new THREE.Vector3();
          faceNormalSums[fId] = new THREE.Vector3();
          faceTriCounts[fId] = 0;
        }
        facePointSums[fId].add(center);
        faceNormalSums[fId].add(normal);
        faceTriCounts[fId]++;
      }
    }

    const faceCentroids: { [id: number]: THREE.Vector3 } = {};
    const faceNormals: { [id: number]: THREE.Vector3 } = {};

    Object.keys(facePointSums).forEach(key => {
      const fId = Number(key);
      const count = faceTriCounts[fId];
      faceCentroids[fId] = facePointSums[fId].clone().divideScalar(count);
      faceNormals[fId] = faceNormalSums[fId].clone().normalize();
    });

    // Set initial vertex colors matching baseShapeColor
    const colors = new Float32Array(numVertices * 3);
    const initialColor = new THREE.Color(baseShapeColor);
    for (let i = 0; i < numVertices; i++) {
      colors[i * 3] = initialColor.r;
      colors[i * 3 + 1] = initialColor.g;
      colors[i * 3 + 2] = initialColor.b;
    }
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geom, vertexPositions, edgePairs, triangleFaceIds, faceCentroids, faceNormals };
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Reset states
    setCountedVertices([]);
    setCountedFaces([]);
    setCountedEdges([]);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(2.8, 2.2, 4.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffedd5, 0.6);
    dirLight2.position.set(-5, -4, -3);
    scene.add(dirLight2);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Build the solid mesh
    const {
      geom,
      vertexPositions,
      edgePairs,
      triangleFaceIds,
      faceCentroids,
      faceNormals
    } = getGeometryAndDetails(shapeId, color);

    triangleFaceIdsRef.current = triangleFaceIds;
    faceCentroidsRef.current = faceCentroids;
    faceNormalsRef.current = faceNormals;

    const material = new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
      transparent: isWireframe,
      opacity: isWireframe ? 0.35 : 0.95,
      wireframe: isWireframe
    });

    const mesh = new THREE.Mesh(geom, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mainMeshRef.current = mesh;
    group.add(mesh);

    // Outline / Edges helper
    const edgesGeom = new THREE.EdgesGeometry(geom);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      linewidth: 2.5
    });
    const lineSegments = new THREE.LineSegments(edgesGeom, edgesMat);
    group.add(lineSegments);

    // Group for Numbered Face Badges
    const faceBadgesGroup = new THREE.Group();
    faceBadgesGroupRef.current = faceBadgesGroup;
    group.add(faceBadgesGroup);

    // Create interactive Vertex Markers (Spheres) with enlarged hitboxes
    verticesMarkersRef.current = [];
    vertexPositionsRef.current = vertexPositions;
    vertexPositions.forEach((pos, idx) => {
      const isCounted = countedVertices.includes(idx);
      const sphereGeom = new THREE.SphereGeometry(0.12, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: isCounted ? 0x10b981 : 0xf59e0b,
        emissive: isCounted ? 0x059669 : 0xd97706,
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const marker = new THREE.Mesh(sphereGeom, sphereMat);
      marker.position.copy(pos);
      marker.userData = { type: 'vertex', index: idx };
      marker.visible = activeMode === 'vertices' || activeMode === 'explore';

      // Invisible generous touch hitbox
      const hitSphereGeom = new THREE.SphereGeometry(0.24, 8, 8);
      const hitSphereMat = new THREE.MeshBasicMaterial({ visible: false, depthWrite: false });
      const hitSphere = new THREE.Mesh(hitSphereGeom, hitSphereMat);
      hitSphere.userData = { type: 'vertex', index: idx };
      marker.add(hitSphere);

      group.add(marker);
      verticesMarkersRef.current.push(marker);
    });

    // Create interactive 3D Edge Tubes & Hitboxes for instant touch response
    edgesMeshesRef.current = [];
    edgePairsRef.current = edgePairs;
    const upVector = new THREE.Vector3(0, 1, 0);

    edgePairs.forEach((pair, idx) => {
      const isCounted = countedEdges.includes(idx);
      const pA = pair[0];
      const pB = pair[1];
      const dir = new THREE.Vector3().subVectors(pB, pA);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(pA, pB).multiplyScalar(0.5);

      // 3D visible cylinder for edge
      const cylinderGeom = new THREE.CylinderGeometry(0.046, 0.046, len, 12);
      const cylinderMat = new THREE.MeshStandardMaterial({
        color: isCounted ? 0x10b981 : 0xec4899,
        emissive: isCounted ? 0x059669 : 0xdb2777,
        emissiveIntensity: 0.6,
        roughness: 0.25,
        metalness: 0.1
      });
      const edgeMesh = new THREE.Mesh(cylinderGeom, cylinderMat);
      edgeMesh.position.copy(mid);

      // Align cylinder orientation with edge direction
      const quat = new THREE.Quaternion().setFromUnitVectors(upVector, dir.clone().normalize());
      edgeMesh.quaternion.copy(quat);

      // Invisible extra-wide hitbox (radius 0.18) for ultra-fast, effortless tapping
      const hitGeom = new THREE.CylinderGeometry(0.18, 0.18, len + 0.1, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false, depthWrite: false });
      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.userData = { type: 'edge', index: idx };
      edgeMesh.add(hitMesh);

      edgeMesh.userData = { type: 'edge', index: idx };
      edgeMesh.visible = activeMode === 'edges';
      group.add(edgeMesh);
      edgesMeshesRef.current.push(edgeMesh);
    });

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let lastTime = 0;
    const animate = (time: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isAutoRotating && groupRef.current && delta < 0.1) {
        groupRef.current.rotation.y += 0.45 * delta;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
        rendererRef.current.dispose();
      }
    };
  }, [shapeId, color, getGeometryAndDetails]);

  // Update vertex/edge visibility, face vertex colors, and numbered badges when mode or counts change
  useEffect(() => {
    if (mainMeshRef.current) {
      const mat = mainMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.wireframe = isWireframe;
      mat.transparent = isWireframe;
      mat.opacity = isWireframe ? 0.35 : 0.95;

      // Update face vertex colors
      const geom = mainMeshRef.current.geometry;
      const colorAttr = geom.getAttribute('color') as THREE.BufferAttribute | undefined;
      if (colorAttr) {
        const baseColor = new THREE.Color(activeMode === 'paint' ? activeColor : color);
        const countedColor = new THREE.Color('#10B981'); // Vibrant emerald green for counted faces
        const triangleFaceIds = triangleFaceIdsRef.current;
        const colors = colorAttr.array as Float32Array;
        const numTriangles = triangleFaceIds.length;

        for (let t = 0; t < numTriangles; t++) {
          const fId = triangleFaceIds[t];
          const isCounted = fId >= 0 && countedFaces.includes(fId);
          const targetColor = isCounted ? countedColor : baseColor;

          for (let v = 0; v < 3; v++) {
            const idx = (t * 3 + v) * 3;
            colors[idx] = targetColor.r;
            colors[idx + 1] = targetColor.g;
            colors[idx + 2] = targetColor.b;
          }
        }
        colorAttr.needsUpdate = true;
      }
    }

    // Update face numbered sticker badges directly on the surface
    if (faceBadgesGroupRef.current) {
      while (faceBadgesGroupRef.current.children.length > 0) {
        const child = faceBadgesGroupRef.current.children[0];
        faceBadgesGroupRef.current.remove(child);
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            const mat = child.material as THREE.MeshBasicMaterial;
            if (mat.map) mat.map.dispose();
            mat.dispose();
          }
        }
      }

      if (activeMode === 'faces') {
        countedFaces.forEach((fId, orderIdx) => {
          const centroid = faceCentroidsRef.current[fId];
          const normal = faceNormalsRef.current[fId];
          if (centroid && normal) {
            const texture = createNumberBadgeTexture(orderIdx + 1);
            // Create a flat circular / square decal mesh sitting flush on the surface
            const badgeGeom = new THREE.PlaneGeometry(0.52, 0.52);
            const badgeMat = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              depthTest: true,
              depthWrite: false,
              polygonOffset: true,
              polygonOffsetFactor: -2,
              polygonOffsetUnits: -2,
              side: THREE.DoubleSide
            });
            const badgeMesh = new THREE.Mesh(badgeGeom, badgeMat);
            // Position flush on face surface with a tiny offset to avoid z-fighting
            badgeMesh.position.copy(centroid).addScaledVector(normal, 0.024);

            // Orient the plane to lie flat on the face surface
            if (Math.abs(normal.y) > 0.85) {
              badgeMesh.up.set(0, 0, normal.y > 0 ? -1 : 1);
            } else {
              badgeMesh.up.set(0, 1, 0);
            }
            badgeMesh.lookAt(badgeMesh.position.clone().add(normal));

            faceBadgesGroupRef.current?.add(badgeMesh);
          }
        });
      }
    }

    verticesMarkersRef.current.forEach((marker, idx) => {
      marker.visible = activeMode === 'vertices' || activeMode === 'explore';
      const isCounted = countedVertices.includes(idx);
      const mat = marker.material as THREE.MeshStandardMaterial;
      mat.color.setHex(isCounted ? 0x10b981 : 0xf59e0b);
      mat.emissive.setHex(isCounted ? 0x059669 : 0xd97706);
    });

    edgesMeshesRef.current.forEach((edgeMesh, idx) => {
      edgeMesh.visible = activeMode === 'edges';
      const isCounted = countedEdges.includes(idx);
      const mat = edgeMesh.material as THREE.MeshStandardMaterial;
      mat.color.setHex(isCounted ? 0x10b981 : 0xec4899);
      mat.emissive.setHex(isCounted ? 0x059669 : 0xdb2777);
      mat.emissiveIntensity = isCounted ? 0.75 : 0.45;
    });
  }, [activeMode, countedFaces, countedVertices, countedEdges, isWireframe, color, activeColor]);

  // Handle Touch & Mouse Orbit / Interaction
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !groupRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    groupRef.current.rotation.y += deltaX * 0.008;
    groupRef.current.rotation.x += deltaY * 0.008;

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    // Check if it was a quick click / tap on a vertex, edge, or face
    if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    // 1. Raycast against vertices markers & proximity check
    if (activeMode === 'vertices') {
      if (maxVertices === 0) {
        const msg = isAr ? 'هَذَا المُجَسَّمُ لَيْسَ لَهُ رُؤُوسٌ مُدَبَّبَةٌ (0)!' : 'This shape has 0 pointed vertices!';
        setFeedbackHint(msg);
        appSpeech.speak(msg, lang);
        return;
      }

      let hitVIdx: number | null = null;
      const intersects = raycaster.intersectObjects(verticesMarkersRef.current, true);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        hitVIdx = (hitObj.userData.index !== undefined ? hitObj.userData.index : hitObj.parent?.userData.index) ?? null;
      }

      // Proximity check for vertices
      if (hitVIdx === null && groupRef.current) {
        const positions = vertexPositionsRef.current;
        let closestDist = Infinity;
        let bestIdx = -1;
        for (let i = 0; i < positions.length; i++) {
          const worldPos = positions[i].clone().applyMatrix4(groupRef.current.matrixWorld);
          const dist = raycaster.ray.distanceToPoint(worldPos);
          if (dist < 0.35 && dist < closestDist) {
            closestDist = dist;
            bestIdx = i;
          }
        }
        if (bestIdx !== -1) hitVIdx = bestIdx;
      }

      if (hitVIdx !== null) {
        const vIdx = hitVIdx;
        if (!countedVertices.includes(vIdx) && countedVertices.length < maxVertices) {
          const next = [...countedVertices, vIdx];
          setCountedVertices(next);
          soundEffects.playCount(next.length);
          if (onCountVertex) onCountVertex(next.length);

          if (next.length === maxVertices) {
            soundEffects.playCorrect();
            const msg = isAr
              ? `رَائِعٌ! تَمَّ عَدُّ جَمِيعِ الرُّؤُوسِ (${maxVertices}/${maxVertices}) 🌟`
              : `Awesome! You found all ${maxVertices} vertices! 🌟`;
            setFeedbackHint(msg);
            const speakText = isAr
              ? `أَحْسَنْتَ! تَمَّ عَدُّ جَمِيعِ الرُّؤُوسِ وَعَدَدُهَا ${maxVertices}!`
              : `Well done! All ${maxVertices} vertices counted!`;
            appSpeech.speak(speakText, lang);
          }
        } else if (countedVertices.includes(vIdx)) {
          soundEffects.playPop();
          setFeedbackHint(isAr ? 'هَذَا الرَّأْسُ تَمَّ عَدُّهُ سَابِقًا! ✔️' : 'This vertex was already counted! ✔️');
        }
        return;
      }
    }

    // 2. Raycast against 3D edge cylinders + proximity ray-to-segment detection
    if (activeMode === 'edges') {
      if (maxEdges === 0) {
        const msg = isAr ? 'هَذَا المُجَسَّمُ لَيْسَ لَهُ أَحْرُفٌ مُسْتَقِيمَةٌ (0)!' : 'This shape has 0 straight edges!';
        setFeedbackHint(msg);
        appSpeech.speak(msg, lang);
        return;
      }

      let hitEdgeIndex: number | null = null;

      // Direct raycast on 3D edge cylinders & hitboxes
      const intersects = raycaster.intersectObjects(edgesMeshesRef.current, true);
      if (intersects.length > 0) {
        const hitObj = intersects[0].object;
        hitEdgeIndex = (hitObj.userData.index !== undefined ? hitObj.userData.index : hitObj.parent?.userData.index) ?? null;
      }

      // Mathematical ray-to-segment distance check for fast, effortless touch response
      if (hitEdgeIndex === null && groupRef.current) {
        const pairs = edgePairsRef.current;
        let closestDist = Infinity;
        let bestIdx = -1;

        for (let i = 0; i < pairs.length; i++) {
          const worldA = pairs[i][0].clone().applyMatrix4(groupRef.current.matrixWorld);
          const worldB = pairs[i][1].clone().applyMatrix4(groupRef.current.matrixWorld);
          const distSq = raycaster.ray.distanceSqToSegment(worldA, worldB);
          if (distSq < 0.12 && distSq < closestDist) {
            closestDist = distSq;
            bestIdx = i;
          }
        }

        if (bestIdx !== -1) {
          hitEdgeIndex = bestIdx;
        }
      }

      if (hitEdgeIndex !== null) {
        const eIdx = hitEdgeIndex;
        if (!countedEdges.includes(eIdx) && countedEdges.length < maxEdges) {
          const next = [...countedEdges, eIdx];
          setCountedEdges(next);
          soundEffects.playCount(next.length);
          if (onCountEdge) onCountEdge(next.length);

          if (next.length === maxEdges) {
            soundEffects.playCorrect();
            const msg = isAr
              ? `مُمْتَازٌ! تَمَّ عَدُّ جَمِيعِ الأَحْرُفِ (${maxEdges}/${maxEdges}) 🌟`
              : `Brilliant! You found all ${maxEdges} edges! 🌟`;
            setFeedbackHint(msg);
            const speakText = isAr
              ? `أَحْسَنْتَ! تَمَّ عَدُّ جَمِيعِ الأَحْرُفِ وَعَدَدُهَا ${maxEdges}!`
              : `Great job! All ${maxEdges} edges counted!`;
            appSpeech.speak(speakText, lang);
          }
        } else if (countedEdges.includes(eIdx)) {
          soundEffects.playPop();
          setFeedbackHint(isAr ? 'هَذَا الحَرْفُ تَمَّ عَدُّهُ سَابِقًا! ✔️' : 'This edge was already counted! ✔️');
        }
        return;
      }
    }

    // 3. Raycast against face / main mesh
    if (mainMeshRef.current) {
      const intersects = raycaster.intersectObject(mainMeshRef.current);
      if (intersects.length > 0) {
        if (activeMode === 'faces') {
          // Special case: Sphere has 0 flat faces
          if (shapeId === 'sphere' || maxFaces === 0) {
            const hintMsg = isAr
              ? 'الكُرَةُ سَطْحٌ مُنْحَنٍ مُغْلَقٌ، لَيْسَ لَهَا أَوْجُهٌ مُسْتَوِيَةٌ (0 أَوْجُهٍ).'
              : 'A sphere is a continuous curved surface with 0 flat faces.';
            setFeedbackHint(hintMsg);
            appSpeech.speak(hintMsg, lang);
            soundEffects.playPop();
            return;
          }

          const hit = intersects[0];
          const faceIndex = hit.faceIndex;
          const fId = (faceIndex !== undefined && triangleFaceIdsRef.current[faceIndex] !== undefined)
            ? triangleFaceIdsRef.current[faceIndex]
            : -1;

          if (fId === -1) {
            const hintMsg = isAr
              ? getCurvedSurfaceHint(shapeId)
              : 'This is a curved surface! Only flat bases count as flat faces.';
            setFeedbackHint(hintMsg);
            appSpeech.speak(hintMsg, lang);
            soundEffects.playPop();
            return;
          }

          if (fId >= 0) {
            if (countedFaces.includes(fId)) {
              soundEffects.playPop();
              setFeedbackHint(isAr ? 'هَذَا الوَجْهُ تَمَّ عَدُّهُ سَابِقًا وَتَمَّ تَلْوِينُهُ بِالأَخْضَرِ! ✔️' : 'This face was already counted and highlighted! ✔️');
            } else if (countedFaces.length >= maxFaces) {
              soundEffects.playCorrect();
              setFeedbackHint(isAr ? `تَمَّ عَدُّ جَمِيعِ الأَوْجُهِ المُسْتَوِيَةِ (${maxFaces}/${maxFaces}) 🌟` : `All ${maxFaces} faces counted! 🌟`);
            } else {
              const next = [...countedFaces, fId];
              setCountedFaces(next);
              soundEffects.playCount(next.length);
              const faceDesc = isAr ? getFaceDescription(shapeId, fId) : `Face #${fId + 1}`;
              setFeedbackHint(isAr ? `${faceDesc} - تَمَّ العَدُّ وَالتَّمْيِيزُ بِاللَّوْنِ الأَخْضَرِ!` : `${faceDesc} counted and highlighted!`);
              if (onCountFace) onCountFace(next.length);

              if (next.length === maxFaces) {
                soundEffects.playCorrect();
                const msg = isAr
                  ? `أَحْسَنْتَ! تَمَّ عَدُّ جَمِيعِ الأَوْجُهِ المُسْتَوِيَةِ (${maxFaces}/${maxFaces}) 🌟`
                  : `Fantastic! You counted all ${maxFaces} flat faces! 🌟`;
                setFeedbackHint(msg);
                const shapeName = isAr ? shapeData.tashkeelName : shapeData.nameEn;
                const speakText = isAr
                  ? `مُمْتَازٌ! تَمَّ عَدُّ جَمِيعِ أَوْجُهِ ${shapeName} وَعَدَدُهَا ${maxFaces}!`
                  : `Awesome! All ${maxFaces} faces of the ${shapeName} counted!`;
                appSpeech.speak(speakText, lang);
              }
            }
          }
        } else if (activeMode === 'paint') {
          const hit = intersects[0];
          const faceIndex = hit.faceIndex;
          const fId = (faceIndex !== undefined && triangleFaceIdsRef.current[faceIndex] !== undefined)
            ? triangleFaceIdsRef.current[faceIndex]
            : -1;

          if (mainMeshRef.current) {
            const geom = mainMeshRef.current.geometry;
            const colorAttr = geom.getAttribute('color') as THREE.BufferAttribute | undefined;
            if (colorAttr) {
              const paintCol = new THREE.Color(activeColor);
              const colors = colorAttr.array as Float32Array;
              const triangleFaceIds = triangleFaceIdsRef.current;
              for (let t = 0; t < triangleFaceIds.length; t++) {
                if (fId === -1 || triangleFaceIds[t] === fId) {
                  for (let v = 0; v < 3; v++) {
                    const idx = (t * 3 + v) * 3;
                    colors[idx] = paintCol.r;
                    colors[idx + 1] = paintCol.g;
                    colors[idx + 2] = paintCol.b;
                  }
                }
              }
              colorAttr.needsUpdate = true;
            }
          }
          soundEffects.playPop();
        } else {
          soundEffects.playPop();
        }
      }
    }
  };

  const handleResetCounters = () => {
    soundEffects.playPop();
    setCountedFaces([]);
    setCountedVertices([]);
    setCountedEdges([]);
    if (onCountFace) onCountFace(0);
    if (onCountVertex) onCountVertex(0);
    if (onCountEdge) onCountEdge(0);
    setFeedbackHint(isAr ? 'تَمَّتْ إِعَادَةُ ضَبْطِ العَدَّادِ، هَيَّا نَعُدُّ مِنْ جَدِيدٍ!' : 'Counters reset, let us count again!');
  };

  const resetCamera = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
      setIsAutoRotating(true);
      soundEffects.playPop();
    }
  };

  const colorsList = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444', '#06B6D4', '#84CC16'];

  return (
    <div className={`relative w-full ${heightClass} bg-gradient-to-b from-amber-50/80 to-orange-50/40 rounded-3xl border-2 border-amber-200/70 shadow-inner overflow-hidden flex flex-col items-center justify-center select-none`}>
      {/* 3D Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />

      {/* Floating 3D Control Badges */}
      <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} flex flex-wrap gap-2 z-10`}>
        <button
          onClick={() => {
            setIsAutoRotating(!isAutoRotating);
            soundEffects.playPop();
          }}
          className={`px-3 py-2 rounded-2xl backdrop-blur-md border shadow-sm transition-all text-xs sm:text-sm font-bold flex items-center gap-1.5 active:scale-95 ${
            isAutoRotating ? 'bg-amber-500 text-white border-amber-600' : 'bg-white/90 text-slate-800 border-amber-200'
          }`}
          title={isAutoRotating ? (isAr ? 'تَثْبِيتُ الحَرَكَةِ' : 'Pause Auto-Rotation') : (isAr ? 'دَوَرَانٌ تِلْقَائِيٌّ' : 'Auto-Rotate')}
        >
          <RotateCw className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} />
          <span>{isAutoRotating ? (isAr ? 'دَوَرَانٌ' : 'Rotating') : (isAr ? 'تَثْبِيتٌ' : 'Paused')}</span>
        </button>

        <button
          onClick={() => {
            setIsWireframe(!isWireframe);
            soundEffects.playPop();
          }}
          className={`px-3 py-2 rounded-2xl backdrop-blur-md border shadow-sm transition-all text-xs sm:text-sm font-bold flex items-center gap-1.5 active:scale-95 ${
            isWireframe ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white/90 text-slate-800 border-amber-200'
          }`}
          title={isAr ? 'عَرْضُ الهَيْكَلِ الشَّفَّافِ' : 'Toggle Wireframe'}
        >
          <Eye className="w-4 h-4" />
          <span>{isWireframe ? (isAr ? 'شَفَّافٌ' : 'Wireframe') : (isAr ? 'مُصْمَتٌ' : 'Solid')}</span>
        </button>

        <button
          onClick={resetCamera}
          className="p-2 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border border-amber-200 shadow-sm transition-all text-xs font-bold flex items-center gap-1 active:scale-95"
          title={isAr ? 'إِعَادَةُ ضَبْطِ الزَّاوِيَةِ' : 'Reset View'}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Specific Overlay / Counters */}
      {activeMode === 'vertices' && (
        <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} bg-amber-500/95 text-white px-3.5 sm:px-5 py-2.5 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-2.5 text-xs sm:text-base font-black z-10`}>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
          <span>
            {maxVertices === 0 ? (
              isAr ? 'لا تُوجَدُ رُؤُوسٌ مُدَبَّبَةٌ (0)' : 'No Pointed Vertices (0)'
            ) : countedVertices.length === maxVertices ? (
              isAr ? `مُمْتَازٌ! تَمَّ عَدُّ كُلِّ الرُّؤُوسِ (${countedVertices.length}/${maxVertices}) ✔️` : `Super! All ${maxVertices} vertices counted! ✔️`
            ) : (
              isAr ? `الْمَسِ الرُّؤُوسَ المُمَثَّلَةَ بِالكُرَاتِ: ${countedVertices.length} / ${maxVertices}` : `Tap vertex spheres: ${countedVertices.length} / ${maxVertices}`
            )}
          </span>
          {countedVertices.length > 0 && (
            <button
              onClick={handleResetCounters}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-2.5 py-1 rounded-xl transition-all"
              title={isAr ? 'إِعَادَةُ العَدِّ' : 'Reset'}
            >
              {isAr ? 'إِعَادَةٌ 🔄' : 'Reset 🔄'}
            </button>
          )}
        </div>
      )}

      {activeMode === 'faces' && (
        <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} bg-emerald-600/95 text-white px-3.5 sm:px-5 py-2.5 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-2.5 text-xs sm:text-base font-black z-10`}>
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
          <span>
            {maxFaces === 0 ? (
              isAr ? 'الكُرَةُ سَطْحٌ مُنْحَنٍ (0 أَوْجُهٍ مُسْتَوِيَةٍ)' : 'Sphere has 0 flat faces (curved surface)'
            ) : countedFaces.length === maxFaces ? (
              isAr ? `مُمْتَازٌ! تَمَّ عَدُّ جَمِيعِ الأَوْجُهِ (${countedFaces.length}/${maxFaces}) ✔️` : `Awesome! All ${maxFaces} faces counted! ✔️`
            ) : (
              isAr ? `الْمَسِ الأَوْجُهَ المُسْتَوِيَةَ: ${countedFaces.length} / ${maxFaces}` : `Tap flat faces: ${countedFaces.length} / ${maxFaces}`
            )}
          </span>
          {countedFaces.length > 0 && (
            <button
              onClick={handleResetCounters}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs px-2.5 py-1 rounded-xl transition-all"
              title={isAr ? 'إِعَادَةُ العَدِّ' : 'Reset'}
            >
              {isAr ? 'إِعَادَةٌ 🔄' : 'Reset 🔄'}
            </button>
          )}
        </div>
      )}

      {activeMode === 'edges' && (
        <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} bg-pink-600/95 text-white px-3.5 sm:px-5 py-2.5 rounded-2xl shadow-lg backdrop-blur-md flex items-center gap-2.5 text-xs sm:text-base font-black z-10`}>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-200" />
          <span>
            {maxEdges === 0 ? (
              isAr ? 'لا تُوجَدُ أَحْرُفٌ مُسْتَقِيمَةٌ (0)' : 'No straight edges (0)'
            ) : countedEdges.length === maxEdges ? (
              isAr ? `مُمْتَازٌ! تَمَّ عَدُّ كُلِّ الأَحْرُفِ (${countedEdges.length}/${maxEdges}) ✔️` : `Great! All ${maxEdges} edges counted! ✔️`
            ) : (
              isAr ? `الْمَسِ الخُطُوطَ لِعَدِّ الأَحْرُفِ: ${countedEdges.length} / ${maxEdges}` : `Tap edges to count: ${countedEdges.length} / ${maxEdges}`
            )}
          </span>
          {countedEdges.length > 0 && (
            <button
              onClick={handleResetCounters}
              className="bg-pink-700 hover:bg-pink-800 text-white text-xs px-2.5 py-1 rounded-xl transition-all"
              title={isAr ? 'إِعَادَةُ العَدِّ' : 'Reset'}
            >
              {isAr ? 'إِعَادَةٌ 🔄' : 'Reset 🔄'}
            </button>
          )}
        </div>
      )}

      {activeMode === 'paint' && (
        <div className="absolute bottom-3 inset-x-3 mx-auto w-fit bg-white/95 backdrop-blur-md border-2 border-amber-200 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 z-10">
          <Palette className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-black text-slate-800">{isAr ? 'اخْتَرْ لَوْنًا:' : 'Choose Color:'}</span>
          <div className="flex gap-2">
            {colorsList.map(c => (
              <button
                key={c}
                onClick={() => {
                  setActiveColor(c);
                  if (mainMeshRef.current) {
                    const mat = mainMeshRef.current.material as THREE.MeshPhysicalMaterial;
                    mat.color.setStyle(c);
                  }
                  soundEffects.playPop();
                }}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  activeColor === c ? 'scale-125 border-slate-900 shadow-md' : 'border-white'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Guide hint at bottom */}
      <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} text-xs sm:text-sm font-bold text-slate-700 bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-amber-200 pointer-events-none shadow-xs`}>
        {isAr ? '👆 اِسْحَبْ لِلتَّدْوِيرِ فِي 3D' : '👆 Drag to Orbit in 3D'}
      </div>
    </div>
  );
};

