<script setup lang="ts">
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'

const waNumber = '+201200077665'
const waLink = `https://wa.me/201200077665`
</script>

<template>
  <a
    :href="waLink"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-float"
    :title="`WhatsApp: ${waNumber}`"
    :dir="$attrs.dir as string || 'ltr'"
  >
    <div class="wa-icon">
      <WhatsAppIcon :size="28" />
    </div>
    <div class="wa-tooltip">
      <span class="wa-tooltip-text">{{ waNumber }}</span>
    </div>
    <div class="wa-pulse-ring"></div>
    <div class="wa-badge" :class="{ 'wa-badge-animate': true }">1</div>
  </a>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 900;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-decoration: none;
  box-shadow: 0 6px 24px rgba(39, 200, 247, 0.4);
  color: white;
}

body.ltr .whatsapp-float {
  right: 2rem;
}

body.rtl .whatsapp-float {
  left: 2rem;
  right: auto;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px rgba(39, 200, 247, 0.5);
}

.wa-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.wa-pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(39, 200, 247, 0.4);
  animation: wa-pulse 2s ease-out infinite;
  pointer-events: none;
}

@keyframes wa-pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.wa-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--gold);
  color: white;
  font-size: 0.65rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

body.rtl .wa-badge {
  right: auto;
  left: -2px;
}

.wa-badge-animate {
  animation: badge-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes badge-pop {
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.wa-tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  right: 0;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

body.rtl .wa-tooltip {
  right: auto;
  left: 0;
}

.whatsapp-float:hover .wa-tooltip {
  opacity: 1;
  transform: translateY(0);
}

.wa-tooltip-text {
  background: var(--gradient-primary);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-xs);
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.wa-tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  right: 20px;
  border: 4px solid transparent;
  border-top-color: var(--teal-500);
}

body.rtl .wa-tooltip-text::after {
  right: auto;
  left: 20px;
}

@media (max-width: 768px) {
  .whatsapp-float {
    width: 54px;
    height: 54px;
    bottom: 1.25rem;
    right: 1.25rem;
  }
  body.rtl .whatsapp-float {
    left: 1.25rem;
    right: auto;
  }
  .wa-tooltip {
    display: none;
  }
}
</style>
