<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLanguageStore } from '@/stores/language'
import { useStructuredData, SITE_URL, getBreadcrumbSchema } from '@/composables/useStructuredData'
import { usePageMeta } from '@/composables/usePageMeta'

const router = useRouter()
const store = useLanguageStore()

usePageMeta({
  title: store.isRtl ? '404 - الصفحة غير موجودة | بلازا لرعاية الاسنان' : '404 - Page Not Found | Plaza Dental Care',
  description: store.isRtl
    ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. عد إلى الرئيسية واستكشف خدماتنا المتميزة في طب وتجميل الأسنان - ابتسامة هوليود، زراعة الأسنان، تقويم الأسنان، وتبييض الأسان في مركز بلازا لرعاية الاسنان بالاسكندرية.'
    : 'Sorry, the page you are looking for does not exist or has been moved. Return to Plaza Dental Care Center homepage and explore our expert dental services — Hollywood Smile, dental implants, orthodontics, root canal, and teeth whitening in Alexandria, Egypt.',
  keywords: store.isRtl
    ? '404, صفحة غير موجودة, مركز بلازا, أسنان'
    : '404, page not found, Plaza Dental Care, dentist Alexandria',
})

useStructuredData(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '404 - Page Not Found',
  url: SITE_URL || (typeof window !== 'undefined' ? window.location.href : ''),
  breadcrumb: getBreadcrumbSchema([
    { name: store.t.nav.home, url: SITE_URL || '/' },
  ]),
}))
</script>

<template>
  <div class="not-found">
    <div class="nf-inner">
      <span class="nf-code">404</span>
      <h1 class="nf-title">{{ store.isRtl ? 'الصفحة غير موجودة' : 'Page Not Found' }}</h1>
      <p class="nf-desc">
        {{ store.isRtl
          ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
          : 'Sorry, the page you are looking for does not exist or has been moved.' }}
      </p>
      <button class="nf-btn" @click="router.push('/')">
        {{ store.isRtl ? 'العودة إلى الرئيسية' : 'Back to Home' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 4rem 2rem;
}
.nf-inner {
  text-align: center;
  max-width: 480px;
}
.nf-code {
  font-size: clamp(5rem, 12vw, 8rem);
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--teal-400), var(--teal-600));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.nf-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 1rem 0 0.5rem;
}
.nf-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2rem;
}
.nf-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  border: none;
  background: var(--teal-500);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.nf-btn:hover {
  background: var(--teal-600);
  transform: translateY(-1px);
}
</style>
