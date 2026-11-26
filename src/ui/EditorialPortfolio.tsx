import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import Resume, { ProfileSection } from './Resume'
import Works from './Works'

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: ['Midhun', 'C K'],
    intro:
      '3D artist and experienced jewelry designer in Kannur, India. Creating innovative, high-quality pieces with a focus on modeling, rendering, imaging, site banners, and product photography.',
    about: 'About',
    skills: 'Skills',
    work: 'Work',
    profile: 'Profile',
    contact: 'Contact',
    available: 'Freelance · Full-time',
    scroll: 'Scroll to discover',
    contactLabel: 'Available for new opportunities',
    contactTitle: 'Let’s make something remarkable.',
    contactDetails: 'Kannur, India · Available for freelance and full-time work',
    footer: '3D Artist · Jewelry Designer · Kannur, India',
    backTop: 'Back to top',
  },
  zh: {
    title: ['Midhun', 'C K'],
    intro:
      '來自印度 Kannur 的 3D 藝術家與珠寶設計師，專注於建模、渲染、影像處理、網站橫幅與產品攝影，為不同市場創作高品質作品。',
    about: '關於',
    skills: '技能',
    work: '作品',
    profile: '簡介',
    contact: '聯絡',
    available: '自由接案 · 全職',
    scroll: '向下探索',
    contactLabel: '目前接受新合作機會',
    contactTitle: '一起創作值得珍藏的作品。',
    contactDetails: '印度 Kannur · 接受自由接案與全職合作',
    footer: '3D 藝術家 · 珠寶設計師 · 印度 Kannur',
    backTop: '回到頁首',
  },
} satisfies Record<Lang, Record<string, string | string[]>>

const NAV_ITEMS = [
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'work', key: 'work' },
  { id: 'profile', key: 'profile' },
  { id: 'contact', key: 'contact' },
] as const

function CursorFollower() {
  const pointerX = useMotionValue(-100)
  const pointerY = useMotionValue(-100)
  const x = useSpring(pointerX, { stiffness: 320, damping: 28, mass: 0.35 })
  const y = useSpring(pointerY, { stiffness: 320, damping: 28, mass: 0.35 })
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (reducedMotion) return

    const hide = () => {
      setVisible(false)
      setHovering(false)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointerX.set(event.clientX - 18)
      pointerY.set(event.clientY - 18)
      setVisible(true)
      setHovering(
        event.target instanceof Element &&
          Boolean(event.target.closest('a, button, [role="button"], input, textarea, select')),
      )
    }

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) hide()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerout', onPointerOut)
    window.addEventListener('blur', hide)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('blur', hide)
    }
  }, [pointerX, pointerY, reducedMotion])

  if (reducedMotion) return null

  return (
    <motion.div
      className={`cursor-follower${hovering ? ' is-hovering' : ''}`}
      style={{ x, y }}
      animate={{ opacity: visible ? 0.82 : 0, scale: hovering ? 1.55 : 1 }}
      transition={{
        opacity: { duration: 0.18 },
        scale: { type: 'spring', stiffness: 300, damping: 22 },
      }}
      aria-hidden="true"
    />
  )
}

function Hero({
  lang,
  scrollY,
}: {
  lang: Lang
  scrollY: ReturnType<typeof useScroll>['scrollY']
}) {
  const copy = COPY[lang]
  const imageY = useTransform(scrollY, [0, 900], [0, 150])
  const copyY = useTransform(scrollY, [0, 650], [0, -72])
  const copyOpacity = useTransform(scrollY, [0, 420], [1, 0])

  return (
    <section id="top" className="template-hero" aria-label="Introduction">
      <motion.div className="template-hero-media" style={{ y: imageY }} aria-hidden="true">
        <img src={`${import.meta.env.BASE_URL}images/hero-portrait.png`} alt="" />
      </motion.div>
      <div className="template-hero-shade" aria-hidden="true" />

      <div className="template-topbar">
        <span className="template-mark">3D Artist · Jewelry Designer</span>
        <div className="template-topbar-meta">
          <a href="#contact">{copy.available}</a>
        </div>
      </div>

      <motion.div className="template-hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
        <h1 aria-label={`${copy.title[0]} ${copy.title[1]}`}>
          <span>{copy.title[0]}</span>
          <span>{copy.title[1]}</span>
        </h1>
        <p>{copy.intro}</p>
        <a className="template-scroll-link" href="#about">
          {copy.scroll} <span aria-hidden="true">↓</span>
        </a>
      </motion.div>
    </section>
  )
}

export default function EditorialPortfolio() {
  const lang: Lang = 'en'
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  const copy = COPY[lang]

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (current) setActiveSection(current.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="portfolio-shell">
      <CursorFollower />
      <Hero lang={lang} scrollY={scrollY} />
      <nav className="template-side-nav" aria-label="Section navigation">
        {NAV_ITEMS.map(({ id, key }) => (
          <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>
            {copy[key]}
          </a>
        ))}
      </nav>

      <main>
        <Resume lang={lang} />
        <Works lang={lang} />
        <ProfileSection lang={lang} />

        <section id="contact" className="portfolio-contact">
          <div className="editorial-container">
            <p className="section-eyebrow">{copy.contactLabel}</p>
            <h2>{copy.contactTitle}</h2>
            <p className="contact-details">{copy.contactDetails}</p>
            <div className="contact-links">
              <a href="tel:+919947238972">+91 9947238972</a>
              <a href="mailto:ckmidhun94@gmail.com">ckmidhun94@gmail.com</a>
            </div>
            <footer className="portfolio-footer">
              <span>{copy.footer}</span>
              <a href="#top" onClick={(event) => {
                event.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}>
                {copy.backTop} ↑
              </a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  )
}
