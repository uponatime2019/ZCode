import type { OAuthCachedSessionRestoreResult, UserInfo } from "@zcode/shared";

/**
 * 应用已移除账号登录，缓存会话失效时只清空本地 UI 用户态，不再弹出“重新登录”提示，
 * 也不回到登录页；模型能力统一由 API Key provider 提供。
 */
export function applyCachedOAuthSessionRestoreResult(params: {
  result: OAuthCachedSessionRestoreResult;
  setUser: (user: UserInfo | null) => void;
}): boolean {
  if (params.result.status === "authenticated") {
    params.setUser(params.result.userInfo);
    return true;
  }

  if (params.result.status === "reauthentication-required") {
    params.setUser(null);
  }

  return false;
}
