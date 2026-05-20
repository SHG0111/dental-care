<template>
  <header
    id="hero"
    class="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
  >
    <!-- Layered background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-linear-to-b from-surface/20 via-transparent to-surface" />

      <!-- Decorative rings -->
      <motion.div
        class="absolute top-1/3 left-1/4 w-64 h-64 md:w-96 md:h-96 opacity-[0.04]"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 60, repeat: Infinity, ease: 'linear' }"
      >
        <svg class="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-secondary)" stroke-width="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="var(--color-secondary)" stroke-width="0.3" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="var(--color-secondary)" stroke-width="0.2" />
        </svg>
      </motion.div>

      <motion.div
        class="absolute bottom-1/3 right-1/4 w-48 h-48 md:w-80 md:h-80 opacity-[0.03]"
        :animate="{ rotate: -360 }"
        :transition="{ duration: 80, repeat: Infinity, ease: 'linear' }"
      >
        <svg class="w-full h-full" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="var(--color-tertiary)" stroke-width="0.5" />
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="var(--color-tertiary)" stroke-width="0.3" />
        </svg>
      </motion.div>

      <!-- Floating dots -->
      <motion.div
        v-for="dot in dots"
        :key="dot.id"
        class="absolute w-1.5 h-1.5 rounded-full"
        :class="dot.color === 'secondary' ? 'bg-secondary/20' : 'bg-tertiary/15'"
        :style="{ left: `${dot.x}%`, top: `${dot.y}%` }"
        :animate="{ y: [0, dot.drift, 0], opacity: [0.3, 0.8, 0.3] }"
        :transition="{ duration: 4 + dot.delay, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }"
      />
    </div>

    <div class="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-5xl">
      <!-- Established -->
      <motion.p
        class="font-label-caps text-xs md:text-label-caps text-primary/60 mb-12 tracking-[0.3em] uppercase"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
      >
        Established 1995
      </motion.p>

      <!-- Title with staggered words -->
      <h1 class="font-display text-[48px] md:text-display-lg text-primary mb-8 leading-[1.1] md:leading-display-lg overflow-hidden">
        <span class="flex flex-wrap justify-center gap-x-4">
          <motion.span
            v-for="(word, i) in titleWords"
            :key="i"
            class="inline-block"
            :class="i === 3 ? 'italic font-light' : ''"
            :initial="{ opacity: 0, y: 60, rotateX: -30 }"
            :animate="{ opacity: 1, y: 0, rotateX: 0 }"
            :transition="{
              duration: 0.8,
              delay: 0.3 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }"
          >
              <span v-if="i === 3" class="relative inline-block">
                <span class="relative z-10 italic font-light">{{ word }}</span>
                <motion.div
                  class="absolute inset-0 -inset-y-2 overflow-hidden"
                  :initial="{ scaleX: 0 }"
                  :animate="{ scaleX: 1 }"
                  :style="{ transformOrigin: 'left' }"
                  :transition="{ duration: 1.8, delay: 0.3 + 3 * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }"
                >
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 400 80"
                    preserveAspectRatio="none"
                    style="transform: rotate(-1.2deg)"
                  >
                    <path
                      d="M 12,38 C 40,30 80,46 130,36 C 180,26 230,44 280,34 C 330,24 370,42 395,35 L 395,45 C 370,52 330,36 280,46 C 230,56 180,40 130,50 C 80,60 40,44 12,50 Z"
                      fill="var(--color-secondary)"
                      opacity="0.12"
                    />
                    <path
                      d="M 15,41 C 50,36 90,48 140,39 C 190,30 240,44 290,36 C 340,28 374,42 390,37 L 390,43 C 374,47 340,36 290,43 C 240,50 190,39 140,47 C 90,55 50,43 15,47 Z"
                      fill="var(--color-secondary)"
                      opacity="0.08"
                    />
                  </svg>
                </motion.div>
              </span>
            <template v-else>{{ word }}</template>
          </motion.span>
        </span>
      </h1>

      <!-- CTA row -->
      <motion.div
        class="flex flex-col md:flex-row items-center justify-center gap-8"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }" 
        :transition="{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }"
      >
        <motion.button
          class="px-10 py-4 border border-primary font-label-caps text-xs md:text-label-caps rounded-full hover:bg-primary hover:text-surface transition-colors duration-500 group overflow-hidden relative"
          :while-hover="{ scale: 1.04 }"
          :while-tap="{ scale: 0.96 }"
          :transition="{ type: 'spring', stiffness: 400, damping: 17 }"
        >
          <span class="relative z-10">Explore the Archive</span>
          <div class="absolute inset-0 bg-linear-to-r from-secondary/20 to-transparent translate-x-100% group-hover:translate-x-100% transition-transform duration-1000" />
        </motion.button>

        <div class="w-12 h-1px bg-primary/20 hidden md:block" />

        <motion.p
          class="font-body-lg text-sm md:text-body-lg text-primary/70 max-w-xs text-left"
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }"
        >
          Synthesizing light, form, and digital craft into weightless experiences.
        </motion.p>
      </motion.div>
    </div>

    <!-- Animated ambient glow orbs -->
    <motion.div
      class="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 ambient-glow rounded-full pointer-events-none"
      :animate="{ x: [0, 30, -20, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.95, 1] }"
      :transition="{ duration: 12, repeat: Infinity, ease: 'easeInOut' }"
    />
    <motion.div
      class="absolute bottom-1/4 -right-20 w-[20rem] h-20rem md:w-30rem md:h-30rem] ambient-glow rounded-full pointer-events-none"
      :animate="{ x: [0, -25, 20, 0], y: [0, 15, -25, 0], scale: [1, 0.95, 1.05, 1] }"
      :transition="{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }"
    />
  </header>
</template>

<script setup>
import { motion } from 'motion-v'

const titleWords = ['The', 'Art', 'of', 'Reflection']

const dots = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 5 + Math.random() * 90,
  drift: (Math.random() - 0.5) * 30,
  delay: Math.random() * 3,
  color: i % 2 === 0 ? 'secondary' : 'tertiary',
}))
</script>
