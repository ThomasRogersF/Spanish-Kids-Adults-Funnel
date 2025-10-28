import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize2, Sun, Moon } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  autoplay?: boolean;
  showControls?: boolean;
  ambientMode?: boolean;
  rounded?: boolean;
  className?: string;
}

export const VideoPlayer = ({ 
  src, 
  autoplay = true, 
  showControls = true, 
  ambientMode = false,
  rounded = true,
  className = ""
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAmbient, setIsAmbient] = useState(ambientMode);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (autoplay) {
        video.play().catch(err => console.log("Autoplay failed:", err));
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [autoplay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => console.log("Play failed:", err));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedValue = (x / rect.width) * video.duration;
    video.currentTime = clickedValue;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    video.volume = newVolume;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch(err => console.log("Fullscreen failed:", err));
    }
  };

  const toggleAmbientMode = () => {
    setIsAmbient(!isAmbient);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className={`
          w-full h-auto
          ${rounded ? 'rounded-2xl' : ''}
          ${isAmbient ? 'opacity-90' : ''}
        `}
        autoPlay={autoplay}
        muted={autoplay}
        loop
        playsInline
      />
      
      {/* Ambient Mode Overlay */}
      {isAmbient && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl pointer-events-none" />
      )}
      
      {/* Custom Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
          <div className="flex items-center justify-between gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-blue-300 transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            {/* Progress Bar */}
            <div 
              className="flex-1 h-2 bg-white/30 rounded-full cursor-pointer relative"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {/* Volume Control */}
            <div className="relative">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="text-white hover:text-blue-300 transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Volume"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              
              {showVolumeSlider && (
                <div className="absolute bottom-12 right-0 bg-black/90 p-2 rounded-lg">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 accent-blue-500"
                    aria-label="Volume slider"
                  />
                </div>
              )}
            </div>
            
            {/* Ambient Mode Toggle */}
            <button
              onClick={toggleAmbientMode}
              className="text-white hover:text-blue-300 transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label={isAmbient ? "Disable ambient mode" : "Enable ambient mode"}
            >
              {isAmbient ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-blue-300 transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-white text-xs mt-2 px-2">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
};