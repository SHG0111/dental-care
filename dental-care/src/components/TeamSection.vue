<script setup lang="ts">
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useScrollReveal } from '@/composables/useScrollReveal'

const store = useLanguageStore()

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

const { isVisible: headerVisible } = useScrollReveal(headerRef, { threshold: 0.2 })
const { isVisible: gridVisible } = useScrollReveal(gridRef, { threshold: 0.05 })

const avatarColors = ['#27c8f7', '#0D4F8B', '#F5A623', '#27c8f7', '#0D4F8B', '#F5A623'] as const
</script>

<template>
  <section id="team" ref="sectionRef" class="section bg-pale">
    <div class="section-inner">
      <!-- Header -->
      <div ref="headerRef" class="section-header centered">
        <div
          class="section-label"
          style="transition: all 0.5s ease; opacity: 0; transform: translateY(20px);"
          :style="headerVisible ? 'opacity: 1; transform: translateY(0);' : ''"
        >
          <span class="section-label-dot"></span>
          <span>{{ store.t.team.label }}</span>
        </div>
        <h2
          class="section-title"
          style="transition: all 0.6s ease 0.1s; opacity: 0; transform: translateY(20px);"
          :style="headerVisible ? 'opacity: 1; transform: translateY(0);' : ''"
        >
          {{ store.t.team.title.split("'")[0] }}<span class="accent">'{{ store.t.team.title.includes("'") ? store.t.team.title.split("'")[1] : '' }}</span>
        </h2>
        <p
          class="section-subtitle"
          style="transition: all 0.6s ease 0.2s; opacity: 0; transform: translateY(20px);"
          :style="headerVisible ? 'opacity: 1; transform: translateY(0);' : ''"
        >
          {{ store.t.team.subtitle }}
        </p>
      </div>

      <!-- Grid -->
      <div ref="gridRef" class="team-grid">
        <div
          v-for="(member, i) in store.t.team.items"
          :key="i"
          class="team-card"
          :style="{
            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.08}s`,
            opacity: gridVisible ? 1 : 0,
            transform: gridVisible ? 'translateY(0)' : 'translateY(30px)',
          }"
        >
          <div class="team-avatar" :style="{ background: avatarColors[i] }">
            <span>{{ member.initials }}</span>
          </div>
          <h3>{{ member.name }}</h3>
          <p class="team-spec">{{ member.spec }}</p>
          <span class="team-tag">{{ member.tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.team-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 2rem 1.5rem;
  text-align: center;
  border: 1px solid rgba(37, 215, 184, 0.08);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.team-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: var(--shadow-lg);
  border-color: rgba(37, 215, 184, 0.15);
}

.team-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  font-weight: 700;
  color: white;
  font-family: 'Plus Jakarta Sans', sans-serif;
  transition: all var(--transition-base);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.team-card:hover .team-avatar {
  transform: scale(1.08);
}

.team-card h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--text-primary);
}

.team-spec {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 0.75rem;
}

.team-tag {
  display: inline-block;
  background: var(--teal-50);
  color: var(--teal-600);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.8rem;
  border-radius: 100px;
  border: 1px solid rgba(37, 215, 184, 0.12);
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .team-card {
    padding: 1.5rem 1rem;
  }
  .team-avatar {
    width: 64px;
    height: 64px;
    font-size: 1.1rem;
  }
}
</style>
