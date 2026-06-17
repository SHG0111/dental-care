import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export type ScrollAnimation = 'clipIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Reveal a single element when it scrolls into view.
 * Returns a reactive `isRevealed` ref.
 * Template: bind `:class="{ 'is-revealed': isRevealed }"` plus a `reveal-*` class.
 * CSS: define initial state on `.reveal-*` and final state on `.reveal-*.is-revealed`.
 */
export function useScrollReveal(
  elRef: Ref<HTMLElement | null>,
  options: ScrollRevealOptions = {},
) {
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  function init() {
    if (!elRef.value) return
    const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          isRevealed.value = true
          observer?.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(elRef.value)
  }

  onMounted(init)
  onUnmounted(() => observer?.disconnect())

  return { isRevealed }
}

export interface ScrollStaggerOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Reveal children of a container when the container scrolls into view.
 * Children should have the `reveal-stagger-item` class and inline `transition-delay`.
 * Template: bind `:class="{ 'is-revealed': isRevealed }"` on the container.
 * CSS: initial state on `.reveal-stagger-item`, final on `.is-revealed .reveal-stagger-item`.
 */
export function useScrollStagger(
  containerRef: Ref<HTMLElement | null>,
  options: ScrollStaggerOptions = {},
) {
  const isRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  function init() {
    if (!containerRef.value) return
    const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          isRevealed.value = true
          observer?.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(containerRef.value)
  }

  onMounted(init)
  onUnmounted(() => observer?.disconnect())

  return { isRevealed }
}
