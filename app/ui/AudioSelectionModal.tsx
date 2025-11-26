import { Pause, Play, Search, Loader2, Music2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type FreesoundSong = {
  id: number;
  name: string;
  username: string;
  previews: {
    "preview-hq-mp3": string;
  };
};

const categories = ["Wedding", "Romantic", "Piano", "Calm", "Upbeat", "Instrumental"];

const AudioSelectionModal = ({
  isOpen,
  onClose,
  onSelect,
  currentUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentUrl: string;
}) => {
  const [previewingUrl, setPreviewingUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [searchTerm, setSearchTerm] = useState(categories[0]);
  const [activeTab, setActiveTab] = useState<"search" | "url">("search");
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [songs, setSongs] = useState<FreesoundSong[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreviewToggle = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (previewingUrl === url) {
      setPreviewingUrl(null);
      audioRef.current?.pause();
    } else {
      setPreviewingUrl(url);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    }
  };

  const searchMusic = async (e?: React.FormEvent, query?: string) => {
    e?.preventDefault();
    const queryToSearch = query || searchTerm;
    setIsLoading(true);
    setError(null);
    setPreviewingUrl(null);
    audioRef.current?.pause();

    try {
      const response = await fetch(
        `/api/pixabay-music?q=${encodeURIComponent(queryToSearch)}`
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setSongs(data.hits);
    } catch (err: any) {
      setError(err.message || "Gagal mencari musik.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category);
    searchMusic(undefined, category);
  };

  const handleCustomUrlSelect = () => {
    if (customUrlInput) {
      onSelect(customUrlInput);
    }
  };

  useEffect(() => {
    if (isOpen) {
      searchMusic();
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Pilih Musik Latar</h3>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex-1 py-3 px-1 text-center text-sm font-medium border-b-2 transition-colors ${
                activeTab === "search"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Cari Musik
            </button>
            <button
              onClick={() => setActiveTab("url")}
              className={`flex-1 py-3 px-1 text-center text-sm font-medium border-b-2 transition-colors ${
                activeTab === "url"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Gunakan URL
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {activeTab === "search" && (
            <div>
              <div className="sticky top-0 bg-white z-10 p-6 pb-4 border-b border-gray-200">
                <form onSubmit={searchMusic} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari musik (e.g., romantic piano)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button key={category} onClick={() => handleCategoryClick(category)} className={`px-3 py-1 text-sm rounded-full transition-colors ${searchTerm === category ? "bg-indigo-600 text-white font-semibold" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <audio ref={audioRef} />
              {error && <p className="text-center text-red-500 p-4">{error}</p>}
              {!isLoading && songs.length === 0 && !error && <p className="text-center text-gray-500 p-4">Tidak ada lagu yang ditemukan.</p>}
              {!isLoading && songs.length > 0 && (
                <ul className="space-y-2 p-6 pt-4">
                  {songs.map((song) => (
                    <li key={song.id} className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition-colors ${currentUrl === song.previews["preview-hq-mp3"] ? "bg-indigo-100" : previewingUrl === song.previews["preview-hq-mp3"] ? "bg-blue-100" : "hover:bg-gray-100"}`} onClick={() => onSelect(song.previews["preview-hq-mp3"])}>
                      <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                        <Music2 className="text-gray-400" size={24} />
                        <button onClick={(e) => handlePreviewToggle(e, song.previews["preview-hq-mp3"])} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                          {previewingUrl === song.previews["preview-hq-mp3"] ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <p className={`font-semibold truncate ${currentUrl === song.previews["preview-hq-mp3"] ? "text-indigo-700" : "text-gray-800"}`}>{song.name}</p>
                        <p className="text-sm text-gray-500 truncate">{song.username || "Unknown Artist"}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === "url" && (
            <div className="p-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Masukkan URL audio langsung:</p>
              <div className="flex gap-2">
                <input type="url" value={customUrlInput} onChange={(e) => setCustomUrlInput(e.target.value)} placeholder="https://example.com/audio.mp3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
                <button type="button" onClick={handleCustomUrlSelect} disabled={!customUrlInput} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex-shrink-0 disabled:bg-gray-400 disabled:cursor-not-allowed">
                  Gunakan
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">Pastikan URL yang Anda masukkan adalah tautan langsung ke file audio (misalnya, berakhiran `.mp3`, `.wav`, `.ogg`).</p>
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioSelectionModal;