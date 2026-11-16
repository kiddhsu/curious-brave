import { Icon } from './Icons'

type Props = {
  x: number
  y: number
  icon: string
  label: string
  done?: boolean
  locked?: boolean
  onClick: () => void
}

export function Hotspot({
  x,
  y,
  icon,
  label,
  done,
  locked,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`hotspot${done ? ' hotspot--done' : ''}${locked ? ' hotspot--locked' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
      aria-label={label}
      disabled={locked}
    >
      <span className="hotspot__pulse" aria-hidden />
      <Icon name={icon} className="hotspot__icon" size={32} />
    </button>
  )
}
