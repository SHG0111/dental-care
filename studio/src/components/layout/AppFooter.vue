<template>
  <footer class="w-full py-16 md:py-20 bg-surface border-t border-primary/10">
    <div class="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-6 md:gap-8">
      <div class="font-headline-md text-2xl md:text-headline-md text-primary">
        Studio Be Creative
      </div>
      <div class="flex gap-8 md:gap-12 font-body-md text-sm md:text-body-md">
        <a
          v-for="link in footerLinks"
          :key="link.label"
          class="text-on-surface-variant hover:text-secondary transition-opacity duration-300"
          :class="{ 'font-bold': link.bold }"
          :href="link.href"
        >
          {{ link.label }}
        </a>
      </div>
      <p class="font-body-md text-xs md:text-body-md text-on-surface-variant opacity-60 text-center">
        &copy; {{ currentYear }} Studio Be Creative. All rights reserved. Crafted with Reflection.
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'Journal', href: '#', bold: false },
  { label: 'Privacy', href: '#', bold: false },
  { label: 'Inquiry', href: '#contact', bold: true },
]
</script>
