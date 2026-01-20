import { FaEnvelope, FaUser, FaUnlock, FaPhone} from "react-icons/fa"
import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

const SubscribeForm = () => {
  const { updateUserData, setToken } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [phoneValue, setPhoneValue] = useState("+961 ")

  const handlePhoneChange = (e) => {
    let value = e.target.value
    // Remove all spaces first
    value = value.replace(/\s/g, '')
    
    // Ensure +961 always stays at the beginning and only digits after
    if (value.startsWith("+961")) {
      // Only allow digits after +961
      const digitsAfter961 = value.slice(4).replace(/\D/g, '')
      // Add space after +961 for display clarity
      setPhoneValue("+961 " + digitsAfter961)
    } else {
      setPhoneValue("+961 ")
    }
  }

  const handlePhoneKeyDown = (e) => {
    // Prevent deletion of +961 and the space (length 5)
    if (phoneValue.length <= 5 && (e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault()
    }
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError("")
  
  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = phoneValue.replace(/\s/g, '')

   window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'user_subscribed',
        user_name: name,
        user_email: email,
        user_phone: phone,
      });
  
  if (!name || !email || !phone) {
    setError("Please fill in all fields")
    setIsSubmitting(false)
    return
  }
  
  // Validate Lebanese phone number format: +961 followed by 8 digits
  const phoneRegex = /^\+961\d{8}$/
  if (!phoneRegex.test(phone)) {
    setError("Please enter a valid Lebanese phone number (8 digits after +961)")
    setIsSubmitting(false)
    return
  }
  
  try {
    const subscriptionToken = setToken('subscribed')
    updateUserData(name, email, phone)
    
    // V3 API call
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${import.meta.env.VITE_CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: import.meta.env.VITE_CONVERTKIT_API_KEY,
          api_secret: import.meta.env.VITE_CONVERTKIT_API_SECRET,
          email: email,
          first_name: name,
          fields: {
            token: subscriptionToken,
            phone_number: phone
          }
        })
      }
    )
    
    const data = await response.json()
    console.log('V3 API Response:', data)
    
    if (data.subscription) {
      navigate(`/free-guide-unlocked/${subscriptionToken}`)
    } else {
      const errorMsg = data.error || 'Subscription failed'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
    
  } catch (err) {
    console.error('Subscription error:', err)
    e.target.reset()
    setPhoneValue("+961")
    setError(err.message || "Subscription failed. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <>
      <form className="sub-form cloudy-gradient" onSubmit={handleSubmit}>
        <h2 className="text-center font-semibold text-white">Subscribe to watch the free tutorial!</h2>
        
        {error && (
          <div className="error-message text-red-500 text-center mb-3">
            {error}
          </div>
        )}
        
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-accent1 input-icon" />
          <input 
            className="form-input pl-10 w-full md:pl-15"
            name="name"
            type="text"
            placeholder="Your Name"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 text-accent1 -translate-y-1/2 input-icon" />
          <input 
            className="form-input pl-10 md:pl-15 w-full"
            name="email"
            type="email"
            placeholder="Your Best Email"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 text-accent1 -translate-y-1/2 input-icon" />
          <input 
            className="form-input pl-10 md:pl-15 w-full"
            name="phone"
            type="tel"
            placeholder="+961 70 123 456"
            value={phoneValue}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            required
            disabled={isSubmitting}
          />
        </div>

        <button 
          id="subscribe-btn"
          className="sub-btn shining-button" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-2"></div>
                <p className="txt-1">Processing...</p>
              </div>
            </>
          ) : (
            <>
              <FaUnlock className="text-5xl" />
              <div className="inside-sub-btn">
                <p className="txt-1">Unlock the tutorial!</p>
                <h4 className="txt-2">Learn how to use DropArabia!</h4>
              </div>
            </>
          )}
        </button>
      </form>
    </>
  )
}

export default SubscribeForm