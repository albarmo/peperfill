const QuoteWidget = () => {
  return (
    <div className="relative">
      {/* SVG Filter */}
      <div className="p-1.5">
        <svg className="absolute w-0 h-0">
          <filter id="roughBorder" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
          </filter>
        </svg>

        <section className="relative p-8 text-center rounded">
          {/* Layer Border Distorted */}
          <div
            className="absolute inset-0 rounded pointer-events-none"
            style={{
              border: "4px solid #022C4F",
              filter: "url(#roughBorder)",
              clipPath: "inset(0 round 0.25rem)",
            }}
          ></div>

          {/* Text content */}
          <div className="relative">
            <p className="text-[#022C4F] font-semibold leading-relaxed">
              Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
              pasangan-pasangan untukmu dari jenismu sendiri, agar kamu
              cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di
              antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu
              benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang
              berpikir.
            </p>
            <p className="text-[#C63A1A] mt-4 italic font-semibold">
              Surah Ar-Rum : 21
            </p>
          </div>
        </section>
      </div>
      <img
        className="w-full"
        src="/art-2.png"
        alt="Art 1"
        width={190}
        height={190}
      />
    </div>
  );
};

export default QuoteWidget;
