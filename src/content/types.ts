export type ThemeId =
  | 'body'
  | 'creatures'
  | 'space'
  | 'lab'
  | 'emotion'
  | 'community'

export type InteractKind = 'pick' | 'order'

export type InteractOption = {
  id: string
  label: string
  correct?: boolean
}

export type InteractStep = {
  prompt: string
  kind: InteractKind
  options: InteractOption[]
  correctOrder?: string[]
  hint: string
}

export type WhySpot = {
  id: string
  title: string
  question: string
  /** 關內分區標示（僅顯示用，不鎖關） */
  stage: 1 | 2 | 3
  x: number
  y: number
  icon: string
  stickerLabel: string
  explanation: string
  interact: InteractStep
}

export type CourageOption = {
  id: string
  label: string
  tone: 'best' | 'ok' | 'retry'
  feedback: string
}

export type CourageQuest = {
  id: string
  title: string
  situation: string
  options: CourageOption[]
}

export type ThemeWorld = {
  id: ThemeId
  name: string
  tagline: string
  icon: string
  accent: string
  sceneLabel: string
  order: number
  spots: WhySpot[]
  courage: CourageQuest
}
