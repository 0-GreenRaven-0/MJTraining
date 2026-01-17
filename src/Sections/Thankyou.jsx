import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';

const Thankyou = () => {
  const { token } = useParams();
  const { validateToken } = useAuth();

  // Check if the URL token is valid and matches 'booked' type
  const isValidToken = validateToken('booked', token);

  if (!isValidToken) {
    return (
      <div className="section relative flex flex-col justify-center items-center gap-4 bg-first text-white">
        <h1 className="text-center text-3xl font-bold">You Haven't Booked a call yet!</h1>
        <h2 className="text-center text-xl">
          Please go back and book your call
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
    <div className="section relative flex flex-col justify-center items-center gap-4 bg-first text-white">
      <h1 className="text-center text-3xl font-bold">You're All Set!</h1>
      <h2 className="text-center text-xl">
        Check your email for the zoom call link!
      </h2>
    </div>
  );
}

export default Thankyou;