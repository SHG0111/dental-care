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

const route = useRoute()
const router = useRouter()
const store = useLanguageStore()

const serviceSlug = computed(() => route.params.slug as string)
const isPediatric = computed(() => serviceSlug.value === 'pediatric-dentistry')

const serviceIndex = computed(() => {
  const idx = store.t.services.items.findIndex(s => s.slug === serviceSlug.value)
  return idx >= 0 ? idx : 0
})

const service = computed(() => store.t.services.items[serviceIndex.value])
const detail = computed(() => store.t.servicesDetail[serviceIndex.value])

const pageTitle = computed(() => service.value?.title ?? '')

// Accordion
const openFaq = ref<number | null>(null)

function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

function goBack() {
  router.push({ name: 'home' })
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

const blockVariants = [
  { accent: 'teal', bg: 'bg-teal-glow' },
  { accent: 'blue', bg: 'bg-blue-glow' },
  { accent: 'gold', bg: 'bg-gold-glow' },
]
</script>

<template>
  <div class="service-details-page" :class="{ 'is-pediatric': isPediatric }">
    <!-- ==================== HERO ==================== -->
    <section id="sd-hero" ref="heroRef" :class="{ 'is-revealed': heroRevealed }" class="sd-hero reveal-scale">
      <!-- Pediatric floating decorations -->
      <template v-if="isPediatric">
        <div class="pediatric-floaties">
          <!-- Smiling tooth characters -->
          <svg class="pf pf-tooth pf-tooth-1" viewBox="0 0 60 60" width="50" height="50">
            <ellipse cx="30" cy="32" rx="18" ry="22" fill="#FFE5EC" stroke="#FF9EB5" stroke-width="1.5"/>
            <ellipse cx="30" cy="28" rx="14" ry="16" fill="#FFF0F5"/>
            <circle cx="23" cy="26" r="2.5" fill="#FF7B89"/>
            <circle cx="37" cy="26" r="2.5" fill="#FF7B89"/>
            <circle cx="23" cy="26" r="1" fill="#fff"/>
            <circle cx="37" cy="26" r="1" fill="#fff"/>
            <path d="M22 35 Q30 42 38 35" fill="none" stroke="#FF7B89" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="30" cy="20" r="3" fill="#FFE5EC" stroke="#FF9EB5" stroke-width="1"/>
          </svg>
          <svg class="pf pf-tooth pf-tooth-2" viewBox="0 0 60 60" width="36" height="36">
            <ellipse cx="30" cy="32" rx="18" ry="22" fill="#E8F8FF" stroke="#87CEEB" stroke-width="1.5"/>
            <ellipse cx="30" cy="28" rx="14" ry="16" fill="#F0F9FF"/>
            <circle cx="23" cy="26" r="2.5" fill="#5BA3D9"/>
            <circle cx="37" cy="26" r="2.5" fill="#5BA3D9"/>
            <circle cx="23" cy="26" r="1" fill="#fff"/>
            <circle cx="37" cy="26" r="1" fill="#fff"/>
            <path d="M22 35 Q30 42 38 35" fill="none" stroke="#5BA3D9" stroke-width="1.8" stroke-linecap="round"/>
            <circle cx="30" cy="20" r="3" fill="#E8F8FF" stroke="#87CEEB" stroke-width="1"/>
          </svg>
          <!-- Stars -->
          <svg class="pf pf-star pf-star-1" viewBox="0 0 30 30" width="22" height="22">
            <path d="M15 2l4 8.5 9.5 1.5-7 6.5 1.5 9L15 21l-8 4.5 1.5-9-7-6.5 9.5-1.5z" fill="#FFE5A3" stroke="#FFD700" stroke-width="0.5"/>
          </svg>
          <svg class="pf pf-star pf-star-2" viewBox="0 0 30 30" width="16" height="16">
            <path d="M15 2l4 8.5 9.5 1.5-7 6.5 1.5 9L15 21l-8 4.5 1.5-9-7-6.5 9.5-1.5z" fill="#FFE5A3" stroke="#FFD700" stroke-width="0.5"/>
          </svg>
          <!-- Hearts -->
          <svg class="pf pf-heart pf-heart-1" viewBox="0 0 32 32" width="18" height="18">
            <path d="M16 28S4 20 4 12a8 8 0 0 1 12-6 8 8 0 0 1 12 6c0 8-12 16-12 16z" fill="#FF9EB5" stroke="#FF7B89" stroke-width="0.8"/>
          </svg>
          <svg class="pf pf-heart pf-heart-2" viewBox="0 0 32 32" width="14" height="14">
            <path d="M16 28S4 20 4 12a8 8 0 0 1 12-6 8 8 0 0 1 12 6c0 8-12 16-12 16z" fill="#C3B1E1" stroke="#B39DDB" stroke-width="0.8"/>
          </svg>
          <!-- Clouds -->
          <svg class="pf pf-cloud pf-cloud-1" viewBox="0 0 80 40" width="80" height="40">
            <ellipse cx="30" cy="28" rx="20" ry="12" fill="#fff" opacity="0.6"/>
            <ellipse cx="50" cy="26" rx="18" ry="14" fill="#fff" opacity="0.6"/>
            <ellipse cx="40" cy="20" rx="22" ry="14" fill="#fff" opacity="0.7"/>
          </svg>
          <svg class="pf pf-cloud pf-cloud-2" viewBox="0 0 60 30" width="60" height="30">
            <ellipse cx="22" cy="20" rx="16" ry="10" fill="#fff" opacity="0.4"/>
            <ellipse cx="38" cy="18" rx="14" ry="11" fill="#fff" opacity="0.4"/>
            <ellipse cx="30" cy="14" rx="18" ry="11" fill="#fff" opacity="0.5"/>
          </svg>
          <!-- Rainbow -->
          <svg class="pf pf-rainbow" viewBox="0 0 120 60" width="120" height="60">
            <path d="M10,55 Q60,0 110,55" fill="none" stroke="#FF9EB5" stroke-width="3.5"/>
            <path d="M17,55 Q60,5 103,55" fill="none" stroke="#FFE5A3" stroke-width="3.5"/>
            <path d="M24,55 Q60,10 96,55" fill="none" stroke="#98D8C8" stroke-width="3.5"/>
            <path d="M31,55 Q60,15 89,55" fill="none" stroke="#87CEEB" stroke-width="3.5"/>
            <path d="M38,55 Q60,20 82,55" fill="none" stroke="#C3B1E1" stroke-width="3.5"/>
          </svg>
          <!-- Balloons -->
          <svg class="pf pf-balloon pf-balloon-1" viewBox="0 0 30 42" width="28" height="40">
            <ellipse cx="15" cy="18" rx="13" ry="16" fill="#FF9EB5"/>
            <path d="M15,34 Q14,38 12,42" fill="none" stroke="#FF7B89" stroke-width="1.2"/>
            <path d="M15,34 Q16,38 18,42" fill="none" stroke="#FF7B89" stroke-width="1.2"/>
            <ellipse cx="11" cy="14" rx="3" ry="4" fill="rgba(255,255,255,0.35)"/>
            <polygon points="15,33 13,31 17,31" fill="#FF7B89"/>
          </svg>
          <svg class="pf pf-balloon pf-balloon-2" viewBox="0 0 30 42" width="22" height="34">
            <ellipse cx="15" cy="18" rx="13" ry="16" fill="#87CEEB"/>
            <path d="M15,34 Q14,38 12,42" fill="none" stroke="#5BA3D9" stroke-width="1.2"/>
            <path d="M15,34 Q16,38 18,42" fill="none" stroke="#5BA3D9" stroke-width="1.2"/>
            <ellipse cx="11" cy="14" rx="3" ry="4" fill="rgba(255,255,255,0.35)"/>
            <polygon points="15,33 13,31 17,31" fill="#5BA3D9"/>
          </svg>
          <!-- Butterflies -->
          <svg class="pf pf-butterfly pf-butterfly-1" viewBox="0 0 36 28" width="30" height="24">
            <ellipse cx="18" cy="14" rx="2" ry="7" fill="#C3B1E1"/>
            <ellipse cx="8" cy="10" rx="7" ry="5" fill="#FF9EB5" transform="rotate(-20,8,10)"/>
            <ellipse cx="28" cy="10" rx="7" ry="5" fill="#FF9EB5" transform="rotate(20,28,10)"/>
            <ellipse cx="9" cy="21" rx="5" ry="4" fill="#C3B1E1" transform="rotate(20,9,21)"/>
            <ellipse cx="27" cy="21" rx="5" ry="4" fill="#C3B1E1" transform="rotate(-20,27,21)"/>
          </svg>
          <svg class="pf pf-butterfly pf-butterfly-2" viewBox="0 0 36 28" width="20" height="16">
            <ellipse cx="18" cy="14" rx="2" ry="7" fill="#98D8C8"/>
            <ellipse cx="8" cy="10" rx="7" ry="5" fill="#FFE5A3" transform="rotate(-20,8,10)"/>
            <ellipse cx="28" cy="10" rx="7" ry="5" fill="#FFE5A3" transform="rotate(20,28,10)"/>
            <ellipse cx="9" cy="21" rx="5" ry="4" fill="#98D8C8" transform="rotate(20,9,21)"/>
            <ellipse cx="27" cy="21" rx="5" ry="4" fill="#98D8C8" transform="rotate(-20,27,21)"/>
          </svg>
          <!-- Sparkle burst -->
          <svg class="pf pf-sparkle pf-sparkle-1" viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="#FFE5A3"/>
          </svg>
          <svg class="pf pf-sparkle pf-sparkle-2" viewBox="0 0 24 24" width="14" height="14">
            <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="#FFD700" opacity="0.7"/>
          </svg>
        </div>
      </template>

      <div class="sd-hero-bg">
        <div class="sd-hero-blob blob-1"></div>
        <div class="sd-hero-blob blob-2"></div>
      </div>
      <div class="sd-hero-pattern"></div>

      <div class="sd-hero-inner">
        <!-- Back button -->
        <button class="sd-back-btn" @click="goBack">
          <component :is="store.isRtl ? ArrowRight : ArrowLeft" :size="18" />
          <span>{{ store.isRtl ? 'العودة للرئيسية' : 'Back to Home' }}</span>
        </button>

        <div class="sd-hero-content">
          <!-- Number badge -->
          <div class="sd-hero-num">
            <span class="sd-hero-num-text">{{ serviceIndex + 1 < 10 ? '0' + (serviceIndex + 1) : serviceIndex + 1 }}</span>
          </div>

          <div class="sd-hero-text-col">
            <div class="sd-hero-label">
              <span class="sd-label-dot"></span>
              <span>{{ store.t.services.label }}</span>
            </div>

            <h1 class="sd-hero-title">
              <!-- {{ service?.icon ?? '' }} -->
              {{ pageTitle }}
            </h1>

            <p class="sd-hero-desc">
              {{ detail?.extendedDesc ?? '' }}
            </p>

            <div class="sd-hero-actions">
              <button class="btn btn-primary" @click="scrollToContact">
                <Calendar :size="18" />
                {{ store.isRtl ? 'احجز موعدك الآن' : 'Book Appointment' }}
              </button>
              <a
                href="https://wa.me/201200077665"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline"
              >
                <Phone :size="18" />
                {{ store.isRtl ? 'تواصل عبر واتساب' : 'Contact via WhatsApp' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Pediatric doodle divider ── -->
    <div v-if="isPediatric" class="pd-divider">
      <svg class="pd-divider-svg" viewBox="0 0 280 20" width="280" height="20">
        <path d="M0,10 Q35,0 70,10 T140,10 T210,10 T280,10" fill="none" stroke="#FF9EB5" stroke-width="2.5" opacity="0.5"/>
        <path d="M0,14 Q35,4 70,14 T140,14 T210,14 T280,14" fill="none" stroke="#87CEEB" stroke-width="1.5" opacity="0.4"/>
      </svg>
    </div>

    <!-- ==================== OVERVIEW ==================== -->
    <section
      id="sd-overview"
      ref="overviewRef"
      :class="{ 'is-revealed': overviewRevealed }"
      class="sd-section sd-overview reveal-slideUp"
    >
      <div class="sd-section-inner">
        <div class="sd-overview-grid">
          <div class="sd-overview-text">
            <div class="sd-section-label-wrap">
              <div class="sd-section-label">
                <span class="sd-label-dot"></span>
                <span>{{ store.isRtl ? 'نظرة عامة' : 'Overview' }}</span>
              </div>
            </div>
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

    <!-- ── Pediatric doodle divider ── -->
    <div v-if="isPediatric" class="pd-divider">
      <svg class="pd-divider-svg" viewBox="0 0 280 20" width="280" height="20">
        <path d="M0,10 Q35,0 70,10 T140,10 T210,10 T280,10" fill="none" stroke="#98D8C8" stroke-width="2.5" opacity="0.5"/>
        <path d="M0,14 Q35,4 70,14 T140,14 T210,14 T280,14" fill="none" stroke="#C3B1E1" stroke-width="1.5" opacity="0.4"/>
      </svg>
    </div>

    <!-- ==================== BENEFITS ==================== -->
    <section
      id="sd-benefits"
      ref="benefitsRef"
      :class="{ 'is-revealed': benefitsRevealed }"
      class="sd-section sd-benefits reveal-slideUp"
    >
      <div class="sd-section-inner">
        <div class="sd-section-header-text">
          <div class="sd-section-label-wrap">
            <div class="sd-section-label">
              <span class="sd-label-dot"></span>
              <span>{{ store.isRtl ? 'الفوائد' : 'Benefits' }}</span>
            </div>
          </div>
          <h2 class="sd-section-title">
            {{ store.isRtl ? 'لماذا تختار هذه الخدمة؟' : 'Why Choose This Service?' }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.isRtl ? 'نقدم لك أفضل ما في طب الأسنان' : 'We bring you the best in dental care' }}
          </p>
        </div>

        <div ref="benefitsGridRef" :class="{ 'is-revealed': _benefitsGridRevealed }" class="sd-benefits-grid">
          <div
            v-for="(benefit, i) in detail?.benefits ?? []"
            :key="i"
            class="sd-benefit-card reveal-stagger-item"
            :style="{
              transitionDelay: `${0.1 + i * 0.08}s`,
            }"
          >
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

    <!-- ── Pediatric doodle divider ── -->
    <div v-if="isPediatric" class="pd-divider">
      <svg class="pd-divider-svg" viewBox="0 0 280 20" width="280" height="20">
        <path d="M0,10 Q35,0 70,10 T140,10 T210,10 T280,10" fill="none" stroke="#87CEEB" stroke-width="2.5" opacity="0.5"/>
        <path d="M0,14 Q35,4 70,14 T140,14 T210,14 T280,14" fill="none" stroke="#FF9EB5" stroke-width="1.5" opacity="0.4"/>
      </svg>
    </div>

    <!-- ==================== PROCESS ==================== -->
    <section
      id="sd-process"
      ref="processRef"
      :class="{ 'is-revealed': processRevealed }"
      class="sd-section sd-process reveal-slideUp"
    >
      <div class="sd-section-inner">
        <div class="sd-section-header-text">
          <div class="sd-section-label-wrap">
            <div class="sd-section-label">
              <span class="sd-label-dot"></span>
              <span>{{ store.isRtl ? 'الخطوات' : 'Process' }}</span>
            </div>
          </div>
          <h2 class="sd-section-title">
            {{ store.isRtl ? 'كيف تتم الخدمة؟' : 'How It Works' }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.isRtl ? 'خطوات بسيطة لخدمة متكاملة' : 'Simple steps for a complete service' }}
          </p>
        </div>

        <div ref="processGridRef" :class="{ 'is-revealed': _processGridRevealed }" class="sd-process-timeline">
          <div
            v-for="(step, i) in detail?.process ?? []"
            :key="i"
            class="sd-process-step reveal-stagger-item"
            :style="{
              transitionDelay: `${0.1 + i * 0.15}s`,
            }"
          >
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

    <!-- ── Pediatric doodle divider ── -->
    <div v-if="isPediatric" class="pd-divider">
      <svg class="pd-divider-svg" viewBox="0 0 280 20" width="280" height="20">
        <path d="M0,10 Q35,0 70,10 T140,10 T210,10 T280,10" fill="none" stroke="#C3B1E1" stroke-width="2.5" opacity="0.5"/>
        <path d="M0,14 Q35,4 70,14 T140,14 T210,14 T280,14" fill="none" stroke="#98D8C8" stroke-width="1.5" opacity="0.4"/>
      </svg>
    </div>

    <!-- ==================== FAQ ==================== -->
    <section
      id="sd-faq"
      ref="faqRef"
      :class="{ 'is-revealed': faqRevealed }"
      class="sd-section sd-faq reveal-clip"
    >
      <div class="sd-section-inner">
        <div class="sd-faq-header">
          <div class="sd-section-label-wrap">
            <div class="sd-section-label">
              <span class="sd-label-dot"></span>
              <span>{{ store.isRtl ? 'الأسئلة الشائعة' : 'FAQ' }}</span>
            </div>
          </div>
          <h2 class="sd-section-title">
            {{ store.isRtl ? 'أسئلة شائعة' : 'Frequently Asked Questions' }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.isRtl ? 'إجابات على أكثر الأسئلة شيوعاً حول هذه الخدمة' : 'Answers to the most common questions about this service' }}
          </p>
        </div>

        <div class="sd-faq-list">
          <div
            v-for="(item, i) in detail?.faq ?? []"
            :key="i"
            class="sd-faq-item"
            :class="{ 'sd-faq-open': openFaq === i }"
          >
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
    </section>

    <!-- ── Pediatric doodle divider ── -->
    <div v-if="isPediatric" class="pd-divider">
      <svg class="pd-divider-svg" viewBox="0 0 280 20" width="280" height="20">
        <path d="M0,10 Q35,0 70,10 T140,10 T210,10 T280,10" fill="none" stroke="#FFE5A3" stroke-width="2.5" opacity="0.5"/>
        <path d="M0,14 Q35,4 70,14 T140,14 T210,14 T280,14" fill="none" stroke="#FF9EB5" stroke-width="1.5" opacity="0.4"/>
      </svg>
    </div>

    <!-- ==================== TESTIMONIALS ==================== -->
    <section
      id="sd-testimonials"
      ref="testimonialRef"
      :class="{ 'is-revealed': testimonialRevealed }"
      class="sd-section sd-testimonials reveal-slideUp"
    >
      <div class="sd-section-inner">
        <div class="sd-testimonials-header">
          <div class="sd-section-label-wrap">
            <div class="sd-section-label">
              <span class="sd-label-dot"></span>
              <span>{{ store.t.testimonials.label }}</span>
            </div>
          </div>
          <h2 class="sd-section-title">
            {{ store.t.testimonials.title }}
          </h2>
          <p class="sd-section-subtitle">
            {{ store.t.testimonials.subtitle }}
          </p>
        </div>

        <div ref="testimonialGridRef" :class="{ 'is-revealed': _testimonialGridRevealed }" class="sd-testimonials-grid">
          <div
            v-for="(item, i) in store.t.testimonials.items"
            :key="i"
            class="sd-testimonial-card reveal-stagger-item"
            :style="{ transitionDelay: `${i * 0.12}s` }"
          >
            <div class="sd-testimonial-stars">
              <Star
                v-for="s in item.stars"
                :key="s"
                :size="14"
                class="sd-star-icon"
              />
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

    <!-- ── Pediatric doodle divider ── -->
    <div v-if="isPediatric" class="pd-divider">
      <svg class="pd-divider-svg" viewBox="0 0 280 20" width="280" height="20">
        <path d="M0,10 Q35,0 70,10 T140,10 T210,10 T280,10" fill="none" stroke="#FF9EB5" stroke-width="2.5" opacity="0.5"/>
        <path d="M0,14 Q35,4 70,14 T140,14 T210,14 T280,14" fill="none" stroke="#87CEEB" stroke-width="1.5" opacity="0.4"/>
      </svg>
    </div>

    <!-- ==================== CTA ==================== -->
    <section
      id="sd-cta"
      ref="ctaRef"
      :class="{ 'is-revealed': ctaRevealed }"
      class="sd-section sd-cta reveal-scale"
    >
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
            <button class="btn btn-primary" @click="scrollToContact">
              <Calendar :size="18" />
              {{ store.isRtl ? 'احجز موعد' : 'Book Appointment' }}
            </button>
            <a
              href="https://wa.me/201200077665"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-light"
            >
              <Phone :size="18" />
              {{ store.isRtl ? 'واتساب' : 'WhatsApp' }}
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

.sd-section-label-wrap {
  margin-bottom: 0.75rem;
}

.sd-section-label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--teal-600);
  background: var(--teal-50);
  padding: 0.35rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(37, 215, 184, 0.15);
}

.sd-label-dot {
  width: 6px;
  height: 6px;
  background: var(--teal-500);
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
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
  background: var(--gradient-hero);
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
  background-image: radial-gradient(rgba(37, 215, 184, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.sd-hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
  position: relative;
  z-index: 1;
  flex: 1;
}

/* Back button */
.sd-back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--teal-600);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(37, 215, 184, 0.12);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  margin-bottom: 3rem;
}

.sd-back-btn:hover {
  background: var(--white);
  border-color: var(--teal-300);
  transform: translateX(-3px);
}

body.ltr .sd-back-btn:hover {
  transform: translateX(3px);
}

/* Hero content */
.sd-hero-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: start;
}

.sd-hero-num {
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
  font-weight: 900;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.sd-hero-desc {
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--text-secondary);
  max-width: 620px;
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

.sd-ov-card-stat + .sd-ov-card-stat {
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
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 2rem 1.75rem;
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  flex-direction: column;
}

.sd-testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
  border-color: var(--teal-200);
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

/* Floating decorations */
.is-pediatric .pediatric-floaties {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.is-pediatric .pf {
  position: absolute;
  animation: pf-float 8s ease-in-out infinite;
}

.is-pediatric .pf-tooth-1 {
  top: 12%;
  right: 8%;
  animation-delay: 0s;
  animation-duration: 7s;
}

.is-pediatric .pf-tooth-2 {
  bottom: 18%;
  left: 6%;
  animation-delay: 2s;
  animation-duration: 9s;
}

.is-pediatric .pf-star-1 {
  top: 25%;
  left: 12%;
  animation-delay: 1s;
  animation-duration: 5s;
}

.is-pediatric .pf-star-2 {
  bottom: 35%;
  right: 15%;
  animation-delay: 3s;
  animation-duration: 6s;
}

.is-pediatric .pf-heart-1 {
  top: 40%;
  left: 5%;
  animation-delay: 0.5s;
  animation-duration: 6s;
}

.is-pediatric .pf-heart-2 {
  bottom: 25%;
  right: 20%;
  animation-delay: 1.5s;
  animation-duration: 5s;
}

.is-pediatric .pf-cloud-1 {
  top: 5%;
  left: 15%;
  animation-delay: 0s;
  animation-duration: 12s;
}

.is-pediatric .pf-cloud-2 {
  top: 55%;
  right: 5%;
  animation-delay: 4s;
  animation-duration: 14s;
}

/* --- New doodle floaties --- */
.is-pediatric .pf-rainbow {
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  animation: pf-float 12s ease-in-out infinite;
  animation-delay: 0s;
  opacity: 0.6;
}

.is-pediatric .pf-balloon-1 {
  top: 8%;
  left: 18%;
  animation: pf-balloon-drift 6s ease-in-out infinite;
  animation-delay: 0s;
}

.is-pediatric .pf-balloon-2 {
  top: 20%;
  right: 12%;
  animation: pf-balloon-drift 7s ease-in-out infinite;
  animation-delay: 1.5s;
}

.is-pediatric .pf-butterfly-1 {
  top: 45%;
  left: 3%;
  animation: pf-butterfly 5s ease-in-out infinite;
  animation-delay: 0.8s;
}

.is-pediatric .pf-butterfly-2 {
  bottom: 30%;
  right: 8%;
  animation: pf-butterfly 6s ease-in-out infinite;
  animation-delay: 2.2s;
}

.is-pediatric .pf-sparkle-1 {
  top: 15%;
  left: 28%;
  animation: pf-twinkle 3s ease-in-out infinite;
  animation-delay: 0.3s;
}

.is-pediatric .pf-sparkle-2 {
  bottom: 40%;
  left: 45%;
  animation: pf-twinkle 2.5s ease-in-out infinite;
  animation-delay: 1.8s;
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

@keyframes pf-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-12px) rotate(3deg);
  }
  50% {
    transform: translateY(-6px) rotate(-2deg);
  }
  75% {
    transform: translateY(-15px) rotate(4deg);
  }
}

@keyframes pf-twinkle {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes pf-balloon-drift {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  30% { transform: translateY(-18px) rotate(2deg); }
  60% { transform: translateY(-8px) rotate(-1deg); }
  80% { transform: translateY(-22px) rotate(3deg); }
}

@keyframes pf-butterfly {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(8px, -12px) rotate(5deg); }
  50% { transform: translate(-4px, -6px) rotate(-3deg); }
  75% { transform: translate(10px, -18px) rotate(6deg); }
}

@keyframes pf-bounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.05); }
}

/* --- Pediatric hero content --- */
.is-pediatric .sd-hero-label {
  background: #FFE5EC;
  color: #FF7B89;
  border-color: rgba(255, 155, 181, 0.25);
}

.is-pediatric .sd-hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  color: #5BA3D9;
}

.is-pediatric .sd-hero-desc {
  color: #6B7B8D;
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

.is-pediatric .sd-benefit-card:nth-child(1) { border-top-color: #FF9EB5; }
.is-pediatric .sd-benefit-card:nth-child(2) { border-top-color: #87CEEB; }
.is-pediatric .sd-benefit-card:nth-child(3) { border-top-color: #98D8C8; }
.is-pediatric .sd-benefit-card:nth-child(4) { border-top-color: #C3B1E1; }
.is-pediatric .sd-benefit-card:nth-child(5) { border-top-color: #FFE5A3; }

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
    radial-gradient(circle at 20% 30%, rgba(255,155,181,0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(135,206,235,0.12) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(152,216,200,0.08) 0%, transparent 50%);
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

@media (max-width: 768px) {
  .is-pediatric .pf-tooth-1,
  .is-pediatric .pf-tooth-2 {
    width: 30px;
    height: 30px;
  }
  .is-pediatric .pf-cloud-1,
  .is-pediatric .pf-cloud-2 {
    width: 50px;
    height: 25px;
  }
}

@media (max-width: 480px) {
  .is-pediatric .pf {
    display: none;
  }

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
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-clip.is-revealed {
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
