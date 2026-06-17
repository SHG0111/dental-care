<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { Calendar, ArrowDown } from '@lucide/vue'

const store = useLanguageStore()

function scrollToContact() {
  // Use Lenis if available on root, otherwise native smooth scroll
  const target = document.querySelector('#contact')
  if (!target) return
  if ((window as any).lenis) {
    ;(window as any).lenis.scrollTo(target)
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="hours-banner">
    <div class="hours-inner">
      <div class="hours-left">
        <h3>{{ store.t.hours.title }}</h3>
        <p>{{ store.t.hours.subtitle }}</p>
      </div>

      <div class="hours-grid">
        <div class="hour-item">
          <span class="hour-day">{{ store.t.hours.sun }} – {{ store.t.hours.thu }}</span>
          <span class="hour-time">{{ store.t.hours.weekdays }}</span>
        </div>
        <div class="hour-item">
          <span class="hour-day">{{ store.t.hours.fri }}</span>
          <span class="hour-time">{{ store.t.hours.friHours }}</span>
        </div>
        <div class="hour-item">
          <span class="hour-day">{{ store.t.hours.sat }}</span>
          <span class="hour-time">{{ store.t.hours.satHours }}</span>
        </div>
      </div>

      <button class="btn btn-banner" @click="scrollToContact">
        <Calendar :size="18" />
        <span>{{ store.t.hours.cta }}</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hours-banner {
  background: var(--gradient-dark);
  padding: 0;
  position: relative;
  overflow: hidden;
}

.hours-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.hours-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.hours-left h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.hours-left p {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.65);
}

.hours-grid {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}

.hour-item {
  text-align: center;
}

.hour-day {
  display: block;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.hour-time {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
}

.btn-banner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: white;
  color: var(--teal-600);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: inherit;
}

.btn-banner:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .hours-inner {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 2rem;
  }
  .hours-grid {
    justify-content: center;
    gap: 1.5rem;
  }

  .hours-left h3 {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hours-inner {
    padding: 2rem 1.25rem;
    gap: 1.25rem;
  }

  .hours-grid {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn-banner {
    padding: 0.65rem 1.4rem;
    font-size: 0.82rem;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 360px) {
  .hours-left h3 {
    font-size: 1rem;
  }
}
</style>
