export const HaventBookedForm = async (userData, setToken, navigate) => {
  try {
    // Generate qualified token first
    const qualifiedToken = setToken('qualified');

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${import.meta.env.VITE_CONVERTKIT_HAVENT_BOOKED_ID}/subscribe`,
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
            token: qualifiedToken,
            phone_number: userData.phone,
            source: 'qualified_survey_result'
          }
        })
      }
    );

    const data = await response.json();

    if (data.subscription) {
      // Navigate to choose-schedule page with the token
      navigate(`/choose-schedule/${qualifiedToken}`);
      return { success: true, token: qualifiedToken };
    } else {
      throw new Error(data.error || 'Subscription failed');
    }
  } catch (err) {
    console.error('Qualified form submission error:', err);
    throw new Error('Failed to submit. Please try again.');
  }
};