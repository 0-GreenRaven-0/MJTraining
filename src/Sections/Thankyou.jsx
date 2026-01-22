import { useParams } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';

const Thankyou = () => {
  const { token } = useParams();
  const { validateToken } = useAuth();

  const isValidToken = validateToken('booked', token);

  if (!isValidToken) {
    return (
      <main className="section relative flex flex-col justify-center items-center gap-4 py-20">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You Haven't Booked a call yet!</h1>
          <h2 className="text-xl text-gray-700 mb-6">
            Please go back and book your call
          </h2>
          <button 
            className="px-7 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all text-xl w-full"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="section relative flex flex-col justify-center items-center gap-4 py-20">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl border-2 border-blue-200 p-12 max-w-2xl text-center">
        <div className="mb-6">
          <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">You're All Set!</h1>
        <h2 className="text-xl text-gray-700">
          Check your email for the zoom call link!
        </h2>
      </div>
    </main>
  );
}

export default Thankyou;