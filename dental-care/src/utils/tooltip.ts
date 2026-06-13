/**
 * Smart tooltip positioning — flips to bottom when there's no room above.
 * Uses capture-phase event delegation on document.
 */
export function setupSmartTooltips(): () => void {
  const TOOLTIP_HEIGHT = 54 // font + padding + arrow + gap
  const GAP = 10

  function onEnter(e: MouseEvent): void {
    const el = (e.target as HTMLElement).closest('[data-tooltip]') as HTMLElement | null
    if (!el) return

    const rect = el.getBoundingClientRect()

    // Flip to bottom if too close to viewport top
    if (rect.top < TOOLTIP_HEIGHT + GAP) {
      el.setAttribute('data-tooltip-pos', 'bottom')
    }
  }

  function onLeave(e: MouseEvent): void {
    const el = (e.target as HTMLElement).closest('[data-tooltip]') as HTMLElement | null
    if (!el) return
    if (!el.getAttribute('data-tooltip-pos')) return
    el.removeAttribute('data-tooltip-pos')
  }

  // mouseenter/mouseleave don't bubble, but capture phase catches them
  document.addEventListener('mouseenter', onEnter, true)
  document.addEventListener('mouseleave', onLeave, true)

  return () => {
    document.removeEventListener('mouseenter', onEnter, true)
    document.removeEventListener('mouseleave', onLeave, true)
  }
}
