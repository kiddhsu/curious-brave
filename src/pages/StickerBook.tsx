import { Link } from 'react-router-dom'
import { themes } from '../content/themes'
import { Icon } from '../components/Icons'
import { useAuthProgress } from '../context/AuthProgressContext'
import { totalStickerTarget } from '../lib/progress'

export function StickerBook() {
  const { progress, resetProgress } = useAuthProgress()
  const total = totalStickerTarget()

  return (
    <main className="page book-page">
      <header className="topbar">
        <Link to="/" className="back">
          ← 地圖
        </Link>
        <div className="topbar__title">我的貼紙冊</div>
        <span />
      </header>

      <p className="book-lead">
        貼紙 {progress.stickers.length}／{total} · 勇氣完成{' '}
        {progress.courageDone.length}／{themes.length}
      </p>

      {themes.map((theme) => {
        const starred = progress.courageDone.includes(theme.id)
        return (
          <section key={theme.id} className="book-section">
            <h2 className="book-section__h">
              <Icon name={theme.icon} size={24} /> {theme.name}{' '}
              {starred && <Icon name="star" size={18} />}
            </h2>
            <div className="sticker-grid sticker-grid--nine">
              {theme.spots.map((spot) => {
                const got = progress.stickers.includes(spot.id)
                return (
                  <div
                    key={spot.id}
                    className={`sticker-slot${got ? ' sticker-slot--got' : ''}`}
                  >
                    <span className="sticker-slot__icon" aria-hidden>
                      <Icon name={got ? spot.icon : 'question'} size={28} />
                    </span>
                    <span className="sticker-slot__label">
                      {got ? spot.stickerLabel : `區${spot.stage}`}
                    </span>
                  </div>
                )
              })}
            </div>
            <Link className="text-link" to={`/scene/${theme.id}`}>
              去 {theme.name}
            </Link>
          </section>
        )
      })}

      <button
        type="button"
        className="btn btn--ghost btn--block"
        onClick={() => {
          if (window.confirm('確定要清空進度嗎？登入時雲端也會一起清空。')) {
            resetProgress()
          }
        }}
      >
        清空進度
      </button>
    </main>
  )
}
