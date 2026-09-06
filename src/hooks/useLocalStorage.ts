import { useEffect, useState } from 'react'

/**
 * 与 localStorage 同步的 state。
 * 初始值惰性从 localStorage 读取（parse 失败时用 fallback），
 * 之后每次 state 变化都会写回。
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
