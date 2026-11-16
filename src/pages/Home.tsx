import { Link } from 'react-router-dom'
import { themes } from '../content/themes'
import { Icon } from '../components/Icons'
import {
  isCourageUnlocked,
  loadProgress,
  themeStickerCount,
  totalStickerTarget,
} from '../lib/progress'

export function Home() {
  const progress = loadProgress()
  const total = totalStickerTarget()

  return (
    <main className="page home">
      <header className="hero">
        <p className="hero__brand">好奇小勇者</p>
        <h1 className="hero__line">先問為什麼，再練習小勇氣</h1>
        <p className="hero__sub">
          六大主題任選。先收集貼紙，再挑戰勇氣。
        </p>
        <p className="hero__progress">
          貼紙 {progress.stickers.length}/{total} · 勇氣{' '}
          {progress.courageDone.length}/{themes.length}
        </p>
        <div className="hero__cta">
          <Link className="btn btn--primary" to="/book">
            我的貼紙冊
          </Link>
        </div>
        <div className="hero__glow" aria-hidden />
      </header>

      <section className="theme-grid" aria-label="選擇主題">
        {themes.map((theme) => {
          const { got, total: themeTotal } = themeStickerCount(
            theme.id,
            progress.stickers,
          )
          const courageReady = isCourageUnlocked(theme.id, progress.stickers)
          const starred = progress.courageDone.includes(theme.id)

          return (
            <Link
              key={theme.id}
              to={`/scene/${theme.id}`}
              className="theme-card"
              style={{ ['--accent' as string]: theme.accent }}
            >
              <span className="theme-card__icon" aria-hidden>
                <Icon name={theme.icon} size={40} />
              </span>
              <span className="theme-card__name">{theme.name}</span>
              <span className="theme-card__tag">{theme.tagline}</span>
              <span className="theme-card__meta">
                貼紙 {got}/{themeTotal}
                {starred
                  ? ' · 勇氣完成'
                  : courageReady
                    ? ' · 可挑戰勇氣'
                    : ''}
              </span>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
