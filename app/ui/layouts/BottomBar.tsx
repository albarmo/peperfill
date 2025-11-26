import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuRecord } from "@/data";
import { cn } from "@/lib/cn";
import { useMenuStore } from "@/lib/hooks/useMenuStore";

const BottomBar = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const menus = useMenuStore((s) => s.menus);
  const activeMenu = useMenuStore((s) => s.activeMenu);
  const setActiveMenu = useMenuStore((s) => s.setActive);

  const handleMenuClick = (
    menuId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const button = e.currentTarget;
    const nav = navRef.current;
    setActiveMenu(menuId);

    if (nav && button) {
      const scrollLeft =
        button.offsetLeft - nav.offsetWidth / 2 + button.offsetWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const preventScroll = (e: Event) => e.preventDefault();

    nav.addEventListener("wheel", preventScroll, { passive: false });
    nav.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      nav.removeEventListener("wheel", preventScroll);
      nav.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const activeButton = nav.querySelector<HTMLButtonElement>(
      `button[data-href="${activeMenu}"]`
    );
    if (activeButton) {
      const scrollLeft =
        activeButton.offsetLeft -
        nav.offsetWidth / 2 +
        activeButton.offsetWidth / 2;
      setTimeout(() => {
        nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }, 200);
    }
  }, [activeMenu]);

  return (
    <nav
      ref={navRef}
      id="bottom-bar"
      className="
        absolute bottom-0 left-0 w-full h-[10vh]
        flex overflow-x-auto items-center snap-x snap-mandatory
        bg-[#FAECC7] shadow-lg p-2.5 border-2 border-[#00254A]
        scrollbar-hide pointer-events-none relative
      "
    >
      {/* SVG Filter Definisi */}
      <svg className="absolute w-0 h-0">
        <filter id="roughBorderBar" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="1"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </svg>

      {/* Overlay Border yang Distoris */}
      <div
        className="absolute inset-0 rounded-none border-2 border-[#00254A] pointer-events-none"
        style={{
          filter: "url(#roughBorderBar)",
          clipPath: "inset(0 round 0.25rem)",
        }}
      ></div>

      {/* Isi Menu */}
      {Object.values(menus)?.map((menu: MenuRecord) => (
        <motion.button
          key={menu.href}
          data-href={menu.href}
          onClick={(event) => handleMenuClick(menu.href, event)}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: menu.href === activeMenu?.href ? 1.05 : 1,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          className={cn(
            "w-1/5 relative flex-shrink-0 aspect-square h-full flex flex-col items-center justify-center snap-center pointer-events-auto transition-colors duration-300",
            menu.href === activeMenu?.href ? "text-white" : "text-gray-700"
          )}
        >
          <AnimatePresence>
            {menu.href === activeMenu?.href && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-0 bg-[#00274A] text-[#F5E0BB] rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10">{menu?.icon as string}</div>
          <span className="relative z-10 text-base font-semibold">
            {menu.label}
          </span>
        </motion.button>
      ))}
    </nav>
  );
};

export default BottomBar;
