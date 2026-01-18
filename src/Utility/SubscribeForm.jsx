import { FaEnvelope, FaUser, FaUnlock} from "react-icons/fa"
import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

const SubscribeForm = () => {
  const { updateUserData, setToken } = useAuth()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

 const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError("")
  
  const formData = new FormData(e.target)
  const name = formData.get("name")
  const email = formData.get("email")
  
  if (!name || !email) {
    setError("Please fill in all fields")
    setIsSubmitting(false)
    return
  }
  
  try {
    const subscriptionToken = setToken('subscribed')
    updateUserData(name, email)
    
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
          api_secret: import.meta.env.VITE_CONVERTKIT_API_SECRET, // V3 needs both
          email: email,
          first_name: name,
          fields: {
            token: subscriptionToken
          }
        })
      }
    )
    
    const data = await response.json()
    console.log('V3 API Response:', data) // Debug log
    
    if (data.subscription) {
      // Success! Navigate to free guide
      navigate(`/free-guide-unlocked/${subscriptionToken}`)
    } else {
      const errorMsg = data.error || 'Subscription failed'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
    
  } catch (err) {
    console.error('Subscription error:', err)
    e.target.reset()
    setError(err.message || "Subscription failed. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <>
      {/* No need for hidden form anymore! */}
      
      {/* Your Visible Form */}
      <form className="sub-form cloudy-gradient" onSubmit={handleSubmit}>
        <h3 className="text-center font-semibold text-white">Wanna learn how?</h3>
        
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

        <button 
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
                <p className="txt-1">Subscribe to Learn More!</p>
                <h4 className="txt-2">Discover how DropArabia actually works!</h4>
              </div>
            </>
          )}
        </button>
      </form>
    </>
  )
}

export default SubscribeForm