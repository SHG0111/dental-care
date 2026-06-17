<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal, useGsapScrubStagger } from '@/composables/useGsapReveal'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

useGsapScrubReveal(headerRef, { animation: 'fadeUp' })
useGsapScrubStagger(gridRef, '> .ba-case-card', { stagger: 0.1 })

const activeIndex = ref(0)
const isDragging = ref(false)
const sliderPos = ref(50)

interface BACase {
  beforeLabel: string
  afterLabel: string
  title: string
  desc: string
}

const cases = computed<BACase[]>(() => store.t.beforeAfter.cases as BACase[])

const currentCase = computed(() => cases.value[activeIndex.value]!)

function startDrag(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  updateSlider(e)
}

function stopDrag() {
  isDragging.value = false
}

function updateSlider(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  const sliderEl = document.querySelector('.ba-slider-container')
  if (!sliderEl) return
  const rect = sliderEl.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
  let pos = store.isRtl
    ? ((rect.right - clientX) / rect.width) * 100
    : ((clientX - rect.left) / rect.width) * 100
  pos = Math.max(5, Math.min(95, pos))
  sliderPos.value = pos
}

function nextCase() {
  activeIndex.value = (activeIndex.value + 1) % cases.value.length
  sliderPos.value = 50
}

function prevCase() {
  activeIndex.value = (activeIndex.value - 1 + cases.value.length) % cases.value.length
  sliderPos.value = 50
}

// Static gradient thumbnails for before/after states
const beforeImages = [
  '/before_3.jpg',
  '/before_2.jpg',
  '/before_1.jpg',
  '/before_5.jpg'
]

const afterImages = [


  '/after_3.jpg',
  '/after_2.jpg',
  '/after_1.jpg',
  '/after_5.jpg'
]
const beforeColors = [
  'linear-gradient(180deg, #667eea1A 0%, #764ba2 200%)',
  'linear-gradient(180deg, #f093fb1A 0%, #f5576c 200%)',
  'linear-gradient(180deg, #4facfe1A 0%, #00f2fe 200%)',
  'linear-gradient(180deg, #fa709a1A 0%, #fee140 200%)',
]

const afterColors = [
  'linear-gradient(180deg, #27c8f71A 0%, #31efc4 200%)',
  'linear-gradient(180deg, #31efc41A 0%, #2de8bf 200%)',
  'linear-gradient(180deg, #25d7b81A 0%, #31efc4 200%)',
  'linear-gradient(180deg, #1A6FC41A 0%, #96BEEB 200%)',
]

</script>

<template>
  <section id="before-after" ref="sectionRef" class="section ba-section">
    <!-- Background pattern -->
    <div class="ba-pattern"></div>

    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" class="section-header centered">
        <h2 class="section-title">
          {{ store.t.beforeAfter.title.split(' ').slice(0, 2).join(' ') }}
          <span class="accent"> {{ store.t.beforeAfter.title.split(' ').slice(2).join(' ') }}</span>
        </h2>
        <p class="section-subtitle">
          {{ store.t.beforeAfter.subtitle }}
        </p>
      </div>

      <!-- Featured Before/After Slider -->
      <div class="ba-featured">
        <div class="ba-slider-wrapper">
          <!-- Navigation arrows -->
          <button class="ba-nav ba-nav-prev" @click="prevCase" aria-label="Previous case">
            <ChevronLeft :size="22" />
          </button>
          <button class="ba-nav ba-nav-next" @click="nextCase" aria-label="Next case">
            <ChevronRight :size="22" />
          </button>

          <!-- The slider -->
          <div class="ba-slider-container" @mousedown="startDrag" @mousemove="updateSlider" @mouseup="stopDrag"
            @mouseleave="stopDrag" @touchstart="startDrag" @touchmove="updateSlider" @touchend="stopDrag">
            <!-- Before (left) image -->

            <div class="ba-image ba-before" :style="{ 'background': `${beforeColors[activeIndex]}` }">
              <img :src=beforeImages[activeIndex] class="  opacity-50" />
            </div>

            <!-- After (right) image -->
            <div class="ba-image ba-after" :style="{ 'background': `${afterColors[activeIndex]}` }">
              <img :src=afterImages[activeIndex] class="  opacity-50" />

            </div>

            <!-- Slider handle -->
            <div class="ba-handle" :style="store.isRtl ? { right: sliderPos + '%' } : { left: sliderPos + '%' }">
              <div class="ba-handle-line"></div>
              <div class="ba-handle-circle">
                <ChevronLeft :size="16" />
                <ChevronRight :size="16" />
              </div>
            </div>
          </div>

          <!-- Case description -->
          <div class="ba-case-info">
            <div class="ba-case-dots">
              <button v-for="(c, i) in cases" :key="i" class="ba-dot" :class="{ active: i === activeIndex }" @click="
                activeIndex = i;
              sliderPos = 50
                " :aria-label="`Case ${i + 1}`"></button>
            </div>
            <p class="ba-case-desc">{{ currentCase.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Cases Grid -->
      <div ref="gridRef" class="ba-cases-grid">
        <div v-for="(c, i) in cases" :key="i" class="ba-case-card" :class="{ active: i === activeIndex }" @click="
          activeIndex = i;
        sliderPos = 50
          ">
          <div class="ba-case-thumb">
            <div class="ba-thumb-before"
              :style="{ 'background': `${beforeColors[i]}` }">
              <span class="absolute left-0 right-0 top-3 text-center z-10">{{ c.beforeLabel }}</span>
              <img :src=beforeImages[i] class="  opacity-50 -z-10" />

            </div>
            <div class="ba-thumb-after relative" :style="{ 'background': `${afterColors[i]}` }">
              <span class="absolute left-0 right-0 top-3 text-center z-10">{{ c.afterLabel }}</span>
              <img :src=afterImages[i] class="  opacity-50 -z-10" />

            </div>
            <div class="ba-thumb-divider"></div>
          </div>
          <div class="ba-case-meta">
            <div>
              <h4>{{ c.title }}</h4>
              <p>{{ c.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ba-section {
  background: var(--white);
  position: relative;
  /* padding: 40px 0; */
  min-height: 150vh;
}

.ba-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 80% 20%, rgba(37, 215, 184, 0.04) 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, rgba(13, 79, 139, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* ==================== Featured Slider ==================== */
.ba-featured {
  margin-bottom: 4rem;
}

.ba-slider-wrapper {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

/* Navigation */
.ba-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--white);
  border: 1px solid rgba(37, 215, 184, 0.15);
  color: var(--teal-600);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.ba-nav:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  box-shadow: var(--shadow-md);
}

.ba-nav-prev {
  left: -22px;
}

.ba-nav-next {
  right: -22px;
}

body.rtl .ba-nav-prev {
  left: auto;
  right: -22px;
}

body.rtl .ba-nav-next {
  right: auto;
  left: -22px;
}

body.rtl .ba-nav-prev :deep(svg) {
  transform: scaleX(-1);
}

body.rtl .ba-nav-next :deep(svg) {
  transform: scaleX(-1);
}

/* ==================== RTL: Slider image flip ==================== */
body.rtl .ba-before {
  left: auto;
  right: 0;
}

body.rtl .ba-after {
  right: auto;
  left: 0;
}

body.rtl .ba-handle {
  transform: translateX(50%);
}

/* Slider Container */
.ba-slider-container {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 2;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: ew-resize;
  user-select: none;
  box-shadow: var(--shadow-lg);
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.ba-image {
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 30vw;
  background-position: center center;
}

.ba-image img {
  max-width: 500px;
}

.ba-before {
  left: 0;
  width: v-bind(sliderPos + '%');
  z-index: 2;
}

.ba-after {
  right: 0;
  width: calc(100% - v-bind(sliderPos + '%'));
  z-index: 1;
}

.ba-image-content {
  text-align: center;
  color: white;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.ba-after-content {
  direction: ltr;
}

.ba-image-icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.ba-image-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ba-image-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  opacity: 0.8;
}

.ba-after-label {
  color: rgba(255, 255, 255, 0.9);
}

.ba-image-title {
  font-size: 1.3rem;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.ba-after-title {
  color: white;
}

/* Decorative patterns */
.ba-before-pattern {
  position: absolute;
  bottom: -20px;
  left: -20px;
  pointer-events: none;
  opacity: 0.15;
}

.ba-after-pattern {
  position: absolute;
  top: 2rem;
  right: 2rem;
  pointer-events: none;
}

/* Handle */
.ba-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  z-index: 5;
  transform: translateX(-50%);
  cursor: ew-resize;
}

.ba-handle-line {
  position: absolute;
  inset: 0;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.ba-handle-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  color: var(--teal-600);
  border: 2px solid var(--teal-400);
  transition: transform var(--transition-fast);
}

.ba-handle-circle :deep(svg) {
  width: 16px;
  height: 16px;
}

body.rtl .ba-handle-circle :deep(svg:first-child) {
  transform: scaleX(-1);
}

body.rtl .ba-handle-circle :deep(svg:last-child) {
  transform: scaleX(-1);
}

.ba-handle-circle:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

.ba-slider-container:active .ba-handle-circle {
  transform: translate(-50%, -50%) scale(1.15);
}

/* Case info below slider */
.ba-case-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.ba-case-dots {
  display: flex;
  gap: 0.5rem;
}

.ba-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gray-200);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}

.ba-dot.active {
  background: var(--teal-500);
  width: 28px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(37, 215, 184, 0.3);
}

.ba-dot:hover:not(.active) {
  background: var(--gray-300);
}

.ba-case-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  font-weight: 500;
}

/* ==================== Cases Grid ==================== */
.ba-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.ba-case-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  border: 1.5px solid rgba(37, 215, 184, 0.08);
  cursor: pointer;
  transition: all var(--transition-base);
}

.ba-case-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(37, 215, 184, 0.2);
}

.ba-case-card.active {
  border-color: var(--teal-500);
  box-shadow:
    0 0 0 2px rgba(37, 215, 184, 0.12),
    var(--shadow-md);
}

.ba-case-thumb {
  display: flex;
  border-radius: var(--radius-sm);
  overflow: hidden;
  height: 70px;
  margin-bottom: 1rem;
  position: relative;
}

.ba-thumb-before,
.ba-thumb-after {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
}

.ba-thumb-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
}

.ba-case-meta {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.ba-case-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.ba-case-meta h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.ba-case-meta p {
  font-size: 0.82rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ==================== Responsive ==================== */
@media (max-width: 768px) {
  .ba-nav {
    display: none;
  }

  .ba-slider-container {
    aspect-ratio: 4 / 3;
  }

  .ba-image-icon {
    font-size: 2.5rem;
  }

  .ba-image-title {
    font-size: 1rem;
  }

  .ba-handle-circle {
    width: 40px;
    height: 40px;
  }

  .ba-case-thumb {
    height: 90px;
  }
}

@media (max-width: 640px) {
  .ba-cases-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .ba-slider-container {
    aspect-ratio: 3 / 4;
  }

  .ba-cases-grid {
    grid-template-columns: 1fr;
  }

  .ba-case-card {
    padding: 1rem;
  }

  .ba-case-meta h4 {
    font-size: 0.85rem;
  }

  .ba-case-meta p {
    font-size: 0.75rem;
  }

  .ba-case-thumb {
    height: 60px;
  }
}

@media (max-width: 360px) {
  .ba-slider-container {
    aspect-ratio: 1 / 1.2;
  }

  .ba-handle-circle {
    width: 36px;
    height: 36px;
  }
}
</style>
