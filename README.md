# UI 设计组合

一个用于 Codex 的 UI 设计 Skill。根据用户任务，明确布局、配色、字体，并补齐组件从点击、处理中到结束与恢复的状态。

调用名：`ui-design-composer`。

## 包含什么

| 部分 | 内容 |
| --- | --- |
| 布局 | 页面骨架、信息层级、阅读模式、渐进式披露、区域组合和窄屏调整。 |
| 配色 | 8 组基础方案、颜色角色、深浅主题、交互状态与结果状态色。 |
| 字体 | 中英文字体搭配、数字与代码字体、字号、行高、字重、加载和回退。 |
| 组件状态 | 默认、焦点、按下、选中、禁用，以及提交、执行、成功、失败、取消与恢复。 |

设计时说明每项选择解决什么问题，按场景组合。已有品牌、组件规范或明确需求时，优先结合现有约定。

## 安装

把本仓库放到 Codex 的技能目录，目录名保持为 `ui-design-composer`，并确保 `SKILL.md` 位于该目录根部。

默认位置：

- Windows：`%USERPROFILE%\.codex\skills\ui-design-composer`
- macOS / Linux：`~/.codex/skills/ui-design-composer`
- 已设置 `CODEX_HOME`：`$CODEX_HOME/skills/ui-design-composer`

Windows PowerShell 首次安装示例：

```powershell
git clone https://github.com/taigeerniubi/ui-design-composer.git "$env:USERPROFILE\.codex\skills\ui-design-composer"
```

安装后可在下一轮对话中调用。

## 使用

完整页面设计：

```text
使用 $ui-design-composer 设计这个页面。明确布局、配色和中英文字体，并补齐主要操作从点击、进行中到成功、失败和恢复的状态。
```

评审已有界面：

```text
使用 $ui-design-composer 评审这个设置页。检查信息分组、字体层级、配色，以及未保存修改、保存中、成功和失败恢复，先给出调整方案。
```

专项调整：

```text
使用 $ui-design-composer 为这个工具选择配色和字体，解释候选方案的适用条件，并沿用现有布局。
```

## 文件

- [SKILL.md](SKILL.md)：技能入口与工作方式。
- [布局与模式库](references/pattern-library.md)：扫描、布局、信息组织与交互模式。
- [组合案例](references/combinations.md)：编辑器、AI 工具、官网、对比与设置等场景。
- [配色指导](references/color-system.md)：颜色角色、候选方案与状态搭配。
- [字体指导](references/typography.md)：选型、混排与排版层级。
- [组件状态](references/component-states.md)：点击、进行、结束与恢复。
- [基础配色数据](assets/color-palettes.json)：8 组可调整的原型配色。
- [配色检查脚本](scripts/check-palette-contrast.cjs)：检查数据中明确的颜色组合。

## 配色检查

在仓库目录运行，需要 Node.js：

```text
node scripts/check-palette-contrast.cjs
```

当前基础数据包含 112 项指定色对检查。检查通过表示这些色对达到脚本采用的阈值，完整页面仍需验证实际背景、字号、交互、键盘操作和组件状态。

字体文件未包含在仓库中；所需字体的官方来源与选用说明见字体指导。引用资料与设计依据保留在各参考文件中。
