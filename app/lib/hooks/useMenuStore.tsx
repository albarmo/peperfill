import { create } from "zustand";
import { devtools } from "zustand/middleware";
import invariant from "tiny-invariant";

const initialMenuItems = [
  { label: "Cover", href: "cover", icon: "" },
  { label: "Quotes", href: "quotes", icon: "" },
  { label: "Bride", href: "bride", icon: "" },
  { label: "Groom", href: "groom", icon: "" },
  { label: "Event", href: "event", icon: "" },
  { label: "RSVP", href: "rsvp", icon: "" },
  { label: "Gift", href: "gift", icon: "" },
  { label: "Thanks", href: "thanks", icon: "" },
];

type MenuItem = {
  label: string;
  href: string;
  icon: string;
};

export type MenuRecord = MenuItem & {
  id: string;
  createdAt: string;
  active: boolean;
};

type MenuStore = {
  menus: Record<string, MenuRecord>;
  activeMenu: MenuRecord | null;
  isInitialized: boolean;
  setActive: (id: string) => void;
  init: () => void;
};

export const useMenuStore = create<MenuStore>()(
  devtools((set, get) => ({
    menus: {},
    activeMenu: null,
    isInitialized: false,

    setActive: (id) => {
      const menu = get().menus[id];
      invariant(menu, `No menu found for ${id}`);

      const updatedMenus = Object.fromEntries(
        Object.entries(get().menus).map(([key, m]) => [
          key,
          { ...m, active: key === id },
        ])
      );

      set({
        menus: updatedMenus,
        activeMenu: updatedMenus[id],
      });
    },

    init: () => {
      if (get().isInitialized) return;

      const records: Record<string, MenuRecord> = {};
      initialMenuItems.forEach((a, i) => {
        records[a.href] = {
          id: a.href,
          label: a.label,
          href: a.href,
          icon: a.icon,
          createdAt: new Date().toISOString(),
          active: i === 0,
        };
      });
      
      const first = Object.values(records).find((m) => m.active) || null;
      set({ menus: records, activeMenu: first, isInitialized: true });
    },
  }))
);