<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal, useParallaxGroup } from '@/composables/useGsapReveal'
import { Phone, MapPin, Mail, Send } from '@lucide/vue'
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'

const store = useLanguageStore()
const router = useRouter()

const sectionRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)
useGsapScrubReveal(infoRef, { animation: 'fadeUp' })
useParallaxGroup(sectionRef, { selector: '.contact-blob', yRange: 30 })

const items = [
  { icon: Phone, color: 'green', key: 'phone' as const },
  { icon: MapPin, color: 'blue', key: 'address' as const },
  { icon: WhatsAppIcon, color: 'green', key: 'whatsapp' as const },
  { icon: Mail, color: 'blue', key: 'email' as const },
]

function goToMap(e: MouseEvent) {
  e.preventDefault()
  router.push({ hash: '#map' })
}
</script>

<template>
  <section id="contact" ref="sectionRef" class="section">
    <!-- Background blob -->
    <div class="contact-blob"></div>

    <div class="section-inner">
      <div class="contact-grid">
        <!-- Info Side -->
        <div ref="infoRef" class="contact-info">
          <h2 class="contact-title">
            {{ store.t.contact.title }}
          </h2>

          <p class="contact-subtitle">
            {{ store.t.contact.subtitle }}
          </p>

          <!-- Contact Items -->
          <div class="contact-items">
            <a v-for="(item, i) in items" :key="item.key" :href="item.key === 'whatsapp'
              ? 'https://wa.me/201200077665'
              : item.key === 'phone'
                ? 'tel:+201200077665'
                : item.key === 'email'
                  ? 'mailto:info@plazadentalcare.com'
                  : '#map'
              " :target="item.key === 'whatsapp' ? '_blank' : undefined"
              :class="['contact-item', { 'contact-item-address': item.key === 'address' }]"
              @click="item.key === 'address' ? goToMap($event) : undefined">
              <div :class="['contact-item-icon', `icon-${item.color}`]">
                <component :is="item.icon" :size="20" />
              </div>
              <div class="contact-item-text">
                <strong>{{ store.t.contact[item.key] }}</strong>
                <span>{{
                  item.key === 'whatsapp'
                    ? store.t.contact.waValue
                    : item.key === 'phone'
                      ? store.t.contact.phoneValue
                      : item.key === 'address'
                        ? store.t.contact.addressValue
                        : store.t.contact.emailValue
                }}</span>
              </div>
            </a>
          </div>

          <!-- Social Links -->
          <div class="contact-socials">
            <a href="https://www.facebook.com/Plazadentalcareclinic/" target="_blank" rel="noopener noreferrer"
              class="social-btn facebook" :data-tooltip="store.isRtl ? 'فيسبوك' : 'Facebook'">
              <!-- Facebook SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/plaza_dentalcare" target="_blank" rel="noopener noreferrer"
              class="social-btn instagram" :data-tooltip="store.isRtl ? 'انستغرام' : 'Instagram'">
              <!-- Instagram SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://wa.me/201200077665" target="_blank" rel="noopener noreferrer" class="social-btn whatsapp"
              :data-tooltip="store.isRtl ? 'واتساب' : 'WhatsApp'">
              <WhatsAppIcon :size="20" />
            </a>
          </div>
        </div>

        <!-- Map / Info Card -->
        <div class="contact-map-card h-full flex items-center ">
          <div class="map-card-inner">
            <div class="map-placeholder">
              <!-- Decorative tooth illustration -->
              <div class="map-tooth">
                <img src="/logo.png" alt="Plaza Dental Care" class="w-18 h-18" />
              </div>

              <div class="map-info">
                <div class="map-badge">
                  <MapPin :size="16" class="self-start" />
                  <span>{{ store.t.contact.addressValue }}</span>
                </div>
                <h3>
                  {{ store.isRtl ? 'مركز بلازا لتجميل الاسنان' : 'Plaza Dental Care Center' }}
                </h3>
                <div class="map-hours-line">
                  <span class="map-label">{{ store.isRtl ? 'ساعات العمل:' : 'Hours:' }}</span>
                  <span>{{ store.t.hours.weekdays }} ({{ store.t.hours.sun }}-{{
                    store.t.hours.thu
                  }})</span>
                </div>
                <div class="map-cta-row">
                  <a :href="`https://wa.me/201200077665`" target="_blank" class="btn btn-primary"
                    style="flex: 1; justify-content: center">
                    <WhatsAppIcon :size="18" />
                    {{ store.isRtl ? 'راسلنا واتساب' : 'WhatsApp Us' }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div class="map-dots">
              <span></span><span></span><span></span><span></span> <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-blob {
  position: absolute;
  top: -100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(37, 215, 184, 0.06), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.contact-title {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: var(--text-primary);
  line-height: 1.2;
}

.contact-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2rem;
}

/* Contact Items */
.contact-items {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--gray-50);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  text-decoration: none;
  cursor: pointer;
}

.contact-item:hover {
  background: var(--teal-50);
}

.contact-item-icon {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-green {
  background: var(--teal-50);
  color: var(--teal-600);
}

.icon-blue {
  background: var(--blue-50);
  color: var(--blue-600);
}

.contact-item-text strong {
  display: block;
  font-size: 0.87rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.1rem;
}

.contact-item-text span {
  font-size: 0.83rem;
  color: var(--text-muted);
}

.contact-item-address .contact-item-text span {
  color: var(--teal-600);
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-color: rgba(37, 215, 184, 0.3);
  transition: text-decoration-color var(--transition-fast);
}

.contact-item-address:hover .contact-item-text span {
  text-decoration-color: var(--teal-600);
}

/* Social */
.contact-socials {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all var(--transition-bounce);
}

.social-btn.facebook {
  background: #e8f0fe;
  color: #1877f2;
}

.social-btn.instagram {
  background: #fde7f5;
  color: #e14b6a;
}

.social-btn.whatsapp {
  background: var(--teal-50);
  color: var(--teal-500);
}

.social-btn:hover {
  transform: scale(1.12);
  color: white;
}

.social-btn.facebook:hover {
  background: #1877f2;
}

.social-btn.instagram:hover {
  background: #e14b6a;
}

.social-btn.whatsapp:hover {
  background: var(--teal-500);
}

/* Map / Info Card */
.contact-map-card {
  position: relative;
}

.map-card-inner {
  background: var(--white);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(37, 215, 184, 0.08);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  position: relative;
}

.map-placeholder {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
}

.map-tooth {
  margin-bottom: 1.5rem;
}

.map-tooth-svg {
  width: 100px;
  height: 100px;
}

.map-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--teal-50);
  color: var(--teal-600);
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.map-info h3 {
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.map-hours-line {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.map-label {
  font-weight: 600;
  color: var(--text-primary);
}

.map-cta-row {
  width: 100%;
  margin-top: 0.5rem;
}

/* Decorative dots */
.map-dots {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 1rem;
  pointer-events: none;
}

.map-dots span {
  width: 4px;
  height: 4px;
  background: var(--teal-100);
  border-radius: 50%;
  opacity: 0.5;
  justify-self: center;
}

@media (max-width: 1024px) {
  .contact-grid {
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .contact-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .contact-title {
    font-size: 1.35rem;
  }

  .contact-subtitle {
    font-size: 0.9rem;
  }

  .contact-item {
    padding: 0.85rem 1rem;
  }

  .contact-item-text strong {
    font-size: 0.82rem;
  }

  .contact-item-text span {
    font-size: 0.78rem;
  }

  .contact-item-icon {
    width: 40px;
    height: 40px;
  }

  .map-placeholder {
    padding: 1.5rem 1.25rem;
  }

  .map-info h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 360px) {
  .contact-socials {
    gap: 0.5rem;
  }

  .social-btn {
    width: 42px;
    height: 42px;
  }
}
</style>
