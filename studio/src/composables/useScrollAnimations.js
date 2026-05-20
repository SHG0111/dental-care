import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimations() {
  let revealObserver = null

  onMounted(() => {
    const observerOptions = { threshold: 0.1 }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100')
          entry.target.classList.remove('translate-y-8')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.animate-reveal').forEach((el) =>
      revealObserver.observe(el)
    )
  })

  onUnmounted(() => {
    if (revealObserver) revealObserver.disconnect()
  })
}
