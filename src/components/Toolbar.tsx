import type { Filter } from '../types'

interface ToolbarProps {
  filter: Filter
  onFilterChange: (f: Filter) => void
  total: number
  done: number
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
]

export default function Toolbar({ filter, onFilterChange, total, done }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="filters">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`filter-btn${filter === f.key ? ' active' : ''}`}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="stats">
        共 <b>{total}</b> 项 · 已完成 <b>{done}</b> 项
      </div>
    </div>
  )
}
