import { onMounted, onUnmounted, onActivated, onDeactivated, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type GsapAnimation =
  | 'fadeUp'
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleIn'
  | 'clipIn'

export interface GsapRevealOptions {
  animation?: GsapAnimation
  duration?: number
  delay?: number
  ease?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
  from?: gsap.TweenVars
  to?: gsap.TweenVars
}

const presetFrom: Record<GsapAnimation, gsap.TweenVars> = {
  fadeUp: { y: 50, opacity: 0 },
  fadeIn: { opacity: 0 },
  slideLeft: { x: -60, opacity: 0 },
  slideRight: { x: 60, opacity: 0 },
  scaleIn: { scale: 0.85, opacity: 0 },
  clipIn: { clipPath: 'inset(0 100% 0 0)' },
}

const presetTo: Record<GsapAnimation, gsap.TweenVars> = {
  fadeUp: { y: 0, opacity: 1 },
  fadeIn: { opacity: 1 },
  slideLeft: { x: 0, opacity: 1 },
  slideRight: { x: 0, opacity: 1 },
  scaleIn: { scale: 1, opacity: 1 },
  clipIn: { clipPath: 'inset(0 0% 0 0)' },
}

/**
 * Reveal a single element with a GSAP animation when it scrolls into view.
 * Returns a cleanup function.
 */
export function useGsapReveal(
  elRef: Ref<HTMLElement | null>,
  options: GsapRevealOptions = {},
) {
  let trigger: ScrollTrigger | null = null

  function init() {
    if (!elRef.value) return

    const {
      animation = 'fadeUp',
      duration = 0.9,
      delay = 0,
      ease = 'power2.out',
      start = 'top 85%',
      end = 'top 40%',
      scrub = false,
      markers = false,
      toggleActions = 'play none none none',
      from,
      to,
    } = options

    const fromVars = from ?? presetFrom[animation]
    const toVars = to ?? presetTo[animation]

    gsap.set(elRef.value, { ...fromVars, visibility: 'visible' })

    if (scrub) {
      trigger = ScrollTrigger.create({
        trigger: elRef.value,
        start,
        end: end || 'bottom 20%',
        scrub: typeof scrub === 'number' ? scrub : true,
        markers,
        onUpdate: (self) => {
          const p = self.progress
          if (elRef.value && fromVars && toVars) {
            gsap.set(elRef.value, {
              ...Object.keys(fromVars).reduce(
                (acc, key) => {
                  const fromVal = (fromVars as Record<string, number>)[key] ?? 0
                  const toVal = (toVars as Record<string, number>)[key] ?? 0
                  ;(acc as Record<string, number>)[key] = fromVal + (toVal - fromVal) * p
                  return acc
                },
                {} as Record<string, number>,
              ),
            })
          }
        },
      })
    } else {
      gsap.fromTo(elRef.value, fromVars, {
        ...toVars,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: elRef.value,
          start,
          toggleActions,
          markers,
        },
      })
    }
  }

  onMounted(init)
  onActivated(init)

  onUnmounted(() => {
    if (trigger) trigger.kill()
  })

  return {
    refresh: () => ScrollTrigger.refresh(),
  }
}

export interface StaggerOptions {
  animation?: GsapAnimation
  from?: gsap.TweenVars
  duration?: number
  stagger?: number
  ease?: string
  start?: string
  toggleActions?: string
}

/**
 * Stagger-animate children of a container element.
 * `childSelector` is a CSS selector for direct children (e.g. '> div' or '> *').
 */
export function useGsapStagger(
  containerRef: Ref<HTMLElement | null>,
  childSelector: string,
  options: StaggerOptions = {},
) {
  function init() {
    if (!containerRef.value) return

    const {
      animation = 'fadeUp',
      from,
      duration = 0.7,
      stagger = 0.1,
      ease = 'power2.out',
      start = 'top 88%',
      toggleActions = 'play none none none',
    } = options

    const fromVars = from ?? presetFrom[animation]
    const children = containerRef.value.querySelectorAll(`:scope ${childSelector}`)
    if (!children.length) return

    gsap.set(children, { ...fromVars })

    gsap.fromTo(children, fromVars, {
      ...presetTo[animation],
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: containerRef.value,
        start,
        toggleActions,
      },
    })
  }

  onMounted(init)
  onActivated(init)
}

export interface TimelineOptions {
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  toggleActions?: string
}

/**
 * Build a GSAP timeline tied to a ScrollTrigger for multi-step animations.
 * Returns a builder function that receives a gsap timeline.
 */
export function useGsapTimeline(
  elRef: Ref<HTMLElement | null>,
  options: TimelineOptions = {},
) {
  let tl: gsap.core.Timeline | null = null

  function init(buildFn: (tl: gsap.core.Timeline) => void) {
    if (!elRef.value) return

    const {
      start = 'top 85%',
      end = 'bottom 20%',
      scrub = 1,
      markers = false,
      toggleActions = 'play none none none',
    } = options

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: elRef.value,
        start,
        end,
        scrub,
        markers,
        toggleActions,
      },
    })

    buildFn(tl)
  }

  onUnmounted(() => {
    if (tl) tl.kill()
  })

  return { init, refresh: () => ScrollTrigger.refresh() }
}

/**
 * Parallax effect — element moves at a fraction of the scroll speed.
 */
export function useGsapParallax(
  elRef: Ref<HTMLElement | null>,
  intensity = 0.3,
) {
  function init() {
    if (!elRef.value) return
    gsap.to(elRef.value, {
      y: () => (elRef.value ? -(elRef.value.offsetHeight * intensity) : 0),
      ease: 'none',
      scrollTrigger: {
        trigger: elRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  onMounted(init)
  onActivated(init)

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill())
  })
}

export interface ScrubRevealOptions extends GsapRevealOptions {
  start?: string
  end?: string
}

export function useGsapScrubReveal(
  elRef: Ref<HTMLElement | null>,
  options: ScrubRevealOptions = {},
) {
  return useGsapReveal(elRef, {
    animation: 'fadeUp',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
    ...options,
  })
}

export interface StaggerScrubOptions extends StaggerOptions {
  start?: string
  end?: string
}

export function useGsapScrubStagger(
  containerRef: Ref<HTMLElement | null>,
  childSelector: string,
  options: StaggerScrubOptions = {},
) {
  function init() {
    if (!containerRef.value) return

    const {
      animation = 'fadeUp',
      from,
      duration = 0.7,
      stagger = 0.08,
      ease = 'power2.out',
      start = 'top bottom',
      end = 'bottom top',
    } = options

    const fromVars = from ?? presetFrom[animation]
    const children = containerRef.value.querySelectorAll(`:scope ${childSelector}`)
    if (!children.length) return

    gsap.set(children, { ...fromVars })

    gsap.fromTo(children, fromVars, {
      ...presetTo[animation],
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: containerRef.value,
        start,
        end,
        scrub: 1,
      },
    })
  }

  onMounted(init)
  onActivated(init)
}

export interface ParallaxGroupOptions {
  selector?: string
  yRange?: number
  xRange?: number
  start?: string
  end?: string
}

export function useParallaxGroup(
  containerRef: Ref<HTMLElement | null>,
  options: ParallaxGroupOptions = {},
) {
  function init() {
    if (!containerRef.value) return

    const {
      selector = '> *',
      yRange = 40,
      xRange = 0,
      start = 'top bottom',
      end = 'bottom top',
    } = options

    const children = containerRef.value.querySelectorAll(`:scope ${selector}`)
    if (!children.length) return

    children.forEach((child, i) => {
      const direction = i % 2 === 0 ? 1 : -1
      gsap.to(child, {
        y: yRange ? yRange * direction : 0,
        x: xRange ? xRange * direction : 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.value,
          start,
          end,
          scrub: 1,
        },
      })
    })
  }

  onMounted(init)
  onActivated(init)
}

export function useScrollParallax(
  elRef: Ref<HTMLElement | null>,
  intensity = 0.3,
) {
  return useGsapParallax(elRef, intensity)
}

/**
 * Refresh all ScrollTriggers (call after dynamic content changes).
 */
export function refreshGsap() {
  ScrollTrigger.refresh()
}
