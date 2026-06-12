"use client";

import { useEffect, useRef, useState } from "react";

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/late-night-izakaya.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 rounded-full border-2 border-wood-brown bg-card px-4 py-2 text-sm text-foreground shadow-lg hover:bg-amber-950 cursor-pointer"
      aria-label={playing ? "BGMを止める" : "BGMを流す"}
    >
      {playing ? "♪ BGM ON" : "♪ BGM OFF"}
    </button>
  );
}
