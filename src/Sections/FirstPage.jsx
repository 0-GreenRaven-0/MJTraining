import { useState, useEffect } from "react"
import PanoramaCarousel from "../Utility/PanoramaCarousel"
import SubscribeForm from "../Utility/SubscribeForm"
import {FaCheckCircle} from 'react-icons/fa';

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
    <main className="relative bg-first overflow-x-hidden scrollbar-hide p-2 pt-0">
      {/* Intro Screen */}
      {showIntro && (
        <div 
          className={`fixed inset-0 bg-blue-900 flex items-center justify-center z-50 transition-opacity duration-700 ${
            introFade ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 
            className="text-white font-bold text-center px-4 animate-fade-in-text max-w-full"
          >
           Stop guessing what sells, start testing with low risk.
          </h1>
        </div>
      )}

      {/* Main Content */}
      <div className="h-full w-full flex flex-col items-center justify-between ">
        <div 
          className={`w-full flex flex-col items-center justify-center cloudy-gradient transition-all duration-1000 `}
        >
          <div className="flex w-screen flex-col gap-2 justify-center items-center text-white">
            
            <div className="flex items-center justify-center gap-1 w-full">
                 <img className="w-25" loading="lazy" alt="DropArabia Logo" src="https://ik.imagekit.io/greenraven/MJ/Droparabia.png?updatedAt=1764957826813?tr=w-175,q-80,f-webp"/>
                 <p className="text-4xl font-bold">
                  DropArabia
                 </p>
            </div>
            <h4 className="text-center font-semibold p-2">
            While others are selling you courses, we built a software to help you...
          </h4>
          </div>
          <h1 
            className=" md:pt-2 px-2 pb-2 text-center font-bold rounded-lg capitalize headline"
          >
            Launch your own <span className="special">profitable</span> Dropshipping Business without wasting <span className="special">Thousands of dollars</span> on inventory that might not sell.
          </h1>
        
        </div>
 <br/>
         <h3 className="text-center font-bold">
            A Proven System that helped 250+ user score their first sale within 2 weeks!
          </h3>
        
        <PanoramaCarousel />
           <br/>
           <br/>

        <div 
          className={`flex flex-col items-center lg:flex-row gap-10 transition-all duration-1000`}
        >
   
<ul className="space-y-3 font-semibold text-lg sm:text-2xl md:text-xl">
  <li>
      <h2 className="flex items-center font-normal">With   
      <div className="px-2 flex items-center gap-1">
        <img className="w-12" loading="lazy" alt="DropArabia Logo" src="https://ik.imagekit.io/greenraven/MJ/Droparabia.png?updatedAt=1764957826813?tr=w-175,q-80,f-webp"/>
                 <p className="text-2xl font-bold">
                  DropArabia:
                 </p>
            </div>
            </h2>
  </li>

  <li className="flex items-center gap-3">
    <FaCheckCircle className="text-blue-500 flex-shrink-0 bullet-icon" />
    <span>Test real winning products starting with as little as 10$/day</span>
  </li>
  <li className="flex items-center gap-3">
    <FaCheckCircle className="text-blue-500 flex-shrink-0 bullet-icon" />
    <span>We handle shipping, COD & fulfillment you focus only on sales</span>
  </li>
  <li className="flex items-center gap-3">
    <FaCheckCircle className="text-blue-500 flex-shrink-0 bullet-icon" />
    <span>Turn winning products into your own branded business (not just dropshipping)</span>
  </li>
  <li className="flex items-center gap-3">
    <FaCheckCircle className="text-blue-500 flex-shrink-0 bullet-icon" />
    <span>Launch a fully working store in 10 to 14 days even if you’re a beginner</span>
  </li>
</ul>
          <SubscribeForm />
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
    </main>
  )
}

export default FirstPage