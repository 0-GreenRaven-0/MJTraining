import { useState, useEffect } from "react"
import PanoramaCarousel from "../Utility/PanoramaCarousel"
import SubscribeForm from "../Utility/SubscribeForm"

const FirstPage = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [introFade, setIntroFade] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Start fade out animation
    const fadeTimer = setTimeout(() => {
      setIntroFade(true)
    }, 2000)

    // Remove intro screen after fade completes
    const introTimer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    // Show main content after intro fades
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 2300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(introTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <div className="section relative bg-first overflow-hidden">
      <PanoramaCarousel />
      
      {/* Intro Screen */}
      {showIntro && (
        <div 
          className={`absolute inset-0 bg-blue-900 flex items-center justify-center z-50 transition-opacity duration-700 ${
            introFade ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 
            className="text-white font-bold text-center px-4 animate-fade-in-text max-w-full"
          >
            Dropshipping has never been this easier!
          </h1>
        </div>
      )}

      {/* Main Content */}
      <div className="absolute inset-0 p-2 overflow-hidden">
        <div className="h-full w-full flex flex-col items-center justify-between overflow-hidden">
          <div 
            className={`w-full flex flex-col items-center justify-center cloudy-gradient transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
            }`}
          >
            <h1 
              className="pt-10 md:pt-2 px-2 pb-2 text-center font-bold rounded-lg capitalize headline"
            >
              Launch your own <span className="special">profitable</span> Dropshipping Business without <span className="special">wasting your time & budget</span> learning everything from scratch
            </h1>
            <h4 className="text-center font-semibold">
              A Proven System that helped over 400 of our students score their first sale within 2 weeks!
            </h4>
          </div>
          
          <div 
            className={`transition-all duration-1000 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <SubscribeForm />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInText {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-text {
          animation: fadeInText 2s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default FirstPage