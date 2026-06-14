import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import en from '@/i18n/en'
import ar from '@/i18n/ar'

export type Lang = 'ar' | 'en'

export const useLanguageStore = defineStore('language', () => {
  const lang = ref<Lang>('ar')

  const t = computed(() => (lang.value === 'ar' ? ar : en))

  const isRtl = computed(() => lang.value === 'ar')

  function setLang(l: Lang) {
    lang.value = l
    document.documentElement.setAttribute('dir', isRtl.value ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', lang.value)
    document.body.classList.toggle('ltr', !isRtl.value)
    document.body.classList.toggle('rtl', isRtl.value)
    localStorage.setItem('plaza-lang', l)
  }

  function toggleLang() {
    setLang(lang.value === 'ar' ? 'en' : 'ar')
  }

  function initLang() {
    const saved = localStorage.getItem('plaza-lang') as Lang | null
    setLang(saved || 'ar')
  }

  return { lang, t, isRtl, setLang, toggleLang, initLang }
})
