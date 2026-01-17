import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const PanoramaCarousel = () => {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);

  const isSm = useMediaQuery({ minWidth: 640 });
  const isMd = useMediaQuery({ minWidth: 768 });
  const isLg = useMediaQuery({ minWidth: 1024 });
  const isXl = useMediaQuery({ minWidth: 1280 });
  const is2Xl = useMediaQuery({ minWidth: 1536 });


  let size = isMd? '28vw, 28vh' : isSm ? '45vw, 45vh' : '34vw, 34vh';


  const images = [
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/Gemini_Generated_Image_3wxoat3wxoat3wxo__1_-removebg-preview.png?updatedAt=1765645485707',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/12.png?updatedAt=1765296260813',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/23.png?updatedAt=1765296260527',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/20.png?updatedAt=1765296260747',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/18.png?updatedAt=1765296259277',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/17.png?updatedAt=1765296259510',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/9.png?updatedAt=1765296259228',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/4.png?updatedAt=1765296259199',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/2.png?updatedAt=1765296258983',
    'https://ik.imagekit.io/greenraven/MJ/Testimonials/16.png?updatedAt=1765296258922',
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



        let rotation = isMd ? 18 : 30;

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

      // Auto-scroll animation using _track
      const speed = 0.6; // Change this value to control speed (higher = faster)
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
      
      // Resume animation when window regains focus
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
  }, []);

  return (
    <div >
      <div
        ref={containerRef}
        className="carousel fixed top-1/2 left-0 w-full opacity-90! transition-opacity duration-[250ms]"
        style={{
          transform: 'translateY(-50%)',
          height: `max(${size})`,
          perspective: `calc(max(${size}) * 5.55)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="slide absolute rounded-2xl overflow-hidden" style={{
            width: `calc(max(${size}) * 0.6)`,
            height: `max(${size})`,
            boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.1)',
          }}>
            <img
              src={src}
              alt=""
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