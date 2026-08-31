# HyperFrames 中文化档案

同步上游后先读本档案，再处理新增或变更内容。

## 项目定位

- 上游项目：`heygen-com/hyperframes`
- 中文 fork：`oldwinter/hyperframes`
- 当前同步上游 commit：`5b45bcc16ddc1308fdbadef81f436e56bbc1d559`（upstream/main，v0.8.20 之后的 main）
- 上游许可：Apache-2.0
- 主要安装面：skills CLI、Claude/Codex plugin、HyperFrames CLI
- 中文 runtime 入口：`skills/` 下的 20 个 runtime skill

## 中文化目标

HyperFrames 的 HTML、timing、seek-safe、render、媒体和 CLI 契约必须保持精确。每个 `skills/*/SKILL.md` 在英文正文前提供中文执行导读；代码、命令、参数、JSON/YAML key、CSS/HTML 标记、路径、注册表名称和验证阈值不翻译。上游英文正文、references 与产品文档继续作为权威技术契约。

本批从 v0.8.10 同步至 upstream/main：吸收 v0.8.11-v0.8.20 的音频分组、group bus、FX
rack、automation、Studio timeline、render、CLI、lint、字体本地化、WebMCP 和可靠性更新，
以及 release 后的 Studio agent control、runtime fail-closed/rebind 和 handwritten registry
block。多个 voice clip 必须先归入纯 voiceover group，再由 carve 引用 group id；新增中文
执行导读明确了这一约束。上游英文正文、references、changelog 和 release 明细继续作为
权威技术契约保留。

## 安装与交付

```bash
npx skills add oldwinter/hyperframes
codex plugin marketplace add oldwinter/hyperframes
```

安装后 runtime 从中文 fork 的 `skills/` 读取导读和正文；这是中文化的 Agent skill 入口，不改写 HyperFrames 的 npm 包名或产品网站。

## 同步后检查

- `git diff --check`
- `rg -n '^(<<<<<<<|=======|>>>>>>>)$' .`
- JSON plugin manifest 校验
- `bun run lint:skills` 或等价的 runtime skill 校验
- 20 个 `skills/*/SKILL.md` 均包含中文导读，且 skill mirror/目录结构保持一致
