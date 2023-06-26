"use client"

import { useEffect, useMemo, useState} from "react";
import { IHeroData } from "@/interfaces/heroes";
import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";
import { AnimatePresence, motion } from "framer-motion";

interface IProp {
  heroes: IHeroData[];
  activeId: string;
}

enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

export default function Carousel({heroes, activeId}: IProp){
  const [visibleItems, setVisibleItems] = useState<IHeroData[]| null>(null);
  const [activeIndex, setActiveIndex] = useState(heroes.findIndex((hero) => hero.id === activeId) - 1);
  const [startInteractionPosition, setStartInteractionPosition] = useState<number>(0);

  const transitionAudio = useMemo(()=> new Audio("/songs/transition.mp3"),[]);
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(()=> ({
    "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
    "spider-woman-65": new Audio("/songs/mulher-aranha-65.mp3"),
    "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
    "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
    "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
    "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
    "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
  }),[])

  useEffect(()=>{
    if(!visibleItems) return;

    transitionAudio.play();
    const voiceAudio = voicesAudio[visibleItems[1].id];
    if(voiceAudio) {
      voiceAudio.volume = 0.3;
      voiceAudio.muted = false;
      voiceAudio.play();
    }
  },[visibleItems, transitionAudio, voicesAudio])

  useEffect(()=> {
    const items = [...heroes];
    const indexInArrayScope = ((activeIndex % items.length) + items.length) % items.length;
    const visibleItems = [...items, ...items].slice(indexInArrayScope, indexInArrayScope + 3);

    setVisibleItems(visibleItems);
  },[heroes, activeIndex]);

  useEffect(()=>{
    const htmlEl = document.querySelector("html");
    if(!htmlEl || !visibleItems){
      return;
    }

    const currentHeroId = visibleItems[1].id;
    htmlEl.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlEl.classList.add("hero-page");

    return () => {
      htmlEl.classList.remove("hero-page");
    }

  },[visibleItems])

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setStartInteractionPosition(event.clientX);
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    if(!startInteractionPosition) return null;

    const endInterationPosition =event.clientX;
    const diffPosition = endInterationPosition - startInteractionPosition;
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartInteractionPosition(event.touches[0].clientX);
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if(!startInteractionPosition) return null;

    const endInteractionPosition = event.changedTouches[0].clientX;
    const diffPosition = endInteractionPosition - startInteractionPosition;
    const newPosition = diffPosition > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  }

  if(!visibleItems) {return null;}

  return(
    <div className="flex flex-col md:flex-row mt-12 md:mt-0">
      <div className="
        position
        flex-1
        w-full
        max-sm:left-[calc(50vw-315px)]
        md:max-lg:left-[-35%]
        lg:left-[-15%]
        hero-screen:left-0
        relative
        "
      >
        <div
          className="
            cursor-grab
            h-[300px]
            md:h-[100vh]
            lg:h-[130vh]
            relative
            active:cursor-grabbing
          "
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems?.map((item, position) => (
              <motion.div
                key={item.id}
                className="elements h-full left-0 absolute w-[280px] md:w-[500px]"
                transition={{ duration: 0.8 }}
                initial={{
                  x: -1500,
                  scale: 0.75,
                }}
                animate={{x: 0, ...getItemStyles(position)}}
                exit={{
                  x: 0,
                  left: "-20%",
                  opacity: 0,
                  scale: 1,
                }}
              >
                <HeroPicture hero={item} hasNewPosition={true} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        className="mt-0 lg:mt-12 relative flex-1 ml-8 md:ml-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  )
}

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      filter: "blur(10px)",
      scale: 1.2,
      zIndex: 3,
    };
  }

  if (position === enPosition.MIDDLE) {
    return {
      left: 300,
      scale: 0.8,
      top: "-10%",
      zIndex: 2,
    };
  }

  return {
    filter: "blur(10px)",
    scale: 0.6,
    left: 160,
    opacity: 0.8,
    zIndex: 1,
    top: "-20%",
  };
};