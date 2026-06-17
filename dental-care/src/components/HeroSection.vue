<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { Calendar, Eye } from '@lucide/vue'
import gsap from 'gsap'

const store = useLanguageStore()

function getLenis() {
  const l = (window as any).lenis
  return (l && typeof l.scrollTo === 'function') ? l : null
}

const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const imageWrapRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const buttonsRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Content stagger — title lines, subtitle, buttons
  tl.from(
    titleRef.value,
    { y: 70, opacity: 0, duration: 1, stagger: 0.15, ease: 'power2.inOut' },
  )
    .from(subtitleRef.value, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.6')
    .from(buttonsRef.value, { y: 30, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '-=0.7')

  // Image — cinematic slide-in with subtle scale
  tl.from(
    imageWrapRef.value,
    {
      x: '12%',
      scale: 1.08,
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut',
    },
    '-=1.6',
  )

  // Image inner — slow zoom settle (Ken Burns effect)
  tl.from(
    imageRef.value,
    {
      scale: 1.15,
      duration: 2.5,
      ease: 'power1.inOut',
    },
    '-=1.2',
  )

  // Scroll indicator
  tl.from(scrollRef.value, { opacity: 0, y: 10, duration: 0.6 }, '-=0.4')
})

function scrollToContact() {
  getLenis()?.scrollTo('#contact')
}

function scrollToServices() {
  getLenis()?.scrollTo('#services')
}
</script>

<template>
  <section id="home" ref="heroRef" class="hero-section">
    <!-- Base gradient background -->
    <div class="hero-bg"></div>

    <!-- Subtle grain/noise overlay -->
    <div class="hero-grain"></div>

    <!-- Accent light ray -->
    <div class="hero-light-ray"></div>

    <div class="hero-inner px-4">
      <!-- Left: Content -->
      <div ref="contentRef" class="hero-content">
        <!-- Title -->
        <h1 ref="titleRef" class="hero-title hero-title-line">
          {{ store.t.hero.title1 }}
          {{ store.t.hero.title2 }}
          {{ store.t.hero.title3 }}
          <span class="text-gradient">{{ store.t.hero.title4 }}</span>
        </h1>

        <!-- Subtitle -->
        <p ref="subtitleRef" class="hero-subtitle">
          {{ store.t.hero.subtitle }}
        </p>

        <!-- Two CTAs -->
        <div ref="buttonsRef" class="hero-ctas">
          <button class="hero-btn btn-book" @click="scrollToContact">
            <Calendar :size="18" />
            <span>{{ store.t.hero.cta1 }}</span>
          </button>
          <button class="hero-btn btn-cases" @click="scrollToServices">
            <Eye :size="18" />
            <span>{{ store.t.hero.cta3 }}</span>
          </button>
        </div>
      </div>

      <!-- Right: Image -->
      <div ref="imageWrapRef" class="hero-visual">
        <div class="hero-image-frame">
          <img ref="imageRef" src="/header_image.png" alt="" class="hero-image" />
        </div>

        <!-- Decorative accent ring -->
        <div class="hero-ring"></div>
        <div class="hero-ring hero-ring-2"></div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollRef" class="scroll-indicator">
      <span class="scroll-text">{{ store.isRtl ? 'اسحب للأسفل' : 'Scroll' }}</span>
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================
   HERO — Dark Cinematic Split
   ========================================== */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #0a1628;
}

/* Accent light ray from top-right */
/* .hero-light-ray {
  position: absolute;
  top: -30%;
  right: -10%;
  width: 70%;
  height: 120%;
  background: linear-gradient(
    135deg,
    rgba(49, 239, 196, 0.04) 0%,
    rgba(39, 200, 247, 0.03) 30%,
    transparent 70%
  );
  transform: rotate(-18deg);
  pointer-events: none;
  z-index: 1;
} */

/* ==========================================
   Inner — Split Layout
   ========================================== */
.hero-inner {
  width: 100%;
  margin: 0 auto;
  /* padding: 3rem 5rem; */
  display: grid;
  /* grid-template-columns: 1.5fr 1fr; */
  /* gap: 2rem; */
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  margin-top: 110px;
  /* max-width: 1400px; */
}

/* ==========================================
   Content — Left Side
   ========================================== */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 1000px;
  padding: 0 5rem;
}

/* Badge
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(37, 215, 184, 0.08);
  border: 1px solid rgba(37, 215, 184, 0.15);
  border-radius: 100px;
  padding: 0.45rem 1.2rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--teal-300);
  margin-bottom: 1.75rem;
  backdrop-filter: blur(4px);
  width: fit-content;
  letter-spacing: 0.03em;
  text-transform: uppercase;
} */

/* .badge-dot {
  width: 6px;
  height: 6px;
  background: var(--teal-400);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
} */

/* @keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.7);
  }
} */

/* Title */
.hero-title {
  font-size: clamp(2.6rem, 4.5vw, 3.8rem);
  font-weight: 600;
  line-height: 1.12;
  color: #fff;
  margin-bottom: 0.5rem;
}

.hero-title-line {
  display: block;
}

.accent-line {
  font-size: 1.1em;
}

/* Subtitle */
.hero-subtitle {
  font-size: 1rem;
  line-height: 1.8;
  background: var(--gradient-primary-subtle);
  margin-bottom: 2.5rem;
  max-width: 480px;
  font-weight: 400;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ==========================================
   Buttons — Two CTAs
   ========================================== */
.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 8px;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  font-family: inherit;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
}

.btn-book {
  background: var(--gradient-primary);
  color: #0a1628;
  box-shadow: 0 0 30px rgba(37, 215, 184, 0.2);
}

.btn-book:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 40px rgba(37, 215, 184, 0.35);
}

.btn-book:active {
  transform: translateY(0);
}

.btn-cases {
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
}

.btn-cases:hover {
  border-color: var(--teal-400);
  color: #fff;
  background: rgba(37, 215, 184, 0.08);
  transform: translateY(-3px);
}

.btn-cases:active {
  transform: translateY(0);
}

/* ==========================================
   Visual — Right Side Image
   ========================================== */
/* .hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 500px;
} */

/* .hero-image-frame {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 520px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(37, 215, 184, 0.06);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 100%);
} */

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  min-width: 700px;
}

/* ==========================================
   Scroll Indicator
   ========================================== */
.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 2;
}

.scroll-text {
  font-size: 0.65rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.scroll-line {
  width: 40px;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}

.scroll-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: var(--teal-400);
  animation: scroll-line 2.4s ease-in-out infinite;
}

@keyframes scroll-line {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(300%);
  }
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 1024px) {
  .hero-inner {
    padding: 3rem 2.5rem;
    gap: 3rem;
  }

  .hero-content {
    padding: 0 2rem;
  }
}

@media (max-width: 800px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    margin-top: 90px;
  }

  .hero-content {
    order: 1;
    padding-right: 0;
    padding-left: 0;
    align-items: center;
  }

  .hero-badge {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-ctas {
    justify-content: center;
  }

  .hero-visual {
    order: 0;
    margin: 0 auto;
    min-height: auto;
    width: 100%;
  }

  .hero-image-frame {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .hero-image {
    min-width: unset;
    width: 100%;
  }

  .hero-ring {
    display: none;
  }

  .scroll-indicator {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 640px) {
  .hero-content {
    padding: 0 1.25rem;
  }

  .scroll-indicator {
    bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-inner {
    margin-top: 70px;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }

  .hero-ctas {
    flex-direction: column;
    width: 100%;
  }

  .hero-btn {
    width: 100%;
    justify-content: center;
    padding: 0.8rem 1.5rem;
    font-size: 0.88rem;
  }
}

@media (max-width: 360px) {
  .hero-content {
    padding: 0 0.75rem;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.8rem;
  }

  .hero-ctas {
    gap: 0.65rem;
  }
}
</style>
