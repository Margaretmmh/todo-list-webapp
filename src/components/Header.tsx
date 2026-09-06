import { useMemo } from 'react'
import type { Theme } from '../types'
import { headerDateStr } from '../utils/date'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  const dateInfo = useMemo(() => headerDateStr(), [])

  return (
    <header>
      <div>
        <h1>
          📝 我的<span>待办清单</span>
        </h1>
        <div className="date-info">{dateInfo}</div>
      </div>
      <button
        className="theme-btn"
        onClick={onToggleTheme}
        title="切换深色/浅色模式"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
