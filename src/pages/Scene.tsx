import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTheme } from '../content/themes'
import type { ThemeId } from '../content/types'
import { Hotspot } from '../components/Hotspot'
import { Icon } from '../components/Icons'
import { useAuthProgress } from '../context/AuthProgressContext'
import {
  isCourageUnlocked,
  stageStickerCount,
  themeStickerCount,
} from '../lib/progress'

export function Scene() {
  const { themeId } = useParams<{ themeId: string }>()
  const navigate = useNavigate()
  const { progress } = useAuthProgress()
  const theme = getTheme(themeId as ThemeId)

  if (!theme) {
    return (
      <main className="page">
        <p>找不到這個世界。</p>
        <Link to="/">回首頁</Link>
      </main>
    )
  }

  const { got, total } = themeStickerCount(theme.id, progress.stickers)
  const courageReady = isCourageUnlocked(theme.id, progress.stickers)
  const courageDone = progress.courageDone.includes(theme.id)

  return (
    <main className="page scene-page">
      <header className="topbar">
        <Link to="/" className="back">
          ← 地圖
        </Link>
        <div className="topbar__title">
          <Icon name={theme.icon} size={22} /> {theme.name}
        </div>
        <div className="topbar__stat">
          {got}/{total}
        </div>
      </header>

      <div className="stage-bar" aria-label="題目分區">
        {([1, 2, 3] as const).map((s) => {
          const count = stageStickerCount(theme.id, s, progress.stickers)
          return (
            <div key={s} className="stage-pill stage-pill--open">
              區 {s} · {count.got}/{count.total}
            </div>
          )
        })}
      </div>

      <p className="scene-hint">
        {theme.sceneLabel}：先收集貼紙，再挑戰勇氣
      </p>

      <div
        className="scene"
        style={{ ['--accent' as string]: theme.accent }}
        data-theme={theme.id}
      >
        <div className="scene__art" aria-hidden>
          <div className="scene__sun" />
          <div className="scene__hill scene__hill--a" />
          <div className="scene__hill scene__hill--b" />
          <div className="scene__prop scene__prop--1" />
          <div className="scene__prop scene__prop--2" />
        </div>

        {theme.spots.map((spot) => {
          const done = progress.stickers.includes(spot.id)
          return (
            <Hotspot
              key={spot.id}
              x={spot.x}
              y={spot.y}
              icon={done ? 'star' : 'question'}
              label={spot.question}
              done={done}
              onClick={() => navigate(`/why/${theme.id}/${spot.id}`)}
            />
          )
        })}
      </div>

      <div className="scene-actions">
        {courageReady ? (
          <Link
            className={`btn ${courageDone ? 'btn--ghost' : 'btn--accent'} btn--block`}
            to={`/courage/${theme.id}`}
          >
            {courageDone ? '再玩一次勇氣挑戰' : '集滿了！去勇氣挑戰'}
          </Link>
        ) : (
          <p className="scene-lock">
            已收集 {got}/{total} 張貼紙，集滿後可挑戰勇氣
          </p>
        )}
      </div>
    </main>
  )
}
