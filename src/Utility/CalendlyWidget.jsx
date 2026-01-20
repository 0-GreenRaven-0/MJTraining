import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import {QualifiedForm} from './QualifiedForm'

const CalendlyWidget = ({ url = "https://calendly.com/d/cx6h-n22-cr7/45-min-droparabia-advisory-call", style = {}, className="" }) => {
  const navigate = useNavigate();
  const { userData, setToken } = useAuth();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Listen for Calendly booking events
    const handleCalendlyEvent = async (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled!', e.data.payload);

    // Push event to dataLayer for GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'call_booked'
        });
        
        try {
          await QualifiedForm(userData, navigate, setToken);
        } catch (error) {
          console.error('Error processing booking:', error);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      console.log('Calendly script loaded successfully');
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Calendly script');
    };

    // Only add if not already present
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [navigate, userData, setToken]);

  return (
    <>
      <div 
        className={`calendly-inline-widget w-full ${className}`}
        data-url={`${url}?hide_event_type_details=1&hide_gdpr_banner=1`}
        style={{
          minWidth: '320px',
          height: '700px',
          ...style
        }}
      />
      {!scriptLoaded && (
        <div className="flex items-center justify-center" style={{ height: '700px' }}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
};

export default CalendlyWidget;