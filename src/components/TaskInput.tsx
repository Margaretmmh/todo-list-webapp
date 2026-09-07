import { useEffect, useRef, useState } from "react";
import type { Priority } from "../types";

interface TaskInputProps {
  onAdd: (text: string, priority: Priority, due: string | null) => void;
}

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [due, setDue] = useState("");
  const [flashError, setFlashError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 卸载时清理闪烁定时器，避免对已卸载组件 setState
  useEffect(() => {
    return () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      // 空输入：聚焦并让边框闪红 600ms（与原实现一致）
      inputRef.current?.focus();
      setFlashError(true);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashError(false), 600);
      return;
    }
    onAdd(trimmed, priority, due || null);
    setText("");
    setDue("");
    inputRef.current?.focus();
  };

  return (
    <div className="input-card">
      <div className="input-row">
        <input
          type="text"
          id="taskInput"
          ref={inputRef}
          placeholder="输入新的待办事项，按回车添加…"
          maxLength={200}
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          style={flashError ? { borderColor: "var(--danger)" } : undefined}
        />
        <button className="add-btn" onClick={addTask}>
          ＋ 添加
        </button>
      </div>
      <div className="options-row">
        <select
          title="优先级"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="medium">🟡 中优先级</option>
          <option value="high">🔴 高优先级</option>
          <option value="low">🟢 低优先级</option>
        </select>
        <input
          type="date"
          title="截止日期（可选）"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
    </div>
  );
}
