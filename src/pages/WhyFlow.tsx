import { Link, useNavigate, useParams } from 'react-router-dom'
import { getSpot } from '../content/themes'
import type { ThemeId } from '../content/types'
import { Icon } from '../components/Icons'
import { StickerReward } from '../components/StickerReward'
import { useAuthProgress } from '../context/AuthProgressContext'
import { isCourageUnlocked } from '../lib/progress'
import { useState } from 'react'

type Phase = 'ask' | 'interact' | 'explain' | 'sticker'

export function WhyFlow() {
  const { themeId, spotId } = useParams<{ themeId: string; spotId: string }>()
  const navigate = useNavigate()
  const { progress, markSticker } = useAuthProgress()
  const data = getSpot(themeId as ThemeId, spotId ?? '')
  const already = spotId ? progress.stickers.includes(spotId) : false

  const [phase, setPhase] = useState<Phase>('ask')
  const [picked, setPicked] = useState<string | null>(null)
  const [order, setOrder] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)
  const [latest, setLatest] = useState(progress)

  if (!data) {
    return (
      <main className="page">
        <p>找不到這個為什麼。</p>
        <Link to="/">回首頁</Link>
      </main>
    )
  }

  const { theme, spot } = data
  const step = spot.interact

  function checkPick(id: string) {
    setPicked(id)
    const opt = step.options.find((o) => o.id === id)
    if (opt?.correct) {
      setFeedback('答對了！來看為什麼吧。')
      window.setTimeout(() => setPhase('explain'), 650)
    } else {
      setFeedback(step.hint)
    }
  }

  function toggleOrder(id: string) {
    setFeedback(null)
    setOrder((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function checkOrder() {
    const expected = step.correctOrder ?? []
    const ok =
      order.length === expected.length &&
      order.every((id, i) => id === expected[i])
    if (ok) {
      setFeedback('順序對了！')
      window.setTimeout(() => setPhase('explain'), 650)
    } else {
      setFeedback(step.hint)
      setOrder([])
    }
  }

  function claimSticker() {
    const next = markSticker(spot.id)
    setLatest(next)
    setPhase('sticker')
  }

  function afterSticker() {
    if (isCourageUnlocked(theme.id, latest.stickers)) {
      navigate(`/courage/${theme.id}`)
    } else {
      navigate(`/scene/${theme.id}`)
    }
  }

  return (
    <main className="page why-page">
      <header className="topbar">
        <Link to={`/scene/${theme.id}`} className="back">
          ← 場景
        </Link>
        <div className="topbar__title">{spot.title}</div>
        <span />
      </header>

      {phase === 'ask' && (
        <section className="panel panel--ask">
          <div className="panel__icon" aria-hidden>
            <Icon name={spot.icon} size={64} />
          </div>
          <h1 className="panel__q">{spot.question}</h1>
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => setPhase('interact')}
          >
            我來找答案
          </button>
          {already && (
            <p className="muted">你已經有這張貼紙了，再玩一次也沒關係。</p>
          )}
        </section>
      )}

      {phase === 'interact' && (
        <section className="panel">
          <h2 className="panel__h">{step.prompt}</h2>

          {step.kind === 'pick' && (
            <div className="choice-list">
              {step.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`choice${picked === opt.id ? ' choice--on' : ''}`}
                  onClick={() => checkPick(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {step.kind === 'order' && (
            <>
              <p className="muted">依序點選，排出正確順序</p>
              <div className="choice-list">
                {step.options.map((opt) => {
                  const idx = order.indexOf(opt.id)
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`choice${idx >= 0 ? ' choice--on' : ''}`}
                      onClick={() => toggleOrder(opt.id)}
                    >
                      {idx >= 0 ? `${idx + 1}. ` : ''}
                      {opt.label}
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                className="btn btn--primary btn--block"
                disabled={order.length !== step.options.length}
                onClick={checkOrder}
              >
                檢查順序
              </button>
            </>
          )}

          {feedback && <p className="feedback">{feedback}</p>}
        </section>
      )}

      {phase === 'explain' && (
        <section className="panel">
          <h2 className="panel__h">原來如此</h2>
          <p className="explain">{spot.explanation}</p>
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={claimSticker}
          >
            收下貼紙
          </button>
        </section>
      )}

      {phase === 'sticker' && (
        <StickerReward
          icon={spot.icon}
          label={spot.stickerLabel}
          onContinue={afterSticker}
          continueLabel={
            isCourageUnlocked(theme.id, latest.stickers)
              ? '去勇氣挑戰'
              : '回場景繼續探索'
          }
        />
      )}
    </main>
  )
}
