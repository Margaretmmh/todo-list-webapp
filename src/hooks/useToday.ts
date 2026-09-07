import { useEffect, useState } from "react";

/**
 * 返回本地时区的 YYYY-MM-DD，并在跨午夜时自动更新。
 * 让依赖"今天"的渲染（Header 日期、过期徽标）在跨日后自动刷新。
 */
export function useToday(): string {
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const [dateStr, setDateStr] = useState(today);

  useEffect(() => {
    // 计算到下一个午夜的毫秒数，定时触发更新；另加每分钟兜底
    const tick = () => setDateStr(today());
    const msToMidnight = (() => {
      const next = new Date();
      next.setHours(24, 0, 0, 0);
      return next.getTime() - Date.now();
    })();

    const midnightTimer = setTimeout(tick, msToMidnight + 500);
    const intervalTimer = setInterval(tick, 60_000);

    return () => {
      clearTimeout(midnightTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  return dateStr;
}
