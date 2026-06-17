import { onMounted, onUnmounted } from 'vue'

/**
 * Inject JSON-LD structured data into <head> for SEO.
 * Accepts a single schema object, an array, or a factory function.
 * Scripts are cleaned up on unmount.
 */
export function useStructuredData(
  schema:
    | Record<string, unknown>
    | Record<string, unknown>[]
    | (() => Record<string, unknown> | Record<string, unknown>[]),
) {
  const scripts: HTMLScriptElement[] = []

  function inject(data: Record<string, unknown> | Record<string, unknown>[]) {
    const list = Array.isArray(data) ? data : [data]
    list.forEach((d) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(d)
      document.head.appendChild(script)
      scripts.push(script)
    })
  }

  onMounted(() => {
    if (typeof schema === 'function') {
      inject(schema())
    } else {
      inject(schema)
    }
  })

  onUnmounted(() => {
    scripts.forEach((s) => s.remove())
  })
}

/* ─── helpers ─────────────────────────────────────────── */

export const SITE_URL = typeof window !== 'undefined' ? window.location.origin : ''
export const LOGO_URL = `${SITE_URL}/logo.png`

/**
 * Shared LocalBusiness / Dentist schema.
 * Used site-wide in App.vue.
 */
export function getDentistSchema(t: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: 'Plaza Dental Care',
    description: t.about?.subtitle ?? '',
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t.contact?.addressValue?.split(',')?.[0] ?? 'Al-Agamy, Abu Yusuf',
      addressLocality: 'Alexandria',
      addressCountry: 'EG',
    },
    telephone: t.contact?.phoneValue ?? '+20 120 007 7665',
    email: t.contact?.emailValue ?? 'info@plazadentalcare.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Saturday',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
        ],
        opens: '11:00',
        closes: '23:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Thursday'],
        opens: '17:00',
        closes: '23:30',
      },
    ],
    sameAs: [
      'https://www.facebook.com/Plazadentalcareclinic/',
      'https://www.instagram.com/plaza_dentalcare',
    ],
  }
}

/**
 * WebSite schema with optional SearchAction.
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Plaza Dental Care',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * BreadcrumbList schema for navigation context.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Service schema (MedicalProcedure subtype) for a dental service page.
 */
export function getServiceSchema(
  service: { title: string; desc: string; slug: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.title,
    description: service.desc,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'Dentist',
      name: 'Plaza Dental Care',
      url: SITE_URL,
    },
    procedureType: 'NonSurgical',
    bodyLocation: 'Mouth',
    relevantSpecialty: 'Dentistry',
  }
}

/**
 * FAQPage schema from a list of Q/A pairs.
 */
export function getFaqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

/**
 * AggregateRating schema computed from testimonials.
 */
export function getAggregateRatingSchema(
  reviews: { stars: number; text: string; name: string }[],
  itemName: string,
  itemUrl: string,
) {
  if (!reviews.length) return null
  const totalStars = reviews.reduce((sum, r) => sum + r.stars, 0)
  const avg = totalStars / reviews.length

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: itemName,
    url: itemUrl,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviews.length,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewBody: r.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.stars,
        bestRating: '5',
        worstRating: '1',
      },
    })),
  }
}

export function useGoogleAnalytics(measurementId: string) {
  onMounted(() => {
    if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) return

    const gtag = document.createElement('script')
    gtag.async = true
    gtag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    gtag.dataset.gaId = measurementId
    document.head.appendChild(gtag)

    const init = document.createElement('script')
    init.textContent = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}', { page_path: location.pathname });
    `.trim()
    init.dataset.gaId = `${measurementId}-init`
    document.head.appendChild(init)
  })
}
