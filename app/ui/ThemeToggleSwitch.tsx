import { Sun, Moon } from "lucide-react";

interface ThemeToggleSwitchProps {
  appearance: "light" | "dark";
  onToggle: () => void;
}

export function ThemeToggleSwitch({ appearance, onToggle }: ThemeToggleSwitchProps) {
  const isLight = appearance === "light";

  return (
    <button
      onClick={onToggle}
      className={`relative w-20 h-10 p-1.5 flex items-center justify-between rounded-full transition-colors duration-300 ${
        isLight ? "bg-gray-200" : "bg-gray-700"
      }`}
      title="Toggle Light/Dark Mode"
    >
      {/* Sun & Moon icons */}
      <Sun
        className={`w-5 h-5 transition-colors duration-300 ${
          isLight ? "text-yellow-500" : "text-gray-400"
        }`}
      />
      <Moon
        className={`w-5 h-5 transition-colors duration-300 ${
          !isLight ? "text-indigo-400" : "text-gray-400"
        }`}
      />

      {/* Knob */}
      <span
        className={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          isLight ? "translate-x-0" : "translate-x-10"
        }`}
      />
    </button>
  );
}
