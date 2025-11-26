import React, { useState, useRef, useEffect } from "react";
import { Invitation } from "@prisma/client";
import { motion, AnimatePresence, wrap } from "framer-motion";
import {
  Flower,
  Send,
  Globe,
  Instagram,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  Gem,
  MapPin,
} from "lucide-react";
import FloralConfig, { FloralConfigType } from "./config";
import { Editable } from "@/ui/Editable";

type Props = {
  data: Pick<
    Invitation,
    | "title"
    | "bride"
    | "groom"
    | "eventDate"
    | "location"
    | "slug"
    | "description"
  > & {
    config: FloralConfigType;
  };
  config: FloralConfigType;
};

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return;
    }

    timerComponents.push(
      <div
        key={interval}
        className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 w-20 h-20 justify-center shadow-lg"
      >
        <span className="text-3xl font-semibold">
          {timeLeft[interval as keyof typeof timeLeft]}
        </span>
        <span className="text-xs uppercase tracking-wider opacity-75">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-xl italic">The day is here!</span>
      )}
    </div>
  );
};

export default function FloralTheme({ data }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [wishes, setWishes] = useState([
    { name: "Sahabat", message: "Selamat menempuh hidup baru! Semoga samawa." },
    {
      name: "Keluarga",
      message: "Bahagia dan langgeng selalu untuk kalian berdua.",
    },
  ]);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("Tamu");
  const config = data.config || FloralConfig;

  const imageIndex = wrap(0, config.images.closingCarousel.length, carouselIndex);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get("to");
    if (toParam) {
      setGuestName(toParam);
    }

    const timer = setTimeout(() => setCarouselIndex(carouselIndex + 1), 4000);
    return () => clearTimeout(timer);
  }, [carouselIndex]);

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWish.name && newWish.message) {
      setWishes([newWish, ...wishes]);
      setNewWish({ name: "", message: "" });
    }
  };

  const date = new Date(data.eventDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = config.images.gallery.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % config.images.gallery.length;
    setSelectedImage(config.images.gallery[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = config.images.gallery.indexOf(selectedImage);
    const prevIndex =
      (currentIndex - 1 + config.images.gallery.length) % config.images.gallery.length;
    setSelectedImage(config.images.gallery[prevIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-serif relative overflow-hidden">
      <audio
        ref={audioRef}
        src={config.audioUrl}
        loop
      />
      <div
        className="hidden md:flex flex-1 flex-col items-start justify-end text-left relative p-8 bg-cover bg-center"
        style={{
          backgroundImage: `url('${config.backgrounds.leftSide}')`,
          color: "#fff",
          filter: "grayscale(100%)",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="relative z-10">
          <p className="uppercase text-xs tracking-widest mb-3 opacity-90">
            The Wedding Of
          </p>
          <h1 className="text-4xl md:text-5xl font-[Cormorant_Garamond] italic font-semibold mb-3">
            {data.bride} &amp; {data.groom}
          </h1>
          <p className="text-sm tracking-wide opacity-80">{date}</p>

          <button
            onClick={toggleMusic}
            className="mt-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 transition-all hover:scale-110 hover:bg-white/20"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className="relative w-full md:max-w-[485px] h-screen  "
        style={{
          backgroundImage: `url('${config.backgrounds.main}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              key="cover"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative h-screen inset-0 flex flex-col items-center justify-center text-center border border-[#d6c4b7]/50 z-20 bg-[#f6f2ef] overflow-clip"
              style={{
                backgroundImage: `url('${config.backgrounds.cover}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "grayscale(80%)",
              }}
            >
              <div className="absolute inset-0 bg-black/20 z-0"></div>

              <motion.div
                className="relative z-40 flex flex-col items-center text-white"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.4, delayChildren: 1.0 },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Editable as="h2" data-path="text.cover.title" className="text-xs tracking-[3px] uppercase text-white/80 mb-3">
                    {config.text.cover.title}
                  </Editable>
                </motion.div>
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-5xl mb-6 font-['Great_Vibes'] font-semibold"
                >
                  <Editable as="span" data-path="text.couple.brideFullName">{data.bride}</Editable>
                  {" "}&amp;{" "}
                  <Editable as="span" data-path="text.couple.groomFullName">{data.groom}</Editable>
                </motion.h1>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="space-y-2 mb-8"
                >
                  <Editable as="p" data-path="text.cover.to" className="text-sm opacity-80">
                    {config.text.cover.to}
                  </Editable>
                  <Editable as="p" data-path="text.cover.guest" className="font-medium text-lg">
                    {guestName}
                  </Editable>
                </motion.div>

                <motion.button
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  onClick={handleOpenInvitation}
                  className="relative overflow-hidden inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium px-3 py-1 rounded-full transition-all duration-300 shadow-sm border border-white/30 before:content-[''] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent"
                >
                  <Flower size="16" />
                  <Editable as="span" data-path="text.cover.button">
                    {config.text.cover.button}
                  </Editable>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpened && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 overflow-y-scroll scroll-hidden"
            >
              <div className="min-h-full w-full bg-[#f6f2ef]/90 text-[#5f3e2f] text-center">
                <section
                  className="h-[60vh] md:h-[80vh] relative flex flex-col items-center justify-start pt-24 text-center text-white bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${config.backgrounds.mainCover}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>

                  <motion.div
                    className="relative z-10 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Editable as="p" data-path="text.mainCover.title" className="text-sm tracking-widest uppercase opacity-80 mb-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                      {config.text.mainCover.title}
                    </Editable>
                    <div className="text-5xl md:text-7xl font-['Great_Vibes'] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
                      <Editable as="span" data-path="text.couple.brideFullName">{data.bride}</Editable>
                      {" "}&amp;{" "}
                      <Editable as="span" data-path="text.couple.groomFullName">{data.groom}</Editable>
                    </div>
                    <p className="mt-4 text-lg [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">{date}</p>
                  </motion.div>
                </section>

                <section className="py-20 px-8">
                  <Editable
                    as="h2"
                    data-path="text.intro.basmalah"
                    className="text-sm tracking-widest uppercase mb-4 text-[#a57b65]"
                  >
                    {config.text.intro.basmalah}
                  </Editable>
                  <Editable as="p" data-path="text.intro.paragraph" className="text-base italic">
                    {config.text.intro.paragraph}
                  </Editable>
                </section>

                <section className="py-20 px-8 bg-[#f8f4f1]">
                  <motion.p
                    className="italic text-base mb-12 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Editable as="span" data-path="text.couple.intro">{config.text.couple.intro}</Editable>
                  </motion.p>

                  <div className="space-y-12">
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-white">
                        <img
                          src={config.images.bride}
                          alt={data.bride}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Editable as="h3" data-path="text.couple.brideFullName" className="text-4xl font-['Great_Vibes'] text-[#a57b65] mb-2">
                        {data.bride}
                      </Editable>
                      <Editable as="p" data-path="text.couple.brideFullName" className="font-semibold text-lg">
                        {config.text.couple.brideFullName}
                      </Editable>
                      <Editable as="p" data-path="text.couple.brideParents" className="text-sm mt-2 opacity-80 max-w-xs">
                        {config.text.couple.brideParents}
                      </Editable>
                      <a
                        href={`https://instagram.com/${config.text.couple.brideInstagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm mt-3 text-[#a57b65] hover:text-[#8d6754] transition-colors group"
                      >
                        <Instagram size={16} />
                        <Editable as="span" data-path="text.couple.brideInstagram">{config.text.couple.brideInstagram}</Editable>
                      </a>
                    </motion.div>

                    <motion.p
                      className="text-5xl font-['Great_Vibes'] text-[#a57b65]"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      &amp;
                    </motion.p>

                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-white">
                        <img
                          src={config.images.groom}
                          alt={data.groom}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Editable as="h3" data-path="text.couple.groomFullName" className="text-4xl font-['Great_Vibes'] text-[#a57b65] mb-2">
                        {data.groom}
                      </Editable>
                      <Editable as="p" data-path="text.couple.groomFullName" className="font-semibold text-lg">
                        {config.text.couple.groomFullName}
                      </Editable>
                      <Editable as="p" data-path="text.couple.groomParents" className="text-sm mt-2 opacity-80 max-w-xs">
                        {config.text.couple.groomParents}
                      </Editable>
                      <a
                        href={`https://instagram.com/${config.text.couple.groomInstagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm mt-3 text-[#a57b65] hover:text-[#8d6754] transition-colors group"
                      >
                        <Instagram size={16} />
                        <Editable as="span" data-path="text.couple.groomInstagram">{config.text.couple.groomInstagram}</Editable>
                      </a>
                    </motion.div>
                  </div>
                </section>

                <section className="py-20 px-8">
                  <h3 className="text-3xl mb-8 font-['Great_Vibes'] text-[#a57b65]">
                    {config.text.event.title}
                  </h3>
                  <div className="grid md:grid-cols-1 gap-10">
                    <div className="text-center">
                      <h4 className="text-2xl font-semibold italic font-[Cormorant_Garamond]">
                        {config.text.event.akadTitle}
                      </h4>
                      <p className="text-sm italic my-4">
                        {config.text.event.akadIntro}
                      </p>

                      <p className="text-lg font-semibold">
                        {config.text.event.akadDate}
                      </p>
                      <p className="text-sm mt-1">{config.text.event.akadTime}</p>

                      <p className="mt-6 text-sm italic mb-2">{config.text.event.akadLocationIntro}</p>
                      <p className="font-semibold">{config.text.event.akadLocation}</p>
                      <p className="text-sm opacity-80 max-w-xs mx-auto">
                        {config.text.event.akadAddress}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.text.event.akadAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 bg-white/50 border border-[#d6c4b7] text-[#a57b65] font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:bg-white hover:shadow-md"
                      >
                        <MapPin size={16} />
                        Lihat Peta
                      </a>
                    </div>

                    <div className="text-center">
                      <h4 className="text-2xl font-semibold italic font-[Cormorant_Garamond]">
                        {config.text.event.receptionTitle}
                      </h4>
                      <p className="text-sm italic my-4">
                        {config.text.event.receptionIntro}
                      </p>

                      <p className="text-lg font-semibold">
                        {config.text.event.receptionDate}
                      </p>
                      <p className="text-sm mt-1">{config.text.event.receptionTime}</p>

                      <p className="mt-6 text-sm italic mb-2">{config.text.event.receptionLocationIntro}</p>
                      <p className="font-semibold">{config.text.event.receptionLocation}</p>
                      <p className="text-sm opacity-80 max-w-xs mx-auto">
                        {config.text.event.receptionAddress}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.text.event.receptionAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 bg-white/50 border border-[#d6c4b7] text-[#a57b65] font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:bg-white hover:shadow-md"
                      >
                        <MapPin size={16} />
                        Lihat Peta
                      </a>
                    </div>
                  </div>
                </section>

                <section className="py-16 px-8 bg-[#f8f4f1]">
                  <h3 className="text-3xl mb-4 font-['Great_Vibes'] text-[#a57b65]">
                    {config.text.loveStory.title}
                  </h3>
                  <p className="italic text-base mb-12 max-w-md mx-auto">
                     {config.text.loveStory.subheading}
                  </p>
                  <div className="relative max-w-md mx-auto">
                    <div className="absolute left-5 top-0 h-full w-0.5 bg-[#d6c4b7]"></div>
                    {[
                      {
                        icon: <Heart size={20} className="text-[#a57b65]" />,
                        title: "First Meet",
                        text: "Percayalah, bukan karena bertemu lalu berjodoh, tapi karena berjodoh lah maka kami dipertemukan. Awal pertemuan tanpa sengaja kami disatukan pada satu project yang sama.",
                      },
                      {
                        icon: <Users size={20} className="text-[#a57b65]" />,
                        title: "Relationship",
                        text: "Seiring waktu berjalan, kami belajar saling memahami, mendukung, dan tumbuh bersama. Hingga akhirnya kami berani melangkah lebih jauh, berkomitmen untuk saling menjaga dan menemani di setiap musim kehidupan.",
                      },
                      {
                        icon: <Gem size={20} className="text-[#a57b65]" />,
                        title: "Engagement",
                        text: "Dalam sebuah momen yang hangat dan penuh makna, kami mengikat janji dalam sebuah lamaran. Sebuah tanda keseriusan, bahwa cinta ini akan kami bawa menuju janji suci pernikahan.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative pl-16 mb-10 last:mb-0"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                      >
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-[#d6c4b7]/50">
                          {item.icon}
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-lg text-[#a57b65] mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm opacity-80">{item.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section
                  className="py-20 px-8 relative bg-cover bg-center text-white"
                  style={{
                    backgroundImage: `url('${config.backgrounds.countdown}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-4xl mb-8 font-['Great_Vibes']">
                      Menuju Hari Bahagia
                    </h3>
                    <Countdown targetDate={data.eventDate} />
                  </motion.div>
                </section>

                <section className="py-20 px-8 bg-[#f8f4f1]">
                  <h3 className="text-4xl mb-8 font-['Great_Vibes'] text-[#a57b65]">
                    Lokasi Acara
                  </h3>
                  <motion.div
                    className="relative max-w-md mx-auto rounded-xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.171952578024!2d112.6689888759437!3d-7.334799872195981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e3072c73a3cf%3A0x232fe684be325693!2sJl.%20K.H.%20Ali%2C%20Tj.%20Anom%2C%20Tanjungsari%2C%20Kec.%20Taman%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061257!5e0!3m2!1sen!2sid!4v1730000000000!5m2!1sen!2sid"
                      width="100%"
                      height="400"
                      loading="lazy"
                      className="border-0"
                    ></iframe>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-lg text-left shadow-md">
                      <p className="font-semibold text-base">
                        {config.text.event.receptionLocation}
                      </p>
                      <p className="text-sm opacity-80 mt-1">
                        {config.text.event.receptionAddress}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.text.event.receptionAddress)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-xs bg-[#a57b65] text-white font-semibold px-3 py-1.5 rounded-full hover:bg-[#946c56] transition-colors"
                      >
                        <MapPin size={14} />
                        Buka di Google Maps
                      </a>
                    </div>
                  </motion.div>
                </section>

                <section className="py-16 px-8">
                  <h3 className="text-2xl mb-6 font-semibold italic">
                    Galeri Kenangan
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {config.images.gallery.map((src, index) => (
                      <motion.div
                        key={index}
                        layoutId={src}
                        onClick={() => setSelectedImage(src)}
                        className={`overflow-hidden rounded-lg shadow-md cursor-pointer group
                          ${
                            [0, 7].includes(index % 10)
                              ? "col-span-2 row-span-2"
                              : ""
                          }
                          ${[3, 5].includes(index % 10) ? "md:col-span-2" : ""}
                          ${[8].includes(index % 10) ? "md:col-span-3" : ""}
                        `}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <img
                          src={src}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/400x400/f8f4f1/5f3e2f?text=Foto+${
                              index + 1
                            }`;
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </section>

                <AnimatePresence>
                  {selectedImage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                      onClick={() => setSelectedImage(null)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"
                      >
                        <ChevronLeft size={24} />
                      </button>

                      <motion.div
                        layoutId={selectedImage}
                        className="relative max-w-3xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="w-auto h-max md:h-[600px] max-w-full max-h-full object-contain rounded-lg"
                        />
                      </motion.div>

                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"
                      >
                        <X size={24} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <section className="py-16 px-8 bg-[#f8f4f1]">
                  <h3 className="text-2xl mb-6 font-semibold italic">
                    Ucapan & Doa
                  </h3>
                  <form
                    onSubmit={handleWishSubmit}
                    className="text-left max-w-sm mx-auto space-y-4 mb-8"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={newWish.name}
                        onChange={(e) =>
                          setNewWish({ ...newWish, name: e.target.value })
                        }
                        className="w-full bg-white/50 border border-[#d6c4b7] rounded-md px-3 py-2 focus:ring-[#a57b65] focus:border-[#a57b65] transition-colors"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1"
                      >
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={newWish.message}
                        onChange={(e) =>
                          setNewWish({ ...newWish, message: e.target.value })
                        }
                        className="w-full bg-white/50 border border-[#d6c4b7] rounded-md px-3 py-2 focus:ring-[#a57b65] focus:border-[#a57b65] transition-colors"
                        placeholder="Tuliskan ucapan dan doa Anda..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#a57b65] hover:bg-[#946c56] text-white font-medium px-4 py-2 rounded-md transition-all duration-300 shadow-sm"
                    >
                      <Send size={16} /> Kirim Ucapan
                    </button>
                  </form>
                  <div className="max-w-sm mx-auto text-left space-y-4 max-h-80 overflow-y-auto pr-2">
                    {wishes.map((wish, index) => (
                      <div
                        key={index}
                        className="bg-white/40 p-4 rounded-lg border border-[#d6c4b7]/50"
                      >
                        <p className="font-semibold text-base">{wish.name}</p>
                        <p className="text-sm mt-1 opacity-80">
                          {wish.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="py-20 px-8">
                  <div className="relative w-full max-w-sm mx-auto aspect-square mb-10 rounded-lg overflow-hidden shadow-lg">
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={carouselIndex}
                        src={config.images.closingCarousel[imageIndex]}
                        alt="Closing Carousel Image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/400x400/f8f4f1/5f3e2f?text=Foto+Mempelai`;
                        }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f6f2ef] to-transparent"></div>
                  </div>

                  <p className="italic max-w-md mx-auto">
                    {config.text.closing.paragraph1}
                  </p>
                  <p className="mt-4 italic max-w-md mx-auto">
                    {config.text.closing.paragraph2}
                  </p>
                  <p className="mt-8 font-['Great_Vibes'] text-4xl text-[#a57b65]">
                    Lala &amp; Romi
                  </p>
                </section>

                <footer className="py-10 px-8 bg-[#f8f4f1]">
                  <p className="text-sm italic">
                    Made with love by pestaria.com
                  </p>
                  <p className="text-xs mt-4 mb-3 opacity-80">
                    visit our instagram & website below :
                  </p>
                  <div className="flex justify-center items-center gap-4">
                    <a
                      href="https://pestaria.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a57b65] hover:text-[#8d6754] transition-colors"
                    >
                      <Globe size={24} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a57b65] hover:text-[#8d6754] transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                  </div>
                </footer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isOpened && (
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg border border-white/40 transition-transform hover:scale-110"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
