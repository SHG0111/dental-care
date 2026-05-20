<template>
  <div
    v-if="isVisible"
    ref="cursorRef"
    id="custom-cursor"
    class="hidden md:block fixed pointer-events-none z-9999 rounded-4xl border"
    :style="cursorStyle"
  />
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const isVisible = ref(true)
const cursorRef = ref(null)
const pos = reactive({ x: 0, y: 0 })
const isDown = ref(false)
const onLink = ref(false)

const interactiveSelectors = ['a', 'button', '[role="button"]', '[tabindex]:not([tabindex="-1"])', 'input', 'textarea', 'select']

function isInteractive(el) {
  if (!el) return false
  return interactiveSelectors.some(sel => el.matches(sel))
}

const cursorStyle = computed(() => {
  const baseSize = onLink.value ? 56 : 40
  const size = isDown.value ? 24 : baseSize
  return {
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    width: `${size}px`,
    height: `${size}px`,
    transition: 'width 0.15s ease, height 0.15s ease',
    background: isDown.value
      ? 'color-mix(in oklab, var(--color-secondary) 35%, transparent)'
      : 'color-mix(in oklab, var(--color-secondary) 12%, transparent)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: isDown.value
      ? '1px solid color-mix(in oklab, var(--color-secondary) 50%, transparent)'
      : '1px solid color-mix(in oklab, var(--color-secondary) 25%, transparent)',
  }
})

function onMouseMove(e) {
  pos.x = e.clientX
  pos.y = e.clientY

  const el = document.elementFromPoint(e.clientX, e.clientY)
  if (el && el.id !== 'custom-cursor') {
    onLink.value = isInteractive(el)
  }

  const heroImg = document.getElementById('hero-img')
  if (heroImg) {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01
    heroImg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`
  }
}

function onMouseDown() {
  isDown.value = true
}

function onMouseUp() {
  isDown.value = false
}

onMounted(() => {
  if (window.innerWidth < 768) {
    isVisible.value = false
    return
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup', onMouseUp)
})
</script>
