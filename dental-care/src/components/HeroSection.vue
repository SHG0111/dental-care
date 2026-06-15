<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { Calendar, Eye } from '@lucide/vue'
import gsap from 'gsap'
import { useLenis } from 'lenis/vue'

const store = useLanguageStore()
const lenis = useLenis()

const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const imageWrapRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const badgeRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const buttonsRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Content stagger — badge, title lines, subtitle, buttons
  tl.from(badgeRef.value, { y: 40, opacity: 0, duration: 0.9 })
    .from(
      titleRef.value?.querySelectorAll('.hero-title-line') ?? [],
      { y: 70, opacity: 0, duration: 1, stagger: 0.15 },
      '-=0.5',
    )
    .from(subtitleRef.value, { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
    .from(
      buttonsRef.value?.querySelectorAll('.hero-btn') ?? [],
      { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
      '-=0.4',
    )

  // Image — cinematic slide-in with subtle scale
  tl.from(imageWrapRef.value, {
    x: '12%',
    scale: 1.08,
    opacity: 0,
    duration: 1.4,
    ease: 'power2.out',
  }, '-=1.6')

  // Image inner — slow zoom settle (Ken Burns effect)
  tl.from(imageRef.value, {
    scale: 1.15,
    duration: 2.5,
    ease: 'power1.out',
  }, '-=1.2')

  // Scroll indicator
  tl.from(scrollRef.value, { opacity: 0, y: 10, duration: 0.6 }, '-=0.4')
})

function scrollToContact() {
  lenis.value?.scrollTo('#contact')
}

function scrollToServices() {
  lenis.value?.scrollTo('#services')
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

    <div class="hero-inner">
      <!-- Left: Content -->
      <div ref="contentRef" class="hero-content">
        <!-- Badge -->
        <div ref="badgeRef" class="hero-badge">
          <span class="badge-dot"></span>
          <span>{{ store.t.hero.badge }}</span>
        </div>

        <!-- Title -->
        <h1 ref="titleRef" class="hero-title">
          <span class="hero-title-line">{{ store.t.hero.title1 }}</span>
          <span class="hero-title-line text-gradient">{{ store.t.hero.title2 }}</span>
          <span class="hero-title-line">{{ store.t.hero.title3 }}</span>
          <span class="hero-title-line accent-line">{{ store.t.hero.title4 }}</span>
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
          <img ref="imageRef" src="/header.png" alt="" class="hero-image" />
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
  background: #0A1628;
}

/* Background gradient layer */
.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 90% 70% at 70% 40%, rgba(37, 215, 184, 0.08) 0%, transparent 70%),
    radial-gradient(ellipse 60% 50% at 20% 60%, rgba(39, 200, 247, 0.05) 0%, transparent 60%),
    radial-gradient(ellipse 100% 80% at 50% 100%, rgba(10, 22, 40, 0.9) 0%, transparent 50%),
    linear-gradient(165deg, #0A1628 0%, #0D2B3E 35%, #0E1F3A 65%, #0A1628 100%);
  pointer-events: none;
  z-index: 0;
}

/* Grain texture overlay */
.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 180px 180px;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
}

/* Accent light ray from top-right */
.hero-light-ray {
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
}

/* ==========================================
   Inner — Split Layout
   ========================================== */
.hero-inner {
  width: 100%;
  margin: 0 auto;
  padding: 3rem 5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 1400px;
}

/* ==========================================
   Content — Left Side
   ========================================== */
.hero-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-right: 2rem;
}

/* Badge */
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
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--teal-400);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

/* Title */
.hero-title {
  font-size: clamp(2.6rem, 4.5vw, 3.8rem);
  font-weight: 900;
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
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 2.5rem;
  max-width: 480px;
  font-weight: 400;
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
  color: #0A1628;
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
.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 500px;
}

.hero-image-frame {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 520px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(37, 215, 184, 0.06);
  /* Gradient mask on the left edge so it blends subtly with dark bg */
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 15%, #000 100%);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Decorative concentric rings behind the image */
.hero-ring {
  position: absolute;
  top: 50%;
  right: -8%;
  transform: translateY(-50%);
  width: 110%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(37, 215, 184, 0.06);
  pointer-events: none;
  z-index: -1;
}

.hero-ring-2 {
  width: 130%;
  border-color: rgba(39, 200, 247, 0.04);
  right: -15%;
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
  0% { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
}

/* ==========================================
   Responsive
   ========================================== */
@media (max-width: 1024px) {
  .hero-inner {
    padding: 3rem 2.5rem;
    gap: 3rem;
  }
  .hero-image-frame {
    min-height: 400px;
  }
}

@media (max-width: 800px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 6rem 1.5rem 3rem;
  }
  .hero-content {
    order: 1;
    padding-right: 0;
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
    max-width: 500px;
    margin: 0 auto;
    min-height: auto;
  }
  .hero-image-frame {
    min-height: 300px;
    -webkit-mask-image: none;
    mask-image: none;
    border-radius: 12px;
  }
  .hero-ring {
    display: none;
  }
  .scroll-indicator {
    left: 50%;
    transform: translateX(-50%);
  }
}

@media (max-width: 480px) {
  .hero-inner {
    padding: 5rem 1.25rem 2rem;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-subtitle {
    font-size: 0.9rem;
  }
  .hero-ctas {
    flex-direction: column;
    width: 100%;
  }
  .hero-btn {
    width: 100%;
    justify-content: center;
  }
  .hero-image-frame {
    min-height: 220px;
  }
}
</style>
