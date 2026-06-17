<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal } from '@/composables/useGsapReveal'
import { ChevronLeft, ChevronRight, Star } from '@lucide/vue'
import gsap from 'gsap'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

useGsapScrubReveal(headerRef, { animation: 'fadeUp' })

const items = computed(() => store.t.testimonials.items || [])
const isRtl = computed(() => store.isRtl)

// ── Carousel State ──
const currentIndex = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragOffset = ref(0)
const isHovered = ref(false)
const isAutoPlaying = ref(true)

let autoPlayTimer: ReturnType<typeof setInterval> | null = null
let slideWidth = 0

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 1)
}

// ── Slide navigation ──
function goTo(index: number) {
  const len = items.value.length
  currentIndex.value = ((index % len) + len) % len
  animateTrack()
}

function nextSlide() {
  goTo(currentIndex.value + 1)
}
function prevSlide() {
  goTo(currentIndex.value - 1)
}

// ── Track animation ──
function animateTrack(offset = 0) {
  if (!trackRef.value) return
  const numSlides = items.value.length
  const x = isRtl.value
    ? (currentIndex.value - numSlides + 1) * slideWidth + offset
    : -(currentIndex.value * slideWidth) + offset
  gsap.to(trackRef.value, {
    x,
    duration: 0.6,
    ease: 'power3.out',
    overwrite: 'auto',
  })
}

// ── Auto-play ──
function startAutoPlay() {
  stopAutoPlay()
  autoPlayTimer = setInterval(() => {
    if (!isHovered.value && isAutoPlaying.value) nextSlide()
  }, 4000)
}

function stopAutoPlay() {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

// ── Pointer drag ──
function onPointerDown(e: PointerEvent) {
  isDragging.value = true
  isAutoPlaying.value = false
  dragStartX.value = e.clientX
  dragOffset.value = 0
  if (trackRef.value) {
    gsap.set(trackRef.value, { clearProps: 'overwrite' })
  }
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  dragOffset.value = e.clientX - dragStartX.value
  const maxOffset = slideWidth * 0.35
  const clamped = Math.max(-maxOffset, Math.min(maxOffset, dragOffset.value))
  if (trackRef.value) {
    const numSlides = items.value.length
    const baseX = isRtl.value
      ? (currentIndex.value - numSlides + 1) * slideWidth
      : -(currentIndex.value * slideWidth)
    gsap.set(trackRef.value, {
      x: baseX + clamped,
      overwrite: 'auto',
    })
  }
}

function onPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false
  const threshold = slideWidth * 0.15
  if (isRtl.value) {
    // In RTL: drag left → prev, drag right → next
    if (dragOffset.value < -threshold) prevSlide()
    else if (dragOffset.value > threshold) nextSlide()
    else animateTrack()
  } else {
    if (dragOffset.value < -threshold) nextSlide()
    else if (dragOffset.value > threshold) prevSlide()
    else animateTrack()
  }
  dragOffset.value = 0
  // Resume auto-play after a pause
  setTimeout(() => {
    isAutoPlaying.value = true
  }, 4000)
}

// ── Resize ──
function updateSlideWidth() {
  if (trackRef.value?.parentElement) {
    slideWidth = trackRef.value.parentElement.offsetWidth
    animateTrack()
  }
}

let resizeObs: ResizeObserver | null = null

onMounted(() => {
  updateSlideWidth()
  resizeObs = new ResizeObserver(updateSlideWidth)
  if (trackRef.value?.parentElement) {
    resizeObs.observe(trackRef.value.parentElement)
  }
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
  resizeObs?.disconnect()
})
</script>

<template>
  <section id="testimonials" ref="sectionRef" class="section testimonials-section">
    <!-- Decorative background blobs -->
    <div class="testi-blob testi-blob-1"></div>
    <div class="testi-blob testi-blob-2"></div>

    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" class="section-header centered">
        <h2 class="section-title">
          {{ store.t.testimonials.title }}
        </h2>
        <p class="section-subtitle">
          {{ store.t.testimonials.subtitle }}
        </p>
      </div>

      <!-- ── Carousel ── -->
      <div class="testi-carousel" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <!-- Track -->
        <div ref="trackRef" class="testi-track" @pointerdown="onPointerDown" @pointermove="onPointerMove"
          @pointerup="onPointerUp" @pointerleave="onPointerUp" :style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
          <div v-for="(testimonial, i) in items" :key="i" class="testi-slide">
            <div class="testi-card">
              <!-- Decorative quote mark -->
              <div class="testi-quote-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round">
                  <path
                    d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path
                    d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>

              <!-- Stars -->
              <div class="testi-stars">
                <Star v-for="s in testimonial.stars" :key="s" :size="14" fill="#F5A623" color="#F5A623" />
              </div>

              <!-- Text -->
              <p class="testi-text">"{{ testimonial.text }}"</p>

              <!-- Author -->
              <div class="testi-author">
                <div class="testi-avatar" :style="{
                  background: `linear-gradient(135deg, var(--teal-${[200, 300, 400, 500][i % 4]}), var(--teal-${[600, 700, 700, 800][i % 4]}))`,
                }">
                  {{ getInitials(testimonial.name) }}
                </div>
                <div class="testi-author-info">
                  <div class="testi-author-name">{{ testimonial.name }}</div>
                  <div class="testi-author-label">{{ testimonial.label }}</div>
                </div>
                <!-- Floating gradient dot -->
                <div class="testi-author-dot" :style="{ background: `var(--teal-${[200, 300, 400, 500][i % 4]})` }">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Navigation ── -->
        <button class="testi-nav testi-nav-prev" @click="prevSlide" aria-label="Previous">
          <ChevronLeft :size="20" />
        </button>
        <button class="testi-nav testi-nav-next" @click="nextSlide" aria-label="Next">
          <ChevronRight :size="20" />
        </button>
      </div>

      <!-- ── Dots ── -->
      <div class="testi-dots">
        <button v-for="(_, i) in items" :key="i" class="testi-dot" :class="{ active: i === currentIndex }"
          @click="goTo(i)" :aria-label="`Testimonial ${i + 1}`">
          <span class="testi-dot-inner"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  position: relative;
  overflow: hidden;
}

/* Decorative blobs */
.testi-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  /* opacity: 0.15; */
}

.testi-blob-1 {
  width: 500px;
  height: 500px;
  background: var(--teal-200);
  top: -200px;
  right: -100px;
}

.testi-blob-2 {
  width: 400px;
  height: 400px;
  background: var(--teal-100);
  bottom: -150px;
  left: -100px;
}

/* ============================================
   CAROUSEL
   ============================================ */
.testi-carousel {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  max-width: 820px;
  padding: 0 0rem;
}

.testi-track {
  display: flex;
  transition: none;
  user-select: none;
  touch-action: pan-y;
  direction: ltr;
}

.testi-slide {
  min-width: 100%;
  flex-shrink: 0;
  padding: 0.5rem;
}

.testi-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2.5rem 2rem;
  border: 1px solid rgba(37, 215, 184, 0.08);
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.4s ease;
  box-shadow:
    0 4px 24px rgba(37, 215, 184, 0.06),
    0 0 0 1px rgba(37, 215, 184, 0.04);
  max-width: 800px;
}

html[dir=rtl] .testi-card {
  direction: rtl;
}

.testi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  opacity: 0.6;
}

/* Gradient dot pattern top-right */
.testi-card::after {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 215, 184, 0.04), transparent 70%);
  pointer-events: none;
}

/* Quote icon */
.testi-quote-icon {
  color: var(--teal-100);
  margin-bottom: 1rem;
  opacity: 0.7;
}

.testi-stars {
  display: flex;
  gap: 3px;
  margin-bottom: 1.25rem;
}

.testi-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-style: italic;
  position: relative;
  z-index: 1;
}

/* Author row */
.testi-author {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(37, 215, 184, 0.06);
  position: relative;
}

.testi-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  box-shadow: 0 4px 12px rgba(37, 215, 184, 0.2);
}

.testi-author-info {
  display: flex;
  flex-direction: column;
}

.testi-author-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.testi-author-label {
  font-size: 0.82rem;
  color: var(--text-muted);
}

/* Decorative dot next to author */
.testi-author-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
  opacity: 0.4;
  animation: pulse-dot 2s ease-in-out infinite;
}

body.ltr .testi-author-dot {
  margin-left: auto;
  margin-right: 0;
}

body.rtl .testi-author-dot {
  margin-left: 0;
  margin-right: auto;
}

/* ── Navigation Arrows ── */
.testi-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
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
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  opacity: 0;
}

.testi-carousel:hover .testi-nav {
  opacity: 1;
}

.testi-nav:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(37, 215, 184, 0.35);
  transform: translateY(-50%) scale(1.08);
}

.testi-nav-prev {
  left: 5px;
}

.testi-nav-next {
  right: 5px;
}

body.rtl .testi-nav-prev {
  left: auto;
  right: 5px;
}

body.rtl .testi-nav-next {
  right: auto;
  left: 5px;
}

body.rtl .testi-nav-prev :deep(svg) {
  transform: scaleX(-1);
}

body.rtl .testi-nav-next :deep(svg) {
  transform: scaleX(-1);
}

/* ── Dots ── */
.testi-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.testi-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--gray-200);
  cursor: pointer;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.testi-dot-inner {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gray-200);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.testi-dot.active {
  width: 32px;
}

.testi-dot.active .testi-dot-inner {
  width: 32px;
  border-radius: 5px;
  background: var(--gradient-primary);
  box-shadow: 0 2px 8px rgba(37, 215, 184, 0.35);
}

.testi-dot:hover:not(.active) {
  background: var(--gray-300);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 768px) {
  .testi-nav {
    display: none;
  }

  .testi-carousel {
    padding: 0;
  }
}

@media (max-width: 640px) {
  .testi-card {
    padding: 1.75rem 1.5rem 1.5rem;
  }

  .testi-text {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .testi-card {
    padding: 1.5rem 1.25rem 1.35rem;
  }

  .testi-text {
    font-size: 0.88rem;
  }

  .testi-avatar {
    width: 40px;
    height: 40px;
    font-size: 0.82rem;
  }

  .testi-author-name {
    font-size: 0.88rem;
  }

  .testi-author-label {
    font-size: 0.75rem;
  }
}
</style>
