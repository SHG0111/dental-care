<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import { Phone, MapPin } from '@lucide/vue'
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'

const store = useLanguageStore()
const router = useRouter()

const footerServices = [
  { slug: 'hollywood-smile', ar: 'ابتسامة هوليود', en: 'Hollywood Smile' },
  { slug: 'dental-implants', ar: 'زراعة الأسنان', en: 'Dental Implants' },
  { slug: 'orthodontics', ar: 'تقويم الأسنان', en: 'Orthodontics' },
  { slug: 'root-canal', ar: 'علاج الجذور', en: 'Root Canal' },
  { slug: 'pediatric-dentistry', ar: 'أسنان الأطفال', en: 'Pediatric Dentistry' },
  { slug: 'gum-treatment', ar: 'علاج اللثة', en: 'Gum Treatment' },
  { slug: 'crowns-and-bridges', ar: 'التيجان والجسور', en: 'Crowns & Bridges' },
  { slug: 'teeth-whitening', ar: 'تبييض الأسنان', en: 'Teeth Whitening' },
  { slug: 'cosmetic-fillings', ar: 'حشوات تجميلية', en: 'Cosmetic Fillings' },
]

function goToService(slug: string) {
  router.push({ name: 'service-details', params: { slug } })
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <a href="/" class="footer-logo" @click.prevent="goHome">
            <div class="footer-logo-icon">
              <img src="/logo.png" alt="Plaza Dental Care" class="footer-logo-img" />
            </div>
            <div class="footer-logo-text">
              <span>{{
                store.isRtl ? 'مركز بلازا لتجميل الاسنان' : 'Plaza Dental Cosmetic Center'
              }}</span>
            </div>
          </a>
          <p class="footer-desc">{{ store.t.footer.description }}</p>
          <div class="footer-socials">
            <a href="https://www.facebook.com/Plazadentalcareclinic/" target="_blank" class="footer-social-link"
              aria-label="Facebook">
              <!-- Facebook SVG -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/plaza_dentalcare" target="_blank" class="footer-social-link"
              aria-label="Instagram">
              <!-- Instagram SVG -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://wa.me/201200077665" target="_blank" class="footer-social-link" aria-label="WhatsApp">
              <WhatsAppIcon :size="18" />
            </a>
          </div>
        </div>

        <!-- Services -->
        <div class="footer-col">
          <h4>{{ store.t.footer.services }}</h4>
          <ul>
            <li v-for="s in footerServices" :key="s.en">
              <a :href="`/services/${s.slug}`" @click.prevent="goToService(s.slug)">{{ store.isRtl ? s.ar : s.en }}</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <h4>{{ store.t.footer.contact }}</h4>
          <ul class="footer-contact-list">
            <li>
              <a href="tel:+201200077665" class="footer-contact-item">
                <Phone :size="14" />
                <span dir="ltr">{{ store.t.contact.phoneValue }}</span>
              </a>
            </li>
            <li>
              <span class="footer-contact-item">
                <!-- <MapPin :size="20" class="self-start" /> -->
                <span>{{ store.t.contact.addressValue }}</span>
              </span>
            </li>
            <li>
              <a href="https://wa.me/201200077665" target="_blank" class="footer-contact-item">
                <WhatsAppIcon :size="14" />
                <span dir="ltr">{{ store.t.contact.waValue }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="footer-bottom">
        <span>{{ store.t.footer.rights }} &copy; {{ new Date().getFullYear() }}</span>
        <span class="footer-made">{{ store.t.footer.made }} &mdash;
          <a href="https://shahenda-creative-developer.vercel.app/" class="capitalize">shahenda galal</a>
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--gradient-dark);
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

.footer-inner {
  width: 100%;
  padding: 0 5rem;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Brand */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  margin-bottom: 1rem;
}

.footer-logo-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: inherit;
}

.footer-logo-text span {
  font-weight: 700;
  font-size: 1rem;
  color: white;
}

.footer-desc {
  font-size: 0.85rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 1.5rem;
  max-width: 360px;
}

.footer-socials {
  display: flex;
  gap: 0.6rem;
}

.footer-social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.footer-social-link:hover {
  background: var(--teal-500);
  color: white;
  transform: translateY(-2px);
}

/* Columns */
.footer-col h4 {
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.footer-col ul {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-col ul li a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color var(--transition-fast);
}

.footer-col ul li a:hover {
  color: var(--teal-300);
}

.footer-contact-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.7rem;
  transition: color var(--transition-fast);
}


.footer-contact-item:hover {
  color: var(--teal-300);
}

/* Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-made {
  opacity: 0.6;
}

@media (max-width: 1024px) {
  .footer-inner {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer {
    padding: 3rem 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    padding: 0 1.25rem;
  }

  .footer-desc {
    font-size: 0.8rem;
  }

  .footer-col h4 {
    font-size: 0.82rem;
  }

  .footer-col ul li a {
    font-size: 0.8rem;
  }
}
</style>
