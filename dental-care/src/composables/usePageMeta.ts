import { onMounted } from 'vue'

interface PageMeta {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
}

/**
 * Set per-page <title>, <meta name="description">, <meta name="keywords">,
 * and Open Graph tags.
 *
 * Strategy: update existing elements in-place (identified by CSS selector)
 * so the static index.html defaults are overwritten at runtime.
 * Elements without a known match are created fresh.
 */
export function usePageMeta(meta: PageMeta) {
  function setMeta(selector: string, attrs: Record<string, string>) {
    let el = document.querySelector(selector) as HTMLElement | null
    if (!el) {
      el = document.createElement('meta')
      document.head.appendChild(el)
    }
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
  }

  onMounted(() => {
    document.title = meta.title

    setMeta('meta[name="description"]', {
      name: 'description',
      content: meta.description,
    })

    if (meta.keywords) {
      setMeta('meta[name="keywords"]', {
        name: 'keywords',
        content: meta.keywords,
      })
    }

    setMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: meta.ogTitle ?? meta.title,
    })

    setMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: meta.ogDescription ?? meta.description,
    })

    if (meta.ogImage) {
      setMeta('meta[property="og:image"]', {
        property: 'og:image',
        content: meta.ogImage,
      })
    }

    if (meta.ogUrl) {
      setMeta('meta[property="og:url"]', {
        property: 'og:url',
        content: meta.ogUrl,
      })
    }
  })
}
