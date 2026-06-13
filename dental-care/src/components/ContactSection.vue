<script setup lang="ts">
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { Phone, MapPin, Mail, Send } from '@lucide/vue'
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'

const store = useLanguageStore()

const infoRef = ref<HTMLElement | null>(null)
const { isVisible: infoVisible } = useScrollReveal(infoRef, { threshold: 0.1 })

const items = [
  { icon: Phone, color: 'green', key: 'phone' as const },
  { icon: MapPin, color: 'blue', key: 'address' as const },
  { icon: WhatsAppIcon, color: 'green', key: 'whatsapp' as const },
  { icon: Mail, color: 'blue', key: 'email' as const },
]
</script>

<template>
  <section id="contact" class="section">
    <!-- Background blob -->
    <div class="contact-blob"></div>

    <div class="section-inner">
      <div class="contact-grid">
        <!-- Info Side -->
        <div ref="infoRef" class="contact-info">
          <div
            class="section-label"
            style="transition: all 0.5s ease; opacity: 0; transform: translateY(20px);"
            :style="infoVisible ? 'opacity: 1; transform: translateY(0);' : ''"
          >
            <span class="section-label-dot"></span>
            <span>{{ store.t.contact.label }}</span>
          </div>

          <h2
            class="contact-title"
            style="transition: all 0.6s ease 0.1s; opacity: 0; transform: translateY(20px);"
            :style="infoVisible ? 'opacity: 1; transform: translateY(0);' : ''"
          >
            {{ store.t.contact.title }}
          </h2>

          <p
            class="contact-subtitle"
            style="transition: all 0.6s ease 0.2s; opacity: 0; transform: translateY(20px);"
            :style="infoVisible ? 'opacity: 1; transform: translateY(0);' : ''"
          >
            {{ store.t.contact.subtitle }}
          </p>

          <!-- Contact Items -->
          <div class="contact-items">
            <a
              v-for="(item, i) in items"
              :key="item.key"
              :href="item.key === 'whatsapp'
                ? 'https://wa.me/201200077665'
                : item.key === 'phone'
                  ? 'tel:+201200077665'
                  : item.key === 'email'
                    ? 'mailto:info@plazadentalcare.com'
                    : undefined"
              :target="item.key === 'whatsapp' ? '_blank' : undefined"
              class="contact-item"
              :style="{
                transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
                opacity: infoVisible ? 1 : 0,
                transform: infoVisible ? 'translateX(0)' : 'translateX(-20px)',
              }"
            >
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
          <div
            class="contact-socials"
            :style="{
              transition: 'all 0.5s ease 0.7s',
              opacity: infoVisible ? 1 : 0,
              transform: infoVisible ? 'translateY(0)' : 'translateY(20px)',
            }"
          >
            <a
              href="https://www.facebook.com/Plazadentalcareclinic/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn facebook"
              :data-tooltip="store.isRtl ? 'فيسبوك' : 'Facebook'"
            >
              <!-- Facebook SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn instagram"
              :data-tooltip="store.isRtl ? 'انستغرام' : 'Instagram'"
            >
              <!-- Instagram SVG -->
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a
              href="https://wa.me/201200077665"
              target="_blank"
              rel="noopener noreferrer"
              class="social-btn whatsapp"
              :data-tooltip="store.isRtl ? 'واتساب' : 'WhatsApp'"
            >
              <WhatsAppIcon :size="20" />
            </a>
          </div>
        </div>

        <!-- Map / Info Card -->
        <div
          class="contact-map-card"
          :style="{
            transition: 'all 0.7s ease 0.3s',
            opacity: infoVisible ? 1 : 0,
            transform: infoVisible ? 'translateY(0)' : 'translateY(30px)',
          }"
        >
          <div class="map-card-inner">
            <div class="map-placeholder">
              <!-- Decorative tooth illustration -->
              <div class="map-tooth">
                <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" class="map-tooth-svg">
                  <defs>
                    <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#27c8f7" />
                      <stop offset="100%" stop-color="#31efc4" />
                    </linearGradient>
                  </defs>
                  <path d="M40 5C28 5 16 14 16 28c0 8 3 14 7 18l4 24c0.5 3 2 5 4 5s3-2 4-5l2-10 2 10c1 3 2 5 4 5s3.5-2 4-5l4-24c4-4 7-10 7-18 0-14-12-23-24-23z" fill="url(#mapGrad)" opacity="0.15"/>
                </svg>
              </div>

              <div class="map-info">
                <div class="map-badge">
                  <MapPin :size="16" />
                  <span>{{ store.t.contact.addressValue }}</span>
                </div>
                <h3>{{ store.isRtl ? 'مركز بلازا لتجميل الاسنان' : 'Plaza Dental Cosmetic Center' }}</h3>
                <div class="map-hours-line">
                  <span class="map-label">{{ store.isRtl ? 'ساعات العمل:' : 'Hours:' }}</span>
                  <span>{{ store.t.hours.weekdays }} ({{ store.t.hours.sun }}-{{ store.t.hours.thu }})</span>
                </div>
                <div class="map-cta-row">
                  <a :href="`https://wa.me/201200077665`" target="_blank" class="btn btn-primary" style="flex:1;justify-content:center">
                    <WhatsAppIcon :size="18" />
                    {{ store.isRtl ? 'راسلنا واتساب' : 'WhatsApp Us' }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Decorative elements -->
            <div class="map-dots">
              <span></span><span></span><span></span><span></span>
              <span></span><span></span><span></span><span></span>
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
  background: #E8F0FE;
  color: #1877F2;
}

.social-btn.instagram {
  background: #FDE7F5;
  color: #E14B6A;
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
  background: #1877F2;
}

.social-btn.instagram:hover {
  background: #E14B6A;
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

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
