<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { Menu, X, Phone } from '@lucide/vue'
import WhatsAppIcon from '@/components/WhatsAppIcon.vue'
import gbFlag from 'flag-icons/flags/4x3/gb.svg'
import saFlag from 'flag-icons/flags/4x3/sa.svg'

const store = useLanguageStore()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { key: 'home', href: '#home' as const },
  { key: 'about', href: '#about' as const },
  { key: 'services', href: '#services' as const },
  { key: 'beforeAfter', href: '#before-after' as const },
  { key: 'team', href: '#team' as const },
  { key: 'testimonials', href: '#testimonials' as const },
  { key: 'contact', href: '#contact' as const },
]

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

function scrollToSection(href: string) {
  isMobileMenuOpen.value = false
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  store.initLang()
})
</script>

<template>
  <nav
    class="navbar"
    :class="{
      'navbar-scrolled': isScrolled,
      'navbar-transparent': !isScrolled,
    }"
    :dir="store.isRtl ? 'rtl' : 'ltr'"
  >
    <div class="navbar-inner">
      <!-- Logo -->
      <a href="#home" class="logo" @click.prevent="scrollToSection('#home')">
        <div class="logo-icon">
          <img src="/logo.png" alt="Plaza Dental Care" class="logo-img" />
        </div>
        <div class="logo-text">
          <span class="logo-ar">{{ store.t.nav.home === 'Home' ? 'Plaza Dental Cosmetic Center' : 'مركز بلازا لتجميل الاسنان' }}</span>
          <span class="logo-en">{{ store.t.nav.home === 'Home' ? 'Premium Dental Clinic' : 'Plaza Dental Cosmetic Center' }}</span>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <div class="nav-links" :class="{ 'nav-open': isMobileMenuOpen }">
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="nav-link"
          @click.prevent="scrollToSection(item.href)"
        >
          {{ store.t.nav[item.key as keyof typeof store.t.nav] }}
        </a>
      </div>

      <!-- Actions -->
      <div class="nav-actions">
        <button class="lang-btn" @click="store.toggleLang" :data-tooltip="store.isRtl ? 'English' : 'العربية'">
          <img :src="store.isRtl ? gbFlag : saFlag" class="flag-icon" alt="" width="22" height="16" />
        </button>
        <a
          :href="`https://wa.me/201200077665`"
          target="_blank"
          class="btn-wa-small"
          :data-tooltip="store.isRtl ? 'واتساب' : 'WhatsApp'"
        >
          <Phone :size="16" />
        </a>
        <a
          href="https://wa.me/201200077665"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-book"
        >
          <WhatsAppIcon :size="16" />
          <span>{{ store.t.nav.book }}</span>
        </a>
        <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" :data-tooltip="store.isRtl ? 'القائمة' : 'Menu'" aria-label="Toggle menu">
          <X v-if="isMobileMenuOpen" :size="22" />
          <Menu v-else :size="22" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="isMobileMenuOpen = false">
        <div class="mobile-menu" @click.stop>
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            class="mobile-link"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ store.t.nav[item.key as keyof typeof store.t.nav] }}
          </a>
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
  transition: all var(--transition-base);
  padding: 0 2rem;
}

.navbar-transparent {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(37, 215, 184, 0.06);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  box-shadow: 0 1px 30px rgba(37, 215, 184, 0.08);
  border-bottom: 1px solid rgba(37, 215, 184, 0.1);
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.logo-icon {
  width: 44px;
  height: 44px;
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
  font-size: 1rem;
  color: var(--text-primary);
}

.logo-en {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

body.ltr .logo-ar {
  font-size: 0.9rem;
}

body.ltr .logo-en {
  font-size: 0.65rem;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.nav-link {
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-xs);
  font-size: 0.87rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  white-space: nowrap;
  position: relative;
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

.nav-link:hover {
  color: var(--teal-600);
  background: var(--teal-50);
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
  gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-xs);
  font-size: 0.85rem;
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
</style>
