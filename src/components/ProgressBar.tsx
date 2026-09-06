interface ProgressBarProps {
  total: number
  done: number
}

export default function ProgressBar({ total, done }: ProgressBarProps) {
  const percent = total ? (done / total) * 100 : 0
  return (
    <div className="progress-wrap">
      <div className="progress-bar" style={{ width: `${percent}%` }} />
    </div>
  )
}
