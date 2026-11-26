export interface WorkListItem {
  name: string
  slug?: string
  tags?: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: { heading: string; items: string[] }[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  sections: WorkSection[]
}

const projects = {
  productAnimation: {
    name: 'PRODUCT ANIMATION',
    slug: 'product-animation',
    tags: ['Animation', '3D'],
  },
  spin: {
    name: '360 spin',
    slug: '360-spin',
    tags: ['Animation', '360°'],
  },
  pendantModels: {
    name: 'Pendant models',
    slug: 'pendant-models',
    tags: ['Jewelry Design', '3D'],
  },
  pendantWhiteGold: {
    name: 'Pendant WG rendering views',
    slug: 'pendant-wg-rendering-views',
    tags: ['Jewelry Design', 'White gold'],
  },
  pendantYellowGold: {
    name: 'Pendant YG rendering views',
    slug: 'pendant-yg-rendering-views',
    tags: ['Jewelry Design', 'Yellow gold'],
  },
  ringModels: {
    name: 'Ring models',
    slug: 'ring-models',
    tags: ['Jewelry Design', '3D'],
  },
  ringWhiteGold: {
    name: 'Ring WG rendering views',
    slug: 'ring-wg-rendering-views',
    tags: ['Jewelry Design', 'White gold'],
  },
  ringYellowGold: {
    name: 'Ring YG rendering views',
    slug: 'ring-yg-rendering-views',
    tags: ['Jewelry Design', 'Yellow gold'],
  },
} satisfies Record<string, WorkListItem>

const makeSections = (zh: boolean): WorkSection[] => [
  {
    id: 'product-animation',
    no: '01',
    title: zh ? '產品動畫' : 'Product animation',
    tagline: zh ? '產品展示與 360° 動畫' : 'Product films & 360° animation',
    items: [projects.productAnimation, projects.spin],
  },
  {
    id: 'pendant-design',
    no: '02',
    title: zh ? '吊墜設計' : 'Pendant design',
    tagline: zh ? '珠寶建模與渲染' : 'Jewelry modeling & rendering',
    items: [projects.pendantModels, projects.pendantWhiteGold, projects.pendantYellowGold],
  },
  {
    id: 'ring-design',
    no: '03',
    title: zh ? '戒指設計' : 'Ring design',
    tagline: zh ? '珠寶建模與渲染' : 'Jewelry modeling & rendering',
    items: [projects.ringModels, projects.ringWhiteGold, projects.ringYellowGold],
  },
]

const english: WorksLang = {
  title: 'Selected work',
  sections: makeSections(false),
}

const chinese: WorksLang = {
  title: '精選作品',
  sections: makeSections(true),
}

export const WORKS: Record<'en' | 'zh', WorksLang> = {
  en: english,
  zh: chinese,
}

