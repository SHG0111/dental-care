<template>
  <nav
    class="fixed top-8 left-1/2 -translate-x-1/2 w-fit px-8 md:px-12 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex gap-8 md:gap-16 items-center z-50 transition-all duration-700 hover:bg-white/10"
  >
    <div class="font-display text-lg md:text-xl text-primary tracking-[0.2em] font-light whitespace-nowrap">
      Studio Be Creative
    </div>
    <div class="hidden md:flex gap-8 lg:gap-12 items-center">
      <a
        v-for="item in navItems"
        :key="item.label"
        class="font-label-caps text-[11px] text-primary/60 hover:text-primary transition-all duration-500 tracking-[0.15em] relative group"
        :href="item.href"
      >
        {{ item.label }}
        <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
      </a>
    </div>
    <button
      class="md:hidden text-primary/40 hover:text-primary transition-colors"
      @click="isMobileOpen = !isMobileOpen"
      aria-label="Toggle menu"
    >
      <HugeiconsIcon :icon="isMobileOpen ? CloseIcon : MenuIcon" :size="24" color="currentColor" />
    </button>
  </nav>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileOpen"
        class="fixed inset-0 z-40 bg-surface/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
      >
        <a
          v-for="item in navItems"
          :key="item.label"
          class="font-headline-md text-2xl text-primary hover:text-secondary transition-colors"
          :href="item.href"
          @click="isMobileOpen = false"
        >
          {{ item.label }}
        </a>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { MenuIcon, Cancel01Icon } from '@hugeicons/core-free-icons'

const CloseIcon = Cancel01Icon

const isMobileOpen = ref(false)

const navItems = [
  { label: 'Narrative', href: '#narrative' },
  { label: 'Services', href: '#services' },
  { label: 'Reflection', href: '#reflection' },
  { label: 'Contact', href: '#contact' },
]
</script>
