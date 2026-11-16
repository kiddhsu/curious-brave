import { useState } from 'react'
import { useAuthProgress } from '../context/AuthProgressContext'

export function AuthBar() {
  const {
    ready,
    cloudEnabled,
    user,
    syncing,
    syncError,
    signInWithGoogle,
    signOutUser,
  } = useAuthProgress()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!ready) {
    return <p className="auth-bar auth-bar--muted">載入中…</p>
  }

  if (!cloudEnabled) {
    return (
      <p className="auth-bar auth-bar--muted">
        尚未設定雲端，進度只存在這台裝置。
      </p>
    )
  }

  const onSignIn = async () => {
    setBusy(true)
    setError(null)
    try {
      await signInWithGoogle()
    } catch {
      setError('登入失敗，請再試一次。')
    } finally {
      setBusy(false)
    }
  }

  const onSignOut = async () => {
    setBusy(true)
    setError(null)
    try {
      await signOutUser()
    } catch {
      setError('登出失敗。')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-bar">
      {user ? (
        <button
          type="button"
          className="btn btn--ghost auth-bar__btn"
          disabled={busy || syncing}
          onClick={onSignOut}
        >
          {syncing ? '同步中…' : '登出'}
        </button>
      ) : (
        <>
          <span className="auth-bar__user">登入可跨裝置保存進度</span>
          <button
            type="button"
            className="btn btn--primary auth-bar__btn"
            disabled={busy}
            onClick={onSignIn}
          >
            Google 登入
          </button>
        </>
      )}
      {(error || syncError) && (
        <p className="auth-bar__error">{error || syncError}</p>
      )}
    </div>
  )
}
