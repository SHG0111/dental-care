<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import BeforeAfterSection from '@/components/BeforeAfterSection.vue'
import FacebookReelsSection from '@/components/FacebookReelsSection.vue'
import HoursBanner from '@/components/HoursBanner.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useLanguageStore } from '@/stores/language'
import { usePageMeta } from '@/composables/usePageMeta'
import {
  useStructuredData,
  SITE_URL,
  getBreadcrumbSchema,
  getAggregateRatingSchema,
} from '@/composables/useStructuredData'

const store = useLanguageStore()

usePageMeta({
  title: store.isRtl
    ? 'مركز بلازا لرعاية الاسنان | Plaza Dental Care Center'
    : 'Plaza Dental Care Center | Best Dentist in Alexandria Egypt',
  description: store.isRtl
    ? 'مركز بلازا لرعاية الاسنان - أفضل مركز أسنان وتجميل في الإسكندرية. نقدم ابتسامة هوليود، زراعة الأسنان، تقويم الأسنان، علاج الجذور، وتبييض الأسنان بأحدث التقنيات وبأيدي أمهر الأطباء.'
    : 'Plaza Dental Care Center — premier dentist in Alexandria, Egypt. Expert Hollywood Smile, dental implants, orthodontics, root canal, teeth whitening & pediatric dentistry. Book your appointment today.',
  keywords: store.isRtl
    ? 'مركز أسنان, عيادة أسنان, إسكندرية, طب أسنان, تجميل أسنان, ابتسامة هوليود, زراعة أسنان, تقويم أسنان, بلازا لرعاية الاسنان'
    : 'dentist Alexandria, dental clinic Egypt, Plaza Dental Care, Hollywood Smile, dental implants, orthodontics, teeth whitening, root canal, pediatric dentist',
})
const route = useRoute()

// HomePage JSON-LD structured data
useStructuredData(() => {
  const siteUrl = SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  const schemas: Record<string, unknown>[] = [
    getBreadcrumbSchema([
      { name: store.t.nav.home, url: siteUrl },
    ]),
  ]

  if (store.t.testimonials?.items?.length) {
    const agg = getAggregateRatingSchema(
      store.t.testimonials.items,
      store.t.services.title,
      siteUrl,
    )
    if (agg) schemas.push(agg)
  }

  return schemas
})

function getLenis() {
  const l = (window as any).lenis
  return (l && typeof l.scrollTo === 'function') ? l : null
}

onMounted(() => {
  // Scroll to hash if navigated from another page
  if (route.hash) {
    nextTick(() => {
      setTimeout(() => {
        const lenis = getLenis()
        if (lenis) {
          lenis.scrollTo(route.hash, { immediate: false })
        }
      }, 400)
    })
  }
})
</script>

<template>
  <HeroSection />
  <BeforeAfterSection />
  <ServicesSection />
  <TeamSection />
  <AboutSection />
  <TestimonialsSection />
  <FacebookReelsSection />
  <HoursBanner />
  <ContactSection />
</template>
