import type { Task } from '../types'

/** 返回本地时区的 YYYY-MM-DD */
export function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 任务是否已过期（有截止日期、未完成、且早于今天） */
export function isOverdue(task: Task): boolean {
  return !!task.due && !task.done && task.due < todayStr()
}

/** 格式化日期徽标：今天 / 明天 / M月D日 */
export function formatDate(str: string): string {
  const [, m, d] = str.split('-')
  if (str === todayStr()) return '📅 今天'
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`
  if (str === tStr) return '📅 明天'
  return `📅 ${m}月${d}日`
}

/** 头部日期：YYYY年M月D日 星期X */
export function headerDateStr(): string {
  const now = new Date()
  const week = ['日', '一', '二', '三', '四', '五', '六']
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${week[now.getDay()]}`
}
