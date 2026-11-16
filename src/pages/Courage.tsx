import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTheme, themes } from '../content/themes'
import type { ThemeId } from '../content/types'
import { Icon } from '../components/Icons'
import { useAuthProgress } from '../context/AuthProgressContext'
import { isCourageUnlocked } from '../lib/progress'
import { useState } from 'react'

export function Courage() {
  const { themeId } = useParams<{ themeId: string }>()
  const navigate = useNavigate()
  const { progress, markCourage } = useAuthProgress()
  const theme = getTheme(themeId as ThemeId)
  const [chosen, setChosen] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [doneCount, setDoneCount] = useState(progress.courageDone.length)

  if (!theme) {
    return (
      <main className="page">
        <p>找不到挑戰。</p>
        <Link to="/">回首頁</Link>
      </main>
    )
  }

  if (!isCourageUnlocked(theme.id, progress.stickers)) {
    return (
      <main className="page">
        <p>先收集完這個主題的貼紙，再來挑戰勇氣喔。</p>
        <Link className="btn btn--primary" to={`/scene/${theme.id}`}>
          回場景
        </Link>
      </main>
    )
  }

  const quest = theme.courage
  const selected = quest.options.find((o) => o.id === chosen)

  function onPick(id: string) {
    setChosen(id)
    const opt = quest.options.find((o) => o.id === id)
    if (!opt) return
    if (opt.tone === 'retry') {
      setDone(false)
      return
    }
    const next = markCourage(theme!.id)
    setDoneCount(next.courageDone.length)
    setDone(true)
  }

  return (
    <main className="page courage-page">
      <header className="topbar">
        <Link to={`/scene/${theme.id}`} className="back">
          ← 場景
        </Link>
        <div className="topbar__title">勇氣挑戰</div>
        <span />
      </header>

      <section className="panel">
        <div className="panel__icon" aria-hidden>
          <Icon name="star" size={56} />
        </div>
        <h1 className="panel__h">{quest.title}</h1>
        <p className="explain">{quest.situation}</p>

        <div className="choice-list">
          {quest.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice${chosen === opt.id ? ' choice--on' : ''}`}
              onClick={() => onPick(opt.id)}
              disabled={done && selected?.tone !== 'retry'}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {selected && (
          <div
            className={`courage-feedback courage-feedback--${selected.tone}${done ? ' courage-feedback--pop' : ''}`}
          >
            <p>{selected.feedback}</p>
            {selected.tone === 'retry' && (
              <p className="muted">再選一次，沒關係。</p>
            )}
            {done && (
              <>
                <div className="star-pop" aria-hidden>
                  <Icon name="star" size={48} />
                </div>
                <p className="reward__msg">
                  「{theme.name}」勇氣完成！
                  {doneCount >= themes.length
                    ? '全部主題勇氣都完成了！'
                    : '還可以去其他主題探險。'}
                </p>
                <button
                  type="button"
                  className="btn btn--primary btn--block"
                  onClick={() => navigate('/')}
                >
                  回地圖繼續玩
                </button>
                <button
                  type="button"
                  className="btn btn--ghost btn--block"
                  onClick={() => navigate('/book')}
                >
                  去貼紙冊看看
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </main>
  )
}
