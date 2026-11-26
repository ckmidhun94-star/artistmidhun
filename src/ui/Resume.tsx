import { motion } from 'framer-motion'

const SPECIALTIES = [
  { en: '3D modeling', zh: '3D 建模' },
  { en: '3D rendering', zh: '3D 渲染' },
  { en: 'Jewelry design', zh: '珠寶設計' },
  { en: 'Product imaging', zh: '產品影像' },
  { en: 'Site banners', zh: '網站橫幅' },
  { en: 'Product photography', zh: '產品攝影' },
  { en: 'Product animation', zh: '產品動畫' },
  { en: '360° product spins', zh: '360° 產品旋轉' },
]

const TOOLS = ['Rhino', 'Matrix', 'ZBrush', 'KeyShot', 'Photoshop', 'After Effects']

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const isChinese = lang === 'zh'

  return (
    <>
      <section id="about" className="editorial-section about-section" lang={lang}>
        <div className="editorial-container">
          <p className="section-eyebrow">{isChinese ? '01 / 關於藝術家' : '01 / About the artist'}</p>
          <h2 className="editorial-heading">
            {isChinese ? (
              <>3D 藝術家與<br />珠寶設計師</>
            ) : (
              <>3D artist &<br />jewelry designer</>
            )}
          </h2>

          <div className="about-editorial-grid">
            <figure className="about-artwork">
              <video
                src={`${import.meta.env.BASE_URL}videos/foggy.mp4`}
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={isChinese ? 'Midhun 的珠寶設計影片' : 'Jewelry design video by Midhun'}
                onMouseEnter={(event) => { void event.currentTarget.play() }}
                onMouseLeave={(event) => event.currentTarget.pause()}
              />
              <figcaption>
                {isChinese ? '珠寶建模與渲染' : 'Jewelry modeling & rendering'}
              </figcaption>
            </figure>
            <div className="about-editorial-copy">
              <p>
                {isChinese
                  ? '來自印度 Kannur 的 3D 藝術家與資深珠寶設計師，為不同市場創作創新且高品質的作品。'
                  : 'A 3D artist and experienced jewelry designer based in Kannur, India, creating innovative, high-quality pieces for a variety of markets.'}
              </p>
              <blockquote>
                {isChinese
                  ? '專注於建模、渲染、影像處理、網站橫幅與產品攝影。'
                  : 'Focused on modeling, rendering, imaging, site banners, and product photography.'}
              </blockquote>
              <p className="about-editorial-note">
                {isChinese
                  ? '創作涵蓋珠寶建模、產品影像與動態設計。'
                  : 'Working across jewelry modeling, product imagery, and motion.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="editorial-section skills-section" lang={lang}>
        <div className="editorial-container">
          <p className="section-eyebrow">{isChinese ? '02 / 專業領域' : '02 / Expertise'}</p>
          <h2 className="editorial-heading">{isChinese ? '技能與工具' : 'Skills & tools'}</h2>

          <div className="skills-editorial-grid">
            <div>
              <h3 className="editorial-subheading">{isChinese ? '創作領域' : 'Practice'}</h3>
              <ul className="editorial-list">
                {SPECIALTIES.map((item, index) => (
                  <motion.li
                    key={item.en}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: index * 0.045 }}
                  >
                    {isChinese ? item.zh : item.en}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="tools-column">
              <h3 className="editorial-subheading">{isChinese ? '工具' : 'Tools'}</h3>
              <ul className="editorial-list">
                {TOOLS.map((tool, index) => (
                  <motion.li
                    key={tool}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                  >
                    {tool}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function ProfileSection({ lang }: { lang: 'en' | 'zh' }) {
  const isChinese = lang === 'zh'

  return (
    <section id="profile" className="editorial-section profile-section" lang={lang}>
      <div className="editorial-container">
        <p className="section-eyebrow">{isChinese ? '04 / 個人簡介' : '04 / Profile'}</p>
        <h2 className="editorial-heading">{isChinese ? '創作概覽' : 'At a glance'}</h2>

        <div className="profile-editorial-top">
          <p>
            {isChinese
              ? '目前接受自由接案與全職合作。'
              : 'Available for freelance and full-time opportunities.'}
          </p>
          <span>{isChinese ? '印度 · Kannur' : 'Kannur · India'}</span>
        </div>

        <div className="profile-editorial-facts">
          <div>
            <span>{isChinese ? '所在地' : 'Location'}</span>
            <p>{isChinese ? '印度 Kannur' : 'Kannur, India'}</p>
          </div>
          <div>
            <span>{isChinese ? '合作方式' : 'Availability'}</span>
            <p>{isChinese ? '自由接案 · 全職' : 'Freelance · Full-time'}</p>
          </div>
          <div>
            <span>{isChinese ? '專業領域' : 'Practice'}</span>
            <p>{isChinese ? '3D 藝術 · 珠寶設計' : '3D art · Jewelry design'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
