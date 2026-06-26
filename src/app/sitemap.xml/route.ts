import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://gemsjuice.vercel.app').replace(/\/+$/, '')

async function getStaticPages() {
  // static routes to include in sitemap
  return ['/', '/products', '/gallery']
}

async function getSanitySlugs() {
  try {
    const query = `*[_type in ["product","page","galleryItem"] && defined(slug.current)]{"slug": slug.current}`
    const res = await sanityClient.fetch(query)
    if (!res || !Array.isArray(res)) return []
    return res.map((r: any) => `/${r.slug}`)
  } catch (err) {
    return []
  }
}

export async function GET() {
  const staticPages = await getStaticPages()
  const sanitySlugs = await getSanitySlugs()

  const pages = [...new Set([...staticPages, ...sanitySlugs])]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((path) => {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`
      const url = `${SITE_URL}${normalizedPath}`
      return `  <url>\n    <loc>${url}</loc>\n  </url>`
    })
    .join('\n')}\n</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
