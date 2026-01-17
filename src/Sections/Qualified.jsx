import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';
import CalendlyWidget from "../Utility/CalendlyWidget";
import confetti from 'canvas-confetti';

const Qualified = () => {
  const { token } = useParams();
  const { validateToken } = useAuth();
  const containerRef = useRef(null);
  
  const isValidToken = validateToken('qualified', token);
  
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
  
  useEffect(() => {
    const launchConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 250);

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);

      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 100,
          decay: 0.91,
          scalar: 1.2,
          shapes: ['star']
        });
      }, 600);

      const duration = 3000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: Math.random() },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    };

    const timer = setTimeout(launchConfetti, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Background patterns */}
      <div className='bg-patterns w-full h-[50%] hero-asset absolute inset-0 z-0 opacity-30 pointer-events-none'/>

      
      <div className='flex items-center justify-center p-4 min-h-screen relative z-10' ref={containerRef}>
        <div className='w-full max-w-4xl space-y-6'>
          {/* Header Section */}
          <div className='text-center space-y-4'>
            <h2 className="font-bold text-blue-300">
              We're a good fit for you! 🎉
            </h2>
            
            <p className="font-semibold text-white">
              Our team is looking forward to get you started on your dropshipping journey!
            </p>
            
            <h4 className="text-white">
              Select an available time that best suits you
            </h4>
            <h4 className="text-white">
              Wait for the calendar form to load...
            </h4>
          </div>
          
          {/* Calendly Widget */}
          <div>
            <CalendlyWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qualified;