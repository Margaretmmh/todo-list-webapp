export type Priority = 'high' | 'medium' | 'low'

export type Filter = 'all' | 'active' | 'done'

export type Theme = 'light' | 'dark'

export interface Task {
  id: number
  text: string
  done: boolean
  priority: Priority
  due: string | null
  createdAt: number
}
