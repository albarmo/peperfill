import { useMenuStore } from "../../lib/hooks/useMenuStore";

export default function CoverWidget() {
  const setActiveMenu = useMenuStore((s) => s.setActive);

  const handleOpenInvitation = async () => {
    setActiveMenu("quotes");
  };

  return (
    <div className="flex flex-col justify-between text-[#022C4F] h-full relative overflow-hidden">
      {/* SVG Filter untuk distorsi border */}
      <svg className="absolute w-0 h-0">
        <filter id="roughCoverBorder" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="1"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
        </filter>
      </svg>

      <div
        className="absolute inset-0 border-4 border-[#022C4F] pointer-events-none rounded-sm"
        style={{ filter: "url(#roughCoverBorder)" }}
      />
      {/* Bagian atas */}
      <div className="relative space-y-5 h-96">
        {/* Border overlay */}
        <div className="relative">
          <section className="p-10">
            <h3 className="text-7xl font-bold">結婚式</h3>
            <span className="text-xs font-light">The Wedding</span>
          </section>

          <section className="grid grid-cols-2 mt-6 px-10">
            <h3 className="text-2xl font-bold leading-1">
              アリ・ラマダン
              <br />
              <span className="text-xs font-light">Ari ramadan</span>
            </h3>
            <h3 className="text-2xl font-bold leading-1">
              リサ・オクタヴィアーニ
              <br />
              <span className="text-xs font-light">Lisa Oktaviani</span>
            </h3>
          </section>

          {/* Bagian bawah */}
          <div className="relative p-10">
            <section className="relative z-10 space-y-1 text-center">
              <p>23 November 2025</p>
              <p>Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <h5 className="font-semibold text-lg">Nama Tamu</h5>
            </section>
            <button
              onClick={() => handleOpenInvitation()}
              className="p-3.5 border rounded-full w-full bg-[#022C4F] border-[#F7F4EE] font-semibold text-[#F7F4EE] mt-5 hover:bg-[#F7F4EE] hover:text-[#CD3A1A] transition-all duration-300"
            >
              Buka undangan
            </button>
          </div>
        </div>
        <img
          className="w-full h-96 object-cover"
          src="/cover-art-1.png"
          alt="Art 1"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
