export const QualifiedForm = async (userData, navigate, setToken) => {
  try {

    const bookedToken = setToken('booked');

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${import.meta.env.VITE_CONVERTKIT_QUALIFIED_ID}/subscribe`,
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
            token: bookedToken,
            source: 'booked_result'
          }
        })
      }
    );

    const data = await response.json();

    if (data.subscription) {
      navigate(`/thank-you/${bookedToken}`);
      return { success: true, token: bookedToken };
    } else {
      throw new Error(data.error || 'Subscription failed');
    }
  } catch (err) {
    console.error('qualified form submission error:', err);
    throw new Error('Failed to submit. Please try again.');
  }
};