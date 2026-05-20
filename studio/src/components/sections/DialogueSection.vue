<template>
  <section
    id="dialogue"
    class="mt-section-gap px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto"
  >
    <div class="flex flex-col md:flex-row justify-between items-baseline mb-16 md:mb-24 gap-8">
      <h2 class="font-headline-lg text-3xl md:text-headline-lg max-w-xl">
        Commence the
        <span class="relative inline-block">
          <span class="relative z-10">Dialogue</span>
          <motion.div
            class="absolute inset-0 -inset-y-2 overflow-hidden pointer-events-none"
            :initial="{ scaleX: 0 }"
            :while-in-view="{ scaleX: 1 }"
            :transition="{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }"
            :viewport="{ once: false, margin: '-100px' }"
            :style="{ transformOrigin: 'left' }"
          >
            <svg class="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none" style="transform: rotate(-1.2deg)">
              <path d="M 12,38 C 40,30 80,46 130,36 C 180,26 230,44 280,34 C 330,24 370,42 395,35 L 395,45 C 370,52 330,36 280,46 C 230,56 180,40 130,50 C 80,60 40,44 12,50 Z" fill="var(--color-secondary)" opacity="0.12" />
              <path d="M 15,41 C 50,36 90,48 140,39 C 190,30 240,44 290,36 C 340,28 374,42 390,37 L 390,43 C 374,47 340,36 290,43 C 240,50 190,39 140,47 C 90,55 50,43 15,47 Z" fill="var(--color-secondary)" opacity="0.08" />
            </svg>
          </motion.div>
        </span>
      </h2>
      <p class="font-label-caps text-xs md:text-label-caps text-secondary/80 border-l-2 border-secondary pl-4">
        Let&rsquo;s Create Together
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <!-- Left: Content -->
      <motion.div
        class="md:col-span-5 glass-panel p-8 md:p-12 rounded-xl flex flex-col justify-between relative overflow-hidden group"
        :initial="{ opacity: 0, x: -40 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
      >
        <div class="relative z-10">
          <span class="font-label-caps text-xs md:text-label-caps text-primary/40 block mb-8 md:mb-12">Let&rsquo;s Talk</span>
          <h3 class="font-headline-md text-2xl md:text-headline-md mb-6">
            Every great project starts with a single conversation.
          </h3>
          <p class="font-body-lg text-sm md:text-body-lg text-on-surface-variant max-w-sm mb-8 md:mb-12">
            Whether you&rsquo;re envisioning a brand identity, a digital experience, or a complete visual ecosystem &mdash; we&rsquo;re ready to listen, challenge, and build.
          </p>
        </div>

        <motion.button
          class="relative z-10 self-start flex items-center gap-4 font-label-caps text-xs md:text-label-caps group-hover:text-secondary transition-colors"
          :while-hover="{ x: 4 }"
          :transition="{ duration: 0.3 }"
        >
          Start a Conversation
          <span
            class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 icon-glass bg-white/30 hover:bg-white/50 group-hover:border-secondary/40"
          >
            <HugeiconsIcon
              :icon="ArrowRightIcon"
              :size="16"
              color="currentColor"
              class="transition-transform duration-500 group-hover:translate-x-0.5"
            />
          </span>
        </motion.button>

        <!-- Subtle floating shapes inside panel -->
        <motion.div
          class="absolute -bottom-6 -right-6 w-24 h-24 opacity-[0.04]"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 40, repeat: Infinity, ease: 'linear' }"
        >
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="var(--color-secondary)" stroke-width="0.5" />
          </svg>
        </motion.div>
        <motion.div
          class="absolute -top-4 -left-4 w-16 h-16 opacity-[0.03]"
          :animate="{ rotate: -360 }"
          :transition="{ duration: 30, repeat: Infinity, ease: 'linear' }"
        >
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-tertiary)" stroke-width="0.5" />
          </svg>
        </motion.div>
      </motion.div>

      <!-- Right: Abstract shapes playground -->
      <motion.div
        class="md:col-span-7 relative h-[400px] md:h-[500px] bg-surface-container-low rounded-xl overflow-hidden"
        :initial="{ opacity: 0, x: 40 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
      >
        <!-- Ambient glow -->
        <div class="absolute inset-0 ambient-glow" />

        <!-- Floating message icon (center) -->
        <motion.div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40"
          :animate="{ y: [0, -12, 0], rotate: [-2, 2, -2] }"
          :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut' }"
        >
          <svg class="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="msg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--color-secondary)" stop-opacity="0.25" />
                <stop offset="100%" stop-color="var(--color-tertiary)" stop-opacity="0.15" />
              </linearGradient>
            </defs>
            <path d="M 50 12 C 28 12 10 28 10 48 C 10 56 12.5 63.5 16.5 70 L 12 88 L 30.5 83.5 C 36.5 86.5 43 88.5 50 88.5 C 72 88.5 90 72.5 90 48 C 90 28 72 12 50 12 Z" fill="url(#msg-grad)" stroke="url(#msg-grad)" stroke-width="2" />
            <line x1="32" y1="42" x2="68" y2="42" stroke="var(--color-surface)" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
            <line x1="32" y1="52" x2="58" y2="52" stroke="var(--color-surface)" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
          </svg>
        </motion.div>

        <!-- Floating ring -->
        <motion.div
          class="absolute top-[15%] right-[12%] w-16 h-16 md:w-20 md:h-20"
          :animate="{ y: [0, -15, 0], rotate: [0, 360], scale: [1, 1.05, 1] }"
          :transition="{ duration: 6, repeat: Infinity, ease: 'easeInOut' }"
        >
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-secondary)" stroke-width="0.3" opacity="0.3" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="var(--color-secondary)" stroke-width="0.2" opacity="0.2" />
          </svg>
        </motion.div>

        <!-- Floating triangle -->
        <motion.div
          class="absolute bottom-[20%] left-[10%] w-12 h-12 md:w-16 md:h-16"
          :animate="{ y: [0, 12, 0], rotate: [0, 120, 0], opacity: [0.3, 0.6, 0.3] }"
          :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }"
        >
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <polygon points="50,5 95,90 5,90" fill="none" stroke="var(--color-tertiary)" stroke-width="0.4" opacity="0.35" />
          </svg>
        </motion.div>

        <!-- Small drifting dots -->
        <motion.div
          v-for="dot in dots"
          :key="dot.id"
          class="absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
          :class="dot.color === 'secondary' ? 'bg-secondary/25' : 'bg-tertiary/20'"
          :style="{ left: `${dot.x}%`, top: `${dot.y}%` }"
          :animate="{ y: [0, dot.drift, 0], opacity: [0.2, 0.7, 0.2] }"
          :transition="{ duration: 4 + dot.delay, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }"
        />

        <!-- Pulsing ring overlay -->
        <motion.div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 rounded-full border border-secondary/10"
          :animate="{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }"
          :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
        />
        <motion.div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border border-tertiary/8"
          :animate="{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }"
          :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }"
        />

      </motion.div>
    </div>
  </section>
</template>

<script setup>
import { motion } from 'motion-v'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

const ArrowRightIcon = ArrowRight01Icon

const dots = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 5 + Math.random() * 90,
  drift: (Math.random() - 0.5) * 25,
  delay: Math.random() * 4,
  color: i % 2 === 0 ? 'secondary' : 'tertiary',
}))
</script>
