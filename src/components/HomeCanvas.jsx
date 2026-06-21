import { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import CoreGlyph from './CoreGlyph';
import WorkspaceModule from './WorkspaceModule';
import bgDesktop from '../assets/backgrounds/os-bg-desktop.webp';
import bgMobile from '../assets/backgrounds/os-bg-mobile.webp';

const TAU = Math.PI * 2;
const MIN_ORBIT_RADIUS = 220;
const MAX_ORBIT_RADIUS = 380;
const FOCUS_X = -235;
const FOCUS_Y = -28;
const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const MODULES = [
  {
    id: 'spendly',
    title: 'Spendly',
    platform: 'iOS',
    domain: 'Finance',
    type: 'iOS Finance App',
    description: 'Personal finance tracking built for expense organization and spending visibility.',
    role: 'iOS Developer',
    stack: 'Swift · SwiftUI · Personal Finance',
    status: 'Active',
    githubUrl: 'https://github.com/MahdiarMzi/spendly-ios',
    baseAngle: Math.PI * 1.12,
    baseRadius: 340,
    angularSpeed: 0.081,
    speedVariation: 0.012,
    speedPeriod: 22,
    radiusAmplitude: 18,
    radiusPeriod: 27,
    radiusPhase: 0.4,
    compression: 0.54,
    compressionVariation: 0.012,
    compressionPeriod: 34,
  },
  {
    id: 'shamsa',
    title: 'Shamsa',
    panelTitle: 'Shamsa Immigration Website',
    platform: 'Web',
    domain: 'Immigration',
    type: 'Client Website',
    description: 'Production website for an immigration consulting business focused on clarity, trust, and responsive access.',
    role: 'Web Developer',
    stack: 'HTML · CSS · JavaScript · SEO',
    status: 'Live',
    liveUrl: 'https://shamsa.ca/',
    githubUrl: 'https://github.com/MahdiarMzi/shamsa-immigration-website',
    baseAngle: Math.PI * 0.57,
    baseRadius: 274,
    angularSpeed: 0.074,
    speedVariation: 0.01,
    speedPeriod: 29,
    radiusAmplitude: 22,
    radiusPeriod: 23,
    radiusPhase: 2.1,
    compression: 0.57,
    compressionVariation: 0.014,
    compressionPeriod: 39,
  },
  {
    id: 'mahshid',
    title: 'Mahshid',
    panelTitle: 'Mahshid Bridal Couture',
    platform: 'Web',
    domain: 'Fashion',
    type: 'Boutique Website',
    description: 'Elegant boutique website for presenting bridal couture and luxury fashion collections.',
    role: 'Web Developer',
    stack: 'HTML · CSS · JavaScript · Responsive Design',
    status: 'Live',
    liveUrl: 'https://mahshidcouture.com/',
    githubUrl: 'https://github.com/MahdiarMzi/mahshid-bridal-couture',
    baseAngle: Math.PI * 0.04,
    baseRadius: 346,
    angularSpeed: 0.086,
    speedVariation: 0.009,
    speedPeriod: 25,
    radiusAmplitude: 16,
    radiusPeriod: 31,
    radiusPhase: 4.4,
    compression: 0.54,
    compressionVariation: 0.011,
    compressionPeriod: 36,
  },
  {
    id: 'job-tracker',
    title: 'Job Tracker',
    panelTitle: 'Job Application Tracker',
    platform: 'Building',
    domain: 'Productivity',
    type: 'Web App',
    description: 'Application tracking workspace for jobs, statuses, interviews, notes, and progress.',
    role: 'Full-Stack Builder',
    stack: 'React · Dashboard UI · Data Flow',
    status: 'Building',
    comingSoon: true,
    baseAngle: Math.PI * 1.57,
    baseRadius: 248,
    angularSpeed: 0.078,
    speedVariation: 0.011,
    speedPeriod: 32,
    radiusAmplitude: 20,
    radiusPeriod: 19,
    radiusPhase: 5.6,
    compression: 0.59,
    compressionVariation: 0.013,
    compressionPeriod: 42,
  },
];

const normalizeAngle = (angle) => {
  let next = angle % TAU;
  if (next > Math.PI) next -= TAU;
  if (next < -Math.PI) next += TAU;
  return next;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const smoothstep = (start, end, value) => {
  const progress = clamp((value - start) / (end - start), 0, 1);
  return progress * progress * (3 - 2 * progress);
};

const getFocusState = (progress) => {
  const engagement = smoothstep(0.025, 0.13, progress);
  const timeline = clamp((progress - 0.13) / 0.72, 0, 1) * (MODULES.length - 1);
  const weights = MODULES.map((_, index) => {
    const proximity = clamp(1 - Math.abs(timeline - index), 0, 1);
    return smoothstep(0, 1, proximity) * engagement;
  });
  return { engagement, timeline, weights };
};

const MODULE_BY_ID = Object.fromEntries(MODULES.map((mod) => [mod.id, mod]));

function ProjectVisual({ projectId }) {
  if (projectId === 'spendly') {
    return (
      <div className="project-visual project-visual--spendly" aria-hidden="true">
        <div className="project-visual__phone">
          <span className="project-visual__phone-bar" />
          <span className="project-visual__balance" />
          <span className="project-visual__chart"><i /><i /><i /><i /><i /></span>
          <span className="project-visual__phone-row" />
          <span className="project-visual__phone-row project-visual__phone-row--short" />
        </div>
        <div className="project-visual__orbit-mark project-visual__orbit-mark--one" />
        <div className="project-visual__orbit-mark project-visual__orbit-mark--two" />
      </div>
    );
  }

  if (projectId === 'shamsa') {
    return (
      <div className="project-visual project-visual--shamsa" aria-hidden="true">
        <div className="project-visual__browser">
          <div className="project-visual__browser-bar"><i /><i /><i /><span /></div>
          <div className="project-visual__web-hero"><span /><span /></div>
          <div className="project-visual__web-grid"><i /><i /><i /></div>
        </div>
      </div>
    );
  }

  if (projectId === 'mahshid') {
    return (
      <div className="project-visual project-visual--mahshid" aria-hidden="true">
        <div className="project-visual__editorial-image"><span /></div>
        <div className="project-visual__editorial-copy">
          <i />
          <span />
          <span />
          <span className="project-visual__editorial-rule" />
        </div>
        <b>COLLECTION / 01</b>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--tracker" aria-hidden="true">
      <div className="project-visual__dashboard-bar"><span /><i /><i /></div>
      <div className="project-visual__kanban">
        <div><span /><i /><i /></div>
        <div><span /><i /></div>
        <div><span /><i /><i /></div>
      </div>
    </div>
  );
}

function ProjectFocusPanel({ project, index, panelRef, mobile = false }) {
  const title = project.panelTitle || project.title;

  return (
    <article
      className={`project-focus-panel${mobile ? ' project-focus-panel--mobile' : ''}`}
      ref={panelRef}
      aria-hidden={mobile ? undefined : 'true'}
    >
      <header className="project-focus-panel__header">
        <span className="project-focus-panel__index">0{index + 1}</span>
        <div className="project-focus-panel__heading">
          <h2>{title}</h2>
          <p>{project.type}</p>
        </div>
        <span className={`project-focus-panel__status project-focus-panel__status--${project.status.toLowerCase()}`}>
          {project.status}
        </span>
      </header>

      <ProjectVisual projectId={project.id} />

      <p className="project-focus-panel__description">{project.description}</p>

      <dl className="project-focus-panel__meta">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="project-focus-panel__stack">
          <dt>Stack</dt>
          <dd>{project.stack}</dd>
        </div>
      </dl>

      <div className="project-focus-panel__actions">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            Live Site <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.comingSoon && <span className="project-focus-panel__coming-soon">Coming Soon</span>}
      </div>
    </article>
  );
}

function HomeCanvas({ selectedWorkspace, onSelectWorkspace, activeView }) {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  const orbitRef = useRef(null);
  const scrollRef = useRef(null);
  const centerRef = useRef({ x: 0, y: 0 });
  const moduleRefs = useRef({});
  const lineRefs = useRef({});
  const ringRefs = useRef({});
  const previewRefs = useRef({});
  const scrollCueRef = useRef(null);
  const rafRef = useRef(null);
  const suppressClickRef = useRef(null);
  const pointerRef = useRef(null);
  const focusProgressRef = useRef({ current: 0, target: 0 });
  const statesRef = useRef(Object.fromEntries(MODULES.map((mod) => [mod.id, {
    angle: mod.baseAngle,
    targetAngle: mod.baseAngle,
    baseRadius: mod.baseRadius,
    targetRadius: mod.baseRadius,
    motionTime: 0,
    laneOffset: 0,
    speedBias: 0,
    targetSpeedBias: 0,
    dragX: 0,
    dragY: 0,
    adapting: false,
    hovered: false,
    focused: false,
    dragging: false,
  }])));

  const guided = activeView === 'home' && !mobile && !reducedMotion;

  const isStabilized = useCallback((id) => {
    const state = statesRef.current[id];
    if (state.dragging) return true;
    if (state.adapting) return false;
    return state.hovered || state.focused;
  }, []);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setMobile(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event) => setReducedMotion(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);


  const getCompression = useCallback((mod, state) => (
    mod.compression
    + Math.sin((state.motionTime / mod.compressionPeriod) * TAU + mod.radiusPhase) * mod.compressionVariation
  ), []);

  const getPosition = useCallback((mod) => {
    const state = statesRef.current[mod.id];
    const radius = state.baseRadius
      + state.laneOffset
      + Math.sin((state.motionTime / mod.radiusPeriod) * TAU + mod.radiusPhase) * mod.radiusAmplitude;
    const compression = getCompression(mod, state);
    return {
      x: radius * Math.cos(state.angle) + state.dragX,
      y: radius * compression * Math.sin(state.angle) + state.dragY,
      depth: (Math.sin(state.angle) + 1) / 2,
      radius,
      compression,
    };
  }, [getCompression]);

  const applyFrame = useCallback(() => {
    const { x: cx, y: cy } = centerRef.current;
    if (!cx && !cy) return;

    const focus = getFocusState(focusProgressRef.current.current);

    MODULES.forEach((mod, index) => {
      const state = statesRef.current[mod.id];
      const { x, y, depth, compression } = getPosition(mod);
      const stabilized = isStabilized(mod.id);
      const active = stabilized || state.dragging || state.adapting;
      const focusWeight = focus.weights[index];
      const recedeWeight = focus.engagement * (1 - focusWeight);
      const orbitScale = active ? 1.015 : 0.93 + 0.07 * depth;
      const orbitOpacity = active ? 1 : 0.76 + 0.24 * depth;
      const handoffArc = 4 * focusWeight * (1 - focusWeight);
      const handoffSide = Math.sign(index - focus.timeline);
      const displayX = x + (FOCUS_X - x) * focusWeight - handoffArc * 42;
      const displayY = y + (FOCUS_Y - y) * focusWeight + handoffSide * handoffArc * 82;
      const scale = (orbitScale + (1.11 - orbitScale) * focusWeight) * (1 - recedeWeight * 0.075);
      const opacity = (orbitOpacity + (1 - orbitOpacity) * focusWeight) * (1 - recedeWeight * 0.62);

      const element = moduleRefs.current[mod.id];
      if (element) {
        element.style.left = `${cx + displayX}px`;
        element.style.top = `${cy + displayY}px`;
        element.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
        element.style.opacity = opacity.toFixed(4);
        element.style.zIndex = state.dragging || focusWeight > 0.5
          ? 30
          : String(Math.round(depth * 8) + 4);
        element.classList.toggle('orbit-module-wrap--stabilized', active);
        element.classList.toggle('orbit-module-wrap--dragging', state.dragging);
        element.classList.toggle('orbit-module-wrap--focused', focusWeight > 0.5);
      }

      const line = lineRefs.current[mod.id];
      if (line) {
        line.setAttribute('x1', cx);
        line.setAttribute('y1', cy - 30);
        line.setAttribute('x2', cx + displayX);
        line.setAttribute('y2', cy + displayY);
        const lineOpacity = (active ? 0.31 : 0.12 + 0.09 * depth)
          * (1 - recedeWeight * 0.72)
          + focusWeight * 0.12;
        line.setAttribute('opacity', lineOpacity.toFixed(3));
      }

      // Each module owns a faint guide ellipse. During a drag it previews the
      // lane implied by the pointer; after release it eases with the new radius.
      const ring = ringRefs.current[mod.id];
      if (ring) {
        const polarX = x;
        const polarY = y / compression;
        const previewRadius = clamp(Math.hypot(polarX, polarY), MIN_ORBIT_RADIUS, MAX_ORBIT_RADIUS);
        const guideRadius = state.dragging ? previewRadius : state.baseRadius + state.laneOffset;
        ring.setAttribute('cx', cx);
        ring.setAttribute('cy', cy);
        ring.setAttribute('rx', guideRadius.toFixed(2));
        ring.setAttribute('ry', (guideRadius * compression).toFixed(2));
        const ringOpacity = (state.dragging ? 0.2 : state.adapting ? 0.12 : 0.055)
          * (1 - focus.engagement * 0.72);
        ring.setAttribute('opacity', ringOpacity.toFixed(3));
        ring.classList.toggle('orbit-ring--active', state.dragging || state.adapting);
      }

      const preview = previewRefs.current[mod.id];
      if (preview) {
        // Preview copy yields briefly at the midpoint so two project names
        // never become visually superimposed during a module crossfade.
        const previewWeight = smoothstep(0.5, 0.92, focusWeight);
        preview.style.opacity = previewWeight.toFixed(4);
        preview.style.transform = `translateY(calc(-50% + ${(1 - previewWeight) * 14}px)) scale(${(0.985 + previewWeight * 0.015).toFixed(4)})`;
        preview.style.visibility = previewWeight > 0.01 ? 'visible' : 'hidden';
        preview.style.pointerEvents = previewWeight > 0.5 ? 'auto' : 'none';
        preview.inert = previewWeight <= 0.5;
        preview.setAttribute('aria-hidden', previewWeight > 0.5 ? 'false' : 'true');
      }
    });

    if (scrollCueRef.current) {
      const cueOpacity = 1 - smoothstep(0.015, 0.08, focusProgressRef.current.current);
      scrollCueRef.current.style.opacity = cueOpacity.toFixed(3);
    }
  }, [getPosition, isStabilized]);

  const updateGeometry = useCallback(() => {
    if (!orbitRef.current) return;
    const rect = orbitRef.current.getBoundingClientRect();
    centerRef.current = { x: rect.width / 2, y: rect.height / 2 };
    applyFrame();
  }, [applyFrame]);

  useLayoutEffect(() => {
    if (mobile) return;
    updateGeometry();
  }, [mobile, updateGeometry]);

  useEffect(() => {
    if (mobile) return undefined;
    const handleResize = () => updateGeometry();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobile, updateGeometry]);

  useEffect(() => {
    if (guided) return;
    focusProgressRef.current.current = 0;
    focusProgressRef.current.target = 0;
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    applyFrame();
  }, [applyFrame, guided]);

  const handleScroll = useCallback((event) => {
    if (!guided) return;
    const element = event.currentTarget;
    const scrollRange = element.scrollHeight - element.clientHeight;
    focusProgressRef.current.target = scrollRange > 0
      ? clamp(element.scrollTop / scrollRange, 0, 1)
      : 0;
  }, [guided]);

  useEffect(() => {
    if (mobile || reducedMotion) return undefined;
    let lastTime = 0;

    const tick = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = Math.min((timestamp - lastTime) / 1000, 0.05);
      lastTime = timestamp;

      const focusEase = 1 - Math.exp(-delta * 5.5);
      focusProgressRef.current.current += (
        focusProgressRef.current.target - focusProgressRef.current.current
      ) * focusEase;

      MODULES.forEach((mod) => {
        const state = statesRef.current[mod.id];
        if (!isStabilized(mod.id)) {
          state.motionTime += delta;
          const variation = Math.sin((state.motionTime / mod.speedPeriod) * TAU + mod.radiusPhase);
          const speedEase = 1 - Math.exp(-delta * 0.9);
          state.speedBias += (state.targetSpeedBias - state.speedBias) * speedEase;
          const speed = Math.max(0.052, mod.angularSpeed + state.speedBias + variation * mod.speedVariation);

          // Both angles advance clockwise. Adaptation may gently slow or
          // accelerate the module, but its angular advance is always positive.
          const normalAdvance = speed * delta;
          if (state.adapting) {
            state.targetAngle += speed * delta;
            const angleEase = 1 - Math.exp(-delta * 1.2);
            const desiredAdvance = normalAdvance
              + normalizeAngle(state.targetAngle - state.angle) * angleEase;
            const adaptiveAdvance = clamp(
              desiredAdvance,
              normalAdvance * 0.25,
              normalAdvance * 2.1
            );
            state.angle += adaptiveAdvance;

            const adaptEase = 1 - Math.exp(-delta * 2.2);
            const radiusEase = 1 - Math.exp(-delta * 2.6);
            state.baseRadius += (state.targetRadius - state.baseRadius) * radiusEase;
            state.dragX += (0 - state.dragX) * adaptEase;
            state.dragY += (0 - state.dragY) * adaptEase;

            const settled = Math.abs(normalizeAngle(state.targetAngle - state.angle)) < 0.001
              && Math.abs(state.targetRadius - state.baseRadius) < 0.15
              && Math.hypot(state.dragX, state.dragY) < 0.15;
            if (settled) {
              state.angle = state.targetAngle;
              state.baseRadius = state.targetRadius;
              state.dragX = 0;
              state.dragY = 0;
              state.adapting = false;
            }
          } else {
            state.angle += normalAdvance;
          }
        }
        state.laneOffset *= Math.exp(-delta * 0.9);
      });

      // A small, bounded lane adjustment prevents cards from occupying the same
      // screen space without making the movement look reactive or game-like.
      const positions = Object.fromEntries(MODULES.map((mod) => [mod.id, getPosition(mod)]));
      for (let i = 0; i < MODULES.length; i += 1) {
        for (let j = i + 1; j < MODULES.length; j += 1) {
          const first = MODULES[i];
          const second = MODULES[j];
          const a = positions[first.id];
          const b = positions[second.id];
          const overlapX = 210 - Math.abs(a.x - b.x);
          const overlapY = 82 - Math.abs(a.y - b.y);
          if (overlapX <= 0 || overlapY <= 0) continue;

          const pressure = Math.min(1, Math.min(overlapX / 210, overlapY / 82));
          const firstState = statesRef.current[first.id];
          const secondState = statesRef.current[second.id];
          if (!isStabilized(first.id)) firstState.laneOffset -= pressure * 30 * delta;
          if (!isStabilized(second.id)) secondState.laneOffset += pressure * 30 * delta;

          const separation = normalizeAngle(secondState.angle - firstState.angle) || 1;
          const direction = Math.sign(separation);
          if (!isStabilized(first.id)) firstState.angle -= direction * pressure * 0.035 * delta;
          if (!isStabilized(second.id)) secondState.angle += direction * pressure * 0.035 * delta;
        }
      }

      applyFrame();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyFrame, getPosition, isStabilized, mobile, reducedMotion]);

  const setInteraction = useCallback((id, key, value) => {
    statesRef.current[id][key] = value;
    applyFrame();
  }, [applyFrame]);

  const handlePointerDown = useCallback((id, event) => {
    if (
      mobile
      || reducedMotion
      || focusProgressRef.current.current > 0.025
      || event.pointerType === 'touch'
      || event.button !== 0
    ) return;
    const state = statesRef.current[id];
    state.dragging = true;
    pointerRef.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: state.dragX,
      originY: state.dragY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    applyFrame();
  }, [applyFrame, mobile, reducedMotion]);

  const handlePointerMove = useCallback((id, event) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== id || pointer.pointerId !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    const distance = Math.hypot(dx, dy);
    const limit = 132;
    const ratio = distance > limit ? limit / distance : 1;
    const state = statesRef.current[id];
    state.dragX = pointer.originX + dx * ratio;
    state.dragY = pointer.originY + dy * ratio;
    pointer.moved = pointer.moved || distance > 5;
    applyFrame();
  }, [applyFrame]);

  const handlePointerEnd = useCallback((id, event) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== id || pointer.pointerId !== event.pointerId) return;
    const state = statesRef.current[id];
    const mod = MODULE_BY_ID[id];

    if (pointer.moved) {
      // Convert the exact released screen position back into elliptical polar
      // coordinates. Dividing y by compression temporarily "un-squashes" the
      // ellipse, so atan2 and hypot yield its natural angle and radius.
      const released = getPosition(mod);
      const releasedAngle = Math.atan2(released.y / released.compression, released.x);
      const releasedRadius = Math.hypot(released.x, released.y / released.compression);
      const radiusOscillation = Math.sin(
        (state.motionTime / mod.radiusPeriod) * TAU + mod.radiusPhase
      ) * mod.radiusAmplitude;
      const desiredRadius = clamp(releasedRadius, MIN_ORBIT_RADIUS, MAX_ORBIT_RADIUS);

      // Keep current parameters and drag offset intact on this frame. The rAF
      // loop eases all three toward these targets together, preserving the
      // release pixel while the new orbit gradually takes ownership of it.
      state.targetAngle = state.angle + normalizeAngle(releasedAngle - state.angle);
      state.targetRadius = clamp(
        desiredRadius - radiusOscillation - state.laneOffset,
        MIN_ORBIT_RADIUS,
        MAX_ORBIT_RADIUS
      );
      state.targetSpeedBias = clamp(
        (state.targetRadius - mod.baseRadius) / (MAX_ORBIT_RADIUS - MIN_ORBIT_RADIUS) * 0.006,
        -0.004,
        0.004
      );
      state.adapting = true;
      suppressClickRef.current = id;
    }

    state.dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointerRef.current = null;
    applyFrame();
  }, [applyFrame, getPosition]);

  const handleSelect = useCallback((id) => {
    if (suppressClickRef.current === id) {
      suppressClickRef.current = null;
      return;
    }
    onSelectWorkspace(selectedWorkspace === id ? null : id);
  }, [onSelectWorkspace, selectedWorkspace]);

  const selected = MODULES.find((mod) => mod.id === selectedWorkspace);

  const moduleProps = (mod) => ({
    ...mod,
    onSelect: handleSelect,
    isSelected: selectedWorkspace === mod.id,
    onPointerEnter: () => setInteraction(mod.id, 'hovered', true),
    onPointerLeave: () => setInteraction(mod.id, 'hovered', false),
    onFocus: () => setInteraction(mod.id, 'focused', true),
    onBlur: () => setInteraction(mod.id, 'focused', false),
    onPointerDown: (event) => handlePointerDown(mod.id, event),
    onPointerMove: (event) => handlePointerMove(mod.id, event),
    onPointerUp: (event) => handlePointerEnd(mod.id, event),
    onPointerCancel: (event) => handlePointerEnd(mod.id, event),
  });

  if (mobile) {
    return (
      <div className={`home-canvas home-canvas--${activeView}`} aria-label="Home">
        <div className="home-canvas__bg" style={{ backgroundImage: `url(${bgMobile})` }} aria-hidden="true" />
        <div className="home-canvas__bg-overlay" aria-hidden="true" />
        <div className="home-canvas__geometry" aria-hidden="true" />

        <div className="home-canvas__orbit home-canvas__orbit--mobile">
          <div className="home-canvas__core">
            <div className="core-ambient" aria-hidden="true" />
            <CoreGlyph size={72} pulse className="home-core-glyph" />
            <div className="home-canvas__identity">
              <h1 className="home-canvas__name">Mahdiar Mazinani</h1>
              <p className="home-canvas__subtitle">Computer Studies · Vancouver</p>
            </div>
          </div>
          <div className="mobile-project-sequence">
            {MODULES.map((mod, index) => (
              <ProjectFocusPanel key={mod.id} project={mod} index={index} mobile />
            ))}
          </div>
        </div>

        {selected && <p className="home-canvas__status" role="status" aria-live="polite">{selected.title} workspace selected</p>}
      </div>
    );
  }

  return (
    <div
      className={`home-canvas home-canvas--${activeView}${guided ? ' home-canvas--guided' : ''}`}
      aria-label={guided ? 'Home — scroll to explore work' : 'Home'}
      ref={scrollRef}
      onScroll={handleScroll}
      tabIndex={guided ? 0 : undefined}
    >
      <div className="home-canvas__scroll-space">
        <div className="home-canvas__stage">
          <div className="home-canvas__bg" style={{ backgroundImage: `url(${bgDesktop})` }} aria-hidden="true" />
          <div className="home-canvas__bg-overlay" aria-hidden="true" />
          <div className="home-canvas__geometry" aria-hidden="true" />
          <div className="canvas-depth-field" aria-hidden="true">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <g className="canvas-depth-field__rings">
                <ellipse cx="500" cy="450" rx="350" ry="218" />
                <ellipse cx="500" cy="450" rx="475" ry="310" />
                <ellipse cx="500" cy="450" rx="625" ry="410" />
                <ellipse cx="500" cy="450" rx="790" ry="520" />
              </g>
              <g className="canvas-depth-field__alignment">
                <line x1="500" y1="450" x2="500" y2="1000" />
                <line x1="500" y1="450" x2="414" y2="1000" />
                <line x1="500" y1="450" x2="586" y2="1000" />
                <line x1="188" y1="760" x2="812" y2="760" />
              </g>
              <g className="canvas-depth-field__distance">
                <ellipse cx="500" cy="990" rx="210" ry="48" />
                <ellipse cx="500" cy="1010" rx="365" ry="88" />
                <ellipse cx="500" cy="1030" rx="545" ry="132" />
              </g>
              <g className="canvas-depth-field__anchors">
                <circle cx="500" cy="760" r="1.6" />
                <circle cx="414" cy="1000" r="1.4" />
                <circle cx="500" cy="990" r="1.8" />
                <circle cx="586" cy="1000" r="1.4" />
              </g>
            </svg>
          </div>

          <div className="home-canvas__orbit" ref={orbitRef}>
            <svg className="orbit-rings" aria-hidden="true">
              {MODULES.map((mod, index) => (
                <ellipse
                  key={mod.id}
                  ref={(element) => { if (element) ringRefs.current[mod.id] = element; }}
                  cx="0" cy="0" rx="0" ry="0"
                  className={`orbit-ring orbit-ring--${(index % 3) + 1}`}
                />
              ))}
            </svg>

            <svg className="orbit-lines" aria-hidden="true">
              {MODULES.map((mod) => (
                <line
                  key={mod.id}
                  ref={(element) => { if (element) lineRefs.current[mod.id] = element; }}
                  x1="0" y1="0" x2="0" y2="0"
                />
              ))}
            </svg>

            <div className="core-ambient" aria-hidden="true" />
            <div className="home-canvas__core">
              <CoreGlyph size={88} pulse className="home-core-glyph" />
              <div className="home-canvas__identity">
                <h1 className="home-canvas__name">Mahdiar Mazinani</h1>
                <p className="home-canvas__subtitle">Computer Studies · Vancouver</p>
              </div>
            </div>

            {MODULES.map((mod) => (
              <div
                key={mod.id}
                className="orbit-module-wrap"
                ref={(element) => { if (element) moduleRefs.current[mod.id] = element; }}
              >
                <WorkspaceModule {...moduleProps(mod)} />
              </div>
            ))}
          </div>

          <div className="focus-preview-layer" aria-label="Active project preview">
            {MODULES.map((mod, index) => (
              <ProjectFocusPanel
                key={mod.id}
                project={mod}
                index={index}
                panelRef={(element) => { if (element) previewRefs.current[mod.id] = element; }}
              />
            ))}
          </div>

          {guided && (
            <p className="focus-scroll-cue" ref={scrollCueRef} aria-hidden="true">
              Scroll to explore work
            </p>
          )}

          {selected && <p className="home-canvas__status" role="status" aria-live="polite">{selected.title} workspace selected</p>}
        </div>
      </div>
    </div>
  );
}

export default HomeCanvas;
