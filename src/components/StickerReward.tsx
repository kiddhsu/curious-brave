import { Icon } from './Icons'

type Props = {
  icon: string
  label: string
  onContinue: () => void
  continueLabel?: string
}

export function StickerReward({
  icon,
  label,
  onContinue,
  continueLabel = '繼續',
}: Props) {
  return (
    <div className="reward">
      <div className="reward__sticker" aria-hidden>
        <Icon name={icon} size={56} />
      </div>
      <h2 className="reward__title">得到貼紙！</h2>
      <p className="reward__label">{label}</p>
      <p className="reward__msg">你敢問，也看懂了。真棒！</p>
      <button type="button" className="btn btn--primary" onClick={onContinue}>
        {continueLabel}
      </button>
    </div>
  )
}
