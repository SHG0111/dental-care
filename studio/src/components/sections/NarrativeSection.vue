<template>
  <section
    id="narrative"
    class="mt-section-gap px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto"
  >
    <div class="flex flex-col md:flex-row justify-between items-baseline mb-16 md:mb-24 gap-8">
      <h2 class="font-headline-lg text-3xl md:text-headline-lg max-w-xl">
        A <span class="relative inline-block">
              <span class="relative z-10">Cinematic</span>
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
            </span> Narrative of Digital Craft
      </h2>
      <p class="font-label-caps text-xs md:text-label-caps text-secondary/80 border-l-2 border-secondary pl-4">
        Volume Series 03
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <!-- Vol I -->
      <motion.div
        class="md:col-span-7 glass-panel p-8 md:p-12 rounded-xl group"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
      >
        <span class="font-label-caps text-xs md:text-label-caps text-primary/40 block mb-8 md:mb-12">VOL. I</span>
        <h3 class="font-headline-md text-2xl md:text-headline-md mb-6 group-hover:italic transition-all">
          The Visionary Core
        </h3>
        <p class="font-body-lg text-sm md:text-body-lg text-on-surface-variant max-w-md mb-8 md:mb-12">
          Defining the architecture of thought. We distill complex brand identities into a Singular Visual Truth through rigorous intellectual exploration.
        </p>
        <div class="relative overflow-hidden h-48 md:h-64 rounded-lg">
          <img
            class="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            alt="A macro photograph of clear glass shards and prisms arranged on a warm beige surface."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYU6nS4EW61vNYrkiWvGEXJcyT_FANZK7zJYK-a1xlhc0qSOwIp1uZhZyLWLiiLaaDnfwlZzb7KNnjKoiwFiolb89JS4z414EZwJMS6ygHGniHBysiQyuAQpMbnwk6PtoRcwsde5ot_-HJUR9R9G8a7WXk0c7lCtNCaoKxBK7BJm2acsr6LBsiJkPQHM24U1ibW1qcV399U5vv3vXInBH7l8DjQKR-tfITObHjj7TB-_qH8YmwbiR3bTaTH0zcY6Km9KtJw92heuQ"
          />
        </div>
      </motion.div>

      <!-- Vol II -->
      <motion.div
        class="md:col-span-5 bg-secondary text-surface p-8 md:p-12 rounded-xl flex flex-col justify-between overflow-hidden relative group cursor-default"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
        @mousemove="onExecutionMove"
        @mouseleave="onExecutionLeave"
      >
        <!-- Animated grid -->
        <div class="absolute inset-0 opacity-[0.04] execution-grid pointer-events-none" />
        <div class="absolute inset-0 opacity-[0.02] execution-grid-delayed pointer-events-none" />

        <!-- Floating orbs -->
        <motion.div
          class="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-secondary-container/5 blur-2xl"
          :animate="{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }"
          :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut' }"
        />
        <motion.div
          class="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-secondary/5 blur-2xl"
          :animate="{ x: [0, -15, 10, 0], y: [0, 20, -10, 0] }"
          :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut' }"
        />

        <!-- Mouse spotlight -->
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          :style="spotlightStyle"
        />

        <div class="relative z-10">
          <span class="font-label-caps text-xs md:text-label-caps text-surface/40 block mb-8 md:mb-12 tracking-widest">VOL. II</span>

          <motion.h3
            class="font-headline-md text-2xl md:text-headline-md mb-6"
            :initial="{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' }"
            :while-in-view="{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }"
            :transition="{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }"
            :viewport="{ once: true }"
          >
            <span class="inline-block">Relentless</span>
            <span class="inline-block ml-2">Execution</span>
          </motion.h3>

          <motion.p
            class="font-body-md text-sm md:text-body-md text-surface/70"
            :initial="{ opacity: 0, y: 10 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }"
            :viewport="{ once: true }"
          >
            The translation of concept into pixel-perfect reality. No compromise. No friction.
          </motion.p>
        </div>

        <div class="relative z-10 mt-8 md:mt-12">
          <ul class="space-y-5 font-label-caps text-xs md:text-label-caps">
            <motion.li
              v-for="(item, index) in executionItems"
              :key="item.id"
              class="flex items-center gap-4 border-b border-surface/10 pb-3 group/item"
              :initial="{ opacity: 0, x: -20 }"
              :while-in-view="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.5, delay: 0.6 + index * 0.15, ease: [0.16, 1, 0.3, 1] }"
              :viewport="{ once: true }"
              :while-hover="{ x: 4, transition: { duration: 0.2 } }"
            >
              <span class="w-7 h-7 rounded-full border border-surface/20 flex items-center justify-center text-[10px] text-surface/50 shrink-0">
                0{{ item.id }}
              </span>
              <span>{{ item.label }}</span>
              <motion.span
                class="ml-auto h-1px bg-secondary-container/30"
                :initial="{ width: 0 }"
                :while-hover="{ width: 16 }"
                :transition="{ duration: 0.3 }"
              />
            </motion.li>
          </ul>
        </div>

        <!-- Sparkle particles -->
        <div class="absolute inset-0 pointer-events-none">
          <motion.span
            v-for="n in 12"
            :key="n"
            class="absolute w-1 h-1 rounded-full bg-white/60"
            :style="{
              left: `${particles[n-1]?.x ?? 50}%`,
              top: `${particles[n-1]?.y ?? 50}%`,
            }"
            :animate="{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }"
            :transition="{
              duration: 2 + (n % 3),
              repeat: Infinity,
              delay: (n % 2) * 1.5,
              ease: 'easeInOut',
            }"
          />
        </div>
      </motion.div>

      <!-- Vol III -->
      <motion.div
        class="md:col-span-12 glass-panel p-8 md:p-16 rounded-xl flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-gutter group overflow-hidden"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
      >
        <div class="w-full md:w-1/2">
          <span class="font-label-caps text-xs md:text-label-caps text-primary/40 block mb-8 md:mb-12">VOL. III</span>
          <h3 class="font-headline-lg text-3xl md:text-headline-lg mb-6 md:mb-8">
            The Aether <span class="relative inline-block">
              <span class="relative z-10">Distinction</span>
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
          </h3>
          <p class="font-body-lg text-sm md:text-body-lg text-on-surface-variant mb-8 md:mb-10">
            Where digital interface becomes atmospheric experience. We leverage light-theory and refractive UI to create emotional resonance.
          </p>
          <button
            class="flex items-center gap-4 font-label-caps text-xs md:text-label-caps group-hover:text-secondary transition-colors"
            @click="aetherClicked = !aetherClicked"
          >
            Discover the Aether
            <span
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 icon-glass"
              :class="aetherClicked ? 'active' : 'bg-white/30 hover:bg-white/50'"
            >
              <HugeiconsIcon
                :icon="ArrowRightIcon"
                :size="16"
                :color="aetherClicked ? 'var(--color-secondary)' : 'currentColor'"
                class="transition-transform duration-500"
                :class="aetherClicked ? 'translate-x-0.5' : ''"
              />
            </span>
          </button>
        </div>
        <motion.div
          class="w-full md:w-1/2 relative"
          :while-hover="{ scale: 1.02 }"
          :transition="{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }"
        >
          <div
            ref="sliderContainer"
            class="aspect-4/3 rounded-lg overflow-hidden border border-white/60 shadow-2xl relative select-none"
          >
            <!-- Color-tinted version (bottom layer) -->
            <img
              class="w-full h-full object-cover"
              alt="A mesmerizing close-up of a glass prism reflecting multiple spectral colors."
              :src="prismImg"
            />
            <div
              class="absolute inset-0 mix-blend-color pointer-events-none"
              :style="{ backgroundColor: 'var(--color-secondary)' }"
            />

            <!-- Grayscale version (top layer, clipped from right) -->
            <div
              class="absolute inset-0 overflow-hidden"
              :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }"
            >
              <img
                class="w-full h-full object-cover grayscale"
                alt="A mesmerizing close-up of a glass prism reflecting multiple spectral colors."
                :src="prismImg"
              />
            </div>

            <!-- Draggable divider handle -->
            <div
              class="absolute top-0 bottom-0 z-10 cursor-ew-resize flex items-center"
              :style="{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }"
              @mousedown.prevent="onSliderStart"
            >
              <div class="h-full w-6 flex items-center justify-center relative">
                <div class="h-full w-px bg-white/80 shadow-lg absolute" />
                <div
                  class="relative w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>

<style scoped>
@keyframes grid-shift {
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
}

.execution-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: grid-shift 4s linear infinite;
}

.execution-grid-delayed {
  background-image:
    linear-gradient(rgba(252,130,114,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(252,130,114,0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: grid-shift 6s linear infinite reverse;
}
</style>

<script setup>
import { ref, reactive } from 'vue'
import { motion } from 'motion-v'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'

const ArrowRightIcon = ArrowRight01Icon
const aetherClicked = ref(false)
const spotlight = reactive({ x: 50, y: 50 })

const prismImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMf0reVcZ1aQLh4jmwmWbeb2nJ9-IqPbuCeY3nlDRo6_xy0qSTf7NLaAMy3KpKS3JZROyioAmapmRlhl7ZwhYFqXYK-Vn6c29aRoXFhhnepPJKPAa6v5XROleIjFRfqLRLqaSczucl4BJ-qsz9nMXkSTTUxdbJAL-H5Ambyoiba-setmgraoDCgPS9tWKcySY2c6_fGI71Ow7oaH7S3SK6WDeoOuzZHpj86dEpO025bWxZ58EOGVU7qZtGR7cbkpweu9g7WSQiDKQ'

const sliderPos = ref(50)
const isDragging = ref(false)
const sliderContainer = ref(null)

function onSliderStart(e) {
  isDragging.value = true
  updateSliderPos(e)
  document.addEventListener('mousemove', onSliderMove)
  document.addEventListener('mouseup', onSliderEnd)
}

function onSliderMove(e) {
  if (!isDragging.value) return
  updateSliderPos(e)
}

function onSliderEnd() {
  isDragging.value = false
  document.removeEventListener('mousemove', onSliderMove)
  document.removeEventListener('mouseup', onSliderEnd)
}

function updateSliderPos(e) {
  const el = sliderContainer.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  sliderPos.value = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
}

const spotlightStyle = {
  background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(252,130,114,0.08) 0%, transparent 60%)`,
}

const particles = Array.from({ length: 12 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
}))

function onExecutionMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  spotlight.x = ((e.clientX - rect.left) / rect.width) * 100
  spotlight.y = ((e.clientY - rect.top) / rect.height) * 100
}

function onExecutionLeave() {
  spotlight.x = 50
  spotlight.y = 50
}

const executionItems = [
  { id: 1, label: 'Interaction Systems' },
  { id: 2, label: 'Motion Topographies' },
  { id: 3, label: 'Technical Mastery' },
]
</script>
