import type { ThemeId, ThemeWorld } from '../types'
import { bodyTheme } from './body'
import { communityTheme } from './community'
import { creaturesTheme } from './creatures'
import { emotionTheme } from './emotion'
import { labTheme } from './lab'
import { spaceTheme } from './space'

export const themes: ThemeWorld[] = [
  bodyTheme,
  creaturesTheme,
  spaceTheme,
  labTheme,
  emotionTheme,
  communityTheme,
].sort((a, b) => a.order - b.order)

export function getTheme(id: ThemeId): ThemeWorld | undefined {
  return themes.find((t) => t.id === id)
}

export function getSpot(themeId: ThemeId, spotId: string) {
  const theme = getTheme(themeId)
  if (!theme) return undefined
  const spot = theme.spots.find((s) => s.id === spotId)
  if (!spot) return undefined
  return { theme, spot }
}
