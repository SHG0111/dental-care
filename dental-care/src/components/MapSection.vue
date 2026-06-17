<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal, useGsapParallax } from '@/composables/useGsapReveal'
import { MapPin, Phone, Clock, Navigation, Maximize2 } from '@lucide/vue'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)

useGsapScrubReveal(cardRef, { animation: 'fadeUp' })

const mapLang = computed(() => store.isRtl ? 'ar' : 'en')

const mapEmbedUrl = computed(() =>
  `https://www.google.com/maps?q=Plaza+Dental+Care+Al+Agamy+Alexandria&output=embed&z=17&hl=${mapLang.value}`
)
const mapDirectionUrl = computed(() =>
  `https://www.google.com/maps/dir//Plaza+Dental+Care+Al+Agamy+Alexandria?hl=${mapLang.value}`
)

function openFullMap() {
  window.open(mapDirectionUrl.value, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <section id="map" ref="sectionRef" class="map-section">
    <!-- ==================== REAL INTERACTIVE MAP ==================== -->
    <div class="map-container">
      <iframe :src="mapEmbedUrl" class="map-frame" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
        :title="store.isRtl ? 'موقع العيادة على خرائط جوجل' : 'Clinic location on Google Maps'"
        allowfullscreen></iframe>

      <!-- Floating badge — "click to interact" hint -->
      <div class="map-hint">
        <Maximize2 :size="14" />
        <span>{{ store.isRtl ? 'اسحب وتفاعل مع الخريطة' : 'Drag to explore the map' }}</span>
      </div>
    </div>

    <!-- ==================== INFO CARD BELOW MAP ==================== -->
    <div ref="cardRef" class="map-card-wrap">
      <div class="map-card">
        <!-- Pin header -->
        <div class="map-card-pin">
          <div class="pin-icon">
            <MapPin :size="20" />
          </div>
          <div class="pin-pulse"></div>
        </div>

        <h3 class="map-card-title">{{ store.t.map.title }}</h3>
        <p class="map-card-address">{{ store.t.map.address }}</p>

        <div class="map-card-details">
          <div class="map-detail-item">
            <Clock :size="15" />
            <span>{{ store.t.map.hoursValue }}</span>
          </div>
          <a href="tel:+201200077665" class="map-detail-item map-detail-link">
            <Phone :size="15" />
            <span>+20 120 007 7665</span>
          </a>
        </div>

        <div class="map-card-actions">
          <a :href="mapDirectionUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <Navigation :size="16" />
            <span>{{ store.t.map.cta }}</span>
          </a>
          <button class=" btn-expand" @click="openFullMap"
            :data-tooltip="store.isRtl ? 'فتح الخريطة كاملة' : 'Open full map'">
            <Maximize2 :size="16" />
          </button>
        </div>

        <!-- Decorative tooth watermark -->
        <div class="map-card-tooth">
          <svg viewBox="0 0 80 80" width="60" height="60">
            <path
              d="M40 5C28 5 16 14 16 28c0 8 3 14 7 18l4 24c0.5 3 2 5 4 5s3-2 4-5l2-10 2 10c1 3 2 5 4 5s3.5-2 4-5l4-24c4-4 7-10 7-18 0-14-12-23-24-23z"
              fill="currentColor" opacity="0.04" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ======================================================
   MAP SECTION — Full map + info card below
   ====================================================== */
.map-section {
  position: relative;
  overflow: hidden;
}

/* ----- Map Container (viewport height) ----- */
.map-container {
  position: relative;
  height: 100vh;
  z-index: 0;
}

.map-frame {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: saturate(1.05) hue-rotate(-2deg);
}

/* Small "interactive" hint at top-right */
.map-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  pointer-events: none;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* ======================================================
   INFO CARD — Below the map, in normal flow
   ====================================================== */
.map-card-wrap {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
  background: var(--bg-secondary);
}

.map-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: 2.5rem 3rem;
  width: 100%;
  max-width: 700px;
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(37, 215, 184, 0.06);
  border: 1px solid rgba(37, 215, 184, 0.12);
  position: relative;
  overflow: hidden;
  text-align: center;
}

/* Decorative watermark */
.map-card-tooth {
  position: absolute;
  bottom: -10px;
  right: -10px;
  color: var(--teal-500);
  pointer-events: none;
}

body.rtl .map-card-tooth {
  right: auto;
  left: -10px;
}

/* ----- Pin Icon ----- */
.map-card-pin {
  position: relative;
  display: inline-flex;
  margin-bottom: 1.25rem;
}

.pin-icon {
  width: 52px;
  height: 52px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 16px rgba(37, 215, 184, 0.35);
}

.pin-icon :deep(svg) {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.15));
}

/* Pulsing ring behind pin */
.pin-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(37, 215, 184, 0.2);
  animation: pin-pulse 2s ease-out infinite;
}

@keyframes pin-pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }

  100% {
    transform: translate(-50%, -50%) scale(2.2);
    opacity: 0;
  }
}

/* ----- Card Text ----- */
.map-card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.map-card-address {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Details */
.map-card-details {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(37, 215, 184, 0.08);
}

.map-detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  text-decoration: none;
}

.map-detail-item :deep(svg) {
  flex-shrink: 0;
  color: var(--teal-500);
}

.map-detail-link:hover {
  color: var(--teal-600);
}

/* Actions */
.map-card-actions {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
}

.map-card-actions .btn-primary {
  justify-content: center;
}

.btn-expand {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  background: var(--gray-50);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(37, 215, 184, 0.1);
  transition: all var(--transition-fast);
  cursor: pointer;
  font-family: inherit;
  flex-shrink: 0;
}

.btn-expand:hover {
  background: var(--teal-50);
  color: var(--teal-600);
  border-color: rgba(37, 215, 184, 0.2);
}

/* ======================================================
   RESPONSIVE
   ====================================================== */
@media (max-width: 768px) {
  .map-container {
    height: 60vh;
  }

  .map-hint {
    display: none;
  }

  .map-card-wrap {
    padding: 2rem 1.25rem;
  }

  .map-card {
    padding: 1.75rem 1.5rem;
  }

  .map-card-details {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .map-container {
    height: 50vh;
  }

  .map-card {
    padding: 1.5rem 1.25rem;
  }

  .map-card-title {
    font-size: 1.1rem;
  }

  .map-card-address {
    font-size: 0.85rem;
  }

  .map-detail-item {
    font-size: 0.82rem;
  }
}

@media (max-width: 360px) {
  .map-container {
    height: 40vh;
  }

  .map-card-wrap {
    padding: 1.5rem 0.75rem;
  }

  .map-card-details {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
