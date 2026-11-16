import { doc, getDoc, setDoc, type Firestore } from 'firebase/firestore'
import type { ThemeId } from '../content/types'
import {
  loadProgress,
  mergeProgress,
  saveProgress,
  type ProgressState,
} from './progress'

/** 與一年級練習分開：curiousBrave/{uid} */
function progressRef(db: Firestore, uid: string) {
  return doc(db, 'curiousBrave', uid)
}

export async function pullAndMergeProgress(db: Firestore, uid: string) {
  const local = loadProgress()
  const snap = await getDoc(progressRef(db, uid))
  if (!snap.exists()) {
    const hasLocal =
      local.stickers.length > 0 || local.courageDone.length > 0
    if (hasLocal) {
      await pushCloudProgress(db, uid, local)
    }
    return local
  }
  const data = snap.data() as ProgressState
  const remote: ProgressState = {
    stickers: Array.isArray(data.stickers) ? data.stickers : [],
    courageDone: Array.isArray(data.courageDone)
      ? (data.courageDone as ThemeId[])
      : [],
    updatedAt: data.updatedAt,
  }
  const merged = mergeProgress(local, remote)
  saveProgress(merged, { skipCloud: true })
  await pushCloudProgress(db, uid, merged)
  return merged
}

export async function pushCloudProgress(
  db: Firestore,
  uid: string,
  state: ProgressState,
) {
  await setDoc(progressRef(db, uid), {
    stickers: state.stickers,
    courageDone: state.courageDone,
    updatedAt: state.updatedAt ?? Date.now(),
  })
}
