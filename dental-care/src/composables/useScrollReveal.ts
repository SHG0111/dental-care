import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal(
  elRef: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const isVisible = ref(false)
  const observer = ref<IntersectionObserver | null>(null)

  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px', once = true } = options

  function observe() {
    if (!elRef.value) return
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            if (once && observer.value) {
              observer.value.unobserve(entry.target)
            }
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      { threshold, rootMargin },
    )
    observer.value.observe(elRef.value)
  }

  onMounted(observe)

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return { isVisible }
}

export function useStaggerReveal(
  containerRef: Ref<HTMLElement | null>,
  itemCount: number,
  options: { baseDelay?: number; staggerDelay?: number } = {},
) {
  const { isVisible } = useScrollReveal(containerRef, { threshold: 0.05 })
  const { baseDelay = 0, staggerDelay = 0.08 } = options

  const itemStyles = computed(() => {
    if (!isVisible.value) {
      return Array.from({ length: itemCount }, () => ({
        opacity: 0,
        transform: 'translateY(30px)',
        transitionDelay: '0s',
      }))
    }
    return Array.from({ length: itemCount }, (_, i) => ({
      opacity: 1,
      transform: 'translateY(0)',
      transitionDelay: `${baseDelay + i * staggerDelay}s`,
    }))
  })

  return { isVisible, itemStyles }
}
