import { getCollection } from 'astro:content'
import { OGImageRoute } from 'astro-og-canvas'
import { themeConfig } from '../../config'

const collectionEntries = await getCollection('posts')

// Map the array of content collection entries to create an object.
// Converts [{ id: 'post.md', data: { title: 'Example', pubDate: Date } }]
// to { 'post.md': { title: 'Example', pubDate: Date } }
const pages = Object.fromEntries(
  collectionEntries.map(({ id, data }) => [id.replace(/\.(md|mdx)$/, ''), data])
)

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: themeConfig.site.title,
    logo: {
      path: 'public/og/og-logo.png',
      size: [80, 80]
    },
    bgGradient: [[255, 255, 255]],
    bgImage: {
      path: 'public/og/og-bg.png',
      fit: 'fill'
    },
    padding: 64,
    font: {
      title: {
        color: [28, 28, 28],
        size: 68,
        weight: 'SemiBold',
        families: ['Inter', 'Besley', 'AlanSans-Regular', 'MapleMono-CN-Regular']
      },
      description: {
        color: [180, 180, 180],
        size: 40,
        weight: 'Medium',
        families: ['Inter', 'Besley', 'AlanSans-Regular', 'MapleMono-CN-Regular']
      }
    },
    fonts: [
      'public/fonts/AlanSans-Regular.ttf',
      'public/fonts/Besley-Italic.woff2',
      'public/fonts/MapleMono-CN-Regular.ttf',
      'public/fonts/Inter.woff2'
    ]
  })
})
