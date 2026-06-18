<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal } from '@/composables/useGsapReveal'
import { MapPin, Phone, Clock, Navigation, Maximize2 } from '@lucide/vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)

useGsapScrubReveal(cardRef, { animation: 'fadeUp' })

// Al Agamy, Alexandria, Egypt — Leaflet uses [lat, lng] order
// TODO: Replace with exact coordinates from a map pin drop
const mapCenter: [number, number] = [31.0879072, 29.7514794]

const mapDirectionUrl = 'https://maps.app.goo.gl/SPYb1KHq8SUbXCSU7'

function openFullMap() {
  window.open(mapDirectionUrl, '_blank', 'noopener,noreferrer')
}

/**
 * CartoDB Voyager tiles — free, beautiful, no API key required.
 * Attribution required per OpenStreetMap + CARTO terms.
 */
const tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'

/**
 * Custom teal marker — uses Leaflet divIcon with HTML+CSS so we own
 * every pixel. Matches the pin-icon on the info card below.
 */
const markerIcon = L.divIcon({
  className: '', // clear Leaflet's default marker class
  html: `<div class="leaflet-marker-pin">
    <div class="leaflet-marker-body">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round"
        style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15))">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  </div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
}) as unknown as L.Icon

/**
 * Template ref to the LMarker — used to auto-open the popup
 * once the marker is created and the popup is bound.
 */
const markerRef = ref<{ leafletObject?: L.Marker } | null>(null)

watch(
  () => markerRef.value?.leafletObject,
  (marker) => {
    if (marker?.openPopup) {
      // Small tick so the popup binding completes
      setTimeout(() => marker.openPopup(), 80)
    }
  },
  { once: true },
)
</script>

<template>
  <section id="map" ref="sectionRef" class="map-section">
    <!-- ==================== FREE INTERACTIVE MAP (Leaflet + OSM) ==================== -->
    <div class="map-container">
      <LMap :zoom="18" :max-zoom="18" :center="mapCenter" :options="{
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
        detectRetina: true,
      }" class="map-frame">
        <LTileLayer :url="tileUrl" :attribution="tileAttribution" />
        <LMarker ref="markerRef" :lat-lng="mapCenter" :icon="markerIcon">
          <LPopup :options="{
            closeButton: true,
            maxWidth: 290,
            minWidth: 240,
            className: 'clinic-popup',
            offset: [22, -22],
            autoPan: true,
          }">
            <div :class="['popup-card', store.isRtl ? 'is-rtl' : '']">
              <!-- Header: icon + name/address -->
              <div class="popup-header">
                <div class="popup-brand-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div class="popup-title-group">
                  <strong class="popup-title">
                    {{ store.isRtl ? 'بلازا لطب الأسنان' : 'Plaza Dental Care' }}
                  </strong>
                  <span class="popup-subtitle">{{ store.t.map.address }}</span>
                </div>
              </div>

              <!-- Divider -->
              <div class="popup-divider"></div>

              <!-- Phone row -->
              <a href="tel:+201200077665" class="popup-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span dir="ltr">+20 120 007 7665</span>
              </a>

              <!-- CTA button -->
              <a :href="mapDirectionUrl" target="_blank" rel="noopener noreferrer" class="popup-cta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 17 18 12 13 7" />
                  <polygon points="6 17 11 12 6 7" />
                </svg>
                <span>{{ store.isRtl ? 'الحصول على الاتجاهات' : 'Get directions' }}</span>
              </a>
            </div>
          </LPopup>
        </LMarker>
      </LMap>

      <!-- Floating badge — drag/zoom hint -->
      <div class="map-hint">
        <Maximize2 :size="14" />
        <span>{{ store.isRtl ? 'اسحب وتفاعل مع الخريطة' : 'Drag to explore the map' }}</span>
      </div>
    </div>

    <!-- ==================== INFO CARD BELOW MAP ==================== -->
    <!-- <div ref="cardRef" class="map-card-wrap">
      <div class="map-card">
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

    <div class="map-card-tooth">
      <svg viewBox="0 0 80 80" width="60" height="60">
        <path
          d="M40 5C28 5 16 14 16 28c0 8 3 14 7 18l4 24c0.5 3 2 5 4 5s3-2 4-5l2-10 2 10c1 3 2 5 4 5s3.5-2 4-5l4-24c4-4 7-10 7-18 0-14-12-23-24-23z"
          fill="currentColor" opacity="0.04" />
      </svg>
    </div>
    </div>
    </div> -->
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

/* Leaflet map fills the container */
.map-frame {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  z-index: 0;
}

/* Override Leaflet's default z-index so attribution stays in the map */
.map-frame :deep(.leaflet-container) {
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* ======================================================
   CUSTOM TEAL MARKER — divIcon HTML+CSS
   Rendered via L.divIcon, not scoped by Vue, so we target
   the container class we set (leaflet-marker-pin).
   ====================================================== */
:global(.leaflet-marker-pin) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.leaflet-marker-body) {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #31efc4, #25d7b8, #20cdc8);
  border: 3px solid #ffffff;
  box-shadow:
    0 4px 16px rgba(37, 215, 184, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

:global(.leaflet-marker-body:hover) {
  transform: scale(1.1);
}

/* ======================================================
   CLINIC POPUP — branded info card on marker click
   Uses :global() since Leaflet renders popups outside
   the Vue component tree, in the map pane.
   ====================================================== */

/* Popup wrapper — rounded card with shadow */
:global(.clinic-popup .leaflet-popup-content-wrapper) {
  border-radius: 14px !important;
  padding: 0 !important;
  overflow: hidden;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(37, 215, 184, 0.1) !important;
  font-family: inherit;
}

:global(.clinic-popup .leaflet-popup-content) {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
}

/* Close button — muted, subtle */
:global(.clinic-popup .leaflet-popup-close-button) {
  color: #a8aea9 !important;
  font-size: 18px !important;
  font-weight: 400;
  top: 6px !important;
  right: 8px !important;
  width: 24px !important;
  height: 24px !important;
  line-height: 24px !important;
  text-align: center !important;
  border-radius: 50%;
  transition: all 0.2s ease;
}

:global(.clinic-popup .leaflet-popup-close-button:hover) {
  color: #3d4641 !important;
  background: rgba(0, 0, 0, 0.05);
}

/* Tip (triangle) — hidden, arrow matches card */
:global(.clinic-popup .leaflet-popup-tip) {
  box-shadow: none;
  background: var(--white, #ffffff);
}

/* ======================================================
   POPUP CARD LAYOUT
   ====================================================== */
.popup-card {
  padding: 1rem 1.1rem 1rem;
  font-family: inherit;
  min-width: 220px;
}

.popup-card.is-rtl {
  text-align: right;
}

/* Brand icon + title side-by-side */
.popup-header {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
}

.popup-brand-icon {
  width: 38px;
  height: 38px;
  min-width: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #31efc4, #25d7b8, #20cdc8);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(37, 215, 184, 0.3);
}

.popup-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.popup-title {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--text-primary, #202942);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.popup-subtitle {
  font-size: 0.76rem;
  color: var(--text-secondary, #758397);
  line-height: 1.4;
}

/* Divider */
.popup-divider {
  height: 1px;
  background: linear-gradient(90deg,
      transparent,
      rgba(37, 215, 184, 0.15),
      transparent);
  margin: 0.65rem 0;
}

.is-rtl .popup-divider {
  background: linear-gradient(-90deg,
      transparent,
      rgba(37, 215, 184, 0.15),
      transparent);
}

/* Phone row */
.popup-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary, #758397);
  text-decoration: none;
  padding: 0.3rem 0;
  transition: color 0.2s ease;
}

.popup-row:hover {
  color: var(--teal-600, #20b3a0);
}

.popup-row svg {
  flex-shrink: 0;
  color: var(--teal-500, #25d7b8);
}

/* CTA button */
.popup-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  margin-top: 0.6rem;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  background: linear-gradient(90deg, #31efc4, #25d7b8, #20cdc8);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: 0 3px 12px rgba(37, 215, 184, 0.25);
}

.popup-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 215, 184, 0.35);
}

.popup-cta:active {
  transform: translateY(0);
}

.popup-cta svg {
  flex-shrink: 0;
}

/* Small "interactive" hint at bottom-center */
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
  z-index: 1000;
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
  width: 60px;
  height: 60px;
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
