<template>
  <section id="services" class="mt-section-gap mb-section-gap overflow-hidden">
    <div class="px-margin-mobile md:px-margin-desktop mb-16 md:mb-20 text-center">
      <h2 class="font-headline-lg text-3xl md:text-headline-lg mb-4">
        The <span class="relative inline-block">
          <span class="relative z-10">Services</span>
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
      <p class="font-body-md text-sm md:text-body-md text-on-surface-variant max-w-lg mx-auto">
        Comprehensive digital craft from concept to execution.
      </p>
    </div>

    <div class="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <div
        v-for="(service, index) in services"
        :key="index"
        ref="cardRefs"
        class="service-card group relative mb-8 rounded-2xl p-[1px] transition-all duration-700 cursor-default"
        :style="{ transitionDelay: `${index * 0.1}s` }"
        @mousemove="onCardMove($event, index)"
        @mouseleave="onCardLeave(index)"
      >
        <!-- Animated gradient border -->
        <div class="absolute inset-0  rounded-2xl bg-gradient-to-br from-secondary/30 via-secondary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-rotate" />

        <!-- Card body -->
        <div
          class="relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 p-8 md:p-10 flex flex-col h-full overflow-hidden transition-all duration-700 shadow-[0_16px_64px_-16px_rgba(39,29,26,0.10),0_4px_16px_-4px_rgba(39,29,26,0.06)]"
          :class="cardTilts[index]"
        >
          <!-- Shimmer overlay -->
          <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          <!-- Animated background orbs -->
          <div class="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-secondary-container/10 to-transparent blur-xl transition-all duration-700 group-hover:scale-150 group-hover:from-secondary-container/20" />
          <div class="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-secondary/5 to-transparent blur-xl transition-all duration-700 group-hover:scale-150 group-hover:from-secondary/10" />

          <!-- Icon -->
          <div class="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/10 via-secondary-container/5 to-white/50 flex items-center justify-center mb-6 ring-1 ring-white/50 shadow-inner group-hover:scale-110 group-hover:rotate-[8deg] group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all duration-500">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 animate-pulse-slow" />
            <HugeiconsIcon
              :icon="service.icon"
              :size="28"
              color="var(--color-secondary)"
              class="relative z-10 group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <!-- Content -->
          <h3 class="relative z-10 font-headline-md text-xl md:text-headline-md mb-3 text-primary group-hover:text-secondary transition-colors duration-700">
            <span v-for="(part, i) in formatText(service.title)" :key="i">
              <span v-if="part.type === 'special'"
                class="font-[system-ui,serif] italic"
              >{{ part.char }}</span>
              <template v-else>{{ part.text }}</template>
            </span>
          </h3>
          <p class="relative z-10 font-body-md text-sm md:text-body-md text-on-surface-variant flex-grow group-hover:translate-y-[-2px] transition-all duration-500">
            <span v-for="(part, i) in formatText(service.description)" :key="i">
              <span v-if="part.type === 'special'"
                class="font-[system-ui,serif] italic"
              >{{ part.char }}</span>
              <template v-else>{{ part.text }}</template>
            </span>
          </p>

          <!-- Learn more link -->
          <div class="relative z-10 mt-6 pt-6 border-t border-primary/5 flex items-center gap-3 text-secondary font-label-caps text-xs md:text-label-caps translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <span>Learn more</span>
            <button
              class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer icon-glass"
              :class="clickedCards[index] ? 'active' : 'bg-white/30 hover:bg-white/50'"
              @click.stop="toggleCard(index)"
              aria-label="Learn more"
            >
              <HugeiconsIcon
                :icon="ArrowRightIcon"
                :size="14"
                :color="clickedCards[index] ? 'var(--color-secondary)' : 'currentColor'"
                class="transition-transform duration-500"
                :class="clickedCards[index] ? 'translate-x-0.5' : ''"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { motion } from 'motion-v'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  MagicWand01Icon,
  PaintBrush01Icon,
  CodeIcon,
  Rocket01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons'

const ArrowRightIcon = ArrowRight01Icon
const cardRefs = ref([])

const specialChars = /([&@_\-—–])/

function formatText(text) {
  return text.split(specialChars).map((part) => {
    if (specialChars.test(part)) {
      return { type: 'special', char: part, text: '' }
    }
    return { type: 'text', text: part, char: '' }
  })
}
const cardTilts = reactive(Array(4).fill(''))
const clickedCards = reactive(Array(4).fill(false))

function toggleCard(index) {
  clickedCards[index] = !clickedCards[index]
}

const services = [
  {
    icon: MagicWand01Icon,
    title: 'Vision & Strategy',
    description:
      'We distill complex brand identities into a singular visual truth through rigorous intellectual exploration and strategic foresight.',
  },
  {
    icon: PaintBrush01Icon,
    title: 'Design Systems',
    description:
      'Pixel-perfect interfaces built on cohesive design languages that scale effortlessly across every touchpoint and device.',
  },
  {
    icon: CodeIcon,
    title: 'Development',
    description:
      'Technical mastery applied with precision — from fluid motion topographies to robust, performant digital architectures.',
  },
  {
    icon: Rocket01Icon,
    title: 'Launch & Scale',
    description:
      'From concept to deployment, we ensure your digital presence launches flawlessly and continues to evolve with purpose.',
  },
]

function onCardMove(e, index) {
  const card = cardRefs.value?.[index]
  if (!card) return
  const rect = (card as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -6
  const rotateY = ((x - centerX) / centerX) * 6
  cardTilts[index] = `[transform:perspective(1000px)_rotateX(${rotateX}deg)_rotateY(${rotateY}deg)]`
}

function onCardLeave(index) {
  cardTilts[index] = '[transform:perspective(1000px)_rotateX(0deg)_rotateY(0deg)]'
}
</script>

<style scoped>
@keyframes border-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.service-card > .absolute {
  background-size: 200% 200%;
  animation: border-rotate 4s ease infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
</style>
