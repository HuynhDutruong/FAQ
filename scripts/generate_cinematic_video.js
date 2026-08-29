const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '../public/videos');
const FRAMES_DIR = path.join(__dirname, '../public/videos/temp_frames');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

const WIDTH = 720;
const HEIGHT = 720;
const FPS = 30;
const DURATION = 2.4;
const TOTAL_FRAMES = Math.floor(FPS * DURATION);

console.log(`Rendering ${TOTAL_FRAMES} frames at ${FPS}fps...`);

// Helper to generate dynamic SVG frame
function generateFrameSVG(frameIndex, totalFrames) {
  const t = frameIndex / totalFrames; // 0.0 to 1.0
  const timeSec = t * DURATION;

  // 1. Background: Deep Velvet Midnight with Warm Ambient Radial Light
  const bgAuraRadius = 360 + Math.sin(t * Math.PI * 4) * 20;

  // 2. Card -> Envelope Origami Folding Progression (0.0s -> 0.8s)
  const foldT = Math.min(timeSec / 0.75, 1.0);
  const cardScaleX = 1 - foldT * 0.58;
  const cardScaleY = 1 - foldT * 0.72;
  const cardY = 360 + foldT * 40;
  const cardRotation = foldT * 12; // tilt angle

  // Seal Stamp impact at foldT > 0.6
  const sealVisible = foldT > 0.6;
  const sealScale = sealVisible ? Math.min((foldT - 0.6) / 0.35, 1.0) : 0;
  const shockwaveRadius = sealVisible ? (foldT - 0.6) * 180 : 0;
  const shockwaveOpacity = sealVisible ? Math.max(1 - (foldT - 0.6) * 2.5, 0) : 0;

  // 3. Magic Hyperspace Portal Progression (0.35s -> 2.3s)
  const portalT = Math.max(0, Math.min((timeSec - 0.35) / 0.45, 1.0));
  const portalCloseT = timeSec > 2.0 ? Math.min((timeSec - 2.0) / 0.35, 1.0) : 0;
  const portalScale = (portalT * (1 - portalCloseT));
  const portalX = 540;
  const portalY = 200;
  const portalRotation = timeSec * 320;

  // 4. Owl Flying Progression (0.5s -> 2.1s)
  const owlT = Math.max(0, Math.min((timeSec - 0.5) / 1.5, 1.0));
  
  // Parabolic Catmull-Rom Path:
  // Starts at (-80, 80) -> Swoops to (360, 400) -> Plunges into (540, 200)
  let owlX, owlY, owlScale, owlRot;
  let letterAttached = false;

  if (owlT <= 0.45) {
    // Swoop down to letter
    const p = owlT / 0.45;
    owlX = -100 + p * 460;
    owlY = 60 + Math.sin(p * Math.PI * 0.55) * 340;
    owlScale = 0.5 + p * 0.55;
    owlRot = -25 + p * 30;
  } else {
    // Carry letter into portal
    const p = (owlT - 0.45) / 0.55;
    letterAttached = true;
    owlX = 360 + p * 180;
    owlY = 400 - p * 200;
    owlScale = 1.05 * (1 - p * 0.85);
    owlRot = 5 + p * 25;
  }

  const wingFlap = Math.sin(timeSec * 22) * 28;

  // 5. Floating Magical Embers / Gold Dust (30 particles)
  let particlesSVG = '';
  for (let i = 0; i < 40; i++) {
    const px = (i * 97 + timeSec * 45) % WIDTH;
    const py = (i * 61 - timeSec * 60 + HEIGHT) % HEIGHT;
    const pSize = (i % 3) + 1.5;
    const pOp = 0.3 + (Math.sin(timeSec * 5 + i) + 1) * 0.35;
    particlesSVG += `<circle cx="${px}" cy="${py}" r="${pSize}" fill="#FDE68A" opacity="${pOp.toFixed(2)}" />`;
  }

  // 6. Hyperspace Vortex Spiral Arms
  let vortexArmsSVG = '';
  if (portalScale > 0.01) {
    for (let a = 0; a < 6; a++) {
      const armRot = portalRotation + a * 60;
      vortexArmsSVG += `
        <g transform="rotate(${armRot} ${portalX} ${portalY})">
          <path d="M${portalX} ${portalY} Q${portalX + 45 * portalScale} ${portalY - 20 * portalScale} ${portalX + 85 * portalScale} ${portalY + 55 * portalScale}" 
                stroke="#60A5FA" stroke-width="${3 * portalScale}" stroke-linecap="round" fill="none" opacity="0.85" />
          <path d="M${portalX} ${portalY} Q${portalX - 35 * portalScale} ${portalY + 30 * portalScale} ${portalX - 75 * portalScale} ${portalY - 60 * portalScale}" 
                stroke="#F59E0B" stroke-width="${2.5 * portalScale}" stroke-linecap="round" fill="none" opacity="0.7" />
        </g>
      `;
    }
  }

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="75%">
        <stop offset="0%" stop-color="#1F150B" />
        <stop offset="50%" stop-color="#120D08" />
        <stop offset="100%" stop-color="#070503" />
      </radialGradient>
      <radialGradient id="portalCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="30%" stop-color="#60A5FA" />
        <stop offset="70%" stop-color="#1877F2" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)" />

    <!-- Ambient Golden Dust Particles -->
    ${particlesSVG}

    <!-- 1. HYPERSPACE PORTAL VORTEX -->
    ${portalScale > 0.01 ? `
    <g transform="scale(${portalScale}) translate(${portalX * (1/portalScale - 1)} ${portalY * (1/portalScale - 1)})">
      <!-- Outer Pulsing Halo -->
      <circle cx="${portalX}" cy="${portalY}" r="95" fill="url(#portalCore)" opacity="0.6" filter="url(#glow)" />
      
      <!-- Rotating Energy Rings -->
      <circle cx="${portalX}" cy="${portalY}" r="75" stroke="#38BDF8" stroke-width="4" stroke-dasharray="24 12 8 16" fill="none" transform="rotate(${portalRotation} ${portalX} ${portalY})" filter="url(#glow)" />
      <circle cx="${portalX}" cy="${portalY}" r="52" stroke="#F59E0B" stroke-width="3" stroke-dasharray="16 10 32 8" fill="none" transform="rotate(${-portalRotation * 1.3} ${portalX} ${portalY})" />
      <circle cx="${portalX}" cy="${portalY}" r="32" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="12 6" fill="none" transform="rotate(${portalRotation * 2} ${portalX} ${portalY})" />
      
      <!-- Vortex Spiral Arms -->
      ${vortexArmsSVG}

      <!-- Singularity Void Core -->
      <circle cx="${portalX}" cy="${portalY}" r="16" fill="#050302" stroke="#60A5FA" stroke-width="2" />
    </g>
    ` : ''}

    <!-- 2. SACRED CARD / FOLDED PARCHMENT LETTER -->
    ${(!letterAttached && owlT < 1.0) ? `
    <g transform="translate(360 ${cardY}) scale(${cardScaleX} ${cardScaleY}) rotate(${cardRotation}) translate(-140 -200)">
      <!-- Card / Parchment Base -->
      <rect x="0" y="0" width="280" height="400" rx="20" fill="#1C140D" stroke="#D4AF37" stroke-width="4" filter="url(#glow)" />
      <rect x="12" y="12" width="256" height="376" rx="14" fill="#2A1E14" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="6 3" />
      
      <!-- Gold Filigree Corners -->
      <text x="24" y="44" fill="#D4AF37" font-size="22" font-family="serif">⚜</text>
      <text x="240" y="44" fill="#D4AF37" font-size="22" font-family="serif">⚜</text>
      <text x="24" y="375" fill="#D4AF37" font-size="22" font-family="serif">⚜</text>
      <text x="240" y="375" fill="#D4AF37" font-size="22" font-family="serif">⚜</text>

      <!-- Classical Artwork Frame -->
      <rect x="25" y="55" width="230" height="150" rx="10" fill="#3D2918" stroke="#D4AF37" stroke-width="2" />
      <text x="140" y="135" fill="#FDE68A" font-size="16" font-weight="bold" text-anchor="middle" font-family="serif">✠ VERBUM DOMINI ✠</text>
      <text x="140" y="165" fill="#FFF" font-size="13" text-anchor="middle" font-family="serif">CHÁNH TÒA MỸ THO</text>

      <!-- Scripture Quote Box -->
      <rect x="25" y="220" width="230" height="130" rx="8" fill="#150F09" stroke="#92400E" stroke-width="1" />
      <text x="40" y="255" fill="#FDE68A" font-size="14" font-weight="bold" font-family="serif">LỜI CHÚA LÀ ÁNH SÁNG</text>
      <text x="40" y="285" fill="#E2E8F0" font-size="12" font-style="italic" font-family="serif">"Lời Chúa là ngọn đèn soi cho</text>
      <text x="40" y="305" fill="#E2E8F0" font-size="12" font-style="italic" font-family="serif">con bước, là ánh sáng chỉ đường."</text>

      <!-- Triangular Flap when folding -->
      ${foldT > 0.3 ? `
      <polygon points="0,0 280,0 140,160" fill="#BFA06A" stroke="#5A441C" stroke-width="2" />
      ` : ''}

      <!-- 3D Wax Seal Impact -->
      ${sealVisible ? `
      <g transform="translate(140 200) scale(${sealScale})">
        <circle cx="0" cy="0" r="42" fill="#991B1B" stroke="#FDE68A" stroke-width="2.5" filter="url(#glow)" />
        <circle cx="0" cy="0" r="34" fill="#7F1D1D" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="4 2" />
        <!-- Holy Cross & Eucharist -->
        <circle cx="0" cy="-4" r="12" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5" />
        <path d="M0 -12 L0 4 M-6 -4 L6 -4" stroke="#991B1B" stroke-width="2.5" stroke-linecap="round" />
        <!-- Shockwave Ring -->
        ${shockwaveOpacity > 0 ? `
        <circle cx="0" cy="0" r="${shockwaveRadius}" stroke="#FDE68A" stroke-width="4" fill="none" opacity="${shockwaveOpacity.toFixed(2)}" />
        ` : ''}
      </g>
      ` : ''}
    </g>
    ` : ''}

    <!-- 3. MAJESTIC HOGWARTS MESSENGER OWL & CARRIED LETTER -->
    ${owlT > 0 && owlT < 1.0 ? `
    <g transform="translate(${owlX} ${owlY}) scale(${owlScale}) rotate(${owlRot})">
      <!-- Carried Letter in Talons -->
      ${letterAttached ? `
      <g transform="translate(-45 35) scale(0.45) rotate(12)">
        <rect x="0" y="0" width="200" height="130" rx="8" fill="#C5A977" stroke="#5A441C" stroke-width="3" />
        <polygon points="0,0 200,0 100,65" fill="#D8BC88" stroke="#5A441C" stroke-width="2" />
        <circle cx="100" cy="65" r="22" fill="#991B1B" stroke="#FDE68A" stroke-width="2" />
      </g>
      ` : ''}

      <!-- Left Wing Flapping -->
      <g transform="translate(-18 -10) rotate(${-wingFlap})">
        <path d="M0 0 C-40 -45 -90 -30 -115 -10 C-95 25 -50 45 0 20 Z" fill="#92400E" stroke="#451A03" stroke-width="2" />
        <path d="M-20 -15 C-60 -30 -85 -15 -100 0 M-30 0 C-65 -10 -85 10 -95 20" stroke="#FDE68A" stroke-width="1.5" opacity="0.6" />
      </g>

      <!-- Right Wing Flapping -->
      <g transform="translate(18 -10) rotate(${wingFlap})">
        <path d="M0 0 C40 -45 90 -30 115 -10 C95 25 50 45 0 20 Z" fill="#92400E" stroke="#451A03" stroke-width="2" />
        <path d="M20 -15 C60 -30 85 -15 100 0 M30 0 C65 -10 85 10 95 20" stroke="#FDE68A" stroke-width="1.5" opacity="0.6" />
      </g>

      <!-- Owl Body -->
      <ellipse cx="0" cy="5" rx="22" ry="30" fill="#78350F" stroke="#451A03" stroke-width="2" filter="url(#glow)" />
      <path d="M-10 -5 C-5 18 5 18 10 -5 C5 28 -5 28 -10 -5 Z" fill="#FFFBEB" opacity="0.85" />

      <!-- Head & Eyes -->
      <circle cx="0" cy="-22" r="18" fill="#B45309" stroke="#451A03" stroke-width="2" />
      <!-- Ears -->
      <polygon points="-16,-30 -12,-44 -4,-32" fill="#78350F" />
      <polygon points="16,-30 12,-44 4,-32" fill="#78350F" />
      <!-- Glowing Amber Eyes -->
      <circle cx="-7" cy="-22" r="6" fill="#FEF08A" stroke="#B45309" stroke-width="1.5" filter="url(#glow)" />
      <circle cx="-7" cy="-22" r="3" fill="#1C1917" />
      <circle cx="7" cy="-22" r="6" fill="#FEF08A" stroke="#B45309" stroke-width="1.5" filter="url(#glow)" />
      <circle cx="7" cy="-22" r="3" fill="#1C1917" />
      <!-- Beak -->
      <polygon points="-3,-18 3,-18 0,-10" fill="#F59E0B" />

      <!-- Talons Clamping -->
      <g stroke="#D97706" stroke-width="3.5" stroke-linecap="round">
        <path d="M-8 32 L-10 44 M-4 34 L-4 46 M0 32 L2 44" />
        <path d="M8 32 L10 44 M4 34 L4 46 M0 32 L-2 44" />
      </g>
    </g>
    ` : ''}

    <!-- Warp Supernova Flash at Completion (timeSec > 2.1) -->
    ${timeSec > 2.1 ? `
    <circle cx="${portalX}" cy="${portalY}" r="${(timeSec - 2.1) * 600}" fill="#FFFFFF" opacity="${Math.max(1 - (timeSec - 2.1) * 3.3, 0).toFixed(2)}" />
    ` : ''}
  </svg>
  `;
}

async function renderVideo() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const svgStr = generateFrameSVG(i, TOTAL_FRAMES);
    const framePath = path.join(FRAMES_DIR, `frame_${String(i).padStart(4, '0')}.png`);
    await sharp(Buffer.from(svgStr)).png().toFile(framePath);
  }

  console.log('Frames rendered. Encoding MP4 and WebM with ffmpeg...');

  const mp4Path = path.join(OUTPUT_DIR, 'hogwarts_share.mp4');
  const webmPath = path.join(OUTPUT_DIR, 'hogwarts_share.webm');

  // Encode highly-optimized H.264 MP4 (< 400KB)
  execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%04d.png" -c:v libx264 -pix_fmt yuv420p -crf 22 -preset fast -movflags +faststart "${mp4Path}"`);

  // Encode WebM (< 300KB)
  execSync(`ffmpeg -y -framerate ${FPS} -i "${FRAMES_DIR}/frame_%04d.png" -c:v libvpx-vp9 -pix_fmt yuv420p -b:v 0 -crf 30 "${webmPath}"`);

  // Cleanup frames
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  console.log('Video generation complete!');
}

renderVideo().catch(console.error);
