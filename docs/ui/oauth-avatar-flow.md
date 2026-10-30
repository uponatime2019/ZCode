# OAuth 头像接入（已停用）

应用已移除账号 / OAuth 登录 UI：侧边栏 footer 不再展示头像、用户名、套餐标识或用户 ID。

## 当前状态

- `WorkspaceSidebarFooter` 只保留偏好、语言、主题、缩放、用量与升级入口，不再渲染 `AvatarImage`。
- OAuth provider 的 `fetchUserInfo()`、`OAuthUserProfile.avatarUrl` 与 `UserInfo.avatarUrl` 数据仍由服务层保留，用于读取历史缓存会话；UI 不消费头像。
- 新 provider 若仍需账号能力，只通过后端数据流接入，不得重新在登录页或 footer 增加账号入口。
