<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useGsapScrubReveal } from '@/composables/useGsapReveal'
import { ExternalLink } from '@lucide/vue'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const widgetRef = ref<HTMLElement | null>(null)

useGsapScrubReveal(headerRef, { animation: 'fadeUp' })
useGsapScrubReveal(widgetRef, { animation: 'fadeUp' })

const facebookPageUrl = 'https://www.facebook.com/Plazadentalcareclinic/'

onMounted(() => {
  if (!document.querySelector('script[src*="sociablekit.com/facebook-reels/widget.js"]')) {
    const script = document.createElement('script')
    script.src = 'https://widgets.sociablekit.com/facebook-reels/widget.js'
    document.body.appendChild(script)
  }
})
</script>

<template>
  <section id="reels" ref="sectionRef" class="section bg-light">
    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" class="section-header centered">
        <div class="section-label">
          <span class="section-label-dot"></span>
          <span>{{ store.t.facebookReels.label }}</span>
        </div>
        <h2 class="section-title">
          {{ store.t.facebookReels.title }}
        </h2>
        <p class="section-subtitle">
          {{ store.t.facebookReels.subtitle }}
        </p>
      </div>

      <!-- Widget -->
      <div ref="widgetRef" class="reels-widget">
        <div class='sk-ww-facebook-reels' data-embed-id='25689075'></div>
      </div>

      <!-- Follow CTA -->
      <div class="reels-cta">
        <a
          :href="facebookPageUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          {{ store.isRtl ? 'تابعنا على فيسبوك' : 'Follow on Facebook' }}
          <ExternalLink :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reels-widget {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid rgba(37, 215, 184, 0.08);
  box-shadow: var(--shadow-sm);
  min-height: 350px;
  overflow: hidden;
}

.reels-widget :deep(.sk-ww-facebook-reels) {
  min-height: 300px;
}

.reels-cta {
  text-align: center;
  margin-top: 1.5rem;
}

.reels-cta .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
