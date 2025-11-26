import FloralTheme from "@/themes/floral/index";
import SakuraTheme from "./sakura";
import ElegantoTheme from "./eleganto";

const themeComponents = {
  floral: FloralTheme,
  sakura: SakuraTheme,
  eleganto: ElegantoTheme
};

export default themeComponents;
export type ThemeComponents = typeof themeComponents