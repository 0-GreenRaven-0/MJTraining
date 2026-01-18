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
      <div className='bg-patterns w-full h-[50%] hero-asset absolute bg-[6%_auto] md:bg-[2%_auto] inset-0 -z-10 opacity-30'/>
      <div className='bg-patterns w-full h-[50%] hero-asset2 absolute bg-[6%_auto] md:bg-[2%_auto] bottom-0 right-0 -z-10 opacity-30'/>
      
      <div className="relative z-10 flex flex-col justify-center gap-2 sm:gap-6 md:gap-2 pt-5">
                     <div className="flex items-center justify-center gap-1">
                 <img className="w-25" src="https://ik.imagekit.io/greenraven/MJ/Droparabia.png?updatedAt=1764957826813"/>
                 
                 <p className="text-5xl font-bold">
                  DropArabia
                 </p>
            </div>
        <p className="text-center font-semibold lg:px-40">
         Unlike traditional dropshipping where you order huge inventories that might not sell, test the demand of different products with low budget, find your winning products and the software handles the order fullfilment and shipment!
        </p>
           <div className="text-center">
          <div className="h-[0.1rem] w-[80vw] my-4 bg-black inline-block" />
        </div>
        <h1 className=" text-center">
          <span className="underline font-semibold text-accent1 uppercase">Step 1:</span> Discover how DropArabia works
        </h1>
        <CustomVideoPlayer/>
        <br/>
        <h1 className=" text-center">
          <span className="underline font-semibold text-accent1 uppercase">Step 2:</span> Book a free call with our team
        </h1>
        <h4 className="text-center">Be sure to watch the entire video first</h4>
        <SurveyForm/>

        <div className="text-center">
          <div className="h-[0.1rem] w-[80vw] my-4 bg-black inline-block" />
        </div>
      
        <div className="text-center font-semibold flex flex-col gap-2">

          <h3>
          Case studies of <span className="font-bold text-accent1">250</span>+ member using the software from our
          </h3>
                                         <div className="flex items-center justify-center gap-1">
                 <img className="w-20" src="https://ik.imagekit.io/greenraven/MJ/dropvault.png?updatedAt=1761577922501"/>
                 
                 <p className="text-2xl md:text-4xl font-bold">
                  DropVault Community
                 </p>
  
            </div>
   
           <a className="text-accent1 font-normal hover:text-purple-800" href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODQ5NzQ0Mjc5OTk4NTU5?story_media_id=3435351326684433663_54543950174&igsh=MTlvbzJ6bWJvend5cw==">Click Here to see the latest reviews of our members</a>
          <Carousel/>
        </div>
      </div>
    </div>
  )
}

export default SecondPage