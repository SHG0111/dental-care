<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  Sparkles,
  Phone,
  Star,
} from '@lucide/vue'
import {
  useScrollReveal,
  useScrollStagger,
} from '@/composables/useScrollReveal'
import PediatricDecorations from '@/components/PediatricDecorations.vue'
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'
import Doodle from '@/components/Doodle.vue'
import {
  useStructuredData,
  SITE_URL,
  getBreadcrumbSchema,
  getServiceSchema,
  getFaqSchema,
  getAggregateRatingSchema,
} from '@/composables/useStructuredData'
import { usePageMeta } from '@/composables/usePageMeta'

const route = useRoute()
const router = useRouter()
const store = useLanguageStore()

// JSON-LD structured data for this service page
const siteUrl = SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')

const serviceSlug = computed(() => route.params.slug as string)
const isPediatric = computed(() => serviceSlug.value === 'pediatric-dentistry')

const serviceIndex = computed(() => {
  const idx = store.t.services.items.findIndex(s => s.slug === serviceSlug.value)
  return idx >= 0 ? idx : 0
})

const service = computed(() => store.t.services.items[serviceIndex.value])
const detail = computed(() => store.t.servicesDetail[serviceIndex.value])

const currentUrl = computed(() => `${siteUrl}/services/${serviceSlug.value}`)

const serviceTitle = service.value?.title ?? ''

usePageMeta({
  title: store.isRtl
    ? `${serviceTitle} - مركز بلازا لرعاية الاسنان`
    : `${serviceTitle} | Plaza Dental Care Center`,
  description: (() => {
    const raw = detail.value?.extendedDesc ?? ''
    if (raw) return raw.length > 200 ? raw.slice(0, 200) + '…' : raw
    return store.isRtl
      ? `تعرف على خدمة ${serviceTitle} في مركز بلازا لرعاية الاسنان - أفضل مركز أسنان في الإسكندرية`
      : `Professional ${serviceTitle} at Plaza Dental Care Center — expert dental care in Alexandria, Egypt.`
  })(),
  keywords: store.isRtl
    ? `${serviceTitle}, مركز بلازا, عيادة أسنان, إسكندرية, طب أسنان`
    : `${serviceTitle}, Plaza Dental Care, dentist Alexandria, dental clinic Egypt`,
})

useStructuredData(() => {
  const schemas: Record<string, unknown>[] = [
    getBreadcrumbSchema([
      { name: store.t.nav.home, url: siteUrl },
      { name: store.t.nav.services, url: `${siteUrl}/#services` },
      { name: service.value?.title ?? '', url: currentUrl.value },
    ]),
  ]

  if (service.value) {
    schemas.push(getServiceSchema(service.value))
  }

  if (detail.value?.faq?.length) {
    schemas.push(getFaqSchema(detail.value.faq))
  }

  if (store.t.testimonials?.items?.length) {
    const agg = getAggregateRatingSchema(
      store.t.testimonials.items,
      service.value?.title ?? store.t.services.title,
      currentUrl.value,
    )
    if (agg) schemas.push(agg)
  }

  return schemas
})

const pageTitle = computed(() => service.value?.title ?? '')

// Accordion
const openFaq = ref<number | null>(null)

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}
const doctors = [
  '/Dr_AbdelRahman.png',
  '/Dr_Hesham.png',
  '/Dr_Mohammed.png'
]
function getDoctor() {
  switch (serviceIndex.value) {
    case 0: return doctors[0];
    case 1: return doctors[0];
    case 2: return doctors[0];
    case 3: return doctors[2];
    case 4: return doctors[1];
    case 5: return doctors[1];
    case 6: return doctors[0];
    case 7: return doctors[0];
    case 8: return doctors[2];

  }

}

function scrollToContact() {
  router.push({ name: 'home', hash: '#contact' })
}

// GSAP scroll reveal refs
const heroRef = ref<HTMLElement | null>(null)
const overviewRef = ref<HTMLElement | null>(null)
const benefitsRef = ref<HTMLElement | null>(null)
const benefitsGridRef = ref<HTMLElement | null>(null)
const processRef = ref<HTMLElement | null>(null)
const processGridRef = ref<HTMLElement | null>(null)
const faqRef = ref<HTMLElement | null>(null)
const testimonialRef = ref<HTMLElement | null>(null)
const testimonialGridRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

// Scroll reveal animations (CSS transitions, no opacity)
const { isRevealed: heroRevealed } = useScrollReveal(heroRef, { threshold: 0.1 })
const { isRevealed: overviewRevealed } = useScrollReveal(overviewRef)
const { isRevealed: benefitsRevealed } = useScrollReveal(benefitsRef)
const { isRevealed: _benefitsGridRevealed } = useScrollStagger(benefitsGridRef)
const { isRevealed: processRevealed } = useScrollReveal(processRef)
const { isRevealed: _processGridRevealed } = useScrollStagger(processGridRef)
const { isRevealed: faqRevealed } = useScrollReveal(faqRef)
const { isRevealed: testimonialRevealed } = useScrollReveal(testimonialRef)
const { isRevealed: _testimonialGridRevealed } = useScrollStagger(testimonialGridRef)
const { isRevealed: ctaRevealed } = useScrollReveal(ctaRef)

const serviceImages = [
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
  <div class="service-details-page" :class="{ 'is-pediatric': isPediatric }">
    <!-- ==================== HERO ==================== -->
    <section id="sd-hero" ref="heroRef" :class="{ 'is-revealed': heroRevealed }" class="sd-hero reveal-scale relative">
      <!-- Pediatric floating decorations -->
      <template v-if="isPediatric">
        <PediatricDecorations />
      </template>

      <!-- <div class="sd-hero-bg">
        <div class="sd-hero-blob blob-1"></div>
        <div class="sd-hero-blob blob-2"></div>
      </div> -->
      <div class="sd-hero-pattern"></div>
      <!-- Base gradient background -->
      <div class="hero-bg"></div>

      <!-- Subtle grain/noise overlay -->
      <div class="hero-grain"></div>
      <!-- Accent light ray -->
      <div class="hero-light-ray"></div>
      <div class="sd-hero-inner">


        <div class="sd-hero-content">
          
          <div class="sd-hero-text-col">


            <h1 class="sd-hero-title">
              <!-- {{ service?.icon ?? '' }} -->
              {{ pageTitle }}
            </h1>

            <p class="sd-hero-desc">
              {{ detail?.extendedDesc ?? '' }}
            </p>

            <div class="sd-hero-actions relative">
              <a href="https://wa.me/201200077665" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <WhatsAppIcon :size="18" />
                {{ store.isRtl ? 'احجز موعدك الآن' : 'Book Appointment' }}
              </a>
            </div>
          </div>
        </div>
        <div class="relative flex items-center justify-center">

          <!-- Decorative accent ring -->
          <div class="hero-ring"></div>
          <div class="hero-ring hero-ring-2"></div>

          <img :src=getDoctor() class="w-[700px] mask-b-from-10% mask-b-to-90%"/>
        </div>
      </div>
    </section>

    <Doodle v-if="isPediatric" />

    <!-- ==================== OVERVIEW ==================== -->
    <section id="sd-overview" ref="overviewRef" :class="{ 'is-revealed': overviewRevealed }"
      class="sd-section sd-overview reveal-slideUp">
      <div class="sd-section-inner">
        <div class="sd-overview-grid">
          <div class="sd-overview-text">
            
            <h2 class="sd-section-title">
              {{ store.isRtl ? 'عن هذه الخدمة' : 'About This Service' }}
            </h2>
            <p class="sd-section-body">{{ detail?.extendedDesc ?? '' }}</p>
            <p class="sd-section-body sd-section-body-2">{{ detail?.extendedDesc2 ?? '' }}</p>
          </div>
          <div class="sd-overview-visual">
            <div class="sd-ov-card">
              <div class="sd-ov-card-icon">
                <img :src="serviceImages[serviceIndex]" alt="" class="sd-ov-card-img" />
              </div>
              <div class="sd-ov-card-title">{{ pageTitle }}</div>
              <div class="sd-ov-card-divider"></div>
              <div class="sd-ov-card-stat">
                <span class="sd-ov-stat-num">98%</span>
                <span class="sd-ov-stat-label">{{ store.isRtl ? 'نسبة نجاح' : 'Success Rate' }}</span>
              </div>
              <div class="sd-ov-card-stat">
                <span class="sd-ov-stat-num">{{ store.isRtl ? '+15 سنة' : '+15 Years' }}</span>
                <span class="sd-ov-stat-label">{{ store.isRtl ? 'خبرة' : 'Experience' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Doodle v-if="isPediatric"/>

    <!-- ==================== BENEFITS ==================== -->
    <section id="sd-benefits" ref="benefitsRef" :class="{ 'is-revealed': benefitsRevealed }"
      class="sd-section sd-benefits reveal-slideUp">
      <div class="sd-section-inner">
        <div class="sd-section-header-text">
          
          <h2 class="sd-section-title">
            {{ store.isRtl ? 'لماذا تختار هذه الخدمة؟' : 'Why Choose This Service?' }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.isRtl ? 'نقدم لك أفضل ما في طب الأسنان' : 'We bring you the best in dental care' }}
          </p>
        </div>

        <div ref="benefitsGridRef" :class="{ 'is-revealed': _benefitsGridRevealed }" class="sd-benefits-grid">
          <div v-for="(benefit, i) in detail?.benefits ?? []" :key="i" class="sd-benefit-card reveal-stagger-item"
            :style="{
              transitionDelay: `${0.1 + i * 0.08}s`,
            }">
            <div class="sd-benefit-icon">
              <CheckCircle :size="22" />
            </div>
            <div class="sd-benefit-text">
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Doodle v-if="isPediatric" />

    <!-- ==================== PROCESS ==================== -->
    <section id="sd-process" ref="processRef" :class="{ 'is-revealed': processRevealed }"
      class="sd-section sd-process reveal-slideUp">
      <div class="sd-section-inner">
        <div class="sd-section-header-text">
          
          <h2 class="sd-section-title">
            {{ store.isRtl ? 'كيف تتم الخدمة؟' : 'How It Works' }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.isRtl ? 'خطوات بسيطة لخدمة متكاملة' : 'Simple steps for a complete service' }}
          </p>
        </div>

        <div ref="processGridRef" :class="{ 'is-revealed': _processGridRevealed }" class="sd-process-timeline">
          <div v-for="(step, i) in detail?.process ?? []" :key="i" class="sd-process-step reveal-stagger-item" :style="{
            transitionDelay: `${0.1 + i * 0.15}s`,
          }">
            <div class="sd-step-num-wrap">
              <div class="sd-step-num">{{ i + 1 }}</div>
              <div v-if="i < (detail?.process.length ?? 1) - 1" class="sd-step-line"></div>
            </div>
            <div class="sd-step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Doodle v-if="isPediatric"/>
    <!-- ==================== FAQ ==================== -->
    <section id="sd-faq" ref="faqRef" :class="{ 'is-revealed': faqRevealed }" class="sd-section sd-faq reveal-clip">
      <div class="reveal-clip-inner">
        <div class="sd-section-inner">
        <div class="sd-faq-header">
          
          <h2 class="sd-section-title">
            {{ store.isRtl ? 'أسئلة شائعة' : 'Frequently Asked Questions' }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.isRtl ? 'إجابات على أكثر الأسئلة شيوعاً حول هذه الخدمة' : 'Answers to the most common questions about this service' }}
          </p>
        </div>

        <div class="sd-faq-list">
          <div v-for="(item, i) in detail?.faq ?? []" :key="i" class="sd-faq-item"
            :class="{ 'sd-faq-open': openFaq === i }">
            <button class="sd-faq-question" @click="toggleFaq(i)">
              <span>{{ item.q }}</span>
              <component :is="openFaq === i ? ChevronUp : ChevronDown" :size="18" class="sd-faq-chevron" />
            </button>
            <div class="sd-faq-answer-wrap" :class="{ 'sd-faq-answer-open': openFaq === i }">
              <p class="sd-faq-answer">{{ item.a }}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <Doodle v-if="isPediatric"/>

    <!-- ==================== TESTIMONIALS ==================== -->
    <section id="sd-testimonials" ref="testimonialRef" :class="{ 'is-revealed': testimonialRevealed }"
      class="sd-section sd-testimonials reveal-slideUp">
      <div class="sd-section-inner">
        <div class="sd-testimonials-header">
          
          <h2 class="sd-section-title">
            {{ store.t.testimonials.title }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.t.testimonials.subtitle }}
          </p>
        </div>

        <div ref="testimonialGridRef" :class="{ 'is-revealed': _testimonialGridRevealed }" class="sd-testimonials-grid">
          <div v-for="(item, i) in store.t.testimonials.items" :key="i" class="sd-testimonial-card reveal-stagger-item"
            :style="{ transitionDelay: `${i * 0.12}s` }">
            <div class="sd-testimonial-stars">
              <Star v-for="s in item.stars" :key="s" :size="14" class="sd-star-icon" />
            </div>
            <p class="sd-testimonial-text">"{{ item.text }}"</p>
            <div class="sd-testimonial-author">
              <div class="sd-testimonial-avatar">{{ item.name.charAt(0) }}</div>
              <div class="sd-testimonial-meta">
                <span class="sd-testimonial-name">{{ item.name }}</span>
                <span class="sd-testimonial-service">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Doodle v-if="isPediatric" />

    <!-- ==================== CTA ==================== -->
    <section id="sd-cta" ref="ctaRef" :class="{ 'is-revealed': ctaRevealed }" class="sd-section sd-cta reveal-scale">
      <div class="sd-cta-bg">
        <div class="sd-cta-pattern"></div>
        <div class="sd-cta-glow"></div>
      </div>
      <div class="sd-section-inner">
        <div class="sd-cta-content">
          <div class="sd-cta-icon">
            <Sparkles :size="32" />
          </div>
          <h2 class="sd-cta-title">
            {{ store.isRtl ? 'جاهز للحصول على ابتسامتك المثالية؟' : 'Ready for Your Perfect Smile?' }}
          </h2>
          <p class="sd-cta-desc">
            {{ store.isRtl
              ? 'احجز موعدك الآن واستعد لتجربة أسنان استثنائية مع فريق بلازا'
              : 'Book your appointment now and get ready for an exceptional dental experience with the Plaza team'
            }}
          </p>
          <div class="sd-cta-actions">
            
            <a href="https://wa.me/201200077665" target="_blank" rel="noopener noreferrer"
            class="btn btn-primary">
            <WhatsAppIcon :size="18" />
            {{ store.isRtl ? 'احجز موعد' : 'Book Appointment' }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ==========================================
   Service Details Page — Editorial/Luxury
   ========================================== */

.service-details-page {
  position: relative;
}

/* ----- Section base ----- */
.sd-section {
  padding: 14rem 0;
  position: relative;
}

.sd-section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}






.sd-section-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.sd-section-subtitle {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  max-width: 540px;
}

.sd-section-body {
  font-size: 0.95rem;
  line-height: 1.9;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
}

/* ==========================================
   HERO
   ========================================== */
.sd-hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 100px;
  background: #0a1628;
}

.sd-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.sd-hero-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.2;
}

.sd-hero-blob.blob-1 {
  width: 600px;
  height: 600px;
  background: var(--teal-100);
  top: -200px;
  left: -150px;
  animation: blob1 15s ease-in-out infinite;
}

.sd-hero-blob.blob-2 {
  width: 500px;
  height: 500px;
  background: #baeefb;
  bottom: -200px;
  right: -100px;
  animation: blob2 12s ease-in-out infinite;
}

.sd-hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(37, 215, 185, 0.453) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.sd-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0rem 6rem;
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
}




/* Hero content */
.sd-hero-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: start;
}



.sd-hero-num-text {
  display: block;
  font-size: clamp(6rem, 12vw, 10rem);
  font-weight: 900;
  line-height: 0.85;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.06em;
  font-family: var(--font-english-heading);
  padding: 0 10px;
}

.sd-hero-text-col {
  padding-top: 1rem;
}

.sd-hero-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--teal-600);
  background: rgba(37, 215, 184, 0.1);
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-full);
  margin-bottom: 1.25rem;
  border: 1px solid rgba(37, 215, 184, 0.15);
}

.sd-hero-title {
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1.1;
  color: var(--white);
  margin-bottom: 1.5rem;
}

.sd-hero-desc {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--white);
  max-width: 620px;
  opacity: 0.8;
  margin-bottom: 2.5rem;
}

.sd-hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ==========================================
   OVERVIEW
   ========================================== */
.sd-overview {
  background: var(--white);
}

.sd-overview-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
}

.sd-overview-text {
  padding-right: 2rem;
}

body.ltr .sd-overview-text {
  padding-right: 0;
  padding-left: 2rem;
}

.sd-section-body-2 {
  color: var(--text-primary);
  font-weight: 450;
}

/* Overview card */
.sd-overview-visual {
  display: flex;
  justify-content: center;
}

.sd-ov-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 2.5rem 2rem;
  border: 1px solid rgba(37, 215, 184, 0.08);
  text-align: center;
  max-width: 320px;
  width: 100%;
}

.sd-ov-card-icon {
  margin-bottom: 1rem;
}

.sd-ov-card-img {
  width: 100%;
  max-width: 180px;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: var(--radius-lg);
  display: block;
  margin: 0 auto;
}

.sd-ov-card-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-family: var(--font-english-heading);
}

.sd-ov-card-divider {
  width: 50px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  margin: 0 auto 1.5rem;
}

.sd-ov-card-stat {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.8rem 0;
}

.sd-ov-card-stat+.sd-ov-card-stat {
  border-top: 1px solid rgba(37, 215, 184, 0.08);
}

.sd-ov-stat-num {
  font-size: 1.4rem;
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sd-ov-stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* ==========================================
   BENEFITS
   ========================================== */
.sd-benefits {
  background: var(--bg-secondary);
}

.sd-benefits-header {
  margin-bottom: 3rem;
}

.sd-benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.sd-benefit-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--white);
  border-radius: var(--radius-md);
  border: 1px solid rgba(37, 215, 184, 0.06);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.sd-benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(37, 215, 184, 0.12);
}

.sd-benefit-card:nth-child(even) {
  margin-top: 1.5rem;
}

@media (max-width: 800px) {
  .sd-benefit-card:nth-child(even) {
    margin-top: 0;
  }
}

.sd-benefit-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: var(--teal-50);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal-600);
}

.sd-benefit-text h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
}

.sd-benefit-text p {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* ==========================================
   PROCESS / TIMELINE
   ========================================== */
.sd-process {
  background: var(--white);
}

.sd-process-header {
  margin-bottom: 4rem;
}

.sd-process-timeline {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem 4rem;
  position: relative;
}

.sd-process-step {
  display: flex;
  gap: 1.25rem;
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.sd-step-num-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.sd-step-num {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  flex-shrink: 0;
  font-family: var(--font-english-heading);
}

.sd-step-line {
  width: 2px;
  flex: 1;
  min-height: 40px;
  background: linear-gradient(180deg, var(--teal-200), transparent);
  margin-top: 0.5rem;
}

.sd-step-content h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
}

.sd-step-content p {
  font-size: 0.87rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* ==========================================
   FAQ
   ========================================== */
.sd-faq {
  background: var(--bg-secondary);
}

.sd-faq-header {
  margin-bottom: 3rem;
}

.sd-faq-list {
  max-width: 780px;
}

.sd-faq-item {
  background: var(--white);
  border-radius: var(--radius-md);
  border: 1px solid rgba(37, 215, 184, 0.06);
  margin-bottom: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.sd-faq-item:hover {
  box-shadow: var(--shadow-sm);
}

.sd-faq-item.sd-faq-open {
  border-color: rgba(37, 215, 184, 0.15);
  box-shadow: var(--shadow-sm);
}

.sd-faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  background: none;
  border: none;
  text-align: inherit;
  font-family: inherit;
  line-height: 1.5;
}

.sd-faq-chevron {
  flex-shrink: 0;
  color: var(--teal-400);
  transition: transform 0.3s ease;
}

.sd-faq-open .sd-faq-chevron {
  color: var(--teal-600);
}

.sd-faq-answer-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.sd-faq-answer-wrap.sd-faq-answer-open {
  grid-template-rows: 1fr;
}

.sd-faq-answer {
  overflow: hidden;
  padding: 0 1.5rem;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.sd-faq-answer-open .sd-faq-answer {
  padding-bottom: 1.5rem;
}

/* ==========================================
   TESTIMONIALS — Editorial Quote Cards
   ========================================== */
.sd-testimonials {
  background: var(--bg-primary);
}

.sd-testimonials-header {
  text-align: center;
  margin-bottom: 4rem;
}

.sd-testimonials-header .sd-section-subtitle {
  margin: 0 auto;
}

.sd-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.sd-testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--teal-200);
  border-radius: var(--radius-lg);
  padding: 2rem 1.75rem;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
}

.sd-testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(8, 221, 182, 0.211);
}

.sd-testimonial-stars {
  display: flex;
  gap: 2px;
  margin-bottom: 1rem;
}

.sd-star-icon {
  color: #f59e0b;
  fill: #f59e0b;
}

.sd-testimonial-text {
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-style: italic;
  flex: 1;
  margin-bottom: 1.25rem;
}

.sd-testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.sd-testimonial-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sd-testimonial-meta {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.sd-testimonial-name {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-primary);
}

.sd-testimonial-service {
  font-size: 0.78rem;
  color: var(--text-tertiary);
  letter-spacing: 0.02em;
}

/* ==========================================
   CTA BANNER
   ========================================== */
.sd-cta {
  background: var(--gradient-dark);
  overflow: hidden;
}

.sd-cta-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.sd-cta-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}

.sd-cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(37, 215, 184, 0.08), transparent 60%);
  border-radius: 50%;
}

.sd-cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
}

.sd-cta-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal-300);
  margin: 0 auto 1.5rem;
}

.sd-cta-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.sd-cta-desc {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.sd-cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ==========================================
   RESPONSIVE
   ========================================== */
@media (max-width: 1024px) {
  .sd-section-inner {
    padding: 0 2rem;
  }

  .sd-hero-inner {
    padding: 3rem 2rem 6rem;
  }
}

@media (max-width: 900px) {
  .sd-hero-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sd-hero-num-text {
    font-size: clamp(4rem, 15vw, 6rem);
  }

  .sd-overview-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .sd-overview-text {
    padding-right: 0;
  }

  body.ltr .sd-overview-text {
    padding-left: 0;
  }

  .sd-process-timeline {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 700px) {
  .sd-hero {
    min-height: auto;
    padding-top: 80px;
  }

  .sd-hero-inner {
    padding: 2rem 1.25rem 4rem;
  }

  .sd-section {
    padding: 4rem 0;
  }

  .sd-section-inner {
    padding: 0 1.25rem;
  }

  .sd-benefits-grid {
    grid-template-columns: 1fr;
  }

  .sd-hero-actions {
    flex-direction: column;
  }

  .sd-cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .sd-faq-question {
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .sd-section {
    padding: 5rem 0;
  }

  .sd-hero-title {
    font-size: 1.6rem;
  }

  .sd-step-num {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }

  .sd-testimonials-grid {
    grid-template-columns: 1fr;
  }

  .sd-hero-desc {
    font-size: 0.92rem;
  }

  .sd-cta-title {
    font-size: 1.4rem;
  }

  .sd-ov-card {
    padding: 1.75rem 1.25rem;
  }
}

@media (max-width: 360px) {
  .sd-section {
    padding: 3.5rem 0;
  }

  .sd-hero-title {
    font-size: 1.35rem;
  }

  .sd-hero-inner {
    padding: 1.5rem 0.75rem 3rem;
  }

  .sd-section-inner {
    padding: 0 0.75rem;
  }

  .sd-hero-num-text {
    font-size: clamp(3rem, 12vw, 4rem);
  }

  .sd-back-btn {
    font-size: 0.75rem;
    padding: 0.4rem 0.75rem;
  }

  .sd-faq-question {
    padding: 0.85rem 1rem;
    font-size: 0.82rem;
  }
}

/* ==========================================
   PEDIATRIC DENTISTRY — Child-friendly mode
   ========================================== */

/* --- Hero --- */
.is-pediatric .sd-hero {
  background: linear-gradient(135deg, #FFF0F5 0%, #F0F9FF 40%, #F0FFF4 70%, #FFFFF0 100%);
  min-height: 75vh;
}

.is-pediatric .sd-hero-pattern,
.is-pediatric .sd-hero-blob {
  display: none;
}

/* ── Doodle section dividers ── */
.pd-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.pd-divider-svg {
  display: block;
}

/* ── Pediatric background embellishments ── */
.is-pediatric .sd-overview {
  background: linear-gradient(180deg, #FFF0F5 0%, #ffffff 100%);
}

.is-pediatric .sd-benefits {
  background: linear-gradient(180deg, #F0F9FF 0%, #ffffff 100%);
}

.is-pediatric .sd-process {
  background: linear-gradient(180deg, #F0FFF4 0%, #ffffff 100%);
}

.is-pediatric .sd-faq {
  background: linear-gradient(180deg, #FFFFF0 0%, #ffffff 100%);
}

.is-pediatric .sd-testimonials {
  background: linear-gradient(180deg, #FFF0F5 0%, #ffffff 100%);
}
.is-pediatric .hero-bg {
  background: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%) !important;
}

@keyframes pf-twinkle {

  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes pf-bounce {

  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-6px) scale(1.05);
  }
}

/* --- Pediatric hero content --- */
.is-pediatric .sd-hero-label {
  background: #FFE5EC;
  color: #FF7B89;
  border-color: rgba(255, 155, 181, 0.25);
}

.is-pediatric .sd-hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  color: #5bd9d1;
}

.is-pediatric .sd-hero-desc {
  color: #d9e1ea;
  font-size: 1.05rem;
  line-height: 1.9;
}

.is-pediatric .sd-hero-actions .btn-primary {
  background: linear-gradient(135deg, #FF9EB5, #FF7B89);
  box-shadow: 0 4px 20px rgba(255, 123, 137, 0.35);
}

.is-pediatric .sd-hero-actions .btn-primary:hover {
  box-shadow: 0 6px 28px rgba(255, 123, 137, 0.45);
  transform: translateY(-2px);
}

.is-pediatric .sd-hero-actions .btn-outline {
  border-color: #87CEEB;
  color: #5BA3D9;
}

.is-pediatric .sd-hero-actions .btn-outline:hover {
  background: #F0F9FF;
  border-color: #5BA3D9;
}

.is-pediatric .sd-hero-num {
  display: none;
}

/* --- Pediatric back button --- */
.is-pediatric .sd-back-btn {
  background: #FFE5EC;
  border-color: #FF9EB5;
  color: #FF7B89;
  border-radius: 50px;
  font-weight: 700;
}

/* --- Pediatric section overrides --- */
.is-pediatric .sd-section-label {
  background: #FFE5EC;
  color: #FF7B89;
  border-color: rgba(255, 155, 181, 0.2);
  border-radius: 50px;
}

.is-pediatric .sd-section-title {
  color: #5BA3D9;
}

.is-pediatric .sd-section-subtitle,
.is-pediatric .sd-section-body {
  color: #6B7B8D;
}

/* --- Overview card --- */
.is-pediatric .sd-ov-card {
  background: linear-gradient(135deg, #FFF0F5, #F0F9FF);
  border-color: rgba(135, 206, 235, 0.15);
}

.is-pediatric .sd-ov-card-title {
  color: #FF7B89;
}

/* --- Overview card image doodle frame --- */
.is-pediatric .sd-ov-card-img {
  border: 3px dashed #FF9EB5;
  border-radius: 50%;
  padding: 4px;
  animation: pf-twinkle 3s ease-in-out infinite;
}

/* --- Benefits --- */
.is-pediatric .sd-benefit-card {
  border-top: 3px solid;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.is-pediatric .sd-benefit-card:nth-child(1) {
  border-top-color: #FF9EB5;
}

.is-pediatric .sd-benefit-card:nth-child(2) {
  border-top-color: #87CEEB;
}

.is-pediatric .sd-benefit-card:nth-child(3) {
  border-top-color: #98D8C8;
}

.is-pediatric .sd-benefit-card:nth-child(4) {
  border-top-color: #C3B1E1;
}

.is-pediatric .sd-benefit-card:nth-child(5) {
  border-top-color: #FFE5A3;
}

.is-pediatric .sd-benefit-card:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 12px 32px rgba(255, 155, 181, 0.15) !important;
}

.is-pediatric .sd-benefit-icon {
  background: #FFF0F5;
  border-radius: 50%;
  color: #FF7B89;
}

.is-pediatric .sd-benefit-text h3 {
  color: #5BA3D9;
}

.is-pediatric .sd-benefit-text p {
  color: #6B7B8D;
}

/* --- Process --- */
.is-pediatric .sd-step-num {
  background: linear-gradient(135deg, #FF9EB5, #FF7B89);
  color: #fff;
  box-shadow: 0 4px 12px rgba(255, 123, 137, 0.3);
  font-size: 1.1rem;
  animation: pf-bounce 2s ease-in-out infinite;
}

.is-pediatric .sd-step-num-wrap {
  animation-delay: calc(var(--step-index, 0) * 0.3s);
}

.is-pediatric .sd-step-line {
  background: linear-gradient(to bottom, #FFE5EC, #87CEEB, #98D8C8);
  width: 3px;
  border-radius: 3px;
}

.is-pediatric .sd-step-content h3 {
  color: #FF7B89;
}

.is-pediatric .sd-step-content p {
  color: #6B7B8D;
}

/* --- FAQ --- */
.is-pediatric .sd-faq-item {
  border-radius: 50px;
  border: 2px dashed #FF9EB5;
  background: #FFF0F5;
}

.is-pediatric .sd-faq-question {
  background: transparent;
  border-radius: 50px;
}

.is-pediatric .sd-faq-open .sd-faq-question {
  background: #FFE5EC;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.is-pediatric .sd-faq-question span {
  color: #5BA3D9;
}

.is-pediatric .sd-faq-answer {
  color: #6B7B8D;
}

/* --- Testimonials --- */
.is-pediatric .sd-testimonial-card {
  border-color: rgba(255, 155, 181, 0.15);
  border-radius: 24px;
  border-width: 2px;
}

.is-pediatric .sd-testimonial-card:hover {
  border-color: #FF9EB5;
  border-style: dashed;
  box-shadow: 0 12px 40px rgba(255, 155, 181, 0.12) !important;
}

.is-pediatric .sd-testimonial-avatar {
  background: linear-gradient(135deg, #FF9EB5, #FF7B89);
}

.is-pediatric .sd-star-icon {
  color: #FF7B89;
  fill: #FF7B89;
}

/* --- CTA --- */
.is-pediatric .sd-cta {
  background: linear-gradient(135deg, #FFF0F5, #F0F9FF, #FFFFF0) !important;
  position: relative;
}

.is-pediatric .sd-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(255, 155, 181, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(135, 206, 235, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(152, 216, 200, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

/* --- CTA --- */
.is-pediatric .sd-cta {
  background: linear-gradient(135deg, #FFF0F5, #F0F9FF, #FFFFF0) !important;
}

.is-pediatric .sd-cta-title {
  color: #5BA3D9;
}

.is-pediatric .sd-cta-desc {
  color: #6B7B8D;
}

.is-pediatric .sd-cta-icon {
  background: #FFE5EC;
  color: #FF7B89;
}

.is-pediatric .sd-cta-actions .btn-primary {
  background: linear-gradient(135deg, #FF9EB5, #FF7B89);
  box-shadow: 0 4px 20px rgba(255, 123, 137, 0.35);
}

.is-pediatric .sd-cta-actions .btn-primary:hover {
  box-shadow: 0 6px 28px rgba(255, 123, 137, 0.45);
}

.is-pediatric .sd-cta-actions .btn-outline-light {
  border-color: #87CEEB;
  color: #5BA3D9;
}

.is-pediatric .sd-cta-actions .btn-outline-light:hover {
  background: #F0F9FF;
  border-color: #5BA3D9;
  color: #5BA3D9;
}

.is-pediatric .sd-cta-bg {
  display: none;
}

/* --- Responsive pediatric --- */
@media (max-width: 900px) {
  .pd-divider {
    padding: 0.25rem 0;
  }

  .pd-divider-svg {
    width: 200px;
    height: 14px;
  }
}

@media (max-width: 768px) {}

@media (max-width: 480px) {
  .pd-divider {
    display: none;
  }

  .is-pediatric .sd-hero-title {
    font-size: 1.5rem;
  }
}

/* ==========================================
   SCROLL REVEAL — CSS transitions (no opacity)
   ========================================== */

/* Clip in — curtain sweeps left to right */
.reveal-clip {
  overflow: hidden;
}

.reveal-clip-inner {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-clip.is-revealed .reveal-clip-inner {
  clip-path: inset(0 0% 0 0);
}

/* Slide up */
.reveal-slideUp {
  transform: translateY(50px);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-slideUp.is-revealed {
  transform: translateY(0);
}

/* Scale in */
.reveal-scale {
  transform: scale(0.85);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-scale.is-revealed {
  transform: scale(1);
}

/* Stagger children - initial hidden state */
.reveal-stagger-item {
  transform: translateY(40px);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-revealed .reveal-stagger-item {
  transform: translateY(0);
}
</style>
