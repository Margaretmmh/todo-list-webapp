import { useEffect, useRef, useState } from "react";
import type { Task } from "../types";
import { formatDate, isOverdue } from "../utils/date";
import { useToday } from "../hooks/useToday";

const PRIORITY_LABEL: Record<Task["priority"], string> = {
  high: "高",
  medium: "中",
  low: "低",
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  // 对应原实现的 finished 标志：Enter/blur 可能先后触发，只允许提交一次
  const finishedRef = useRef(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  // 进入编辑模式时聚焦输入框并将光标置末尾（避免内联 ref 导致每次重渲染重置）
  useEffect(() => {
    if (editing) {
      editInputRef.current?.focus();
      editInputRef.current?.setSelectionRange(draft.length, draft.length);
    }
  }, [editing, draft]);

  const startEdit = () => {
    setDraft(task.text);
    finishedRef.current = false;
    setEditing(true);
  };

  const finish = (commit: boolean) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const val = draft.trim();
    if (commit && val) onEdit(task.id, val);
    setEditing(false);
  };

  const overdue = isOverdue(task);
  // 依赖 useToday：跨午夜时过期徽标与日期标签自动刷新
  useToday();

  return (
    <li className={`task-item p-${task.priority}${task.done ? " done" : ""}`}>
      <button
        className="checkbox"
        title={task.done ? "标记为未完成" : "标记为已完成"}
        onClick={() => onToggle(task.id)}
      >
        ✓
      </button>

      <div className="task-content">
        {editing ? (
          <input
            className="task-edit-input"
            value={draft}
            maxLength={200}
            ref={editInputRef}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") finish(true);
              if (e.key === "Escape") finish(false);
            }}
            onBlur={() => finish(true)}
          />
        ) : (
          <div className="task-text" title="双击编辑" onDoubleClick={startEdit}>
            {task.text}
          </div>
        )}
        <div className="task-meta">
          <span className={`badge ${task.priority}`}>
            {PRIORITY_LABEL[task.priority]}优先级
          </span>
          {task.due && (
            <span className={`badge ${overdue ? "overdue" : "date"}`}>
              {overdue
                ? "⚠️ 已过期 " + formatDate(task.due).slice(2)
                : formatDate(task.due)}
            </span>
          )}
        </div>
      </div>

      <div className="actions">
        <button className="icon-btn" title="编辑" onClick={startEdit}>
          ✏️
        </button>
        <button
          className="icon-btn"
          title="删除"
          onClick={() => onDelete(task.id)}
        >
          🗑
        </button>
      </div>
    </li>
  );
}
