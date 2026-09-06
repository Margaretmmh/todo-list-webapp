# 📝 My Todo

一个简洁美观的待办事项 Web 应用，由 React + TypeScript + Vite 构建。无需后端，数据保存在浏览器本地，开箱即用。

## ✨ 功能

- **任务管理** — 添加、编辑、勾选完成、删除任务
- **优先级** — 高 / 中 / 低三档，列表自动按「未完成在前 → 优先级从高到低」排序
- **截止日期** — 智能日期徽标（📅 今天 / 明天 / 月日），过期任务自动高亮提醒
- **筛选** — 全部 / 进行中 / 已完成 三种视图
- **进度条** — 实时展示完成进度
- **浅色 / 深色主题** — 一键切换，偏好自动记忆
- **本地持久化** — 基于 localStorage，刷新不丢失数据
- **批量清理** — 清除已完成 / 清空全部（带确认提示）

## 🛠 技术栈

| 技术 | 版本 |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Oxlint | 1 |

无路由、无状态管理库——用 React Hooks + localStorage 覆盖全部需求，保持轻量。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 本地预览构建产物
npm run preview
```

## 📁 项目结构

```
src/
├── components/
│   ├── Header.tsx        # 标题、日期、主题切换
│   ├── TaskInput.tsx     # 新任务输入（文本/优先级/截止日期）
│   ├── Toolbar.tsx       # 筛选标签与统计
│   ├── ProgressBar.tsx   # 完成进度
│   ├── TaskList.tsx      # 任务列表
│   ├── TaskItem.tsx      # 单条任务（编辑/勾选/删除）
│   └── FooterBar.tsx     # 批量清理
├── hooks/
│   └── useLocalStorage.ts  # localStorage 持久化 Hook
├── utils/
│   └── date.ts             # 日期格式化与过期判断
├── types.ts                # 类型定义
└── App.tsx                 # 状态管理与组合
```

