export const UnqualifiedForm = async (userData, setToken, navigate) => {
  try {
    // Generate unqualified token first
    const unqualifiedToken = setToken('unqualified');

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${import.meta.env.VITE_CONVERTKIT_UNQUALIFIED_ID}/subscribe`,
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
            token: unqualifiedToken,
            source: 'unqualified_survey_result'
          }
        })
      }
    );

    const data = await response.json();

    if (data.subscription) {
      // Navigate to get-free-program page with the token
      navigate(`/get-free-program/${unqualifiedToken}`);
      return { success: true, token: unqualifiedToken };
    } else {
      throw new Error(data.error || 'Subscription failed');
    }
  } catch (err) {
    console.error('Unqualified form submission error:', err);
    throw new Error('Failed to submit. Please try again.');
  }
};