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
      <main className="section relative flex flex-col justify-center items-center gap-4 min-h-[60vh]">
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
      </main>
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
    <main>
      <div className='flex items-center justify-center p-4 min-h-screen' ref={containerRef}>
        <div className='w-full max-w-4xl space-y-6'>
          <div className='text-center space-y-4'>
            <h1 className="font-bold text-blue-600">
              We're a good fit for you! 🎉
            </h1>
            
            <h3 className="font-semibold text-gray-800">
              Our team is looking forward to get you started on your dropshipping journey!
            </h3>
            
            <h4 className="text-gray-700">
              Select an available time that best suits you
            </h4>
            <h4 className="text-gray-600">
              Wait for the calendar form to load...
            </h4>
          </div>
          
          <div>
            <CalendlyWidget />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Qualified;