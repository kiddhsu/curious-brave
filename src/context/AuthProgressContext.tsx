import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import { pullAndMergeProgress, pushCloudProgress } from '../lib/cloudSync'
import { getFirebaseAuth, getFirebaseDb, isFirebaseConfigured } from '../lib/firebase'
import {
  loadProgress,
  markCourage as markCourageLib,
  markSticker as markStickerLib,
  registerCloudProgressSaver,
  resetProgress as resetProgressLib,
  type ProgressState,
} from '../lib/progress'
import type { ThemeId } from '../content/types'

type AuthProgressContextValue = {
  ready: boolean
  cloudEnabled: boolean
  user: User | null
  progress: ProgressState
  syncing: boolean
  syncError: string | null
  signInWithGoogle: () => Promise<void>
  signOutUser: () => Promise<void>
  markSticker: (spotId: string) => ProgressState
  markCourage: (themeId: ThemeId) => ProgressState
  resetProgress: () => ProgressState
  refreshProgress: () => void
}

const AuthProgressContext = createContext<AuthProgressContextValue | null>(null)

export function AuthProgressProvider({ children }: { children: ReactNode }) {
  const cloudEnabled = isFirebaseConfigured()
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())
  const [syncing, setSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  const saveTimer = useRef<number | null>(null)
  const userRef = useRef<User | null>(null)

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress())
  }, [])

  useEffect(() => {
    if (!cloudEnabled) {
      setReady(true)
      return
    }
    const auth = getFirebaseAuth()
    if (!auth) {
      setReady(true)
      return
    }

    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      userRef.current = nextUser
      setUser(nextUser)
      setSyncError(null)
      if (nextUser) {
        const db = getFirebaseDb()
        if (db) {
          try {
            setSyncing(true)
            const merged = await pullAndMergeProgress(db, nextUser.uid)
            setProgress(merged)
          } catch (err) {
            console.error(err)
            setSyncError('雲端同步失敗，先用這台的進度。')
            refreshProgress()
          } finally {
            setSyncing(false)
          }
        }
      } else {
        refreshProgress()
      }
      setReady(true)
    })

    return () => unsub()
  }, [cloudEnabled, refreshProgress])

  useEffect(() => {
    registerCloudProgressSaver((state) => {
      const u = userRef.current
      const db = getFirebaseDb()
      if (!u || !db) return
      if (saveTimer.current != null) window.clearTimeout(saveTimer.current)
      saveTimer.current = window.setTimeout(() => {
        pushCloudProgress(db, u.uid, state).catch((err) => {
          console.error(err)
          setSyncError('進度上傳失敗，已先存在這台。')
        })
      }, 800)
    })
    return () => {
      registerCloudProgressSaver(null)
      if (saveTimer.current != null) window.clearTimeout(saveTimer.current)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth()
    if (!auth) throw new Error('尚未設定 Firebase')
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    await signInWithPopup(auth, provider)
  }, [])

  const signOutUser = useCallback(async () => {
    const auth = getFirebaseAuth()
    if (auth) await signOut(auth)
    refreshProgress()
  }, [refreshProgress])

  const markSticker = useCallback((spotId: string) => {
    const next = markStickerLib(spotId)
    setProgress(next)
    return next
  }, [])

  const markCourage = useCallback((themeId: ThemeId) => {
    const next = markCourageLib(themeId)
    setProgress(next)
    return next
  }, [])

  const resetProgress = useCallback(() => {
    const next = resetProgressLib()
    setProgress(next)
    const u = userRef.current
    const db = getFirebaseDb()
    if (u && db) {
      pushCloudProgress(db, u.uid, next).catch((err) => {
        console.error(err)
        setSyncError('雲端清空失敗，這台已清空。')
      })
    }
    return next
  }, [])

  const value = useMemo<AuthProgressContextValue>(
    () => ({
      ready,
      cloudEnabled,
      user,
      progress,
      syncing,
      syncError,
      signInWithGoogle,
      signOutUser,
      markSticker,
      markCourage,
      resetProgress,
      refreshProgress,
    }),
    [
      ready,
      cloudEnabled,
      user,
      progress,
      syncing,
      syncError,
      signInWithGoogle,
      signOutUser,
      markSticker,
      markCourage,
      resetProgress,
      refreshProgress,
    ],
  )

  return (
    <AuthProgressContext.Provider value={value}>
      {children}
    </AuthProgressContext.Provider>
  )
}

export function useAuthProgress() {
  const ctx = useContext(AuthProgressContext)
  if (!ctx) {
    throw new Error('useAuthProgress 必須包在 AuthProgressProvider 內')
  }
  return ctx
}
