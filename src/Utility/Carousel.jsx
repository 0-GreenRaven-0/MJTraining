import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'

const images = [
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/Gemini_Generated_Image_3wxoat3wxoat3wxo__1_-removebg-preview.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/21.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/12.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/1.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/20.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/8.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/23.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/7.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/11.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/25.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/22.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/19.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/14.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/6.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/17.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/15.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/13.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/18.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/9.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/10.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/4.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/3.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/2.png",
  "https://ik.imagekit.io/greenraven/MJ/Testimonials/16.png"
]

const Carousel = ({ className = '' }) => {
  const isTablet = useMediaQuery({ 
    minWidth: 768, 
    maxWidth: 1280 
  })
  const isDesktop = useMediaQuery({ minWidth: 1025 })

  return (
    <>
      <style>{`
        .carousel-container {
          max-width: 100vw;
          overflow: hidden;
        }
        
        .swiper-button-prev-custom:after,
        .swiper-button-next-custom:after {
          display: none;
        }
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          transition: background-color 0.3s ease;
          width: 40px;
          height: 40px;
        }
        
        @media (min-width: 768px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            width: 50px;
            height: 50px;
          }
        }
        
        @media (min-width: 1280px) {
          .swiper-button-prev-custom,
          .swiper-button-next-custom {
            width: 60px;
            height: 60px;
          }
        }
        
        /* Fix for blurry images - maintain aspect ratio */
        .testo-img {
          width: auto !important;
          max-width: 100%;
          height: auto;
          margin: 0 auto;
        }
        
        /* Center the images in slides */
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
        }
        
        /* Prevent swiper overflow */
        .swiper {
          overflow: hidden;
        }
      `}</style>

      <div className={`carousel-container ${className}`} style={{ direction: 'ltr' }}>
        <div className="relative px-12 md:px-16 overflow-x-hidden!">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom"
            }}
            loop={true}
            spaceBetween={20}
            slidesPerView={isDesktop ? 3 : 1}
            className="pb-12"
            dir="ltr"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={img} 
                  className="testo-img"
                  loading="lazy"
                  alt={`Carousel image ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-secondary rounded-full flex items-center justify-center text-white hover:bg-cyan-600 transition-colors">
            <FaArrowLeft className='md:text-6xl'/>
          </div>

          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-secondary rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
            <FaArrowRight className='md:text-6xl'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel