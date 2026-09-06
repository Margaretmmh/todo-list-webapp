interface FooterBarProps {
  onClearDone: () => void
  onClearAll: () => void
}

export default function FooterBar({ onClearDone, onClearAll }: FooterBarProps) {
  return (
    <div className="footer-bar">
      <button className="clear-btn" onClick={onClearDone}>
        🗑 清除已完成
      </button>
      <button className="clear-btn" onClick={onClearAll}>
        ⚠️ 清空全部
      </button>
    </div>
  )
}
