import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';
import CalendlyWidget from "../Utility/CalendlyWidget";
import confetti from 'canvas-confetti';

const Qualified = () => {
  const { token } = useParams();
  const { validateToken } = useAuth();
  const containerRef = useRef(null);
  
<<<<<<< HEAD
<<<<<<< HEAD
  // Check if the URL token is valid and matches 'qualified' type
  const isValidToken = validateToken('qualified', token);
  
  // If token is invalid or missing, show error message
=======
  const isValidToken = validateToken('qualified', token);
  
>>>>>>> dc6b067 (Version 1.8)
=======
  const isValidToken = validateToken('qualified', token);
  
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
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
<<<<<<< HEAD
<<<<<<< HEAD
    // Trigger confetti effect when component mounts
    const launchConfetti = () => {
      // Multiple confetti bursts
=======
    const launchConfetti = () => {
>>>>>>> dc6b067 (Version 1.8)
=======
    const launchConfetti = () => {
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

<<<<<<< HEAD
<<<<<<< HEAD
      // Second burst after delay
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
      }, 250);

<<<<<<< HEAD
<<<<<<< HEAD
      // Third burst after delay
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);

<<<<<<< HEAD
<<<<<<< HEAD
      // Fourth burst - stars
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 100,
          decay: 0.91,
          scalar: 1.2,
          shapes: ['star']
        });
      }, 600);

<<<<<<< HEAD
<<<<<<< HEAD
      // Continuous subtle confetti
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
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

<<<<<<< HEAD
<<<<<<< HEAD
    // Start confetti after a small delay to ensure component is rendered
    const timer = setTimeout(launchConfetti, 300);

=======
    const timer = setTimeout(launchConfetti, 300);
>>>>>>> dc6b067 (Version 1.8)
=======
    const timer = setTimeout(launchConfetti, 300);
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
    return () => clearTimeout(timer);
  }, []);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className='survey-page items-center survey-bg' ref={containerRef}>
      <div className="confetti-container" style={{ position: 'relative', width: '100%', overflowX: 'hidden', overflowY: 'visible' }}>
        {/* Animated heading */}
        <h2 
          className="text-center font-bold text-3xl md:text-6xl xl:text-4xl pb-4 md:pb-8"
          style={{
            animation: 'slideUpFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
          }}
        >
          We're a good fit for you!
        </h2>
        
        {/* Animated paragraph */}
        <p 
          className="font-semibold text-lg md:text-4xl xl:text-2xl mb-6 text-center"
          style={{
            animation: 'slideUpFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both',
          }}
        >
          Our team is looking forward to help you make real income online!
        </p>
        
        {/* Animated subheading */}
        <h4 
          className="text-center text-gray-600 mb-8 md:text-4xl xl:text-xl"
          style={{
            animation: 'slideUpFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both',
          }}
        >
          Select an available time that best suits you
        </h4>
        
        {/* Calendly Widget with animation */}
        <div 
          style={{
            animation: 'scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s both',
          }}
        >
          <CalendlyWidget />
        </div>
      </div>
      
      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Add some subtle floating animation to the heading */
        h2 {
          position: relative;
          color: #3b82f6;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Add a celebratory effect to the text */
        h2::after {
          content: '🎉';
          position: absolute;
          top: -10px;
          right: -35px;
          font-size: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(10deg);
          }
        }
        
        /* Optional: Add a subtle glow to the main heading */
        h2 {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Add a celebratory background pattern */
        .confetti-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 30%);
          pointer-events: none;
          z-index: -1;
        }
      `}</style>
=======
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
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
<<<<<<< HEAD
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
    </div>
  );
};

export default Qualified;