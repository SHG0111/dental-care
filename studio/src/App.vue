<script setup>
import CustomCursor from './components/layout/CustomCursor.vue'
import AppNav from './components/layout/AppNav.vue'
import AppFooter from './components/layout/AppFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import NarrativeSection from './components/sections/NarrativeSection.vue'
import DialogueSection from './components/sections/DialogueSection.vue'
import GallerySection from './components/sections/GallerySection.vue'
</script>

<template>
  <CustomCursor />
  <AppNav />
  <main>
    <HeroSection />
    <GallerySection />
    <NarrativeSection />
    <DialogueSection />
  </main>
  <AppFooter />
</template>
