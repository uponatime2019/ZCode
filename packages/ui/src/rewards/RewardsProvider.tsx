import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { buildRewardsUrl, resolveRewardsOrigin, ZCODE_ENV } from "@zcode/shared";
import { usePlatform } from "@/hooks/usePlatform.js";
import { useZCodeIntl } from "@/i18n/IntlProvider.js";
import { useZCodeStore } from "@/store/StoreProvider.js";
import { resolveTheme } from "@/useTheme.js";
import { RewardsWebview } from "@/rewards/RewardsWebview.js";

const RewardsContext = createContext<(() => Promise<void>) | null>(null);
export const useOpenRewards = () => useContext(RewardsContext);
export function RewardsProvider({
  children,
  desktop,
}: {
  children: ReactNode;
  desktop: boolean;
}) {
  const [opened, setOpened] = useState(false);
  const platform = usePlatform();
  const { locale } = useZCodeIntl();
  const theme = useZCodeStore((s) => s.theme);
  const user = useZCodeStore((s) => s.user);
  const openPage = useCallback(async () => {
    if (desktop) setOpened(true);
    else
      await platform.openExternal(
        buildRewardsUrl(
          resolveRewardsOrigin({ env: ZCODE_ENV }),
          locale,
          resolveTheme(theme) === "dark" ? "zai-dark" : "zai-light",
        ),
      );
  }, [desktop, platform, locale, theme]);
  const open = useCallback(async () => {
    // 应用已移除账号登录：奖励页依赖账号态，未登录时不再拉起登录入口。
    if (!user) return;
    await openPage();
  }, [user, openPage]);
  return (
    <RewardsContext.Provider value={open}>
      {children}
      {opened && <RewardsWebview onClose={() => setOpened(false)} />}
    </RewardsContext.Provider>
  );
}
