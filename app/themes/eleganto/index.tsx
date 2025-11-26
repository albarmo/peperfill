import React, { useState, useRef, useEffect, useMemo } from "react";
import { Invitation } from "@prisma/client";
import { motion, AnimatePresence, wrap } from "framer-motion";
import { useFetcher } from "@remix-run/react";
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
  Calendar,
  Gift,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import ElegantoThemeConfig, { ElegantoThemeConfigType } from "./config";
import { Editable } from "@/ui/Editable";
import { cn } from "@/lib/cn";

type Props = {
  data: Pick<
    Invitation,
    | "id"
    | "title"
    | "bride"
    | "groom"
    | "eventDate"
    | "location"
    | "slug"
    | "description"
  > & {
    guests: {
      name: string;
      message: string | null;
      status: string;
      guestCount: number | null;
    }[];
    config: ElegantoThemeConfigType;
  };
  isStatic?: boolean;
  config: ElegantoThemeConfigType;
  apiBaseUrl?: string;
};

const iconMap = {
  heart: <Heart size={20} className="text-[#484932]" />,
  users: <Users size={20} className="text-[#484932]" />,
  gem: <Gem size={20} className="text-[#484932]" />,
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
    timerComponents.push(
      <div
        key={interval}
        className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 w-20 h-20 justify-center shadow-lg"
      >
        <span className="text-3xl font-semibold">
          {timeLeft[interval as keyof typeof timeLeft] || 0}
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

export default function ElegantoTheme({
  data,
  isStatic = false,
  apiBaseUrl,
}: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false); // State baru untuk melacak status musik sebelum tab disembunyikan

  const [newRsvp, setNewRsvp] = useState({
    name: "",
    message: "",
    status: "hadir",
    guestCount: 1,
  });

  const wishes = useMemo(() => {
    if (!data?.guests) return [];
    return data?.guests;
  }, [data?.guests]);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("Tamu");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const config = data.config || ElegantoThemeConfig;

  const imageIndex = wrap(
    0,
    config.images.closingCarousel.length,
    carouselIndex
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get("to");
    if (toParam) {
      setGuestName(toParam);
    }

    const timer = setTimeout(() => setCarouselIndex(carouselIndex + 1), 4000);
    return () => clearTimeout(timer);
  }, [carouselIndex]);

  // Ref untuk melacak status isPlaying terbaru tanpa menjadi dependency useEffect
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying; // Update ref setiap kali isPlaying berubah
  }, [isPlaying]);

  // Effect untuk mengelola pemutaran musik berdasarkan visibilitas tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (audioRef.current) {
        if (document.visibilityState === 'hidden') {
          // Jika musik sedang diputar, pause dan ingat statusnya
          if (isPlayingRef.current) {
            audioRef.current.pause();
            setWasPlayingBeforeHidden(true);
            setIsPlaying(false); // Update state lokal
          }
        } else if (document.visibilityState === 'visible') {
          // Jika musik sebelumnya diputar saat tab disembunyikan, lanjutkan
          if (wasPlayingBeforeHidden) {
            audioRef.current.play();
            setIsPlaying(true); // Update state lokal
            setWasPlayingBeforeHidden(false); // Reset status
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [wasPlayingBeforeHidden]); // wasPlayingBeforeHidden adalah dependency karena digunakan di dalam handler

  const fetcher =
    !isStatic && typeof window !== "undefined" ? useFetcher() : ({} as any);

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...newRsvp,
      invitationId: data.id,
    };

    fetcher.submit(payload, {
      method: "post",
      action: apiBaseUrl ? `${apiBaseUrl}/api/rsvp` : "/api/rsvp",
      encType: "application/json",
    });

    setNewRsvp({ name: "", message: "", status: "hadir", guestCount: 1 });
  };

  const date = new Date(data.eventDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
    if (videoRef.current) {
      const video = videoRef.current;
      video.play();

      const onVideoEnd = () => {
        setTimeout(() => {
          setIsOpened(true);
          contentRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
        video.removeEventListener("ended", onVideoEnd);
      };

      video.addEventListener("ended", onVideoEnd);
    } else {
      setIsOpened(true);
    }
  };

  const toggleMusic = () => {
    setIsVideoPlaying(true);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedText(textToCopy);
      setTimeout(() => setCopiedText(null), 2500);
    });
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
      (currentIndex - 1 + config.images.gallery.length) %
      config.images.gallery.length;
    setSelectedImage(config.images.gallery[prevIndex]);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [areImagesPreloaded, setAreImagesPreloaded] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const currentImage = config.images.gallery[currentImageIndex];
  const maxLoop = 5;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      !isMounted ||
      !config.images.gallery ||
      config.images.gallery.length === 0
    )
      return;

    const preloadImages = async () => {
      const imagePromises = config.images.gallery.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setAreImagesPreloaded(true);
      } catch (error) {
        console.error("Gagal memuat semua gambar galeri:", error);
        setAreImagesPreloaded(true); // Tetap tampilkan galeri meskipun ada yang gagal
      }
    };

    preloadImages();
  }, [isMounted, config.images.gallery]);

  useEffect(() => {
    const gallery = config.images.gallery;
    if (!areImagesPreloaded || !gallery || gallery.length === 0) {
      setIsLooping(false);
      return;
    }

    const totalLoops = gallery.length * maxLoop;

    const timer = setInterval(() => {
      setLoopCount((currentLoop) => {
        if (currentLoop >= totalLoops - 1) {
          clearInterval(timer);
          setIsLooping(false);
          return currentLoop;
        }
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gallery.length);
        return currentLoop + 1;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [areImagesPreloaded, config.images.gallery, maxLoop]); // Dependencies are correct

  const dynamicText = useMemo(() => {
    if (!areImagesPreloaded) {
      return "Preparing our story...";
    }
    const totalLoops = (config.images.gallery.length || 1) * maxLoop;
    if (loopCount < totalLoops / 3) {
      return "The beginning of our journey.";
    } else if (loopCount !== totalLoops - 1) {
      return "Every love story is beautiful,";
    }
    return "but ours is my favorite.";
  }, [
    loopCount,
    isLooping,
    areImagesPreloaded,
    config.images.gallery.length,
    maxLoop,
  ]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden font-[Ovo]">
      <audio ref={audioRef} src={config.audioUrl} loop />

      <AnimatePresence>
        <div
          className="relative w-full min-h-screen"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dimtlooxf/image/upload/v1761313886/background-3_q35kqv.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Cover */}
          <div
            className="relative h-screen hidden md:flex flex-1 flex-col items-start justify-end text-left p-8 bg-cover bg-center"
            style={{
              backgroundImage: `url('${config.backgrounds.leftSide}')`,
              color: "#fff",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay Luminosity */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-60 overflow-hidden"
              style={{
                backgroundImage: `url('${config.backgrounds.overlay}')`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundBlendMode: "luminosity",
              }}
            >
              <style>
                {`
              @keyframes shimmer {
                0% { transform: translateX(-100%) skewX(-15deg); }
                100% { transform: translateX(200%) skewX(-15deg); }
              }
              .animate-shimmer::before {
                content: '';
                position: absolute;
                inset: 0;
                background-image: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
                animation: shimmer 10s infinite;
              }
            `}
              </style>
              <div className="relative w-full h-full animate-shimmer"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 z-0"></div>
            {/* Overlay Luminosity END */}

            <div className="relative p-5 flex flex-col justify-between items-center z-10 w-full h-screen text-center">
              <section>
                <motion.div
                  className={cn(
                    "relative z-40 flex flex-col items-center justify-center h-full text-white transition-opacity duration-500",
                    isVideoPlaying ? "invisible" : "visible"
                  )}
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
                    <Editable
                      as="h2"
                      data-path="text.cover.title"
                      className="text-xs tracking-[3px] uppercase text-white/80 mb-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
                    >
                      {config.text.cover.title}
                    </Editable>
                  </motion.div>
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-4xl uppercase text-white/80 mb-3 tracking-[0.3rem] [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
                  >
                    <Editable as="span" data-path="text.couple.groomName">
                      {config.text.couple.groomName}
                    </Editable>{" "}
                    &{" "}
                    <Editable as="span" data-path="text.couple.brideName">
                      {config.text.couple.brideName}
                    </Editable>
                  </motion.h1>
                </motion.div>
              </section>

              <section className="space-y-8">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Editable
                    as="p"
                    data-path="text.cover.to"
                    className="text-sm opacity-80 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
                  >
                    {config.text.cover.to}
                  </Editable>
                  <Editable
                    as="p"
                    data-path="text.cover.guest" // Tambahkan text-shadow pada guestName
                    className="font-medium text-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
                  >
                    {guestName}
                  </Editable>
                  <p className="text-xs">
                    We apologize if there is any misspelling of name or title.
                  </p>
                </motion.div>

                <motion.button
                  id="button-open-invitation"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  onClick={handleOpenInvitation}
                  className={cn(
                    isOpened || isVideoPlaying ? "invisible" : "visible",
                    "relative overflow-hidden inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium px-3 py-1 rounded-full transition-all duration-300 shadow-sm border border-white/30 before:content-[''] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent"
                  )}
                >
                  <Flower size="16" />
                  <Editable as="span" data-path="text.cover.button">
                    {config.text.cover.button}
                  </Editable>
                </motion.button>

                <section>
                  <p className="text-sm font-light uppercase tracking-[0.3rem]">
                    {date}
                  </p>
                  <p className="text-[10px] mt-2 font-[100] uppercase tracking-widest h-4">
                    Every love story is beautiful, but ours is my favorite.
                  </p>
                </section>
              </section>
            </div>

            <button
              onClick={toggleMusic}
              className="fixed left-10 bottom-10 z-50  mt-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 transition-all hover:scale-110 hover:bg-white/20"
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

          <div className="w-screen h-screen bg-black flex flex-col justify-center items-center">
            <div
              className="relative w-[100px] h-[100px] overflow-hidden"
              style={{ filter: "url(#distort-border)" }}
            >
              <svg className="absolute w-0 h-0">
                <filter id="distort-border">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.02 0.05"
                    numOctaves="1"
                    result="turbulence"
                  >
                    <animate
                      attributeName="baseFrequency"
                      dur="10s"
                      values="0.02 0.05;0.03 0.07;0.02 0.05"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="5"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </svg>
              {areImagesPreloaded ? (
                <motion.img
                  src={currentImage}
                  initial={false} // Mencegah animasi awal yang tidak perlu
                  animate={{
                    opacity: areImagesPreloaded ? 1 : 0,
                    x: [0, -1, 2, -1, 0, 2, -1, 0, 1, 31, 0],
                  }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  width={100}
                  height={100}
                  className="absolute bg-slate-500 inset-0 w-full h-full aspect-square grayscale object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/100x100/000000/ffffff?text=Err`;
                  }}
                />
              ) : (
                <div className="text-slate-300">Loading</div>
              )}
            </div>
            <section className="text-slate-200 mt-3.5 max-w-60 text-center h-8 overflow-hidden">
              <AnimatePresence>
                <motion.p
                  key={dynamicText} 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: 1, y: 0,
                    x: isLooping ? [0, -1, 1, -1, 1, 0] : 0
                  }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    opacity: { duration: 0.5, ease: "easeInOut" },
                    y: { duration: 0.5, ease: "easeOut" },
                    x: { repeat: Infinity, duration: 0.4, ease: "linear" }
                  }}
                  className="text-[10px] mt-2 font-[100] uppercase tracking-widest h-4"
                >
                  {dynamicText}
                </motion.p>
              </AnimatePresence>
            </section>
          </div>

          {/* Content */}
          <AnimatePresence>
            {!isOpened ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0, ease: "easeInOut" }}
                style={{
                  backgroundImage: `url('${config.backgrounds.mainCover}')`,
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                }}
                className="relative h-screen inset-0 flex flex-col items-center justify-center text-center border border-[#d9d9c7]/50 z-20 bg-black overflow-clip"
              >
                <video
                  ref={videoRef}
                  className="absolute z-0 w-full h-full object-cover object-top"
                  playsInline
                  muted
                  onPlay={() => setIsVideoPlaying(true)}
                  preload="auto"
                >
                  <source src={config.backgrounds.cover} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black/10 z-0"></div>

                <motion.div
                  className={cn(
                    "relative z-40 flex flex-col items-center text-white transition-opacity duration-500",
                    isVideoPlaying ? "invisible" : "visible"
                  )}
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
                    <Editable
                      as="h2"
                      data-path="text.cover.title"
                      className="text-xs tracking-[3px] uppercase text-white/80 mb-3 [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]"
                    >
                      {config.text.cover.title}
                    </Editable>
                  </motion.div>
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="text-5xl mb-6 font-['Ovo'] font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.7)]"
                  >
                    <Editable as="span" data-path="text.couple.groomName">
                      {config.text.couple.groomName}
                    </Editable>{" "}
                    &{" "}
                    <Editable as="span" data-path="text.couple.brideName">
                      {config.text.couple.brideName}
                    </Editable>
                  </motion.h1>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.7 }}
                ref={contentRef}
                className="absolute inset-0 overflow-y-scroll scroll-hidden"
              >
                <div className="min-h-full w-full bg-[#f6f2ef]/90 text-[#484932] text-center">
                  <section
                    className="h-screen relative flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${config.backgrounds.mainCover}')`,
                      backgroundPosition: "top",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>

                    <motion.div
                      className="relative z-10 p-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Editable
                        as="p"
                        data-path="text.mainCover.title"
                        className="text-sm tracking-widest uppercase opacity-80 mb-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
                      >
                        {config.text.mainCover.title}
                      </Editable>
                      <div className="text-5xl md:text-7xl font-['Ovo'] [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]">
                        <Editable as="span" data-path="text.couple.groomName">
                          {config.text.couple.groomName}
                        </Editable>{" "}
                        &{" "}
                        <Editable as="span" data-path="text.couple.brideName">
                          {config.text.couple.brideName}
                        </Editable>
                      </div>
                      <p className="mt-4 text-lg [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                        {date}
                      </p>
                      <p className="mt-2 text-base [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                        2025年11月23日
                      </p>
                    </motion.div>
                  </section>

                  <section className="py-20 px-8">
                    <Editable
                      as="h2"
                      data-path="text.intro.basmalah"
                      className="text-2xl tracking-wide italic mb-4 text-[#484932] font-[Cormorant_Garamond]"
                    >
                      {config.text.intro.basmalah}
                    </Editable>
                    <Editable
                      as="p"
                      data-path="text.intro.paragraph"
                      className="text-base italic"
                    >
                      {config.text.intro.paragraph}
                    </Editable>
                    <Editable
                      as="h2"
                      data-path="text.intro.basmalah"
                      className="text-xl tracking-wide italic mt-4 text-[#484932] font-[Cormorant_Garamond]"
                    >
                      {config.text.intro.surah}
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
                      <Editable as="span" data-path="text.couple.intro">
                        {config.text.couple.intro}
                      </Editable>
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
                            src={config.images.groom}
                            alt={data.groom}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Editable
                          as="h3"
                          data-path="text.couple.groomFullName"
                          className="text-4xl font-['Ovo'] text-[#484932] mb-2"
                        >
                          {data.groom}
                        </Editable>
                        <Editable
                          as="p"
                          data-path="text.couple.groomFullName"
                          className="font-semibold text-lg"
                        >
                          {config.text.couple.groomFullName}
                        </Editable>
                        <Editable
                          as="p"
                          data-path="text.couple.groomParents"
                          className="text-sm mt-2 opacity-80 max-w-xs"
                        >
                          {config.text.couple.groomParents}
                        </Editable>
                        <a
                          href={`https://instagram.com/${config.text.couple.groomInstagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm mt-3 text-[#484932] hover:text-[#3a3b29] transition-colors group"
                        >
                          <Instagram size={16} />
                          <Editable
                            as="span"
                            data-path="text.couple.groomInstagram"
                          >
                            {config.text.couple.groomInstagram}
                          </Editable>
                        </a>
                      </motion.div>

                      <motion.p
                        className="text-5xl font-['Ovo'] text-[#484932]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        &
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
                            src={config.images.bride}
                            alt={data.bride}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Editable
                          as="h3"
                          data-path="text.couple.brideFullName"
                          className="text-4xl font-['Ovo'] text-[#484932] mb-2"
                        >
                          {data.bride}
                        </Editable>
                        <Editable
                          as="p"
                          data-path="text.couple.brideFullName"
                          className="font-semibold text-lg"
                        >
                          {config.text.couple.brideFullName}
                        </Editable>
                        <Editable
                          as="p"
                          data-path="text.couple.brideParents"
                          className="text-sm mt-2 opacity-80 max-w-xs"
                        >
                          {config.text.couple.brideParents}
                        </Editable>
                        <a
                          href={`https://instagram.com/${config.text.couple.brideInstagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm mt-3 text-[#484932] hover:text-[#3a3b29] transition-colors group"
                        >
                          <Instagram size={16} />
                          <Editable
                            as="span"
                            data-path="text.couple.brideInstagram"
                          >
                            {config.text.couple.brideInstagram}
                          </Editable>
                        </a>
                      </motion.div>
                    </div>
                  </section>

                  <section className="py-20 px-8">
                    <h3 className="text-3xl mb-8 font-['Ovo'] text-[#484932]">
                      {config.text.event.title}
                    </h3>
                    <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
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
                        <p className="text-sm mt-1">
                          {config.text.event.akadTime}
                        </p>

                        <p className="mt-6 text-sm italic mb-2">
                          {config.text.event.akadLocationIntro}
                        </p>
                        <p className="font-semibold">
                          {config.text.event.akadLocation}
                        </p>
                        <p className="text-sm opacity-80 max-w-xs mx-auto">
                          {config.text.event.akadAddress}
                        </p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            config.text.event.akadAddress
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 bg-white/50 border border-[#d9d9c7] text-[#484932] font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:bg-white hover:shadow-md"
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
                        <p className="text-sm mt-1">
                          {config.text.event.receptionTime}
                        </p>

                        <p className="mt-6 text-sm italic mb-2">
                          {config.text.event.receptionLocationIntro}
                        </p>
                        <p className="font-semibold">
                          {config.text.event.receptionLocation}
                        </p>
                        <p className="text-sm opacity-80 max-w-xs mx-auto">
                          {config.text.event.receptionAddress}
                        </p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            config.text.event.receptionAddress
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 bg-white/50 border border-[#d9d9c7] text-[#484932] font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:bg-white hover:shadow-md"
                        >
                          <MapPin size={16} />
                          Lihat Peta
                        </a>
                      </div>
                    </div>
                  </section>

                  <section className="py-16 px-8 bg-[#f8f4f1]">
                    <h3 className="text-3xl mb-4 font-['Ovo'] text-[#484932]">
                      {config.text.loveStory.title}
                    </h3>
                    <p className="italic text-base mb-12 max-w-md mx-auto">
                      {config.text.loveStory.subheading}
                    </p>
                    <div className="relative max-w-md mx-auto">
                      <div className="absolute left-5 top-0 h-full w-0.5 bg-[#484932]/50 text-[#484932]"></div>
                      {config.text.loveStory.stories.map((item, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-16 mb-10 last:mb-0"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                          <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-[#484932]/50">
                            {iconMap[item.icon as keyof typeof iconMap]}
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-lg text-[#484932] mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm opacity-80">{item.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section className="py-20 px-8 relative text-white overflow-hidden">
                    <video
                      className="absolute z-0 inset-0 w-full h-full object-cover opacity-50"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source
                        src={config.backgrounds.countdown}
                        type="video/mp4"
                      />
                    </video>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <motion.div
                      className="relative z-10"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h3 className="text-4xl mb-8 font-['Ovo']">
                        Save The Date
                      </h3>
                      <Countdown targetDate={data.eventDate} />
                      <a
                        href={config.text.saveTheDateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-sm border border-white/30"
                      >
                        <Calendar size={16} />
                        Save The Date
                      </a>
                    </motion.div>
                  </section>

                  <section className="py-20 px-8 bg-[#f8f4f1]">
                    <h3 className="text-4xl mb-8 font-['Ovo'] text-[#484932]">
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
                        src={config.text.event.akadGoogleMapUrl}
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
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            config.text.event.receptionAddress
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-xs bg-[#484932] text-white font-semibold px-3 py-1.5 rounded-full hover:bg-[#3a3b29] transition-colors"
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
                    {/* Layout Grid disederhanakan */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {config.images.gallery.map((src, index) => (
                        <motion.div
                          key={index}
                          layoutId={src}
                          onClick={() => setSelectedImage(src)}
                          className={`overflow-hidden rounded-lg shadow-md cursor-pointer group aspect-square`}
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

                  {/* SECTION BARU: WEDDING GIFT */}
                  <section className="py-20 px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/50 border border-[#d9d9c7]">
                        <Gift size={32} className="text-[#484932]" />
                      </div>
                      <h3 className="text-4xl mb-4 font-['Ovo'] text-[#484932]">
                        {config.text.gift.title}
                      </h3>
                      <p className="italic text-base mb-10 max-w-md mx-auto">
                        {config.text.gift.subheading}
                      </p>

                      <div className="max-w-sm mx-auto space-y-6">
                        {config.text.gift?.bank?.map((b) => (
                          <div className="bg-white/50 border border-[#d9d9c7]/50 rounded-lg p-6 shadow-sm">
                            <img
                              src={b.bankLogoUrl}
                              alt={b.bankName}
                              className="h-8 mb-4 mx-auto"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <p className="text-sm">{b.bankName}</p>
                            <p className="text-lg font-semibold my-1">
                              {b.accountNumber}
                            </p>
                            <p className="text-sm">a.n {b.accountName}</p>
                            <button
                              onClick={() => handleCopy(b.accountNumber)}
                              className="inline-flex items-center gap-2 mt-4 text-xs bg-[#484932] text-white font-semibold px-3 py-1.5 rounded-full hover:bg-[#3a3b29] transition-colors"
                            >
                              {copiedText === b.accountNumber ? (
                                <Check size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                              {copiedText === b.accountNumber
                                ? "Tersalin!"
                                : "Salin Rekening"}
                            </button>
                          </div>
                        ))}

                        <div className="bg-white/50 border border-[#d9d9c7]/50 rounded-lg p-6 shadow-sm">
                          <h4 className="text-lg font-semibold">
                            {config.text.gift.addressTitle}
                          </h4>
                          <p className="text-sm mt-2">
                            {config.text.gift.addressDetail}
                          </p>
                          <button
                            onClick={() =>
                              handleCopy(config.text.gift.addressDetail)
                            }
                            className="inline-flex items-center gap-2 mt-4 text-xs bg-[#484932] text-white font-semibold px-3 py-1.5 rounded-full hover:bg-[#3a3b29] transition-colors"
                          >
                            {copiedText === config.text.gift.addressDetail ? (
                              <Check size={14} />
                            ) : (
                              <Copy size={14} />
                            )}
                            {copiedText === config.text.gift.addressDetail
                              ? "Tersalin!"
                              : "Salin Alamat"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </section>

                  <section className="py-16 px-8 bg-[#484932] text-[#F8F7F5]">
                    <h3 className="text-2xl mb-6 font-semibold italic">
                      RSVP & Ucapan
                    </h3>
                    {!isStatic && (
                      <fetcher.Form
                        onSubmit={handleRsvpSubmit}
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
                            value={newRsvp.name}
                            onChange={(e) =>
                              setNewRsvp({ ...newRsvp, name: e.target.value })
                            }
                            className="w-full bg-white/50 border border-[#d9d9c7] rounded-md px-3 py-2 focus:ring-[#484932] focus:border-[#484932] transition-colors"
                            placeholder="Nama Anda"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Konfirmasi Kehadiran
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="attendance"
                                value="hadir"
                                checked={newRsvp.status === "hadir"}
                                onChange={(e) =>
                                  setNewRsvp({
                                    ...newRsvp,
                                    status: e.target.value,
                                  })
                                }
                                className="text-[#484932] focus:ring-[#484932]"
                              />
                              Hadir
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="status"
                                value="tidak"
                                checked={newRsvp.status === "tidak"}
                                onChange={(e) =>
                                  setNewRsvp({
                                    ...newRsvp,
                                    status: e.target.value,
                                  })
                                }
                                className="text-[#484932] focus:ring-[#484932]"
                              />
                              Tidak Hadir
                            </label>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium mb-1"
                          >
                            Ucapan
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            value={newRsvp.message}
                            onChange={(e) =>
                              setNewRsvp({
                                ...newRsvp,
                                message: e.target.value,
                              })
                            }
                            className="w-full bg-white/50 border border-[#d9d9c7] rounded-md px-3 py-2 focus:ring-[#484932] focus:border-[#484932] transition-colors"
                            placeholder="Tuliskan ucapan dan doa Anda..."
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#3a3b29] hover:bg-[#3a3b29]/80 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 shadow-sm"
                          disabled={fetcher.state !== "idle"}
                        >
                          {fetcher.state !== "idle" ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Send size={16} />
                          )}
                          {fetcher.state !== "idle" ? "Mengirim..." : "Kirim"}
                        </button>
                      </fetcher.Form>
                    )}

                    <div className="max-w-sm mx-auto text-left space-y-4 max-h-80 overflow-y-auto pr-2">
                      {wishes.map((wish, index) => (
                        <div
                          key={index}
                          className="bg-white/40 p-4 rounded-lg border border-[#d9d9c7]/50"
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-base">
                              {wish.name}
                            </p>
                            {wish.status === "hadir" ? (
                              <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                Hadir
                              </span>
                            ) : (
                              <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                Tidak Hadir
                              </span>
                            )}
                          </div>
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
                    {/* Teks penutup baru */}
                    <p className="mt-8 font-semibold text-lg">
                      {config.text.closing.signature}
                    </p>
                    <p className="mt-8 font-['Ovo'] text-5xl text-[#484932]">
                      {config.text.couple.groomName} &{" "}
                      {config.text.couple.brideName}
                    </p>
                  </section>

                  <footer className="py-10 pt-0 px-8 bg-[#f8f4f1]">
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
                        className="text-[#484932] hover:text-[#3a3b29] transition-colors"
                      >
                        <Globe size={24} />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#484932] hover:text-[#3a3b29] transition-colors"
                      >
                        <Instagram size={24} />
                      </a>
                    </div>
                  </footer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatePresence>
    </div>
  );
}
