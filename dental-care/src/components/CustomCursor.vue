<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const isVisible = ref(false)
const isTouch = ref(false)
const cursorRef = ref<HTMLElement | null>(null)
const followerRef = ref<HTMLElement | null>(null)

let mouseX = -100
let mouseY = -100
let posX = -100
let posY = -100
let rafId = 0
let currentHovered: HTMLElement | null = null

const INTERACTIVE_SELECTOR = 'a, button, .btn, input, textarea, select, [role="button"], .service-card, .team-card, .ba-case-card, .testimonial-card, .sd-benefits-card, .sd-process-step, .leaflet-container'

function onFirstMove(e: MouseEvent) {
  isVisible.value = true
  mouseX = e.clientX
  mouseY = e.clientY
  posX = mouseX
  posY = mouseY
  if (cursorRef.value) gsap.set(cursorRef.value, { x: mouseX, y: mouseY, opacity: 1 })
  if (followerRef.value) gsap.set(followerRef.value, { x: mouseX - 20, y: mouseY - 20, opacity: 1 })
  document.addEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousemove', onFirstMove)
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (cursorRef.value) {
    gsap.set(cursorRef.value, { x: mouseX, y: mouseY })
  }
}

function onMouseEnterInteractive() {
  if (followerRef.value) {
    gsap.to(followerRef.value, {
      scale: 1.8,
      borderColor: 'rgba(37, 215, 184, 0.5)',
      backgroundColor: 'rgba(37, 215, 184, 0.06)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }
  if (cursorRef.value) {
    gsap.to(cursorRef.value, {
      scale: 0.7,
      duration: 0.3,
      color: 'rgba(37, 215, 184, 0.5)',
      ease: 'power2.out',
    })
  }
}

function onMouseLeaveInteractive() {
  if (followerRef.value) {
    gsap.to(followerRef.value, {
      scale: 1,
      borderColor: 'white',
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out',
    })
  }
  if (cursorRef.value) {
    gsap.to(cursorRef.value, {
      scale: 1,
      color: 'white',
      duration: 0.3,
      ease: 'power2.out',
    })
  }
}

function tick() {
  posX += (mouseX - posX) * 0.12
  posY += (mouseY - posY) * 0.12
  if (followerRef.value) {
    gsap.set(followerRef.value, { x: posX - 20, y: posY - 20 })
  }
  rafId = requestAnimationFrame(tick)
}

function onDocMouseOver(e: MouseEvent) {
  const interactive = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE_SELECTOR)
  if (interactive && interactive !== currentHovered) {
    currentHovered = interactive
    onMouseEnterInteractive()
  }
}

function onDocMouseOut(e: MouseEvent) {
  const related = e.relatedTarget as HTMLElement | null
  if (currentHovered && !currentHovered.contains(related)) {
    currentHovered = null
    onMouseLeaveInteractive()
  }
}

onMounted(() => {
  isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouch.value) return

  document.documentElement.classList.add('cursor-custom')
  document.addEventListener('mousemove', onFirstMove, { once: true })
  document.addEventListener('mouseover', onDocMouseOver)
  document.addEventListener('mouseout', onDocMouseOut)
  tick()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', onFirstMove)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onDocMouseOver)
  document.removeEventListener('mouseout', onDocMouseOut)
})
</script>

<template>
  <div class="custom-cursor">
    <div ref="cursorRef" class="cursor-tooth" aria-hidden="true">
      <svg fill="currentColor" height="300px" width="300px" version="1.1" id="Layer_1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 311.572 311.572"
        xml:space="preserve">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <path
              d="M239.964,0c-38.262,0-45.435,37.55-84.173,37.55C117.059,37.55,109.885,0,71.619,0C24.76,0,4.961,47.903,4.961,94.756 s39.731,216.817,86.584,216.817c19.814,0,24.366-108.723,64.241-108.723s44.426,108.723,64.241,108.723 c46.858,0,86.584-169.958,86.584-216.817S286.817,0,239.964,0z">
            </path>
          </g>
        </g>
      </svg>
    </div>
    <div ref="followerRef" class="cursor-ring">
    </div>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 99999;
  pointer-events: none;
}

.cursor-tooth {
  position: fixed;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  will-change: transform;
  z-index: 99999;
  pointer-events: none;
  opacity: 0;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 1px 10px rgba(24, 190, 181, 0.353));
}

.cursor-ring {
  position: fixed;
  width: 50px;
  height: 50px;
  border: 3px solid white;
  border-radius: 50%;
  will-change: transform;
  z-index: 99998;
  pointer-events: none;
  opacity: 0;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease;
}

/* Hide native cursor on non-touch devices */
:global(html.cursor-custom) {
  cursor: none;
}

:global(html.cursor-custom a),
:global(html.cursor-custom button),
:global(html.cursor-custom .btn),
:global(html.cursor-custom input),
:global(html.cursor-custom textarea),
:global(html.cursor-custom select) {
  cursor: none;
}
</style>
