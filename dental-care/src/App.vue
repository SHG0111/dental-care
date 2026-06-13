<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import LoaderScreen from '@/components/LoaderScreen.vue'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import BeforeAfterSection from '@/components/BeforeAfterSection.vue'
import FacebookReelsSection from '@/components/FacebookReelsSection.vue'
import HoursBanner from '@/components/HoursBanner.vue'
import ContactSection from '@/components/ContactSection.vue'
import MapSection from '@/components/MapSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'

const store = useLanguageStore()
const isLoaded = ref(false)

function onLoaded() {
  isLoaded.value = true
}

onMounted(() => {
  store.initLang()
})
</script>

<template>
  <LoaderScreen v-if="!isLoaded" @loaded="onLoaded" />
  <div v-if="isLoaded" class="app-wrapper" :class="{ 'ltr': !store.isRtl }">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BeforeAfterSection />
      <TeamSection />
      <TestimonialsSection />
      <FacebookReelsSection />
      <HoursBanner />
      <ContactSection />
      <MapSection />
    </main>
    <FooterSection />
    <WhatsAppButton />
  </div>
</template>

<style>
/* Import global styles */
@import '@/assets/main.css';

.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
