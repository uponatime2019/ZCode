# Login Page

启动阶段如果没有可用模型供应商配置，Root 会展示 `WelcomeScreen`。登录页只提供 API Key 登录这一种方式：应用不再提供账号登录、OAuth、Coding Plan 连接或退出登录入口。

## 入口与行为

- 启动自动引导：`WelcomeScreen`，由 provider 可用性守卫打开；没有可用 provider 时展示，保存 API Key 或点击“跳过”后关闭。
- 登录页只渲染 `LoginApiKeyForm`，不展示 OAuth provider 列表、等待态、复制登录链接、失败重试或“使用 API Key”切换按钮。
- 手动登录入口已移除：设置页/侧边栏/命令面板不再提供登录、退出登录、账号信息、奖励或分享登录入口。
- 登录内容容器：使用 `bg-background`、`border-popover-border`、`shadow-md`。

完成 API Key 保存或点击“跳过”后，登录页关闭并回到正常 Root 路由。保存成功后写入 provider 并触发 `markApiKeyLoginSuccess`；跳过只写入当前 provider family 的运行域设置，不保存 API Key。

## API Key 表单

API Key 登录表单在输入框为空时于右侧展示 `Get API Key` 外链入口；用户已经输入或回填 API Key 后隐藏该入口，避免链接占用密钥编辑空间。链接目标跟随当前选择的 provider：

- Z.ai：`https://z.ai/manage-apikey/apikey-list`
- BigModel：`https://bigmodel.cn/apikey/platform`

首次进入表单时，provider 默认值只根据当前 App 已解析的 `locale` 决定：简体中文（`zh-CN`）默认选择 BigModel，英文（`en-US`）默认选择 Z.ai。`locale` 已包含“跟随系统”语言偏好的解析结果，因此表单不再单独读取系统语言或 provider 历史配置。该规则只负责表单初始化；用户手动切换 provider 后，不得因语言广播覆盖当前选择。

外链必须通过 `IPlatformService.openExternal()` 打开，保持桌面端 shell 和 Web 端 `window.open` 行为一致。输入框仍保留密码类型和回车提交能力，链接按钮只负责跳转获取密钥，不参与保存流程。

表单底部的“跳过”链接按钮不属于登录成功后写账号态：跳过只写入当前选择 provider 对应的 `providerFamilyDomain`、`providerFamilyDomainUpdatedAt` 和 `providerFamilyDomainMigrated`，用于确认 Z.ai / BigModel 运行域；它不保存 API Key、不触发 API Key 登录成功事件，也不修改 `modelProviderFamilyModes`。

## 账号相关入口

- 侧边栏 footer 不再展示登录/退出登录、账号头像、用户名、套餐标识、用户 ID 或奖励入口；footer 菜单只保留语言、主题、缩放、用量与设置等非账号操作。
- Settings 页不再接收 `onLogin` / `onLogout` / `user`。
- 命令面板、Web 远控、奖励与营销触达不再触发 `requestLoginEntry`；需要账号的能力在这些入口中不可用，而不是弹出登录页。
- Model Provider 设置保留 API Key / 自定义 provider 的添加、编辑与删除；不再提供 Coding Plan 登录、重新连接或解绑等账号操作。
- 旧账号会话仍可被服务层恢复用于数据读取，但 UI 不提供发起登录或退出的入口。

## 启动直达

启动自动引导完成后有一个新用户直达路径：如果当前没有已打开 workspace，Root 使用 Main 注入的 conversation descriptor，必要时通过 `fileService.ensureConversationWorkspace()` 幂等确保 `<dataBaseDir>/.zcode/workspace/default` 存在。该 workspace 提供真实 cwd，但 UI 保持“未选择项目”，用户无需经过项目选择页即可直接对话。若用户跳过登录且仍没有可用模型，该草稿首页展示 `modelConfigMissing` 错误横幅，提供模型配置入口。
