import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

function renderAppIconPNG(size) {
  const png = new PNG({ width: size, height: size });
  const scale = size / 512;

  // Colors
  const bgAmber = [254, 243, 199, 255]; // #FEF3C7
  const borderAmber = [245, 158, 11, 255]; // #F59E0B
  const darkIndigo = [30, 27, 75, 255]; // #1E1B4B
  const gold = [251, 191, 36, 255]; // #FBBF24
  const cubeTop = [253, 224, 71, 255]; // #FDE047
  const cubeLeft = [99, 102, 241, 255]; // #6366F1
  const cubeRight = [16, 185, 129, 255]; // #10B981
  const pinkSphere = [236, 72, 153, 255]; // #EC4899
  const purpleCyl = [168, 85, 247, 255]; // #A855F7
  const white = [255, 255, 255, 255];

  function setPixel(x, y, color) {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const idx = (size * Math.floor(y) + Math.floor(x)) << 2;
    // Simple alpha blending if color[3] < 255
    const alpha = (color[3] ?? 255) / 255;
    if (alpha === 1) {
      png.data[idx] = color[0];
      png.data[idx + 1] = color[1];
      png.data[idx + 2] = color[2];
      png.data[idx + 3] = 255;
    } else {
      const invAlpha = 1 - alpha;
      png.data[idx] = Math.round(color[0] * alpha + png.data[idx] * invAlpha);
      png.data[idx + 1] = Math.round(color[1] * alpha + png.data[idx + 1] * invAlpha);
      png.data[idx + 2] = Math.round(color[2] * alpha + png.data[idx + 2] * invAlpha);
      png.data[idx + 3] = 255;
    }
  }

  // Draw rounded rect background
  const radius = 100 * scale;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Check rounded corner distance
      let inBounds = true;
      const rx = Math.min(x, size - 1 - x);
      const ry = Math.min(y, size - 1 - y);
      if (rx < radius && ry < radius) {
        const dist = Math.sqrt((radius - rx) ** 2 + (radius - ry) ** 2);
        if (dist > radius) {
          inBounds = false;
        }
      }

      if (inBounds) {
        // Gradient from amber border towards bright center
        const borderDist = Math.min(x, y, size - 1 - x, size - 1 - y);
        const normY = y / size;
        const r = Math.round(255 - normY * 15);
        const g = Math.round(251 - normY * 30);
        const b = Math.round(235 - normY * 70);

        if (borderDist < 12 * scale) {
          setPixel(x, y, [245, 158, 11, 255]); // gold border
        } else {
          setPixel(x, y, [r, g, b, 255]);
        }
      } else {
        // Transparent outside squircle
        setPixel(x, y, [0, 0, 0, 0]);
      }
    }
  }

  // Draw 3D Cube Isometric faces
  // Points (scaled from 512):
  // Center: (256, 240)
  // Left: (145, 180), Right: (367, 180), Top: (256, 120)
  // Left-bottom: (145, 310), Right-bottom: (367, 310), Center-bottom: (256, 370)
  function pointInPoly(px, py, vertices) {
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i][0] * scale, yi = vertices[i][1] * scale;
      const xj = vertices[j][0] * scale, yj = vertices[j][1] * scale;
      const intersect = ((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  const topFace = [[256, 120], [367, 180], [256, 240], [145, 180]];
  const leftFace = [[256, 240], [145, 180], [145, 310], [256, 370]];
  const rightFace = [[256, 240], [367, 180], [367, 310], [256, 370]];

  // Draw shadow
  const cx = 256 * scale, cy = 385 * scale, rx = 140 * scale, ry = 25 * scale;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
      if (d <= 1) {
        setPixel(x, y, [120, 53, 15, Math.round((1 - d) * 70)]);
      }
    }
  }

  // Draw Cube faces
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (pointInPoly(x, y, topFace)) {
        setPixel(x, y, cubeTop);
      } else if (pointInPoly(x, y, leftFace)) {
        setPixel(x, y, cubeLeft);
      } else if (pointInPoly(x, y, rightFace)) {
        setPixel(x, y, cubeRight);
      }
    }
  }

  // Draw sphere in bottom left (115, 345, r: 40)
  const scx = 115 * scale, scy = 340 * scale, sr = 42 * scale;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dist = Math.sqrt((x - scx) ** 2 + (y - scy) ** 2);
      if (dist <= sr) {
        const light = Math.max(0, 1 - Math.sqrt((x - (scx - 12 * scale)) ** 2 + (y - (scy - 12 * scale)) ** 2) / (sr * 1.4));
        const r = Math.min(255, Math.round(236 * 0.7 + 255 * light * 0.6));
        const g = Math.min(255, Math.round(72 * 0.7 + 180 * light * 0.5));
        const b = Math.min(255, Math.round(153 * 0.7 + 200 * light * 0.5));
        setPixel(x, y, [r, g, b, 255]);
      }
    }
  }

  // Draw cylinder in top right (392, 145)
  const ccx = 392 * scale, ccy = 150 * scale, crx = 24 * scale, cry = 10 * scale;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (Math.abs(x - ccx) <= crx && y >= (120 * scale) && y <= (165 * scale)) {
        const nx = (x - ccx) / crx;
        const shade = Math.cos(nx * Math.PI / 2);
        setPixel(x, y, [
          Math.round(147 * shade + 80),
          Math.round(51 * shade + 40),
          Math.round(234 * shade + 30),
          255
        ]);
      }
      // Cylinder top ellipse
      const et = ((x - ccx) / crx) ** 2 + ((y - (120 * scale)) / cry) ** 2;
      if (et <= 1) {
        setPixel(x, y, purpleCyl);
      }
      // Cylinder bottom ellipse
      const eb = ((x - ccx) / crx) ** 2 + ((y - (165 * scale)) / cry) ** 2;
      if (eb <= 1 && y >= 165 * scale) {
        setPixel(x, y, [126, 34, 206, 255]);
      }
    }
  }

  // Draw Vertices points on Cube (White glowing dots)
  const vertices = [
    [256, 120], [367, 180], [145, 180], [256, 240],
    [145, 310], [367, 310], [256, 370]
  ];
  for (const [vx, vy] of vertices) {
    const vr = 7 * scale;
    const vcx = vx * scale, vcy = vy * scale;
    for (let y = Math.floor(vcy - vr); y <= Math.ceil(vcy + vr); y++) {
      for (let x = Math.floor(vcx - vr); x <= Math.ceil(vcx + vr); x++) {
        const d = Math.sqrt((x - vcx) ** 2 + (y - vcy) ** 2);
        if (d <= vr) {
          setPixel(x, y, [255, 255, 255, 255]);
        }
      }
    }
  }

  // Draw Bottom "3D" Badge pill
  const bx = 186 * scale, by = 405 * scale, bw = 140 * scale, bh = 46 * scale, br = 23 * scale;
  for (let y = Math.floor(by); y <= Math.ceil(by + bh); y++) {
    for (let x = Math.floor(bx); x <= Math.ceil(bx + bw); x++) {
      const rx = Math.min(x - bx, bx + bw - x);
      let inPill = true;
      if (rx < br) {
        const d = Math.sqrt((br - rx) ** 2 + ((by + bh / 2) - y) ** 2);
        if (d > br) inPill = false;
      }
      if (inPill) {
        setPixel(x, y, darkIndigo);
      }
    }
  }

  return PNG.sync.write(png);
}

// Generate files
const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'icon-192.png'), renderAppIconPNG(192));
fs.writeFileSync(path.join(outDir, 'icon-512.png'), renderAppIconPNG(512));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), renderAppIconPNG(180));
fs.writeFileSync(path.join(outDir, 'favicon.png'), renderAppIconPNG(64));

console.log('Successfully generated PNG app icons (192x192, 512x512, apple-touch-icon 180x180, favicon 64x64)!');
