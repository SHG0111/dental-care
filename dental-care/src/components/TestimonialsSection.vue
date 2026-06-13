<script setup lang="ts">
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { Star } from '@lucide/vue'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

const { isVisible: headerVisible } = useScrollReveal(headerRef, { threshold: 0.2 })
const { isVisible: gridVisible } = useScrollReveal(gridRef, { threshold: 0.05 })

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
}
</script>

<template>
  <section id="testimonials" ref="sectionRef" class="section bg-gradient">
    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" class="section-header centered">
        <div
          class="section-label"
          style="transition: all 0.5s ease; opacity: 0; transform: translateY(20px);"
          :style="headerVisible ? 'opacity: 1; transform: translateY(0);' : ''"
        >
          <span class="section-label-dot"></span>
          <span>{{ store.t.testimonials.label }}</span>
        </div>
        <h2
          class="section-title"
          style="transition: all 0.6s ease 0.1s; opacity: 0; transform: translateY(20px);"
          :style="headerVisible ? 'opacity: 1; transform: translateY(0);' : ''"
        >
          {{ store.t.testimonials.title }}
        </h2>
        <p
          class="section-subtitle"
          style="transition: all 0.6s ease 0.2s; opacity: 0; transform: translateY(20px);"
          :style="headerVisible ? 'opacity: 1; transform: translateY(0);' : ''"
        >
          {{ store.t.testimonials.subtitle }}
        </p>
      </div>

      <!-- Grid -->
      <div ref="gridRef" class="testimonials-grid">
        <div
          v-for="(testimonial, i) in store.t.testimonials.items"
          :key="i"
          class="testimonial-card"
          :style="{
            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.12}s`,
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'translateY(0)' : 'translateY(30px)',
          }"
        >
          <div class="testimonial-quote">&quot;</div>
          <div class="testimonial-stars">
            <Star
              v-for="s in testimonial.stars"
              :key="s"
              :size="16"
              fill="#F5A623"
              color="#F5A623"
            />
          </div>
          <p class="testimonial-text">"{{ testimonial.text }}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar" :style="{ background: `var(--teal-${[50, 100, 200, 300][i]})`, color: `var(--teal-${[600, 700, 700, 800][i]})` }">
              {{ getInitials(testimonial.name) }}
            </div>
            <div>
              <div class="author-name">{{ testimonial.name }}</div>
              <div class="author-label">{{ testimonial.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 2rem 1.75rem;
  border: 1px solid rgba(37, 215, 184, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.testimonial-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px) !important;
  border-color: rgba(37, 215, 184, 0.15);
}

.testimonial-quote {
  position: absolute;
  top: 0.75rem;
  left: 1.25rem;
  font-size: 4rem;
  color: rgba(37, 215, 184, 0.08);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
}

body.ltr .testimonial-quote {
  left: auto;
  right: 1.25rem;
}

.testimonial-stars {
  display: flex;
  gap: 2px;
  margin-bottom: 1rem;
}

.testimonial-text {
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
  font-style: italic;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  flex-shrink: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.author-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style>
