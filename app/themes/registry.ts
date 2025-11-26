import FloralTheme from "./floral/index";
import FloralConfig, { FloralConfigType } from "./floral/config";
import SakuraThemeConfig, { SakuraThemeConfigType } from "./sakura/config";
import SakuraTheme from "./sakura";
import ElegantoThemeConfig, { ElegantoThemeConfigType } from "./eleganto/config";
import ElegantoTheme from "./eleganto";

export const themeRegistry = {
  floral: {
    displayName: "Floral",
    name: "floral",
    component: FloralTheme,
    config: FloralConfig,
  },
  sakura: {
    displayName: "Sakura",
    name: "sakura",
    component: SakuraTheme,
    config: SakuraThemeConfig,
  },
  timeless: {
    displayName: "Eleganto",
    name: "eleganto",
    component: ElegantoTheme,
    config: ElegantoThemeConfig,
  },
};

export type ThemeComponentProps = {
  config: FloralConfigType | SakuraThemeConfigType | ElegantoThemeConfigType;
  data: Record<string, any>;
};
