import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
      <h1 className="text-4xl font-bold mb-4 ">
        404 Page Not Found :(
      </h1>
      <h3 className="text-xl mb-8 ">
        The requested page could not be found
      </h3>
      
      <button 
        onClick={handleGoBack}
        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;