"use client";

import { useEffect, useRef, useState } from "react";

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const audio = new Audio("/music/late-night-izakaya.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // 自動再生がブロックされた場合、最初の操作で再生を開始する
        const startOnGesture = () => {
          if (userPaused.current) return;
          audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => {});
        };
        document.addEventListener("pointerdown", startOnGesture, {
          once: true,
        });
      });

    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      userPaused.current = true;
      audio.pause();
      setPlaying(false);
    } else {
      userPaused.current = false;
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
