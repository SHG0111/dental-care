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

const route = useRoute()

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
