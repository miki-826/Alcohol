"use client";

import { useEffect, useRef, useState } from "react";

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(40);
  const [open, setOpen] = useState(false);
  const userPaused = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open]);

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

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"
    >
      {open && (
        <div className="flex w-48 flex-col gap-3 rounded-xl border-2 border-wood-brown bg-card/95 p-4 shadow-xl animate-fade-in-up">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg border-2 border-wood-brown bg-background/60 px-3 py-2 text-sm text-foreground hover:bg-amber-950 cursor-pointer"
          >
            {playing ? "⏸ BGMを止める" : "▶ BGMを流す"}
          </button>
          <label className="flex flex-col gap-1 text-xs text-sub-text">
            音量：{volume}%
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="w-full accent-[--accent] cursor-pointer"
              aria-label="BGM音量"
            />
          </label>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border-2 border-wood-brown bg-card px-4 py-2 text-sm text-foreground shadow-lg hover:bg-amber-950 cursor-pointer"
        aria-label="BGM設定を開く"
      >
        {playing ? "♪ BGM ON" : "♪ BGM OFF"}
      </button>
    </div>
  );
}
