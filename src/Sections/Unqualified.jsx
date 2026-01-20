import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';
import {FaInstagram, FaFileAlt} from 'react-icons/fa';

const Unqualified = () => {
  const { token } = useParams();
  const { validateToken } = useAuth();
  
  const isValidToken = validateToken('unqualified', token);
  
  if (!isValidToken) {
    return (
      <div className="section relative flex flex-col justify-center items-center gap-4 min-h-[60vh] py-20">
        <h1 className="text-center text-3xl font-bold text-gray-900">No cheating allowed! 😏</h1>
        <h2 className="text-center text-xl text-gray-700">
          Please go back and finish the survey first
        </h2>
        <button 
          className="px-7 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all text-xl mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className='flex items-center justify-center p-4 min-h-screen py-12'>
      <div className='w-full max-w-4xl space-y-6'>
        {/* Header Section */}
        <div className='text-center space-y-2'>
          <h2 className='font-bold text-gray-900 text-3xl'>Not Quite Yet...</h2>
          <p className='text-gray-600 text-lg'>
            Based on your answers, it looks like now might not be the perfect time for you.
          </p>
        </div>


        {/* Image and Description Section */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 pt-4'>
          <img 
            src='https://ik.imagekit.io/greenraven/MJ/1761674331.png?updatedAt=1761674791148' 
            className='free-guide-img w-50 md:w-70' 
            alt="Free Guide"
          />
          
          <div className='flex flex-col gap-2 max-w-lg'>
            <h2 className='text-center md:text-left '>
             But here's a <span className='text-accent1 font-bold'>FREE</span> comprehensive guide with everything you need to know about local dropshipping to get you started on the right foot!
            </h2>

            <button 
              id="check-guide-btn"
              className="sub-btn shining-button gap-1 w-fit mt-4" 
              onClick={() => window.open('https://drive.google.com/file/d/1x_8fS2uGkQ_gUJlWQXInbVxuXqLZp-Lt/view', '_blank')}
            >
              <>
                <FaFileAlt className="text-5xl"/>
                <div className="inside-sub-btn">
                  <p className="txt-1">Check Out the Free Guide</p>
                  <h4 className="txt-2">Get started with local dropshipping!</h4>
                </div>
              </>
            </button>

            <br/>
            <h4>In the meantime, we highly recommend you follow us on Instagram for more engaging content, free knowledge and further announcements!</h4>
           <button 
             id="instagram-follow-btn"
             className="sub-btn shining-button gap-1 w-fit" 
             onClick={() => window.open('https://www.instagram.com/mjbusinessofficial?igsh=ZG44cXRja2l4dGdk', '_blank')}
           >
               <>
                 <FaInstagram className="text-5xl"/>
                 <div className="inside-sub-btn">
                   <p className="txt-1">Follow our Instagram!</p>
                   <h4 className="txt-2">For more content & announcements!</h4>
                 </div>
               </>
           </button>

     
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unqualified;