import type { ThemeId } from '../content/types'
import { getTheme, themes } from '../content/themes'

const KEY = 'curious-brave-progress-v3'

export type ProgressState = {
  stickers: string[]
  courageDone: ThemeId[]
}

function empty(): ProgressState {
  return { stickers: [], courageDone: [] }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as ProgressState
    return {
      stickers: Array.isArray(parsed.stickers) ? parsed.stickers : [],
      courageDone: Array.isArray(parsed.courageDone) ? parsed.courageDone : [],
    }
  } catch {
    return empty()
  }
}

export function saveProgress(state: ProgressState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function markSticker(spotId: string): ProgressState {
  const state = loadProgress()
  if (!state.stickers.includes(spotId)) {
    state.stickers.push(spotId)
    saveProgress(state)
  }
  return state
}

export function markCourage(themeId: ThemeId): ProgressState {
  const state = loadProgress()
  if (!state.courageDone.includes(themeId)) {
    state.courageDone.push(themeId)
    saveProgress(state)
  }
  return state
}

export function themeStickerCount(themeId: ThemeId, stickers: string[]) {
  const theme = getTheme(themeId)
  if (!theme) return { got: 0, total: 0 }
  const ids = theme.spots.map((s) => s.id)
  const got = ids.filter((id) => stickers.includes(id)).length
  return { got, total: ids.length }
}

export function stageStickerCount(
  themeId: ThemeId,
  stage: 1 | 2 | 3,
  stickers: string[],
) {
  const theme = getTheme(themeId)
  if (!theme) return { got: 0, total: 0 }
  const ids = theme.spots.filter((s) => s.stage === stage).map((s) => s.id)
  const got = ids.filter((id) => stickers.includes(id)).length
  return { got, total: ids.length }
}

/** 關卡全部開放，不鎖 */
export function isThemeUnlocked(_themeId: ThemeId, _courageDone: ThemeId[]) {
  return true
}

/** 階段全部開放，不鎖 */
export function isStageUnlocked(
  _themeId: ThemeId,
  _stage: 1 | 2 | 3,
  _stickers: string[],
) {
  return true
}

export function currentStage(themeId: ThemeId, stickers: string[]): 1 | 2 | 3 {
  const s1 = stageStickerCount(themeId, 1, stickers)
  const s2 = stageStickerCount(themeId, 2, stickers)
  if (s1.got < s1.total) return 1
  if (s2.got < s2.total) return 2
  return 3
}

export function isCourageUnlocked(themeId: ThemeId, stickers: string[]) {
  const { got, total } = themeStickerCount(themeId, stickers)
  return total > 0 && got >= total
}

export function totalStickerTarget() {
  return themes.reduce((sum, t) => sum + t.spots.length, 0)
}

export function resetProgress() {
  saveProgress(empty())
  return empty()
}
