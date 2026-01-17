import React, { useRef, useEffect } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

const VSLVideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const overlayAdded = useRef(false);

  useEffect(() => {
    const initPlayer = () => {
      if (!videoRef.current || playerRef.current) return;

      playerRef.current = videojs(videoRef.current, {
        controls: true,
        fluid: true,
        preload: 'auto',
        bigPlayButton: true,
        autoplay: false,
      });

      playerRef.current.on('timeupdate', () => {
        const currentTime = playerRef.current.currentTime();
        if (currentTime > 0) {
          sessionStorage.setItem('videoTime', currentTime.toString());
        }
      });

      playerRef.current.ready(() => {
        setTimeout(() => {
          checkForSavedTime();
        }, 100);
      });
    };

    const checkForSavedTime = () => {
      if (!playerRef.current || overlayAdded.current) return;

      const lastTime = sessionStorage.getItem('videoTime');
      const savedTime = lastTime ? parseFloat(lastTime) : 0;
      
      if (savedTime > 5) {
        showResumeOverlay(savedTime);
        overlayAdded.current = true;
      }
    };

    const timer = setTimeout(initPlayer, 100);

    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const showResumeOverlay = (savedTime) => {
    if (!playerRef.current || overlayAdded.current) return;

    const overlay = document.createElement('div');
    overlay.className = 'resume-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(37, 99, 235, 0.9);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    overlay.innerHTML = `
      <style>
        .resume-icon {
          width: 60px;
          height: 60px;
        }
        .resume-icon svg {
          width: 24px;
          height: 24px;
        }
        .resume-text {
          font-size: 1.25rem;
        }
        
        @media (min-width: 640px) {
          .resume-icon {
            width: 80px;
            height: 80px;
          }
          .resume-icon svg {
            width: 32px;
            height: 32px;
          }
          .resume-text {
            font-size: 1.5rem;
          }
        }
        
        @media (min-width: 768px) {
          .resume-icon {
            width: 100px;
            height: 100px;
          }
          .resume-icon svg {
            width: 40px;
            height: 40px;
          }
          .resume-text {
            font-size: 1.75rem;
          }
        }
      </style>
      <div style="text-align: center; padding: 2rem; max-width: 800px;">
        <div style="display: flex; justify-content: center; gap: 3rem;">
          <button id="continueBtn" style="background: none; border: none; color: white; cursor: pointer; display: flex; flex-direction: column; align-items: center; padding: 1rem;">
            <div class="resume-icon" style="border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M8 5V19L19 12L8 5Z"/>
              </svg>
            </div>
            <span class="resume-text" style="font-weight: 600;">Continue watching?</span>
          </button>
          <button id="restartBtn" style="background: none; border: none; color: white; cursor: pointer; display: flex; flex-direction: column; align-items: center; padding: 1rem;">
            <div class="resume-icon" style="border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12H17C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C13.66 7 15.14 7.81 16.22 9.1L13 12H18V7L17.65 6.35Z"/>
              </svg>
            </div>
            <span class="resume-text" style="font-weight: 600;">Start from beginning?</span>
          </button>
        </div>
      </div>
    `;

    const playerEl = playerRef.current.el();
    playerEl.style.position = 'relative';
    playerEl.appendChild(overlay);

    const continueBtn = overlay.querySelector('#continueBtn');
    const restartBtn = overlay.querySelector('#restartBtn');

    continueBtn.addEventListener('click', () => {
      playerRef.current.currentTime(savedTime);
      playerRef.current.play();
      overlay.remove();
      overlayAdded.current = false;
    });

    restartBtn.addEventListener('click', () => {
      playerRef.current.currentTime(0);
      sessionStorage.setItem('videoTime', '0');
      playerRef.current.play();
      overlay.remove();
      overlayAdded.current = false;
    });

    overlayAdded.current = true;
  };

  return (
    <div className="w-full flex justify-center">
      <style>
        {`
          .video-js .vjs-big-play-button {
            background-color: #3b82f6 !important;
            border-color: #3b82f6 !important;
            width: 60px !important;
            height: 60px !important;
            line-height: 60px !important;
            position: absolute !important;
            top: 50% !important;
            left: 50% !important;
            margin: 0 !important;
            transform: translate(-50%, -50%) !important;
          }
          
          @media (min-width: 640px) {
            .video-js .vjs-big-play-button {
              width: 150px !important;
              height: 80px !important;
              line-height: 80px !important;
            }
          }
          
          @media (min-width: 768px) {
            .video-js .vjs-big-play-button {
              width: 100px !important;
              height: 80px !important;
              line-height: 80px !important;
            }
          }
          
          .video-js:hover .vjs-big-play-button {
            background-color: #2563eb !important;
            border-color: #2563eb !important;
          }
          
          .video-js .vjs-big-play-button .vjs-icon-placeholder:before {
            color: white !important;
            font-size: 40px !important;
          }
          
          .video-js * {
            touch-action: manipulation;
          }
        `}
      </style>
      <div className="relative w-full md:w-180 aspect-video bg-black">
        <div data-vjs-player>
          <video
            ref={videoRef}
            className="video-js"
            preload="metadata"
          >
            <source 
              src="https://ik.imagekit.io/greenraven/MJ/Is%20Dropshipping%20possible%20in%20lebanon%20%20-%20Majd%20Abdulsalam%20%20%D9%85%D8%AC%D8%AF%20(720p,%20h264,%20youtube).mp4" 
              type="video/mp4" 
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default VSLVideoPlayer;