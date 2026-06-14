<script setup lang="ts">
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal, useGsapScrubStagger } from '@/composables/useGsapReveal'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

useGsapScrubReveal(headerRef, { animation: 'fadeUp' })
useGsapScrubStagger(gridRef, '> .team-card-wrap', { stagger: 0.1 })

const avatarColors = [
  ['#27c8f7', '#0D4F8B'],
  ['#0D4F8B', '#1A6FC4'],
  ['#F5A623', '#E8890C'],
  ['#31efc4', '#20b3a0'],
  ['#27c8f7', '#0D4F8B'],
  ['#F5A623', '#E8890C'],
] as const

// Generate decorative dots array
const dotCount = 8
</script>

<template>
  <section id="team" ref="sectionRef" class="section team-section">
    <!-- Geometric background pattern -->
    <div class="team-pattern">
      <div
        v-for="n in 6"
        :key="n"
        class="team-pattern-ring"
        :style="{
          width: 60 + n * 40 + 'px',
          height: 60 + n * 40 + 'px',
          top: 10 + n * 12 + '%',
          left: (n % 2 === 0 ? 80 : 5) + '%',
          opacity: 0.03 + n * 0.01,
        }"
      ></div>
    </div>

    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" class="section-header centered">
        <div class="section-label">
          <span class="section-label-dot"></span>
          <span>{{ store.t.team.label }}</span>
        </div>
        <h2 class="section-title">
          {{ store.t.team.title.split("'")[0] }}<span class="accent">'{{ store.t.team.title.includes("'") ? store.t.team.title.split("'")[1] : '' }}</span>
        </h2>
        <p class="section-subtitle">
          {{ store.t.team.subtitle }}
        </p>
      </div>

      <!-- Grid -->
      <div ref="gridRef" class="team-grid">
        <div
          v-for="(member, i) in store.t.team.items"
          :key="i"
          class="team-card-wrap"
        >
          <div
            class="team-card"
            @mousemove="(e: MouseEvent) => {
              const card = (e.currentTarget as HTMLElement)
              const rect = card.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width - 0.5
              const y = (e.clientY - rect.top) / rect.height - 0.5
              card.style.setProperty('--rotate-x', (-y * 12) + 'deg')
              card.style.setProperty('--rotate-y', (x * 12) + 'deg')
              card.style.setProperty('--glow-x', (x * 50 + 50) + '%')
              card.style.setProperty('--glow-y', (y * 50 + 50) + '%')
            }"
            @mouseleave="(e: MouseEvent) => {
              const card = (e.currentTarget as HTMLElement)
              card.style.setProperty('--rotate-x', '0deg')
              card.style.setProperty('--rotate-y', '0deg')
              card.style.setProperty('--glow-x', '50%')
              card.style.setProperty('--glow-y', '50%')
            }"
          >
            <!-- Animated gradient border -->
            <div class="team-card-border"></div>

            <!-- Avatar -->
            <div class="team-avatar-wrap">
              <div class="team-avatar-ring"></div>
              <div
                class="team-avatar"
                :style="{ background: `linear-gradient(135deg, ${avatarColors[i][0]}, ${avatarColors[i][1]})` }"
              >
                <span>{{ member.initials }}</span>
              </div>
            </div>

            <!-- Decorative dots -->
            <div class="team-card-dots">
              <span
                v-for="d in dotCount"
                :key="d"
                :style="{
                  width: 3 + (d % 3) + 'px',
                  height: 3 + (d % 3) + 'px',
                  background: avatarColors[i][0],
                  left: (d * 13) % 100 + '%',
                  top: (d * 17 + 30) % 100 + '%',
                  opacity: 0.15 + (d % 4) * 0.04,
                }"
              ></span>
            </div>

            <h3>{{ member.name }}</h3>
            <p class="team-spec">{{ member.spec }}</p>
            <span class="team-tag">{{ member.tag }}</span>

            <!-- Glow overlay on hover -->
            <div class="team-card-glow"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--white) 100%);
}

/* ============================================
   GEOMETRIC BACKGROUND PATTERN
   ============================================ */
.team-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.team-pattern-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid var(--teal-500);
  transform: translate(-50%, -50%);
}

/* ============================================
   GRID
   ============================================ */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 1;
}

/* ============================================
   CARD
   ============================================ */
.team-card-wrap {
  perspective: 800px;
}

.team-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem 1.75rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  transform: rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg));
  transform-style: preserve-3d;
  will-change: transform;
  isolation: isolate;
  border: 1px solid rgba(37, 215, 184, 0.06);
}

.team-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(37, 215, 184, 0.03), transparent);
  pointer-events: none;
}

.team-card:hover {
  box-shadow:
    0 20px 60px rgba(37, 215, 184, 0.12),
    0 0 0 1px rgba(37, 215, 184, 0.1);
  border-color: rgba(37, 215, 184, 0.15);
}

/* Animated gradient border */
.team-card-border {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent,
    transparent 30%,
    rgba(37, 215, 184, 0.3),
    rgba(39, 200, 247, 0.5),
    rgba(37, 215, 184, 0.3),
    transparent 70%,
    transparent
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  animation: border-rotate 3s linear infinite;
}

.team-card:hover .team-card-border {
  opacity: 1;
}

@keyframes border-rotate {
  to { --angle: 360deg; }
}

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@property --rotate-x {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: true;
}

@property --rotate-y {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: true;
}

@property --glow-x {
  syntax: '<percentage>';
  initial-value: 50%;
  inherits: true;
}

@property --glow-y {
  syntax: '<percentage>';
  initial-value: 50%;
  inherits: true;
}

/* ============================================
   AVATAR
   ============================================ */
.team-avatar-wrap {
  position: relative;
  display: inline-flex;
  margin-bottom: 1.25rem;
  z-index: 1;
  transform: translateZ(20px);
}

.team-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  position: relative;
  z-index: 1;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.12),
    0 0 0 3px rgba(255, 255, 255, 0.8);
  transition: box-shadow 0.4s ease;
}

.team-card:hover .team-avatar {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    0 0 0 4px rgba(255, 255, 255, 0.9);
}

/* Decorative ring behind avatar */
.team-avatar-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 1.5px dashed rgba(37, 215, 184, 0.15);
  animation: ring-spin 12s linear infinite;
  transition: border-color 0.4s ease;
}

.team-card:hover .team-avatar-ring {
  border-color: rgba(37, 215, 184, 0.35);
}

@keyframes ring-spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* ============================================
   DECORATIVE DOTS ON CARD
   ============================================ */
.team-card-dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.team-card-dots span {
  position: absolute;
  border-radius: 50%;
  transition: all 0.4s ease;
}

.team-card:hover .team-card-dots span {
  opacity: 0.3 !important;
}

/* ============================================
   TEXT
   ============================================ */
.team-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transform: translateZ(15px);
}

.team-spec {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 0.85rem;
  position: relative;
  z-index: 1;
  transform: translateZ(10px);
}

.team-tag {
  display: inline-block;
  background: linear-gradient(135deg, var(--teal-50), rgba(37, 215, 184, 0.06));
  color: var(--teal-600);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 1rem;
  border-radius: 100px;
  border: 1px solid rgba(37, 215, 184, 0.15);
  position: relative;
  z-index: 1;
  letter-spacing: 0.02em;
  transform: translateZ(10px);
}

.team-card:hover .team-tag {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(37, 215, 184, 0.3);
}

/* ============================================
   GLOW OVERLAY
   ============================================ */
.team-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at var(--glow-x, 50%) var(--glow-y, 50%),
    rgba(37, 215, 184, 0.06),
    transparent 50%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 0;
  mix-blend-mode: overlay;
}

.team-card:hover .team-card-glow {
  opacity: 1;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 640px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .team-card {
    padding: 1.75rem 1.25rem 1.5rem;
  }

  .team-avatar {
    width: 72px;
    height: 72px;
    font-size: 1.2rem;
  }

  .team-avatar-ring {
    width: 86px;
    height: 86px;
  }

  .team-card h3 {
    font-size: 0.95rem;
  }

  .team-spec {
    font-size: 0.78rem;
  }

  .team-tag {
    font-size: 0.7rem;
    padding: 0.25rem 0.75rem;
  }
}
</style>
