<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{ loaded: [] }>()

const loaderRef = ref<HTMLElement | null>(null)
const svgWrap = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    // ── 1. Fetch the raw SVG ──
    const resp = await fetch('/loader.svg')
    let svg = await resp.text()

    // ── 2. Inject <defs> with the primary gradient ──
    const defs = `<defs>
    <linearGradient id="v-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#31efc4"/>
      <stop offset="25%" stop-color="#2de8bf"/>
      <stop offset="50%" stop-color="#25d7b8"/>
      <stop offset="75%" stop-color="#20cdc8"/>
      <stop offset="100%" stop-color="#27c8f7"/>
    </linearGradient>
  </defs>`
    // Insert defs right after the first '>' (closing the opening <svg> tag)
    svg = svg.replace('>', '>' + defs)

    // ── 3. Replace white fills / strokes with gradient ref ──
    svg = svg.replace(/fill="#fff"/gi, 'fill="url(#v-grad)"')
    svg = svg.replace(/stroke="#fff"/gi, 'stroke="url(#v-grad)"')

    // ── 4. Parse DOM to ensure every <path> has explicit fill/stroke/width ──
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml')
    const svgEl = doc.querySelector('svg')
    if (!svgEl) throw new Error('No SVG root')

    svgEl.querySelectorAll('path').forEach(p => {
      if (!p.getAttribute('fill')) p.setAttribute('fill', 'url(#v-grad)')
      if (!p.getAttribute('stroke')) p.setAttribute('stroke', 'url(#v-grad)')
      if (!p.getAttribute('stroke-width')) p.setAttribute('stroke-width', '6')
    })

    svg = new XMLSerializer().serializeToString(svgEl)

    // ── 5. Inject into the DOM ──
    const wrap = svgWrap.value
    if (!wrap) throw new Error('No container')
    wrap.innerHTML = svg

    const injectedSvg = wrap.querySelector('svg')!
    // Style via JS — scoped CSS cannot reach innerHTML-injected content
    injectedSvg.style.width = '100%'
    injectedSvg.style.height = 'auto'
    injectedSvg.style.display = 'block'
    injectedSvg.style.maxHeight = '70vh'

    // ── 6. Load Vivus from CDN ──
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.6/vivus.min.js')

    const Vivus = (window as any).Vivus

    // ── 7. Start drawing animation ──
    new Vivus(injectedSvg, {
      type: 'delayed',
      duration: 100,
      animTimingFunction: Vivus.EASE_IN_OUT,
      selfDestroy: true,
      start: 'autostart',
    }, () => {
      // Drawing complete → brief pause → fade out
      setTimeout(() => {
        if (loaderRef.value) {
          loaderRef.value.classList.add('fade-out')
          setTimeout(() => emit('loaded'), 100)
        }
      }, 100)
    })

  } catch (_e) {
    // Fallback: skip loader on any error
    emit('loaded')
  }
})

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load ' + src))
    document.head.appendChild(s)
  })
}
</script>

<template>
  <div ref="loaderRef" class="loader-overlay">
    <div class="loader-bg"></div>
    <div class="loader-content">
      <div ref="svgWrap" class="svg-wrap" />
      <div class="loader-bar-track">
        <div class="loader-bar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 3s ease-in-out, visibility 3s ease-in-out;
}

.loader-overlay.fade-out {
  opacity: 0;
  visibility: hidden;
}

.loader-bg {
  position: absolute;
  inset: 0;
  background: #ffffff;
}

.loader-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 90vw;
  max-width: 200px;
}

.svg-wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-bar-track {
  width: 200px;
  height: 3px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.06);
  overflow: hidden;
  opacity: 0;
  animation: fade-in 0.4s ease-in-out 0.8s forwards;
}

.loader-bar {
  height: 100%;
  width: 0%;
  border-radius: 3px;
  background: linear-gradient(90deg, #31efc4, #2de8bf, #25d7b8, #20cdc8, #27c8f7);
  animation: progress 2.2s ease-in-out 0.9s forwards;
}

@keyframes progress {
  0% {
    width: 0%;
  }

  60% {
    width: 78%;
  }

  100% {
    width: 100%;
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
