import { useParams } from "react-router-dom"
import { useAuth } from "../Utility/AuthContext"
import CustomVideoPlayer from "./CustomVideoPlayer"
import Carousel from "../Utility/Carousel"
import SurveyForm from "../Utility/SurveyForm"

const SecondPage = () => {
  const { token } = useParams()
  const { tokens, validateToken } = useAuth()
  
  const isValidToken = validateToken('subscribed', token)
  
  if (!isValidToken) {
    return (
      <div className="section relative flex flex-col justify-center items-center gap-4 p-2">
        <h1 className="text-center font-bold">Nice Try 😏</h1>
        <h2 className="text-center text-xl">
          Please go back and subscribe to watch the free guide
        </h2>
        <button 
          className="shining-button p-2 text-xl mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    )
  }
  
  return (
    <div className='relative flex flex-col justify-center gap-2 md:gap-6 overflow-hidden p-1'>
      {/* Background Patterns - placed BELOW content */}
<<<<<<< HEAD
<<<<<<< HEAD
      <div className='bg-patterns w-full h-[50%] hero-asset absolute bg-[6%_auto] xl:bg-[2%_auto] inset-0 -z-10 opacity-30'/>
      <div className='bg-patterns w-full h-[50%] hero-asset2 absolute bg-[6%_auto] xl:bg-[2%_auto] bottom-0 right-0 -z-10 opacity-30'/>
      
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 flex flex-col justify-center gap-2 md:gap-6 xl:gap-2 pt-5">
        <h2 className="text-center font-bold">Congratulations!</h2>
        <p className="text-center font-semibold">Now discover how dropshipping can be a great way to build a profitable online business without holding inventory</p>
           <div className="text-center">
          <div className="h-1 w-[80vw] my-4 bg-white inline-block" />
        </div>
        <h2 className="text-accent2 text-center">
          <span className="underline font-semibold text-white uppercase">Step 1:</span> Watch this guide
        </h2>
        <CustomVideoPlayer/>
        <br/>
        <h2 className="text-accent2 text-center">
          <span className="underline font-semibold text-white uppercase">Step 2:</span> Book your free call
        </h2>
=======
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      <div className='bg-patterns w-full h-[50%] hero-asset absolute bg-[6%_auto] md:bg-[2%_auto] inset-0 -z-10 opacity-30'/>
      <div className='bg-patterns w-full h-[50%] hero-asset2 absolute bg-[6%_auto] md:bg-[2%_auto] bottom-0 right-0 -z-10 opacity-30'/>
      
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 flex flex-col justify-center gap-2 sm:gap-6 md:gap-2 pt-5">
        <h1 className="text-center font-bold">Congratulations!</h1>
        <h3 className="text-center font-normal!">
          Ready to learn more about this business model and how you can get started?
        </h3>
           <div className="text-center">
          <div className="h-[0.1rem] w-[80vw] my-4 bg-white inline-block" />
        </div>
        <h1 className="text-accent2 text-center">
          <span className="underline font-semibold text-white uppercase">Step 1:</span> Discover how dropshipping works
        </h1>
        <CustomVideoPlayer/>
        <br/>
        <h1 className="text-accent2 text-center">
          <span className="underline font-semibold text-white uppercase">Step 2:</span> Book a free call with our team
        </h1>
<<<<<<< HEAD
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
        <h4 className="text-center">Be sure to watch the entire video first</h4>
        <SurveyForm/>

        <div className="text-center">
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="h-1 w-[80vw] my-4 bg-white inline-block" />
        </div>
      
        <div className="text-center font-semibold flex flex-col gap-2">
          <h2>
          Case studies of <span className="font-bold text-cyan-400">400</span>+ individuals who used our System
          </h2>
=======
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
          <div className="h-[0.1rem] w-[80vw] my-4 bg-white inline-block" />
        </div>
      
        <div className="text-center font-semibold flex flex-col gap-2">
          <h1>
          Case studies of <span className="font-bold text-cyan-400">400</span>+ individuals who used our System
          </h1>
<<<<<<< HEAD
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
          <br/>
          <Carousel/>
        </div>
      </div>
    </div>
  )
}

export default SecondPage