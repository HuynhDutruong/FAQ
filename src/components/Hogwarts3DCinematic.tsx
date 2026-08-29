'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface Platform3DConfig {
  id: 'facebook' | 'messenger' | 'instagram' | 'zalo' | 'system';
  name: string;
  colorHex: number;
  portalSecondaryHex: number;
}

interface Props {
  platform: Platform3DConfig;
  onFinished: () => void;
}

// Tạo texture giấy da cổ điển mạ vàng cao cấp in-memory (High-Res Procedural Parchment Canvas)
function createLuxuryParchmentTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Nền giấy da cừu cổ hoàng gia (Aged Parchment Gradient)
    const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 700);
    grad.addColorStop(0, '#ebd5ad');
    grad.addColorStop(0.5, '#d4b785');
    grad.addColorStop(0.85, '#ad8c53');
    grad.addColorStop(1, '#6b4f24');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Vân xơ giấy cổ điển & hạt mực chìm
    ctx.fillStyle = 'rgba(70, 40, 10, 0.05)';
    for (let i = 0; i < 6000; i++) {
      const rx = Math.random() * 1024;
      const ry = Math.random() * 1024;
      const rw = Math.random() * 3 + 1;
      ctx.fillRect(rx, ry, rw, rw);
    }

    // 3. Khung viền chỉ vàng hoàng gia 18K kép (Gold Thread Embroidery)
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 12;
    ctx.strokeRect(36, 36, 952, 952);

    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, 928, 928);

    // Hoa văn 4 góc hoàng gia ⚜
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 42px serif';
    ctx.fillText('⚜', 60, 95);
    ctx.fillText('⚜', 925, 95);
    ctx.fillText('⚜', 60, 960);
    ctx.fillText('⚜', 925, 960);

    // Dòng chữ watermark chìm: VERBUM DOMINI • CHÁNH TÒA MỸ THO
    ctx.fillStyle = 'rgba(120, 53, 15, 0.2)';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✠ VERBUM DOMINI ✠', 512, 480);
    ctx.font = 'italic bold 24px serif';
    ctx.fillText('XỨ ĐOÀN CÁC THÁNH TỬ ĐẠO • CHÁNH TÒA MỸ THO', 512, 540);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Hogwarts3DCinematic({ platform, onFinished }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 450;

    // =========================================================================
    // 1. SCENE, CAMERA & ULTRA HIGH PERFORMANCE RENDERER
    // =========================================================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060403, 0.0028);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    camera.position.set(0, 0, 165);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 2. DYNAMIC CINEMATIC LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.95);
    scene.add(ambientLight);

    const mainSun = new THREE.DirectionalLight(0xfffaed, 3.5);
    mainSun.position.set(50, 90, 110);
    scene.add(mainSun);

    const candleLight = new THREE.PointLight(0xffaa00, 5, 320);
    candleLight.position.set(0, 20, 80);
    scene.add(candleLight);

    // Đèn phát quang từ tâm Cổng Không Gian
    const portalGlowLight = new THREE.PointLight(platform.colorHex, 10, 300);
    portalGlowLight.position.set(56, 40, -10);
    scene.add(portalGlowLight);

    // =========================================================================
    // 3. 500 FLOATING GOLDEN CANDLELIGHT MOTES (HOGWARTS ATMOSPHERE)
    // =========================================================================
    const dustCount = 500;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 260;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 160;

      dustVelocities[i * 3] = (Math.random() - 0.5) * 0.12;
      dustVelocities[i * 3 + 1] = 0.08 + Math.random() * 0.28;
      dustVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xfde68a,
      size: 2.6,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // =========================================================================
    // 4. THE 3D SACRED PARCHMENT LETTER (LÁ THƯ DA CỔ MẠ VÀNG SIÊU TINH XẢO)
    // =========================================================================
    const cardPivot = new THREE.Group();
    scene.add(cardPivot);

    const parchmentTex = createLuxuryParchmentTexture();

    // Thân bao thư da thuộc có hoa văn vàng
    const letterBodyGeo = new THREE.BoxGeometry(56, 78, 2.2);
    const letterBodyMat = new THREE.MeshStandardMaterial({
      map: parchmentTex,
      roughness: 0.3,
      metalness: 0.4,
      bumpScale: 0.05
    });
    const letterBodyMesh = new THREE.Mesh(letterBodyGeo, letterBodyMat);
    cardPivot.add(letterBodyMesh);

    // Nắp phong thư tam giác mạ vàng xếp gập 3D
    const flapGeo = new THREE.ConeGeometry(25, 20, 4);
    const flapMat = new THREE.MeshStandardMaterial({
      color: 0xcaa974,
      roughness: 0.25,
      metalness: 0.5,
      emissive: 0x451a03,
      emissiveIntensity: 0.2
    });
    const flapMesh = new THREE.Mesh(flapGeo, flapMat);
    flapMesh.rotation.z = Math.PI;
    flapMesh.position.set(0, 32, 1.4);
    flapMesh.scale.set(0.001, 0.001, 0.001);
    cardPivot.add(flapMesh);

    // Ruy băng vàng buộc thư (Gold Ribbon Thread)
    const ribbonGeo = new THREE.BoxGeometry(57, 6, 2.6);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0xb45309,
      emissiveIntensity: 0.35
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbonMesh.position.set(0, 0, 0);
    cardPivot.add(ribbonMesh);

    // Con dấu sáp 3D đỏ thẫm đúc nổi viền gồ ghề tự nhiên (Molten Wax Seal)
    const sealGeo = new THREE.CylinderGeometry(9.5, 9.5, 2.5, 36);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.12,
      metalness: 0.7,
      emissive: 0x450a0a,
      emissiveIntensity: 0.5
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.rotation.x = Math.PI / 2;
    sealMesh.position.set(0, 0, 2.4);
    sealMesh.scale.set(0.001, 0.001, 0.001);
    cardPivot.add(sealMesh);

    // Bánh Thánh & Thánh Giá vàng đúc trên tâm con dấu
    const crossGeo = new THREE.BoxGeometry(7, 1.2, 0.6);
    const crossMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const crossH = new THREE.Mesh(crossGeo, crossMat);
    crossH.position.set(0, 0, 3.8);
    const crossVGeo = new THREE.BoxGeometry(1.2, 9, 0.6);
    const crossV = new THREE.Mesh(crossVGeo, crossMat);
    crossV.position.set(0, 0, 3.8);
    cardPivot.add(crossH);
    cardPivot.add(crossV);
    crossH.scale.set(0.001, 0.001, 0.001);
    crossV.scale.set(0.001, 0.001, 0.001);

    // Vành chấn động vàng dập mộc sáp
    const sealShockGeo = new THREE.TorusGeometry(14, 1.2, 16, 48);
    const sealShockMat = new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0 });
    const sealShockMesh = new THREE.Mesh(sealShockGeo, sealShockMat);
    sealShockMesh.position.set(0, 0, 2.6);
    cardPivot.add(sealShockMesh);

    // =========================================================================
    // 5. ULTRA-DENSE & SILKY HYPERSPACE COSMIC VORTEX (3,500 PARTICLES + NEBULA RINGS)
    // =========================================================================
    const portalGroup = new THREE.Group();
    portalGroup.position.set(56, 40, -15);
    portalGroup.scale.set(0.001, 0.001, 0.001);
    scene.add(portalGroup);

    // 4 Vành Đai Xoáy Quang Học Đa Chiều (Volumetric Torus Rings)
    const portalRingGeo1 = new THREE.TorusGeometry(32, 4.2, 24, 96);
    const portalRingMat1 = new THREE.MeshStandardMaterial({
      color: platform.colorHex,
      emissive: platform.colorHex,
      emissiveIntensity: 2.5,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.95
    });
    const portalRing1 = new THREE.Mesh(portalRingGeo1, portalRingMat1);
    portalGroup.add(portalRing1);

    const portalRingGeo2 = new THREE.TorusGeometry(23, 3.2, 20, 80);
    const portalRingMat2 = new THREE.MeshStandardMaterial({
      color: platform.portalSecondaryHex,
      emissive: platform.portalSecondaryHex,
      emissiveIntensity: 2.0,
      roughness: 0.15,
      transparent: true,
      opacity: 0.9
    });
    const portalRing2 = new THREE.Mesh(portalRingGeo2, portalRingMat2);
    portalGroup.add(portalRing2);

    const portalRingGeo3 = new THREE.TorusGeometry(14, 2.2, 16, 64);
    const portalRingMat3 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.98 });
    const portalRing3 = new THREE.Mesh(portalRingGeo3, portalRingMat3);
    portalGroup.add(portalRing3);

    // Lõi hố đen sâu thẳm
    const portalCoreGeo = new THREE.SphereGeometry(9, 32, 32);
    const portalCoreMat = new THREE.MeshBasicMaterial({ color: 0x030202 });
    const portalCoreMesh = new THREE.Mesh(portalCoreGeo, portalCoreMat);
    portalGroup.add(portalCoreMesh);

    // HỆ THỐNG 3,500 HẠT XOÁY NGHUYỄN DÀY ĐẶC (FIBONACCI SPIRAL ACCRETION VORTEX)
    const portalVortexCount = 3500;
    const portalVortexGeo = new THREE.BufferGeometry();
    const portalVortexPos = new Float32Array(portalVortexCount * 3);
    const portalVortexAngles = new Float32Array(portalVortexCount);
    const portalVortexRadii = new Float32Array(portalVortexCount);
    const portalVortexSpeeds = new Float32Array(portalVortexCount);
    const portalVortexZOffsets = new Float32Array(portalVortexCount);

    for (let i = 0; i < portalVortexCount; i++) {
      // Bố trí theo 5 nhánh xoắn ốc Fibonacci
      const arm = i % 5;
      const armOffset = (arm * Math.PI * 2) / 5;
      const norm = i / portalVortexCount;
      const radius = 3 + Math.pow(norm, 0.7) * 36;
      const angle = armOffset + radius * 0.45 + (Math.random() - 0.5) * 0.35;

      portalVortexAngles[i] = angle;
      portalVortexRadii[i] = radius;
      portalVortexSpeeds[i] = 2.2 + (1 - norm) * 4.5;
      portalVortexZOffsets[i] = (Math.random() - 0.5) * 16;

      portalVortexPos[i * 3] = Math.cos(angle) * radius;
      portalVortexPos[i * 3 + 1] = Math.sin(angle) * radius;
      portalVortexPos[i * 3 + 2] = portalVortexZOffsets[i];
    }

    portalVortexGeo.setAttribute('position', new THREE.BufferAttribute(portalVortexPos, 3));
    const portalVortexMat = new THREE.PointsMaterial({
      color: platform.portalSecondaryHex,
      size: 2.2,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const portalVortexParticles = new THREE.Points(portalVortexGeo, portalVortexMat);
    portalGroup.add(portalVortexParticles);

    // =========================================================================
    // 6. PRODUCTION 3D BIRD MODEL (GLTFLoader + AnimationMixer)
    // =========================================================================
    const birdRoot = new THREE.Group();
    birdRoot.position.set(-150, 95, -30);
    birdRoot.scale.set(0.001, 0.001, 0.001);
    scene.add(birdRoot);

    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    // Fallback Procedural Origami Bird
    const fallbackBirdGroup = new THREE.Group();
    const origamiWingMat = new THREE.MeshStandardMaterial({
      color: 0xfffbeb,
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0xd4af37,
      emissiveIntensity: 0.45
    });

    const bodyGeo = new THREE.ConeGeometry(7, 24, 16);
    const bodyMesh = new THREE.Mesh(bodyGeo, origamiWingMat);
    bodyMesh.rotation.x = -Math.PI / 4;
    fallbackBirdGroup.add(bodyMesh);

    const leftWingRoot = new THREE.Group();
    leftWingRoot.position.set(-5, 4, 0);
    const wingShapeGeo = new THREE.BoxGeometry(26, 12, 1);
    const leftWingMesh = new THREE.Mesh(wingShapeGeo, origamiWingMat);
    leftWingMesh.position.set(-13, 0, 0);
    leftWingRoot.add(leftWingMesh);
    fallbackBirdGroup.add(leftWingRoot);

    const rightWingRoot = new THREE.Group();
    rightWingRoot.position.set(5, 4, 0);
    const rightWingMesh = new THREE.Mesh(wingShapeGeo, origamiWingMat);
    rightWingMesh.position.set(13, 0, 0);
    rightWingRoot.add(rightWingMesh);
    fallbackBirdGroup.add(rightWingRoot);

    fallbackBirdGroup.scale.set(1.2, 1.2, 1.2);
    birdRoot.add(fallbackBirdGroup);

    // Load Production GLTF Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/Stork.glb',
      (gltf) => {
        fallbackBirdGroup.visible = false;
        const gltfScene = gltf.scene;

        gltfScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              roughness: 0.2,
              metalness: 0.5,
              emissive: 0x451a03,
              emissiveIntensity: 0.25
            });
            mesh.castShadow = true;
          }
        });

        gltfScene.scale.set(0.18, 0.18, 0.18);
        gltfScene.rotation.y = Math.PI / 2;
        birdRoot.add(gltfScene);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(gltfScene);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      (err) => {
        console.warn('Using procedural 3D fallback:', err);
      }
    );

    // =========================================================================
    // 7. BLOCKBUSTER 3D MOTION GRAPHICS TIMELINE (60FPS CONTINUOUS RENDER)
    // =========================================================================
    let startTime = performance.now();
    let animFrameId: number;

    const animate = (now: number) => {
      const delta = clock.getDelta();
      const elapsed = (now - startTime) / 1000;

      if (mixer) {
        mixer.update(delta * 2.2);
      } else {
        const wingFlap = Math.sin(elapsed * 20) * 0.85;
        leftWingRoot.rotation.z = wingFlap;
        rightWingRoot.rotation.z = -wingFlap;
      }

      // Floating ambient dust
      const dustPos = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3 + 1] += dustVelocities[i * 3 + 1];
        if (dustPos[i * 3 + 1] > 100) dustPos[i * 3 + 1] = -90;
      }
      dustGeo.attributes.position.needsUpdate = true;
      dustParticles.rotation.y = elapsed * 0.08;

      // ==========================================
      // STAGE 1 (0.0s -> 0.85s): CARD 3D MULTI-AXIS FOLD & WAX SEAL SLAM
      // ==========================================
      if (elapsed < 0.85) {
        const foldProgress = elapsed / 0.85;
        camera.position.z = 165 - Math.sin(foldProgress * Math.PI) * 15;
        camera.position.y = Math.sin(foldProgress * Math.PI) * 5;

        cardPivot.rotation.y = foldProgress * Math.PI * 0.55;
        cardPivot.rotation.x = foldProgress * 0.35;
        cardPivot.scale.set(1 - foldProgress * 0.58, 1 - foldProgress * 0.68, 1);
        cardPivot.position.y = -foldProgress * 18;

        if (foldProgress > 0.45) {
          const sealProg = (foldProgress - 0.45) / 0.55;
          flapMesh.scale.set(sealProg, sealProg, sealProg);
          sealMesh.scale.set(sealProg * 1.1, sealProg * 1.1, sealProg * 1.1);
          crossH.scale.set(sealProg, sealProg, sealProg);
          crossV.scale.set(sealProg, sealProg, sealProg);

          if (sealProg > 0.8) {
            const shockProg = (sealProg - 0.8) / 0.2;
            sealShockMesh.scale.set(1 + shockProg * 2.5, 1 + shockProg * 2.5, 1);
            sealShockMat.opacity = 1 - shockProg;
          }
        }
      }

      // ==========================================
      // STAGE 2 (0.35s -> 2.4s): DENSE FIBONACCI ACCRETION VORTEX SWIRL
      // ==========================================
      if (elapsed >= 0.35 && elapsed < 2.4) {
        const portalProg = Math.min((elapsed - 0.35) / 0.45, 1);
        portalGroup.scale.set(portalProg, portalProg, portalProg);

        portalRing1.rotation.z = elapsed * 4.5;
        portalRing1.rotation.x = elapsed * 2.5;
        portalRing2.rotation.z = -elapsed * 3.8;
        portalRing2.rotation.y = elapsed * 3.0;
        portalRing3.rotation.z = elapsed * 6.0;

        // Vận hành 3,500 hạt xoáy xoắn ốc dày đặc mượt mà
        const vortexPos = portalVortexGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < portalVortexCount; i++) {
          portalVortexAngles[i] += portalVortexSpeeds[i] * 0.028;
          portalVortexRadii[i] -= 0.14;
          if (portalVortexRadii[i] < 2.5) portalVortexRadii[i] = 34 + Math.random() * 5;

          vortexPos[i * 3] = Math.cos(portalVortexAngles[i]) * portalVortexRadii[i];
          vortexPos[i * 3 + 1] = Math.sin(portalVortexAngles[i]) * portalVortexRadii[i];
        }
        portalVortexGeo.attributes.position.needsUpdate = true;
        portalGlowLight.intensity = 8 + Math.sin(elapsed * 12) * 3.5;
      }

      // ==========================================
      // STAGE 3 (0.5s -> 1.35s): BIRD SWOOPS DOWN ALONG PARABOLIC ARC
      // ==========================================
      if (elapsed >= 0.5 && elapsed < 1.35) {
        const birdProg = (elapsed - 0.5) / 0.85;
        birdRoot.scale.set(birdProg * 1.15, birdProg * 1.15, birdProg * 1.15);

        birdRoot.position.x = -150 + birdProg * 150;
        birdRoot.position.y = 95 - Math.sin(birdProg * Math.PI * 0.55) * 115;
        birdRoot.position.z = -30 + birdProg * 40;
        birdRoot.rotation.z = (1 - birdProg) * -0.55;
        birdRoot.rotation.x = -0.2 + (1 - birdProg) * 0.4;
      }

      // ==========================================
      // STAGE 4 (1.35s -> 2.15s): BIRD CARRIES LETTER & WARPS INTO PORTAL
      // ==========================================
      if (elapsed >= 1.35 && elapsed < 2.15) {
        const flyProg = (elapsed - 1.35) / 0.8;
        const targetX = 56;
        const targetY = 40;
        const targetZ = -28;

        birdRoot.position.x = flyProg * targetX;
        birdRoot.position.y = -20 + flyProg * (targetY - -20);
        birdRoot.position.z = 10 + flyProg * (targetZ - 10);
        birdRoot.scale.set(1.15 * (1 - flyProg * 0.85), 1.15 * (1 - flyProg * 0.85), 1.15 * (1 - flyProg * 0.85));
        birdRoot.rotation.z = flyProg * 0.5;
        birdRoot.rotation.x = -0.3 + flyProg * 0.6;

        cardPivot.position.x = birdRoot.position.x;
        cardPivot.position.y = birdRoot.position.y - 12;
        cardPivot.position.z = birdRoot.position.z;
        cardPivot.scale.set(0.42 * (1 - flyProg * 0.85), 0.32 * (1 - flyProg * 0.85), 0.42 * (1 - flyProg * 0.85));
      }

      // ==========================================
      // STAGE 5 (2.15s -> 2.55s): PORTAL COLLAPSE & DISPATCH
      // ==========================================
      if (elapsed >= 2.15 && elapsed < 2.55) {
        const closeProg = (elapsed - 2.15) / 0.4;
        portalGroup.scale.set(1 - closeProg, 1 - closeProg, 1 - closeProg);
        portalGroup.rotation.z = elapsed * 14;
        birdRoot.scale.set(0.001, 0.001, 0.001);
        cardPivot.scale.set(0.001, 0.001, 0.001);
      }

      if (elapsed >= 2.55) {
        cancelAnimationFrame(animFrameId);
        onFinished();
        return;
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      letterBodyGeo.dispose();
      letterBodyMat.dispose();
      parchmentTex.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      portalRingGeo1.dispose();
      portalRingMat1.dispose();
      portalVortexGeo.dispose();
      portalVortexMat.dispose();
      renderer.dispose();
    };
  }, [platform, onFinished]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    />
  );
}
