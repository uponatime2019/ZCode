# Workspace Sidebar Footer

## 目标

统一 workspace 侧边栏与 Settings 侧边栏底部的入口行为，避免两处入口不一致。

## 当前行为

- footer 不再展示账号头像、用户名、账号 ID、套餐标识、登录或退出登录入口；应用只支持 API Key 登录，账号登录相关 UI 已移除。
- 设置按钮打开统一的下拉菜单，包含语言、主题、缩放（桌面端）、用量与升级/续费入口。
- 在 Settings 侧边栏底部复用同一个 footer 组件，但菜单里不再重复展示“设置”入口。
- 收到宿主 `update-ready` 事件后，设置按钮左侧会显示一颗 `Update` 按钮。
- Coding Plan `Usage Remaining` 不出现在 footer 菜单中，保留在 Usage 页和聊天输入框 context 浮层，避免同一信息形成重复入口。
- 桌面端远程控制入口（`WorkspaceWebRemoteControlTrigger`）保持原位置与行为，不依赖账号登录。

## 验收

- 未配置 API Key 的用户不会在 footer 看到登录/账号入口。
- footer 菜单只包含语言、主题、缩放、用量与升级/续费、设置等非账号操作。
- Settings 与 workspace 侧边栏复用同一 footer 时表现一致。
- 桌面和手机 Web、Zai Light 和 Zai Dark 均保持一致行为。

## 实现位置

- 账号区组件：`packages/ui/src/WorkspaceSidebarFooter.tsx`
- Settings 侧边栏挂载：`packages/ui/src/SettingsPage.tsx`
- 用量展示：`packages/ui/src/WorkspaceSidebarFooterUsageSummary.tsx`
