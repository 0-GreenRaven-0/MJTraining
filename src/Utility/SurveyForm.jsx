import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const SurveyForm = () => {
  const { userData, setToken } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Generate token first
      const token = setToken('takeSurvey');
      
      // Use the V3 API for this form submission
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${import.meta.env.VITE_CONVERTKIT_SURVEY_UNFINISHED_ID}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: import.meta.env.VITE_CONVERTKIT_API_KEY,
            api_secret: import.meta.env.VITE_CONVERTKIT_API_SECRET,
            email: userData.email,
            first_name: userData.name,
            fields: {
              token: token,
              phone_number: userData.phone,
              source: 'free_guide_survey'
            }
          })
        }
      );

      const data = await response.json();

      if (data.subscription) {

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'user_surveynotfinished',
        user_name: userData.name,
        user_email: userData.email,
        user_phone: userData.phone,
      });
        // Navigate to survey page with the token
        navigate(`/book-your-call/${token}`);
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err) {
      console.error('Survey form submission error:', err);
      setError('Failed to book your call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="survey-form-container flex flex-col items-center justify-center">
      {error && (
        <div className="error-message text-red-500 text-center mb-3">
          {error}
        </div>
      )}
      
      <button 
        id="book-call-btn"
        className="shining-button p-2 text-2xl md:text-4xl md:p-4 md:px-25!"
        onClick={handleSubmit}
        disabled={isSubmitting || !userData.email || !userData.name}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
            <span>Loading...</span>
          </div>
        ) : (
          'Book Your Call!'
        )}
      </button>
    </div>
  );
};

export default SurveyForm;