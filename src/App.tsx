import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import Toolbar from './components/Toolbar'
import ProgressBar from './components/ProgressBar'
import TaskList from './components/TaskList'
import FooterBar from './components/FooterBar'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Filter, Priority, Task, Theme } from './types'

// 与旧版 todo.html 保持相同的 key，数据可直接沿用
const STORAGE_KEY = 'my-todo-app-tasks'
const THEME_KEY = 'my-todo-app-theme'

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, [])
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, 'light')
  const [filter, setFilter] = useState<Filter>('all')

  // 主题：切换 body.dark class
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // 筛选 + 排序：未完成在前，再按优先级 高>中>低
  const visibleTasks = useMemo(() => {
    let list = tasks.slice()
    if (filter === 'active') list = list.filter(t => !t.done)
    if (filter === 'done') list = list.filter(t => t.done)
    return list.sort(
      (a, b) =>
        Number(a.done) - Number(b.done) ||
        PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
    )
  }, [tasks, filter])

  const doneCount = useMemo(() => tasks.filter(t => t.done).length, [tasks])

  const addTask = (text: string, priority: Priority, due: string | null) => {
    setTasks(prev => [
      {
        id: Date.now() + Math.random(),
        text,
        done: false,
        priority,
        due,
        createdAt: Date.now(),
      },
      ...prev,
    ])
  }

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const editTask = (id: number, text: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, text } : t)))
  }

  const clearDone = () => {
    if (!tasks.some(t => t.done)) return
    if (confirm('确定要清除所有已完成的任务吗？')) {
      setTasks(prev => prev.filter(t => !t.done))
    }
  }

  const clearAll = () => {
    if (!tasks.length) return
    if (confirm('⚠️ 确定要清空全部任务吗？此操作不可恢复！')) {
      setTasks([])
    }
  }

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))} />
      <TaskInput onAdd={addTask} />
      <Toolbar filter={filter} onFilterChange={setFilter} total={tasks.length} done={doneCount} />
      <ProgressBar total={tasks.length} done={doneCount} />
      <TaskList
        tasks={visibleTasks}
        filter={filter}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
      <FooterBar onClearDone={clearDone} onClearAll={clearAll} />
    </div>
  )
}
