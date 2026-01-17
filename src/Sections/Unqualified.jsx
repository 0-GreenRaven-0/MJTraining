import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';

const Unqualified = () => {
  const { token } = useParams();
  const { validateToken } = useAuth();
  
  const isValidToken = validateToken('unqualified', token);
  
  if (!isValidToken) {
    return (
      <div className="section relative flex flex-col justify-center items-center gap-4 min-h-[60vh]">
        <h1 className="text-center text-3xl font-bold">No cheating allowed! 😏</h1>
        <h2 className="text-center text-xl">
          Please go back and finish the survey first
        </h2>
        <button 
          className="shining-button p-2 text-xl mt-4"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Background patterns */}
      <div className='bg-patterns w-full h-[50%] hero-asset absolute inset-0 z-0 opacity-30 pointer-events-none'/>
      <div className='bg-patterns w-full h-[50%] hero-asset2 absolute bottom-0 right-0 z-0 opacity-30 pointer-events-none'/>
      
      <div className='flex items-center justify-center p-4 min-h-screen relative z-10'>
        <div className='w-full max-w-4xl space-y-6'>
          {/* Header Section */}
          <div className='text-center space-y-4'>
            <h2 className='font-semibold text-white'>Not Quite Yet...</h2>
            <p className='text-white'>
              Based on your answers, it looks like now might not be the perfect time for you.
            </p>
          </div>

          {/* Main Content Section */}
          <div className='space-y-4 text-center'>
            <h3 className="font-semibold text-white">But Worry Not!</h3>
            <p className='text-white'>
              We sent you this <span className='text-blue-400 font-bold'>FREE</span> Guide to your email!
            </p>
          </div>

          {/* Image and Description Section */}
          <div className='flex flex-col md:flex-row items-center justify-center gap-6'>
            <img 
              src='https://ik.imagekit.io/greenraven/MJ/1761674331.png?updatedAt=1761674791148' 
              className='free-guide-img' 
              alt="Free Guide"
            />
            
            <div className='flex flex-col gap-4 max-w-lg'>
              <p className='text-center md:text-left font-semibold text-white'>
                A comprehensive <span className='text-blue-400 font-bold'>FREE</span> guide with everything you need to know about Local Dropshipping to get you started on the right foot. Consider this your roadmap!
              </p>

              <p className='text-center md:text-left font-semibold text-white'>
                Take your time, master the basics, and when you're ready to scale, we'll be here waiting for you. 💪
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unqualified;