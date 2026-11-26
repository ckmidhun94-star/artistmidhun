import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowUpRight01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { WORKS, type WorkListItem, type WorkSection } from '../data/works'
import { getWorkDoc } from '../data/workDocs'

const EASE = [0.22, 1, 0.36, 1]

function getProjectImage(item: WorkListItem) {
  if (!item.slug || item.slug === 'product-animation') return undefined
  return `${import.meta.env.BASE_URL}works/${item.slug}/image-01.webp`
}

function ProjectRow({
  item,
  description,
  onOpen,
}: {
  item: WorkListItem
  description?: string
  onOpen: (item: WorkListItem) => void
}) {
  const image = getProjectImage(item)
  const video = item.slug === 'product-animation'
    ? `${import.meta.env.BASE_URL}videos/chain.mp4`
    : undefined

  return (
    <li className="editorial-project-row">
      <button className="editorial-project-button" onClick={() => onOpen(item)}>
        {(image || video) && (
          <span className="editorial-project-image">
            {video ? (
              <video
                src={video}
                aria-hidden="true"
                muted
                loop
                playsInline
                preload="metadata"
                onMouseEnter={(event) => { void event.currentTarget.play() }}
                onMouseLeave={(event) => event.currentTarget.pause()}
              />
            ) : (
              <img src={image} alt="" loading="lazy" />
            )}
          </span>
        )}
        <span className="editorial-project-copy">
          <span className="editorial-project-name">{item.name}</span>
          <span className="editorial-project-description">
            {description || item.tags?.join(' · ')}
          </span>
        </span>
        <span className="editorial-project-meta">
          {item.tags?.map((tag) => <span key={tag}>{tag}</span>)}
        </span>
        <span className="editorial-project-arrow" aria-hidden="true">
          <HugeiconsIcon className="editorial-project-arrow-icon" icon={ArrowUpRight01Icon} size={18} strokeWidth={1.6} />
        </span>
      </button>
    </li>
  )
}

function ProjectGroup({
  section,
  onOpen,
}: {
  section: WorkSection
  onOpen: (item: WorkListItem) => void
}) {
  return (
    <motion.article
      className="editorial-project-group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <div className="editorial-project-group-head">
        <span>{section.no}</span>
        <div>
          <h3>{section.title}</h3>
          <p>{section.tagline}</p>
        </div>
      </div>
      {section.items && (
        <ul className="editorial-project-list">
          {section.items.map((item) => (
            <ProjectRow
              key={item.slug || item.name}
              item={item}
              description={section.tagline}
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
      {section.groups?.map((group) => (
        <div className="editorial-project-subgroup" key={group.heading}>
          <h4>{group.heading}</h4>
          <ul className="editorial-project-list">
            {group.items.map((name) => (
              <ProjectRow key={name} item={{ name }} onOpen={onOpen} />
            ))}
          </ul>
        </div>
      ))}
    </motion.article>
  )
}

function ProjectDetail({
  item,
  lang,
  onClose,
}: {
  item: WorkListItem
  lang: 'en' | 'zh'
  onClose: () => void
}) {
  const doc = getWorkDoc(item.slug)
  const title = doc?.title || item.name
  const image = doc?.banner
    ? `${import.meta.env.BASE_URL}${doc.banner.replace(/^\.\//, '')}`
    : undefined
  const tags = doc?.tags || item.tags
  const isProductVideo = item.slug === 'product-animation'

  return (
    <>
      <motion.button
        className="wk-detail-backdrop"
        aria-label={lang === 'zh' ? '關閉作品詳情' : 'Close project details'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="wk-detail"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        initial={{ opacity: 0, scale: 0.985, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.99, y: 6 }}
        transition={{ duration: 0.42, ease: EASE }}
      >
        <button
          className="wk-detail-close"
          onClick={onClose}
          aria-label={lang === 'zh' ? '關閉作品詳情' : 'Close project details'}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>

        {isProductVideo ? (
          <div className="wk-detail-banner wk-detail-video-grid">
            {['chain.mp4', 'foggy.mp4'].map((filename, index) => (
              <video
                key={filename}
                src={`${import.meta.env.BASE_URL}videos/${filename}`}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${title} video ${index + 1}`}
                onMouseEnter={(event) => { void event.currentTarget.play() }}
                onMouseLeave={(event) => event.currentTarget.pause()}
              />
            ))}
          </div>
        ) : image ? (
          <div className="wk-detail-banner">
            <img src={image} alt={title} />
          </div>
        ) : null}
        <article className="wk-detail-article">
          <header className="wk-detail-head">
            <h3 className="wk-detail-title">{title}</h3>
            {tags && tags.length > 0 && (
              <div className="wk-detail-tags">
                {tags.map((tag) => (
                  <span key={tag} className="wk-badge">{tag}</span>
                ))}
              </div>
            )}
          </header>

          {doc?.body && (
            <div className="wk-md">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{doc.body}</ReactMarkdown>
              {doc.videos?.map((video, index) => (
                <iframe
                  key={video}
                  className="wk-video"
                  src={video}
                  title={`${title} video ${index + 1}`}
                  loading="lazy"
                  allow="autoplay; picture-in-picture"
                  allowFullScreen
                />
              ))}
            </div>
          )}
        </article>
      </motion.div>
    </>
  )
}

export default function Works({ lang }: { lang: 'en' | 'zh' }) {
  const data = WORKS[lang]
  const [active, setActive] = useState<WorkListItem | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  return (
    <section id="work" className="editorial-section work-section" lang={lang}>
      <div className="editorial-container">
        <p className="section-eyebrow">{lang === 'zh' ? '03 / 精選作品' : '03 / Selected work'}</p>
        <h2 className="editorial-heading">{data.title}</h2>
        <p className="work-section-intro">
          {lang === 'zh'
            ? '珠寶設計、產品建模與動態影像。'
            : 'Jewelry design, product modeling, and motion.'}
        </p>
        <div className="editorial-project-groups">
          {data.sections.map((section) => (
            <ProjectGroup key={section.id} section={section} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectDetail
            key={active.slug || active.name}
            item={active}
            lang={lang}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
