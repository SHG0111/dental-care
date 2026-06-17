<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { VueLenis } from 'lenis/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoaderScreen from '@/components/LoaderScreen.vue'
import NavBar from '@/components/NavBar.vue'
import MapSection from '@/components/MapSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'
import CustomCursor from '@/components/CustomCursor.vue'
import {
  useStructuredData,
  useGoogleAnalytics,
  getDentistSchema,
  getWebSiteSchema,
} from '@/composables/useStructuredData'

const store = useLanguageStore()

// Google Analytics 4
useGoogleAnalytics('G-16RE50DBJK')

// Site-wide JSON-LD structured data
useStructuredData([
  getDentistSchema(store.t),
  getWebSiteSchema(),
])
const isLoaded = ref(false)
const lenisRef = ref<InstanceType<typeof VueLenis> | null>(null)

function onLoaded() {
  isLoaded.value = true
}

onMounted(() => {
  store.initLang()
})

// Sync Lenis with GSAP ScrollTrigger
watchEffect((onInvalidate) => {
  const instance = lenisRef.value
  if (!instance?.lenis) return

  const lenis = instance.lenis

  lenis.on('scroll', ScrollTrigger.update)

  function update(time: number) {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(update)
  gsap.ticker.lagSmoothing(0)

  onInvalidate(() => {
    gsap.ticker.remove(update)
    lenis.destroy()
  })
})
</script>

<template>
  <LoaderScreen v-if="!isLoaded" @loaded="onLoaded" />
  <VueLenis
    v-if="isLoaded"
    root
    ref="lenisRef"
    :options="{ autoRaf: false, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }"
  >
    <div class="app-wrapper" :class="{ 'ltr': !store.isRtl }">
      <NavBar />
      <main>
        <RouterView />
      </main>
      <MapSection />
      <FooterSection />
      <WhatsAppButton />
      <CustomCursor />
    </div>
  </VueLenis>
</template>

<style>
@import '@/assets/main.css';

.app-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>
