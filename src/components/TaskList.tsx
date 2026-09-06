import type { Filter, Task } from '../types'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  filter: Filter
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, text: string) => void
}

const EMPTY_STATE: Record<Filter, { icon: string; text: string }> = {
  all: { icon: '🎉', text: '暂无待办事项，享受当下吧！' },
  active: { icon: '🎉', text: '所有任务都完成了，太棒了！' },
  done: { icon: '🤔', text: '还没有已完成的任务' },
}

export default function TaskList({ tasks, filter, onToggle, onDelete, onEdit }: TaskListProps) {
  return (
    <>
      <ul>
        {tasks.map(t => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
      {tasks.length === 0 && (
        <div className="empty">
          <div className="icon">{EMPTY_STATE[filter].icon}</div>
          <div>{EMPTY_STATE[filter].text}</div>
        </div>
      )}
    </>
  )
}
