<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { ArrowDown, Star, CheckCircle, Phone } from '@lucide/vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const store = useLanguageStore()

const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const visualRef = ref<HTMLElement | null>(null)

const { isVisible: contentVisible } = useScrollReveal(contentRef, { threshold: 0.1 })
const { isVisible: visualVisible } = useScrollReveal(visualRef, { threshold: 0.1 })

const stats = [
  { num: '+5000', key: 'stat1' },
  { num: '+15', key: 'stat2' },
  { num: '+20', key: 'stat3' },
]

function scrollToServices() {
  const el = document.querySelector('#services')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function scrollToContact() {
  const el = document.querySelector('#contact')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" ref="heroRef" class="hero-section">
    <!-- Background image -->
    <div class="hero-bg-image"></div>

    <!-- Background blobs -->
    <div class="hero-blobs">
      <div class="blob blob-1 blob-1"></div>
      <div class="blob blob-2 blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Subtle dots pattern -->
    <div class="hero-pattern"></div>

    <div class="hero-inner">
      <!-- Left Content -->
      <div ref="contentRef" class="hero-content">
        <div
          class="hero-badge"
          :class="{ 'is-visible': contentVisible }"
          style="transition-delay: 0.1s"
        >
          <span class="badge-dot"></span>
          <span>{{ store.t.hero.badge }}</span>
        </div>

        <h1
          class="hero-title"
          :class="{ 'is-visible': contentVisible }"
          style="transition-delay: 0.2s"
        >
          <span class="hero-title-line">
            <span>{{ store.t.hero.title1 }}</span>
            <span class="text-gradient"> {{ store.t.hero.title2 }}</span>
          </span>
          <span class="hero-title-line">{{ store.t.hero.title3 }}</span>
          <span class="hero-title-line accent-line">{{ store.t.hero.title4 }}</span>
        </h1>

        <p
          class="hero-subtitle"
          :class="{ 'is-visible': contentVisible }"
          style="transition-delay: 0.35s"
        >
          {{ store.t.hero.subtitle }}
        </p>

        <div
          class="hero-ctas"
          :class="{ 'is-visible': contentVisible }"
          style="transition-delay: 0.5s"
        >
          <button class="btn btn-primary" @click="scrollToContact">
            {{ store.t.hero.cta1 }}
            <ArrowDown :size="18" />
          </button>
          <button class="btn btn-outline" @click="scrollToServices">
            {{ store.t.hero.cta2 }}
          </button>
        </div>

        <!-- Stats -->
        <div
          class="hero-stats"
          :class="{ 'is-visible': contentVisible }"
          style="transition-delay: 0.65s"
        >
          <div
            v-for="(stat, i) in stats"
            :key="stat.key"
            class="stat-item"
            :style="{ '--i': i }"
          >
            <span class="stat-num">{{ stat.num }}</span>
            <span class="stat-label">{{ store.t.hero[stat.key as keyof typeof store.t.hero] }}</span>
          </div>
        </div>
      </div>

      <!-- Right Visual -->
      <div ref="visualRef" class="hero-visual">
        <!-- Main Card -->
        <div class="hero-card" :class="{ 'is-visible': visualVisible }">
          <div class="hero-card-glow"></div>
          <div class="hero-card-bg"></div>

          <!-- Tooth icon -->
          <div class="hero-tooth-wrap">
            <div class="hero-tooth">
              <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="tooth-svg">
                <defs>
                    <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#27c8f7" />
                      <stop offset="100%" stop-color="#31efc4" />
                  </linearGradient>
                </defs>
                <path d="M40 5C28 5 16 14 16 28c0 8 3 14 7 18l4 24c0.5 3 2 5 4 5s3-2 4-5l2-10 2 10c1 3 2 5 4 5s3.5-2 4-5l4-24c4-4 7-10 7-18 0-14-12-23-24-23z" fill="url(#toothGrad)" opacity="0.9"/>
                <path d="M25 26 Q40 20 55 26" stroke="white" stroke-width="2.5" fill="none" opacity="0.35" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="tooth-ring"></div>
          </div>

          <h3 class="hero-card-title">{{ store.t.hero.cardTitle }}</h3>
          <p class="hero-card-sub">{{ store.t.hero.cardSub }}</p>

          <!-- Rating -->
          <div class="hero-rating">
            <div class="stars">
              <Star v-for="i in 5" :key="i" :size="14" fill="#F5A623" color="#F5A623" />
            </div>
            <span class="rating-num">4.9</span>
            <span class="rating-count">({{ store.isRtl ? '+500 تقييم' : '+500 reviews' }})</span>
          </div>

          <!-- Mini stats -->
          <div class="hero-card-stats">
            <div class="mini-stat">
              <span class="mini-num">+15</span>
              <span class="mini-label">{{ store.t.hero.stat2 }}</span>
            </div>
            <div class="mini-stat">
              <span class="mini-num">98%</span>
              <span class="mini-label">{{ store.isRtl ? 'رضا' : 'Satisfaction' }}</span>
            </div>
          </div>
        </div>

        <!-- Floating Chips -->
        <div class="floating-chip chip-1 float-1">
          <div class="chip-icon chip-icon-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/><path d="M7 7v14"/></svg>
          </div>
          <div class="chip-text">
            <span class="chip-label">{{ store.t.hero.chip1a }}</span>
            <span class="chip-value">{{ store.t.hero.chip1b }}</span>
          </div>
        </div>

        <div class="floating-chip chip-2 float-2">
          <div class="chip-icon chip-icon-gold">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div class="chip-text">
            <span class="chip-label">{{ store.t.hero.chip2a }}</span>
            <span class="chip-value">{{ store.t.hero.chip2b }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <span class="scroll-text">{{ store.isRtl ? 'اسحب للأسفل' : 'Scroll down' }}</span>
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 72px;
  background: var(--gradient-hero);
}

/* Background image */
.hero-bg-image {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(248,250,249,0.88) 0%, rgba(218,252,242,0.82) 35%, rgba(197,245,234,0.78) 65%, rgba(248,250,249,0.88) 100%),
    url('/header.png') center/cover no-repeat;
  pointer-events: none;
  z-index: 0;
}

/* Background blobs */
.hero-blobs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}

.blob-1 {
  width: 600px;
  height: 600px;
  background: var(--teal-100);
  top: -150px;
  right: -100px;
  animation: blob1 15s ease-in-out infinite;
}

.blob-2 {
  width: 500px;
  height: 500px;
  background: var(--blue-100);
  bottom: -200px;
  left: -100px;
  animation: blob2 12s ease-in-out infinite;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: var(--gold-light);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
}

/* Pattern overlay */
.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(37, 215, 184, 0.06) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
  z-index: 1;
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  flex: 1;
}

/* Content */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(37, 215, 184, 0.1);
  border: 1px solid rgba(37, 215, 184, 0.2);
  border-radius: 100px;
  padding: 0.45rem 1.1rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--teal-600);
  margin-bottom: 1.5rem;
  backdrop-filter: blur(4px);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-badge.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.badge-dot {
  width: 7px;
  height: 7px;
  background: var(--teal-500);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 900;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-title.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-title-line {
  display: block;
}

.accent-line {
  font-size: 1.15em;
}

.hero-subtitle {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 520px;
  font-weight: 400;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-subtitle.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-ctas.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stats */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(37, 215, 184, 0.12);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-stats.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-item {
  text-align: center;
  animation: fade-up-stat 0.5s ease-out both;
  animation-delay: calc(0.7s + var(--i) * 0.15s);
}

@keyframes fade-up-stat {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.stat-num {
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.stat-label {
  display: block;
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
  font-weight: 500;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(37, 215, 184, 0.12);
  box-shadow: 0 20px 60px rgba(37, 215, 184, 0.12), 0 0 80px rgba(37, 215, 184, 0.05);
  text-align: center;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.hero-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 20%, rgba(37, 215, 184, 0.06), transparent 60%);
  pointer-events: none;
}

.hero-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: var(--gradient-primary-subtle);
  opacity: 0.5;
  pointer-events: none;
}

/* Tooth */
.hero-tooth-wrap {
  position: relative;
  display: inline-flex;
  margin-bottom: 1.5rem;
  z-index: 1;
}

.hero-tooth {
  width: 100px;
  height: 100px;
  background: var(--gradient-primary-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.tooth-svg {
  width: 58px;
  height: 58px;
}

.tooth-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid rgba(37, 215, 184, 0.15);
  animation: spin-slow 10s linear infinite;
}

.hero-card-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
}

.hero-card-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.hero-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.stars {
  display: flex;
  gap: 2px;
}

.rating-num {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-left: 0.25rem;
}

body.rtl .rating-num {
  margin-left: 0;
  margin-right: 0.25rem;
}

.rating-count {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.hero-card-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.mini-stat {
  background: var(--teal-50);
  border-radius: var(--radius-sm);
  padding: 0.85rem 0.5rem;
  text-align: center;
}

.mini-stat:last-child {
  background: var(--blue-50);
}

.mini-num {
  display: block;
  font-size: 1.3rem;
  font-weight: 900;
  color: var(--teal-600);
  line-height: 1.1;
}

.mini-stat:last-child .mini-num {
  color: var(--blue-600);
}

.mini-label {
  display: block;
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

/* Floating Chips */
.floating-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: var(--radius-md);
  padding: 0.7rem 1.1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.chip-1 {
  top: 5%;
  right: -15%;
}

.chip-2 {
  bottom: 10%;
  left: -15%;
}

body.rtl .chip-1 {
  right: auto;
  left: -15%;
}

body.rtl .chip-2 {
  left: auto;
  right: -15%;
}

.chip-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chip-icon-green {
  background: var(--teal-50);
  color: var(--teal-600);
}

.chip-icon-gold {
  background: var(--gold-pale);
  color: var(--gold);
}

.chip-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}

.chip-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
}

.chip-value {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
}

.chip-1 .chip-value {
  color: var(--teal-600);
}

.chip-2 .chip-value {
  color: var(--blue-600);
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.6;
  animation: fade-in-out 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

.scroll-text {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.scroll-mouse {
  width: 22px;
  height: 34px;
  border: 2px solid var(--gray-300);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-wheel {
  width: 3px;
  height: 8px;
  background: var(--teal-400);
  border-radius: 2px;
  animation: scroll-wheel 2s ease-in-out infinite;
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(10px); opacity: 0; }
}

/* Responsive */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  .hero-content {
    order: 1;
  }
  .hero-visual {
    order: 0;
    max-width: 340px;
    margin: 0 auto;
  }
  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-ctas {
    justify-content: center;
  }
  .hero-visual {
    display: none;
  }
  .scroll-indicator {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: 60px;
  }
  .hero-inner {
    padding: 2rem 1.25rem;
  }
  .hero-stats {
    gap: 0.5rem;
  }
  .stat-num {
    font-size: 1.4rem;
  }
}
</style>
