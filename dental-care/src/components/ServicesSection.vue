<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import {
  useScrollReveal,
  useScrollStagger,
} from '@/composables/useScrollReveal'
import { useParallaxGroup } from '@/composables/useGsapReveal'
import { ArrowLeft, ArrowRight } from '@lucide/vue'

const router = useRouter()
const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

const { isRevealed: headerRevealed } = useScrollReveal(headerRef)
const { isRevealed: gridRevealed } = useScrollStagger(gridRef)
useParallaxGroup(sectionRef, { selector: '.services-bg-shape, .services-bg-dots', yRange: 40 })

function goToService(slug: string) {
  router.push({ name: 'service-details', params: { slug } })
}
const images = [
  '/smile.png',
  '/implant.png',
  '/braces.png',
  '/root.png',
  '/child.png',
  '/denture.png',
  '/crown.png',
  '/whitening.png',
  '/filling.png'
]
</script>

<template>
  <section id="services" ref="sectionRef" class="section services-section">
    <!-- Background decoration -->
    <div class="services-bg-shape"></div>
    <div class="services-bg-dots"></div>

    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" :class="{ 'is-revealed': headerRevealed }" class="section-header reveal-slideUp">
        <h2 class="section-title">
          {{ store.t.services.title.split(' ').slice(0, 2).join(' ') }}
          <span class="accent"> {{ store.t.services.title.split(' ').slice(2).join(' ') }}</span>
        </h2>
        <p class="section-subtitle">
          {{ store.t.services.subtitle }}
        </p>
      </div>

      <!-- Grid -->
      <div ref="gridRef" :class="{ 'is-revealed': gridRevealed }" class="services-grid">
        <div v-for="(service, i) in store.t.services.items" :key="i" class="service-card reveal-stagger-item"
          :style="{ transitionDelay: `${i * 0.08}s` }"
          @click="goToService(service.slug)">
          <!-- Card number badge -->
          <div class="service-num-wrap">
            <span class="service-num-bg">{{ i + 1 < 10 ? '0' + (i + 1) : i + 1 }}</span>
          </div>

          <div class="service-card-inner">
            <div class="service-icon">
              <img :src="images[i]" />
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.desc }}</p>
          </div>

          <div class="service-card-footer">
            <span class="service-read-more">
              {{ store.isRtl ? 'اعرف المزيد' : 'Learn more' }}
            </span>
            <div class="service-arrow">
              <component :is="store.isRtl ? ArrowLeft : ArrowRight" :size="16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  overflow: hidden;
}

/* Background decorations */
.services-bg-shape {
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(37, 215, 184, 0.04), transparent 70%);
  pointer-events: none;
}

.services-bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(37, 215, 184, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.8rem;
  position: relative;
  z-index: 1;
}

.service-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem 1.8rem;
  border: 1px solid rgba(37, 215, 184, 0.08);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  flex-direction: column;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(37, 215, 184, 0.18);
}

.service-card:hover::before {
  opacity: 1;
}

/* Number badge - large background number like drnour1.com */
.service-num-wrap {
  position: absolute;
  top: 0.5rem;
  left: 1.25rem;
  pointer-events: none;
}

body.ltr .service-num-wrap {
  left: auto;
  right: 1.25rem;
}

.service-num-bg {
  font-size: 5rem;
  font-weight: 900;
  color: var(--teal-50);
  line-height: 1;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all 0.4s ease;
  letter-spacing: -0.04em;
}

.service-card:hover .service-num-bg {
  color: var(--teal-100);
  transform: scale(1.05);
}

.service-card-inner {
  position: relative;
  z-index: 1;
  flex: 1;
}

.service-icon {
  width: 64px;
  height: 64px;
  background: var(--teal-50);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  font-size: 1.8rem;
  transition: all var(--transition-base);
  padding: 0.5rem;
}

.service-card:hover .service-icon {
  background: var(--gradient-primary-subtle);
  transform: scale(1.05) rotate(-3deg);
}

.service-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.service-card p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* Card footer with learn more */
.service-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(37, 215, 184, 0.06);
  position: relative;
  z-index: 1;
}

.service-read-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--teal-500);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

body.ltr .service-read-more {
  transform: translateX(8px);
}

.service-card:hover .service-read-more {
  opacity: 1;
  transform: translateX(0);
}

.service-arrow {
  color: var(--teal-300);
  transition: all 0.3s ease;
}

.service-card:hover .service-arrow {
  color: var(--teal-500);
  transform: translateX(-4px);
}

body.ltr .service-card:hover .service-arrow {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-num-bg {
    font-size: 3.5rem;
  }
}

@media (max-width: 480px) {
  .service-card {
    padding: 1.75rem 1.25rem 1.4rem;
  }

  .service-card h3 {
    font-size: 1.05rem;
  }

  .service-card p {
    font-size: 0.85rem;
  }

  .service-icon {
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
  }

  .service-num-bg {
    font-size: 2.8rem;
  }
}

/* ==========================================
   SCROLL REVEAL — CSS transitions (no opacity)
   ========================================== */
.reveal-slideUp {
  transform: translateY(50px);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-slideUp.is-revealed {
  transform: translateY(0);
}

.reveal-stagger-item {
  transform: translateY(40px);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.is-revealed .reveal-stagger-item {
  transform: translateY(0);
}
</style>
