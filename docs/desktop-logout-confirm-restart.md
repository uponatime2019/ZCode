# Desktop Logout Confirmation And Restart（已停用）

应用已移除账号登录 / 退出登录 UI：侧边栏 footer、设置页和命令面板不再提供退出登录入口，因此本文描述的确认与重启流程不再由用户触发。

## 当前行为

- `useRootWorkspaceActions` 内部仍保留 `oauthService.logout()` 清理能力，但没有 UI 入口调用。
- 账号会话失效只清空本地 `user` 展示态，不重启 App、不进入登录页。
- 模型能力统一由 API Key provider 提供；provider 的添加、编辑和删除在 Model settings 完成。
- 若后续需要恢复账号退出流程，必须先重新引入登录入口并更新 [登录页规格](../ui/login-page.md)。
