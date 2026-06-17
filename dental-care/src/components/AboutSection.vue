<script setup lang="ts">
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/language'
import {
  useScrollReveal,
  useScrollStagger,
} from '@/composables/useScrollReveal'
import { useParallaxGroup } from '@/composables/useGsapReveal'
import { Users, Award, CheckCircle } from '@lucide/vue'

const store = useLanguageStore()

function scrollToContact() {
  (window as any).lenis?.scrollTo('#contact')
}

const sectionRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)
const statsRef = ref<HTMLElement | null>(null)

const { isRevealed: textRevealed } = useScrollReveal(textRef)
const { isRevealed: visualRevealed } = useScrollReveal(visualRef)
useParallaxGroup(sectionRef, { selector: '.about-pattern', yRange: 30 })

const highlights = [
  { ar: 'أحدث تقنيات الليزر', en: 'Latest Laser Tech' },
  { ar: 'معايير جودة عالية', en: 'High-quality standards' },
  { ar: 'بيئة معقمة وآمنة', en: 'Sterile & Safe Environment' },
  { ar: 'متابعة شخصية مدى الحياة', en: 'Lifetime Follow-up Care' },
]
</script>

<template>
  <section id="about" ref="sectionRef" class="section bg-light about-section">
    <!-- Background pattern -->
    <div class="about-pattern"></div>

    <div class="section-inner">
      <!-- Split layout: Text + Visual (like drnour1.com) -->
      <div class="about-split">
        <!-- Text Side -->
        <div ref="textRef" :class="{ 'is-revealed': textRevealed }" class="about-text-side reveal-slideLeft">
          <h2 class="about-title">
            <span>{{ store.t.about.title.split(' ').slice(0, 1).join(' ') }}</span>
            &nbsp;
            <span class="text-gradient">
              {{ store.t.about.title.split(' ').slice(1).join(' ') }}</span>
          </h2>

          <p class="about-intro">
            {{ store.t.about.subtitle }}
          </p>

          <!-- Highlights list -->
          <div class="about-highlights">
            <div v-for="(h, i) in highlights" :key="i" class="about-highlight-item">
              <div class="highlight-icon">
                <CheckCircle :size="18" />
              </div>
              <span>{{ store.isRtl ? h.ar : h.en }}</span>
            </div>
          </div>


        </div>

        <!-- Visual Side - Doctor/Clinic showcase card -->
        <div ref="visualRef" :class="{ 'is-revealed': visualRevealed }" class="about-visual-side reveal-slideRight">
          <div class="about-showcase-card">
            <!-- Card decorative top -->
            <div class="showcase-top">
              <div class="showcase-tooth-icon">
                <div class="logo-icon">
                  <img src="/logo.png" alt="Plaza Dental Care" class="logo-img w-10" />
                </div>
              </div>
              <div class="showcase-experience">
                <span class="showcase-exp-num">+15</span>
                <span class="showcase-exp-label">{{
                  store.isRtl ? 'عام خبرة' : 'Years Exp.'
                }}</span>
              </div>
            </div>

            <!-- Visual placeholder - clinic representation -->
            <div class="showcase-visual">
              <div class="showcase-clinic-bg">
                <div class="clinic-circle clinic-circle-1"></div>
                <div class="clinic-circle clinic-circle-2"></div>
                <div class="clinic-circle clinic-circle-3"></div>
              </div>
              <div class="showcase-badge">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>{{ store.isRtl ? 'معايير جودة عالية' : 'High-quality standards' }}</span>
              </div>
            </div>

            <!-- Card footer with features -->
            <div class="showcase-features">
              <div class="showcase-feature" v-for="f in 4" :key="f">
                <div class="feature-dot" :style="{ background: ['#27c8f7', '#0D4F8B', '#F5A623', '#31efc4'][f - 1] }">
                </div>
                <span>{{
                  store.isRtl
                    ? ['تقنية متقدمة', 'فريق متخصص', 'جودة عالية', 'رعاية شاملة'][f - 1]
                    : ['Advanced Tech', 'Expert Team', 'High Quality', 'Full Care'][f - 1]
                }}</span>
              </div>
            </div>
          </div>

          <!-- Floating stat badges -->
          <div class="about-float-badge badge-1 float-1">
            <Users :size="16" />
            <span>+5000 {{ store.isRtl ? 'عملاء' : 'Clients' }}</span>
          </div>
          <div class="about-float-badge badge-2 float-2">
            <Award :size="16" />
            <span>98% {{ store.isRtl ? 'رضا' : 'Satisfaction' }}</span>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <!-- <div ref="statsRef" class="about-stats-bar">
        <div v-for="(stat, i) in store.t.about.stats" :key="i" class="about-stat-item">
          <span class="stat-num">{{ stat.num }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
}

.about-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 15% 50%, rgba(37, 215, 184, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 85% 20%, rgba(13, 79, 139, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Split layout */
.about-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 3.5rem;
  position: relative;
  z-index: 1;
}

/* Text side */
.about-text-side {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.about-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 900;
  line-height: 1.2;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.about-intro {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Highlights */
.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.about-highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-primary);
}

.highlight-icon {
  width: 32px;
  height: 32px;
  background: var(--teal-50);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal-500);
  flex-shrink: 0;
}

/* Visual side */
.about-visual-side {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.about-showcase-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(37, 215, 184, 0.1);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  width: 100%;
  max-width: 420px;
  position: relative;
  z-index: 2;
}

/* Card top */
.showcase-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0;
}

.showcase-tooth-icon {
  width: 64px;
  height: 64px;
  background: var(--teal-50);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
}

.showcase-experience {
  text-align: center;
}

.showcase-exp-num {
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.showcase-exp-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Visual area */
.showcase-visual {
  position: relative;
  height: 180px;
  margin: 1rem 1.5rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.showcase-clinic-bg {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.clinic-circle {
  border-radius: 50%;
  border: 2px solid rgba(37, 215, 184, 0.15);
  position: absolute;
}

.clinic-circle-1 {
  width: 120px;
  height: 120px;
  animation: blob1 8s ease-in-out infinite;
  border-color: rgba(37, 215, 184, 0.2);
}

.clinic-circle-2 {
  width: 90px;
  height: 90px;
  animation: blob2 10s ease-in-out infinite;
  background: rgba(37, 215, 184, 0.06);
  border-color: rgba(37, 215, 184, 0.12);
}

.clinic-circle-3 {
  width: 50px;
  height: 50px;
  background: rgba(37, 215, 184, 0.1);
  border: none;
  animation: float2 4s ease-in-out infinite;
}

.showcase-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--teal-600);
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

/* Features row */
.showcase-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  padding: 1rem 1.5rem 1.5rem;
}

.showcase-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.feature-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Floating badges */
.about-float-badge {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: white;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-primary);
  z-index: 3;
  border: 1px solid rgba(37, 215, 184, 0.08);
}

.badge-1 {
  top: 5%;
  right: -8%;
  color: var(--teal-600);
}

.badge-2 {
  bottom: 15%;
  left: -8%;
  color: var(--blue-600);
}

body.rtl .badge-1 {
  right: auto;
  left: -8%;
}

body.rtl .badge-2 {
  left: auto;
  right: -8%;
}

/* Stats Bar - like drnour1.com */
.about-stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(37, 215, 184, 0.06);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(37, 215, 184, 0.08);
  position: relative;
  z-index: 1;
}

.about-stat-item {
  background: var(--white);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all var(--transition-base);
}

.about-stat-item:hover {
  background: var(--teal-50);
}

.about-stat-item .stat-num {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
  margin-bottom: 0.3rem;
}

.about-stat-item .stat-label {
  display: block;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .about-split {
    gap: 3rem;
  }
}

@media (max-width: 900px) {
  .about-split {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .about-visual-side {
    min-height: auto;
    /* order: -1; */
  }

  .about-float-badge {
    display: none;
  }

  .about-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 640px) {
  .about-stats-bar {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-stat-item {
    padding: 1.5rem 1rem;
  }

  .about-stat-item .stat-num {
    font-size: 1.6rem;
  }

  .showcase-features {
    grid-template-columns: 1fr;
  }

  .about-showcase-card {
    max-width: 100%;
  }

  .showcase-visual {
    height: 140px;
    margin: 0.75rem 1rem;
  }
}

@media (max-width: 480px) {
  .about-intro {
    font-size: 0.9rem;
  }

  .about-highlight-item {
    font-size: 0.84rem;
  }

  .about-title {
    font-size: 1.5rem;
  }

  .showcase-top {
    padding: 1rem 1rem 0;
  }

  .showcase-features {
    padding: 0.75rem 1rem 1.25rem;
  }
}

@media (max-width: 360px) {
  .about-title {
    font-size: 1.3rem;
  }

  .showcase-visual {
    height: 110px;
  }
}

/* ==========================================
   SCROLL REVEAL — CSS transitions (no opacity)
   ========================================== */
.reveal-slideLeft {
  transform: translateX(-60px);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-slideLeft.is-revealed {
  transform: translateX(0);
}

.reveal-slideRight {
  transform: translateX(60px);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-slideRight.is-revealed {
  transform: translateX(0);
}
</style>
