import React, { useRef, useEffect, useState } from 'react';

const CustomVideoPlayer = () => {
  const [player, setPlayer] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);
  const overlayAdded = useRef(false);
  const intervalRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Lazy load: Only load YouTube when video is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadPlayer(true);
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 } // Load when 10% visible
    );

    if (playerContainerRef.current) {
      observer.observe(playerContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadPlayer) return; // Don't load YouTube API until needed

    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true; // Load asynchronously
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    // If API already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldLoadPlayer]);

  const initializePlayer = () => {
    const newPlayer = new window.YT.Player('youtube-player', {
      height: '100%',
      width: '100%',
      videoId: 'hh5GMS3jHZI',
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onReady: (e) => {
          setPlayer(e.target);
          setTimeout(() => checkForSavedTime(e.target), 100);
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            startTimeTracking(e.target);
          } else {
            stopTimeTracking();
          }
        },
      },
    });
  };

  const startTimeTracking = (p) => {
    if (intervalRef.current) return;
    
    intervalRef.current = setInterval(() => {
      if (p && p.getCurrentTime) {
        const currentTime = p.getCurrentTime();
        if (currentTime > 0) {
          sessionStorage.setItem('videoTime', currentTime.toString());
        }
      }
    }, 1000);
  };

  const stopTimeTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const checkForSavedTime = (p) => {
    if (overlayAdded.current) return;

    const lastTime = sessionStorage.getItem('videoTime');
    const time = lastTime ? parseFloat(lastTime) : 0;
    
    if (time > 5) {
      setSavedTime(time);
      setShowOverlay(true);
      overlayAdded.current = true;
    }
  };

  const handleContinue = () => {
    if (player) {
      player.seekTo(savedTime, true);
      player.playVideo();
    }
    setShowOverlay(false);
    overlayAdded.current = false;
  };

  const handleRestart = () => {
    if (player) {
      player.seekTo(0, true);
      sessionStorage.setItem('videoTime', '0');
      player.playVideo();
    }
    setShowOverlay(false);
    overlayAdded.current = false;
  };

  return (
    <main className="w-full flex justify-center">
      <div 
        ref={playerContainerRef}
        className="relative w-full md:w-[720px] aspect-video bg-black"
      >
        {!shouldLoadPlayer ? (
          // Placeholder while YouTube loads
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading video...</p>
            </div>
          </div>
        ) : (
          <div id="youtube-player" className="w-full h-full"></div>
        )}
        
        {showOverlay && (
          <div 
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50"
            style={{ background: 'rgba(37, 99, 235, 0.9)' }}
          >
            <div className="text-center p-8 max-w-3xl">
              <div className="flex justify-center gap-12">
                <button 
                  onClick={handleContinue}
                  className="bg-transparent border-none text-white cursor-pointer flex flex-col items-center p-4 hover:opacity-80 transition-opacity"
                  aria-label="Continue watching video"
                >
                  <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] border-2 border-white rounded-full flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" aria-hidden="true">
                      <path d="M8 5V19L19 12L8 5Z"/>
                    </svg>
                  </div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold">Continue watching?</span>
                </button>
                
                <button 
                  onClick={handleRestart}
                  className="bg-transparent border-none text-white cursor-pointer flex flex-col items-center p-4 hover:opacity-80 transition-opacity"
                  aria-label="Restart video from beginning"
                >
                  <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] border-2 border-white rounded-full flex items-center justify-center mb-4">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" aria-hidden="true">
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12H17C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C13.66 7 15.14 7.81 16.22 9.1L13 12H18V7L17.65 6.35Z"/>
                    </svg>
                  </div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-semibold">Start from beginning?</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CustomVideoPlayer;