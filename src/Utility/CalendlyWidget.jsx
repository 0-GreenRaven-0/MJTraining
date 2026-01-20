import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import { QualifiedForm } from './QualifiedForm';

const CalendlyWidget = ({ 
  url = "https://calendly.com/d/cx6h-n22-cr7/45-min-droparabia-advisory-call", 
  style = {}, 
  className = "" 
}) => {
  const navigate = useNavigate();
  const { userData, setToken } = useAuth();
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const handleCalendlyEvent = async (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled!', e.data.payload);

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

    // Load Calendly script only once
    const loadCalendlyScript = () => {
      if (scriptLoadedRef.current) return;

      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );

      if (existingScript) {
        scriptLoadedRef.current = true;
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.type = 'text/javascript';
      
      script.onload = () => {
        console.log('Calendly script loaded successfully');
        scriptLoadedRef.current = true;
      };
      
      script.onerror = () => {
        console.error('Failed to load Calendly script');
      };

      document.head.appendChild(script);
    };

    loadCalendlyScript();

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, [navigate, userData, setToken]);

  return (
    <div 
      className={`calendly-inline-widget w-full ${className}`}
      data-url={`${url}?hide_event_type_details=1&hide_gdpr_banner=1`}
      style={{
        minWidth: '320px',
        height: '700px',
        ...style
      }}
    />
  );
};

export default CalendlyWidget;