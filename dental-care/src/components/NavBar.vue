<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import { Menu, X, ChevronDown } from '@lucide/vue'
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'
import gbFlag from 'flag-icons/flags/4x3/gb.svg'
import saFlag from 'flag-icons/flags/4x3/sa.svg'

const router = useRouter()
const route = useRoute()
const store = useLanguageStore()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const servicesDropdownOpen = ref(false)
const mobileServicesOpen = ref(false)
let dropdownTimeout: ReturnType<typeof setTimeout> | null = null

function getLenis() {
  return (window as any).lenis ?? null
}

const isHome = ref(true)

const navItems = [
  { key: 'home', href: '/#home' as const },
  { key: 'about', href: '/#about' as const },
  { key: 'services', href: '/#services' as const },
  { key: 'beforeAfter', href: '/#before-after' as const },
  { key: 'team', href: '/#team' as const },
  { key: 'testimonials', href: '/#testimonials' as const },
  { key: 'contact', href: '/#contact' as const },
]

function getHash(fullHref: string) {
  const i = fullHref.indexOf('#')
  return i >= 0 ? fullHref.slice(i) : fullHref
}

function scrollToSection(href: string) {
  isMobileMenuOpen.value = false
  const hash = getHash(href)
  if (!isHome.value) {
    router.push({ name: 'home', hash })
    return
  }
  getLenis()?.scrollTo(hash)
}

function toggleDropdown() {
  servicesDropdownOpen.value = !servicesDropdownOpen.value
}

function openDropdown() {
  if (dropdownTimeout) clearTimeout(dropdownTimeout)
  servicesDropdownOpen.value = true
}

function closeDropdown() {
  dropdownTimeout = setTimeout(() => {
    servicesDropdownOpen.value = false
  }, 150)
}

function goToService(slug: string) {
  servicesDropdownOpen.value = false
  isMobileMenuOpen.value = false
  mobileServicesOpen.value = false
  router.push({ name: 'service-details', params: { slug } })
}

function toggleMobileServices() {
  mobileServicesOpen.value = !mobileServicesOpen.value
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.nav-dd-wrap')) {
    servicesDropdownOpen.value = false
  }
}

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  store.initLang()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

// Track whether we are on the home page
router.afterEach((to) => {
  isHome.value = to.name === 'home'
})
// Also check immediately
isHome.value = route.name === 'home'
</script>

<template>
  <nav class="navbar" :class="{
    'navbar-scrolled': isScrolled,
    'navbar-transparent': !isScrolled,
  }" :dir="store.isRtl ? 'rtl' : 'ltr'">
    <div class="navbar-inner">
      <!-- Logo -->
      <a href="/" class="logo" @click.prevent="scrollToSection('/#home')">
        <div class="logo-icon">
          <img src="/logo.png" alt="Plaza Dental Care" class="logo-img" />
        </div>
        <div class="logo-text">
          <span class="logo-ar capitalize">{{
            store.t.nav.home === 'Home' ? 'Plaza Dental care Center' : 'مركز بلازا لرعاية الاسنان'
          }}</span>
          <span class="logo-en capitalize">{{
            store.t.nav.home === 'Home' ? 'Premium Dental center' : 'Plaza Dental care Center'
          }}</span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <div class="nav-links" :class="{ 'nav-open': isMobileMenuOpen }">
        <template v-for="item in navItems" :key="item.key">
          <!-- Services — mega dropdown -->
          <div v-if="item.key === 'services'" class="nav-dd-wrap" @mouseenter="openDropdown"
            @mouseleave="closeDropdown">
            <a class="nav-link nav-link-dd" @click.prevent="toggleDropdown">
              {{ store.t.nav.services }}
              <ChevronDown :size="14" class="dd-arrow" :class="{ 'dd-arrow-open': servicesDropdownOpen }" />
            </a>
            <Transition name="mega">
              <div v-if="servicesDropdownOpen" class="mega-dropdown">
                <div class="mega-header">
                  <span class="mega-header-label">
                    {{ store.isRtl ? 'جميع خدماتنا' : 'All Services' }}
                  </span>
                </div>
                <div class="mega-grid">
                  <div v-for="s in store.t.services.items" :key="s.slug" class="mega-card" @click="goToService(s.slug)">
                    <!-- <span class="mega-card-icon">{{ s.icon }}</span> -->
                    <div class="mega-card-text">
                      <span class="mega-card-title">{{ s.title }}</span>
                      <span class="mega-card-desc">{{ s.desc }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <a v-else :href="item.href" class="nav-link" @click.prevent="scrollToSection(item.href)">
            {{ store.t.nav[item.key as keyof typeof store.t.nav] }}
          </a>
        </template>
      </div>

      <!-- Actions -->
      <div class="nav-actions">
        <button class="lang-btn" @click="store.toggleLang" :data-tooltip="store.isRtl ? 'English' : 'العربية'">
          <img :src="store.isRtl ? gbFlag : saFlag" class="flag-icon" alt="" width="22" height="16" />
        </button>

        <a href="https://wa.me/201200077665" target="_blank" rel="noopener noreferrer" class="btn-book">
          <WhatsAppIcon :size="16" />
          <span>{{ store.t.nav.book }}</span>
        </a>
        <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen"
          :data-tooltip="store.isRtl ? 'القائمة' : 'Menu'" aria-label="Toggle menu">
          <X v-if="isMobileMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="isMobileMenuOpen = false">
        <div class="mobile-menu" @click.stop>
          <template v-for="item in navItems" :key="item.key">
            <!-- Mobile services — expandable -->
            <div v-if="item.key === 'services'">
              <a class="mobile-link mobile-link-dd" @click.prevent="toggleMobileServices">
                <span>{{ store.t.nav.services }}</span>
                <ChevronDown :size="16" class="dd-arrow" :class="{ 'dd-arrow-open': mobileServicesOpen }" />
              </a>
              <Transition name="mega-sub">
                <div v-if="mobileServicesOpen" class="mobile-services-sub">
                  <a v-for="s in store.t.services.items" :key="s.slug" class="mobile-service-link"
                    @click="goToService(s.slug)">
                    <!-- <span class="ms-icon">{{ s.icon }}</span> -->
                    <span class="ms-title">{{ s.title }}</span>
                  </a>
                </div>
              </Transition>
            </div>
            <a v-else :href="item.href" class="mobile-link" @click.prevent="scrollToSection(item.href)">
              {{ store.t.nav[item.key as keyof typeof store.t.nav] }}
            </a>
          </template>
          <div class="mobile-divider"></div>
          <button class="mobile-lang-btn" @click="store.toggleLang">
            {{ store.isRtl ? '🇬🇧 English' : '🇸🇦 العربية' }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition:
    background 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    backdrop-filter 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  padding: 0 5rem;
}

.navbar-transparent {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  box-shadow: 0 1px 30px rgba(37, 215, 184, 0.08);
}

.navbar-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-shrink: 0;
}

.logo-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  border-radius: inherit;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-ar {
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.logo-en {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.navbar-transparent .logo-ar {
  color: var(--white);
}

.navbar-transparent .logo-en {
  color: var(--gray-200);
}

body.ltr .logo-ar {
  font-size: 1rem;
}

body.ltr .logo-en {
  font-size: 0.72rem;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.nav-link {
  padding: 0.55rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--white);
  transition: all var(--transition-fast);
  white-space: nowrap;
  position: relative;
}

.navbar-scrolled .nav-link {
  color: var(--text-secondary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 2px;
  transition: transform var(--transition-fast);
}

.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: inherit;
  overflow: hidden;
}

.flag-icon {
  width: 25px;
  height: auto;
  border-radius: 4px;
  display: block;
  object-fit: cover;
  aspect-ratio: 4/3;
}

.lang-btn:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
}

.btn-wa-small {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.btn-wa-small:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(39, 200, 247, 0.4);
}

.btn-book {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: var(--radius-xs);
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  background: var(--gradient-primary);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn-book:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-glow);
}

.btn-book span {
  display: none;
}

@media (min-width: 900px) {
  .btn-book span {
    display: inline;
  }
}

.mobile-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-xs);
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  background: var(--gray-50);
}

/* Mobile */
@media (max-width: 1024px) {
  .navbar {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 1.25rem;
  }

  .nav-links {
    display: none;
  }

  .btn-book span {
    display: none;
  }

  .btn-wa-small {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0 1rem;
  }

  .navbar-inner {
    height: 68px;
    gap: 0.75rem;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .logo-ar {
    font-size: 0.85rem;
  }

  body.ltr .logo-ar {
    font-size: 0.8rem;
  }

  .logo-en {
    display: none;
  }

  .btn-book {
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 360px) {
  .navbar {
    padding: 0 0.65rem;
  }

  .navbar-inner {
    height: 60px;
    gap: 0.5rem;
  }

  .logo-icon {
    width: 34px;
    height: 34px;
  }

  .logo-text {
    display: none;
  }

  .btn-book {
    padding: 0.45rem 0.75rem;
  }
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 999;
}

.mobile-menu {
  background: var(--white);
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-100);
  box-shadow: var(--shadow-lg);
}

.mobile-link {
  display: block;
  padding: 0.85rem 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.mobile-link:hover {
  background: var(--teal-50);
  color: var(--teal-600);
}

.mobile-divider {
  height: 1px;
  background: var(--gray-100);
  margin: 0.5rem 2rem;
}

.mobile-lang-btn {
  display: block;
  width: calc(100% - 4rem);
  margin: 0.5rem 2rem;
  padding: 0.7rem;
  text-align: center;
  border-radius: var(--radius-xs);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--teal-600);
  background: var(--teal-50);
  border: 1px solid rgba(37, 215, 184, 0.2);
  cursor: pointer;
  font-family: inherit;
}

/* Slide Transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .mobile-menu,
.slide-leave-to .mobile-menu {
  transform: translateY(-10px);
}

/* ==========================================
   MEGA DROPDOWN — Services
   ========================================== */
.nav-dd-wrap {
  position: relative;
}

.nav-link-dd {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.dd-arrow {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  color: var(--text-tertiary);
}

.dd-arrow-open {
  transform: rotate(180deg);
  color: var(--teal-500);
}

/* ----- Dropdown Panel ----- */
.mega-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 780px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: var(--radius-lg);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(37, 215, 184, 0.08);
  padding: 1.5rem 1.5rem 1.75rem;
  z-index: 1001;
  /* Decorative arrow */
}

.mega-dropdown::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.98);
  border-left: 1px solid rgba(37, 215, 184, 0.08);
  border-top: 1px solid rgba(37, 215, 184, 0.08);
}

.mega-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(37, 215, 184, 0.08);
}

.mega-header-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--teal-600);
}

.mega-header-count {
  font-size: 0.72rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

/* ----- Grid ----- */
.mega-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}

/* ----- Card ----- */
.mega-card {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.85rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.mega-card:hover {
  background: var(--teal-50);
  border-color: rgba(37, 215, 184, 0.12);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(37, 215, 184, 0.08);
}

.mega-card-icon {
  font-size: 1.6rem;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.mega-card-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.mega-card-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.mega-card-desc {
  font-size: 0.7rem;
  line-height: 1.5;
  color: var(--text-tertiary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ----- Animations ----- */
.mega-enter-active {
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.mega-leave-active {
  transition: all 0.15s ease-in;
}

.mega-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}

.mega-enter-from::before {
  opacity: 0;
}

.mega-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}

/* ==========================================
   MOBILE SERVICES SUB-MENU
   ========================================== */
.mobile-link-dd {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.mobile-services-sub {
  background: var(--gray-50);
  padding: 0.25rem 0;
  overflow: hidden;
}

.mobile-service-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 2rem 0.7rem 2.8rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.mobile-service-link:hover {
  background: var(--teal-50);
  color: var(--teal-600);
}

.ms-icon {
  font-size: 1.2rem;
  line-height: 1;
  flex-shrink: 0;
}

.ms-title {
  font-size: 0.88rem;
  font-weight: 500;
}

/* Mobile sub animations */
.mega-sub-enter-active {
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.mega-sub-leave-active {
  transition: all 0.15s ease-in;
}

.mega-sub-enter-from,
.mega-sub-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
