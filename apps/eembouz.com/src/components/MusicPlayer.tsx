import { useEffect, useRef, useState } from "preact/hooks";

type MusicPlayerProps = {
  videoId: string;
  playLabel?: string;
  pauseLabel?: string;
};

function PlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="14" y="3" width="5" height="18" rx="1" />
      <rect x="5" y="3" width="5" height="18" rx="1" />
    </svg>
  );
}

export default function MusicPlayer({
  videoId,
  playLabel = "Lecture",
  pauseLabel = "Pause",
}: MusicPlayerProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [info, setInfo] = useState({ title: "", author: "" });

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`,
      )}&format=json`,
      { signal: controller.signal },
    )
      .then((r) => r.json())
      .then((d) => setInfo({ title: d.title, author: d.author_name }))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      });

    return () => controller.abort();
  }, [videoId]);

  // Player
  useEffect(() => {
    const box = boxRef.current;
    if (!box) {
      return;
    }

    const mount = document.createElement("div");
    box.appendChild(mount);

    function create() {
      if (!box || playerRef.current) {
        return;
      }

      playerRef.current = new YT.Player(mount, {
        videoId,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
            else if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            else if (e.data === YT.PlayerState.ENDED) {
              setPlaying(false);
              e.target.playVideo();
            }
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      create();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        create();
      };

      if (!document.querySelector('script[src*="iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  const toggle = () => {
    if (!playerRef.current) {
      return;
    }

    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="w-full flex items-center gap-4 p-2 mt-4 bg-secondary">
      <div
        ref={boxRef}
        className="pointer-events-none fixed left-0 top-0 h-px w-px overflow-hidden opacity-0"
      />

      <img
        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
        className="block h-[90px] w-[90px] object-cover"
      />

      <div className="flex flex-col gap-2 lg:gap-4">
        <div className="text-xs lg:text-sm flex flex-col gap-1">
          <div className="break-words">{info.title}</div>
          <div className="text-xs lg:text-sm opacity-60">{info.author}</div>
        </div>

        <button
          type="button"
          className="flex w-fit cursor-pointer border-0 rounded-full bg-secondary p-2 text-inherit transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={toggle}
          disabled={!ready}
          aria-label={playing ? pauseLabel : playLabel}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}
