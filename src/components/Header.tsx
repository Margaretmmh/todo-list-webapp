import type { Theme } from "../types";
import { headerDateStr } from "../utils/date";
import { useToday } from "../hooks/useToday";

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  // 依赖 useToday：跨午夜时日期自动更新
  useToday();
  const dateInfo = headerDateStr();

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
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </header>
  );
}
