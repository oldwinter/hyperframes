# HyperFrames 中文化档案

同步上游后先读本档案，再处理新增或变更内容。

## 项目定位

- 上游项目：`heygen-com/hyperframes`
- 中文 fork：`oldwinter/hyperframes`
- 当前同步上游 commit：`d09145faa`（v0.8.4）
- 上游许可：Apache-2.0
- 主要安装面：skills CLI、Claude/Codex plugin、HyperFrames CLI
- 中文 runtime 入口：`skills/` 下的 20 个 runtime skill

## 中文化目标

HyperFrames 的 HTML、timing、seek-safe、render、媒体和 CLI 契约必须保持精确。每个 `skills/*/SKILL.md` 在英文正文前提供中文执行导读；代码、命令、参数、JSON/YAML key、CSS/HTML 标记、路径、注册表名称和验证阈值不翻译。上游英文正文、references 与产品文档继续作为权威技术契约。

本批同步 v0.7.109 → v0.8.4：吸收上游 Studio、catalog、render、CLI、registry、脚本和
测试更新，并为新增或变更的 runtime 入口保留中文执行导读；上游英文正文、references、
changelog 和 release 明细继续作为权威技术契约保留。

## 安装与交付

```bash
npx skills add oldwinter/hyperframes --full-depth
codex plugin marketplace add oldwinter/hyperframes
```

安装后 runtime 从中文 fork 的 `skills/` 读取导读和正文；这是中文化的 Agent skill 入口，不改写 HyperFrames 的 npm 包名或产品网站。

## 同步后检查

- `git diff --check`
- `rg -n '^(<<<<<<<|=======|>>>>>>>)$' .`
- JSON plugin manifest 校验
- `bun run lint:skills` 或等价的 runtime skill 校验
- 20 个 `skills/*/SKILL.md` 均包含中文导读，且 skill mirror/目录结构保持一致
