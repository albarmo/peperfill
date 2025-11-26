import { useNavigate } from "@remix-run/react";
import { X, Search } from "lucide-react";
import { themeRegistry } from "@/themes/registry";
import { useState, useMemo } from "react";

type ThemeSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentThemeName: string;
};

const ThemeSelectionModal = ({ isOpen, onClose, currentThemeName }: ThemeSelectionModalProps) => {
  const navigate = useNavigate();
  const allThemes = useMemo(() => Object.values(themeRegistry).map(({ component, ...theme }) => theme), []);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = useMemo(() => {
    const themeCategories = allThemes.map(theme => theme.category || "Lainnya");
    return ["Semua", ...Array.from(new Set(themeCategories))];
  }, [allThemes]);

  const filteredThemes = useMemo(() => {
    return allThemes.filter(theme => {
      const matchesCategory = activeCategory === "Semua" || (theme.category || "Lainnya") === activeCategory;
      const matchesSearch = theme.displayName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allThemes, activeCategory, searchTerm]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleThemeSelect = (themeName: string) => {
    navigate(`/create/${themeName.toLowerCase()}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-800">Pilih Tema Lain</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        {/* Filter and Search Section */}
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama tema..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category} onClick={() => handleCategoryClick(category)} className={`px-4 py-1.5 text-sm rounded-full transition-colors ${activeCategory === category ? "bg-indigo-600 text-white font-semibold" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredThemes.length > 0 ? filteredThemes.map((theme) => (
              <div
                key={theme.name}
                className={`rounded-md overflow-hidden border-2 transition-all cursor-pointer group ${
                  theme.name.toLowerCase() === currentThemeName.toLowerCase()
                    ? "border-indigo-500 ring-2 ring-indigo-300"
                    : "border-gray-200 hover:border-indigo-400 hover:shadow-lg"
                }`}
                onClick={() => handleThemeSelect(theme.name)}
              >
                <img src={theme?.previewUrl} alt={theme.displayName} className="w-full h-auto object-cover aspect-[9/16] group-hover:opacity-90 transition-opacity" />
                <div className="p-3 bg-gray-50"><h4 className="font-semibold text-sm text-gray-800 text-center truncate">{theme.displayName}</h4></div>
              </div>
            )) : (
              <p className="col-span-full text-center text-gray-500 mt-8">Tidak ada tema yang cocok dengan kriteria pencarian.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelectionModal;