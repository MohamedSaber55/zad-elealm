import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { updateVideoProgress } from "../store/slices/videoProgress";

declare namespace YT {
    interface Player {
        loadVideoById(videoId: string): unknown;
        getCurrentTime(): number;
    }
    interface OnStateChangeEvent {
        data: number;
    }
    const PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
    };
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: typeof YT;
    }
}

interface VideoPlayerProps {
    selectedVideo: string | null;
    currentVideoId: number;
    selectedVideoDuration: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ selectedVideo, currentVideoId, selectedVideoDuration }) => {
    const playerRef = useRef<YT.Player | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [watchedSeconds, setWatchedSeconds] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const { token } = useSelector((state: RootState) => state.auth);

    const [hours, minutes, seconds] = selectedVideoDuration.split(':').map(Number);
    const timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

    const fetchCourseProgress = () => {
        const body = {
            videoId: currentVideoId,
            watchedSeconds: timeInSeconds,
        };

        if (selectedVideo && token) {
            dispatch(updateVideoProgress({ body, token }));
        }
    };

    useEffect(() => {
        if (watchedSeconds + 20 >= timeInSeconds && watchedSeconds > 0) {
            fetchCourseProgress();
        }
    }, [watchedSeconds]);

    useEffect(() => {
        if (!selectedVideo) return;

        if (!window.YT) {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (window.YT) {
                    initializePlayer();
                }
            };
        } else {
            initializePlayer();
        }
    }, [selectedVideo]);

    const initializePlayer = () => {
        if (!selectedVideo) return;

        const videoId = extractVideoId(selectedVideo);
        if (!videoId) return;

        if (playerRef.current) {
            playerRef.current.loadVideoById(videoId);
            return;
        }

        // Initialize YouTube player
        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("youtube-player", {
                videoId: videoId,
                playerVars: { autoplay: 1, controls: 1 },
                events: {
                    onStateChange: handleStateChange,
                },
            });
        };

        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }
    };

    const extractVideoId = (url: string) => {
        const match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
        );
        return match ? match[1] : "";
    };

    const handleStateChange = (event: YT.OnStateChangeEvent) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            intervalRef.current = setInterval(() => {
                if (playerRef.current) {
                    const seconds = Math.floor(playerRef.current.getCurrentTime());
                    setWatchedSeconds(seconds);
                }
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
    };

    return (
        <div className="col-span-3 md:col-span-2 bg-white dark:bg-dark-light rounded-xl p-5">
            <div id="youtube-player" className="w-full aspect-video h-full rounded-lg"></div>
        </div>
    );
};

export default VideoPlayer;
