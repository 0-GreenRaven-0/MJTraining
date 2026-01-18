import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';

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

        {/* Main Content Section */}
        <div className='text-center space-y-2'>
          <h3 className="font-bold text-blue-600 text-2xl">But Worry Not!</h3>
          <p className='text-gray-700 text-lg'>
            We sent you this <span className='text-blue-600 font-bold'>FREE</span> Guide to your email!
          </p>
        </div>

        {/* Image and Description Section */}
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 pt-4'>
          <img 
            src='https://ik.imagekit.io/greenraven/MJ/1761674331.png?updatedAt=1761674791148' 
            className='free-guide-img w-48' 
            alt="Free Guide"
          />
          
          <div className='flex flex-col gap-3 max-w-lg'>
            <p className='text-center md:text-left text-gray-700 leading-relaxed'>
              A comprehensive <span className='text-blue-600 font-bold'>FREE</span> guide with everything you need to know about Local Dropshipping to get you started on the right foot. Consider this your roadmap!
            </p>

            <p className='text-center md:text-left text-gray-700 leading-relaxed'>
              Take your time, master the basics, and when you're ready to scale, we'll be here waiting for you. 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unqualified;