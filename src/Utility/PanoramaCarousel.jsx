import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const PanoramaCarousel = () => {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  const isSm = useMediaQuery({ minWidth: 640 });
  const isMd = useMediaQuery({ minWidth: 768 });

  let size = isMd? '30vw, 30vh' : isSm ? '45vw, 45vh' : '37vw, 37vh';

  const images = [
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo.png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(1).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(2).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(3).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(4).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(5).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(6).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(7).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(8).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(9).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(10).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(11).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(12).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(13).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(14).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(15).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(16).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(17).png?tr=w-320,q-80,f-webp',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Testo%20(18).png?tr=w-320,q-80,f-webp',
  ];

  useEffect(() => {
    const loadVevet = async () => {
      const { Snap } = await import('https://esm.sh/vevet@5');
      
      const carousel = new Snap({
        container: containerRef.current,
        direction: "horizontal",
        grabCursor: true,
        centered: true,
        loop: true,
        gap: 10,
        freemode: true
      });

      carousel.on("update", () => {
        const depth = 200;
        let rotation = isMd ? 18 : isSm ? 22 : 24;

        const scale = 1 / (180 / rotation);
        const halfAngle = (rotation * Math.PI) / 180 / 2;
        
        carousel.slides.forEach(({ element, coord, progress, size }) => {
          const factor = 1 - Math.cos(progress * scale * Math.PI);
          const xOffset = progress * (size / 3) * factor;
          const zOffset = ((size * 0.5) / Math.sin(halfAngle)) * factor - depth;
          const rotateY = progress * rotation;
          element.style.transform = `translateX(${coord + xOffset}px) translateZ(${zOffset}px) rotateY(${rotateY}deg)`;
        });
      });

      containerRef.current.classList.add("ready");
      setIsReady(true);
      carouselRef.current = carousel;

      const speed = 0.6;
      let lastTime = performance.now();
      
      const autoScroll = (currentTime) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        if (carousel && carousel._track) {
          carousel._track._target -= speed;
        }
        autoScrollRef.current = requestAnimationFrame(autoScroll);
      };
      
      autoScrollRef.current = requestAnimationFrame(autoScroll);
      
      const handleVisibilityChange = () => {
        if (!document.hidden) {
          lastTime = performance.now();
          if (!autoScrollRef.current) {
            autoScrollRef.current = requestAnimationFrame(autoScroll);
          }
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    };

    loadVevet();

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      if (carouselRef.current && carouselRef.current.destroy) {
        carouselRef.current.destroy();
      }
    };
  }, [isMd]);

  return (
    <div className="w-screen relative scrollbar-hide overflow-hidden" style={{ height: `max(${size})` }}>
      <div
        ref={containerRef}
        className="carousel absolute inset-0 transition-opacity duration-[250ms]"
        style={{
          perspective: `calc(max(${size}) * 5.55)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="slide absolute  " style={{
            width: `calc(max(${size}) * 0.6)`,
            height: `max(${size})`,
         
          }}>
            <img
              loading='lazy'
              id="3d-carousel-img"
              src={src}
              alt="Testimonial"
              className="block w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}
      </div>
      <style>{`
        .carousel.ready {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default PanoramaCarousel;