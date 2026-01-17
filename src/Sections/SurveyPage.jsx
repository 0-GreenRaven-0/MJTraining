import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Utility/AuthContext';
import {HaventBookedForm} from '../Utility/HaventBookedForm';
import {UnqualifiedForm} from '../Utility/UnqualifiedForm';

const SurveyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { validateToken, setToken, userData } = useAuth();
  
  const [currentPage, setCurrentPage] = useState(0);
<<<<<<< HEAD
<<<<<<< HEAD
  const [direction, setDirection] = useState('forward');
=======
  const [direction, setDirection] = useState('next');
>>>>>>> dc6b067 (Version 1.8)
=======
  const [direction, setDirection] = useState('next');
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
  const [formData, setFormData] = useState({
    experience: '',
    budget: '',
    time: '',
    effort: '',
    startTime: '',
    commitment: ''
<<<<<<< HEAD
<<<<<<< HEAD
    // Removed 'source' field
  });
  const [errors, setErrors] = useState({});

  // Check token on component mount
=======
  });
  const [errors, setErrors] = useState({});

>>>>>>> dc6b067 (Version 1.8)
=======
  });
  const [errors, setErrors] = useState({});

>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
  useEffect(() => {
    if (!validateToken('takeSurvey', token)) {
      // Token is invalid - handled in render
    }
  }, [token, validateToken]);

<<<<<<< HEAD
<<<<<<< HEAD
  // If token is invalid, show error message
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
  if (!validateToken('takeSurvey', token)) {
    return (
      <div className="section relative flex flex-col justify-center items-center gap-4 min-h-[60vh]">
        <h1 className="text-center text-3xl font-bold">Please go back and watch the free guide first</h1>
      </div>
    );
  }

  const questions = [
    {
      id: 'experience',
      title: 'Have you attempted dropshipping or e-commerce before?',
      type: 'radio',
      field: 'experience',
      options: [
        { value: 'yes_dropshipping', label: 'Yes, I have tried dropshipping before' },
        { value: 'yes_ecommerce', label: 'I have tried e-commerce before' },
        { value: 'no', label: 'No, I am completely new to this' }
      ]
    },
    {
      id: 'budget',
<<<<<<< HEAD
<<<<<<< HEAD
      title: 'We only work with users who have sufficient startup capital. To start a Local Dropshipping business, costs involve: Software & marketing. Do you have access to a minimum of $500-$700 to get started?',
=======
      title: 'We only work with users who have sufficient startup capital. To start a Local Dropshipping business, costs involve: Software & marketing. Do you have access to a minimum of $600 to get started?',
>>>>>>> dc6b067 (Version 1.8)
=======
      title: 'We only work with users who have sufficient startup capital. To start a Local Dropshipping business, costs involve: Software & marketing. Do you have access to a minimum of $600 to get started?',
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      type: 'radio',
      field: 'budget',
      options: [
        { value: 'yes', label: 'Yes, I have the funds' },
        { value: 'partial', label: 'I have at least $600' },
        { value: 'no', label: "No, I don't have the funds right now" }
      ]
    },
    {
      id: 'time',
      title: 'Starting a dropshipping business requires a bit of free time to learn and manage your business, do you have some free time?',
      type: 'radio',
      field: 'time',
      options: [
        { value: 'yes', label: 'Yes, I have free time' },
        { value: 'makeTime', label: 'I can make time for it' },
        { value: 'no', label: 'No, my schedule is full' }
      ]
    },
    {
      id: 'effort',
      title: "This isn't a get-rich-quick scheme - it requires real work and effort to get the same results as our students. Are you willing to put in the work?",
      type: 'radio',
      field: 'effort',
      options: [
        { value: 'willing', label: 'I am willing to put in the effort' },
        { value: 'whatever', label: "I'll do whatever is required" }
      ]
    },
    {
      id: 'startTime',
      title: "If we're a good fit, how soon could you start?",
      type: 'radio',
      field: 'startTime',
      options: [
        { value: 'today', label: 'Today' },
        { value: 'notReady', label: 'Not ready yet' }
      ]
    },
    {
      id: 'commitment',
      title: 'Is there any reason that will make you cancel the meeting other than a tsunami or an earthquake😅?',
      type: 'radio',
      field: 'commitment',
      options: [
        { value: 'yes1', label: "No, don't worry I will attend for sure" },
        { value: 'yes2', label: 'I will attend for sure' }
      ]
    }
<<<<<<< HEAD
<<<<<<< HEAD
    // Removed the 'source' question entirely
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
  ];

  const totalPages = questions.length;
  const currentQuestion = questions[currentPage];

  const validatePage = () => {
    const newErrors = {};

    if (currentQuestion.type === 'radio') {
      if (!formData[currentQuestion.field]) {
        newErrors[currentQuestion.field] = 'Please select an option';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const determineQualification = (formData) => {
<<<<<<< HEAD
<<<<<<< HEAD
    // 1. Must have budget
    if (formData.budget === 'no') return false;
    
    // 2. Must have time
    if (formData.time === 'no') return false;
    
    // 3. Must be willing to put in effort
    if (formData.effort !== 'willing' && formData.effort !== 'whatever') return false;
    
    // 4. Must be ready to start soon
    if (formData.startTime === 'notReady') return false;
    
=======
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
    if (formData.budget === 'no') return false;
    if (formData.time === 'no') return false;
    if (formData.effort !== 'willing' && formData.effort !== 'whatever') return false;
    if (formData.startTime === 'notReady') return false;
<<<<<<< HEAD
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
    return true;
  };

  const handleNext = async () => {
    if (validatePage()) {
      if (currentPage < totalPages - 1) {
<<<<<<< HEAD
<<<<<<< HEAD
        setDirection('forward');
        setCurrentPage(currentPage + 1);
      } else {
        console.log('Survey completed:', formData);
        
        // Determine qualification based on survey answers
        const isQualified = determineQualification(formData);
        
        // Generate and store the appropriate token in AuthContext
=======
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
        setDirection('next');
        setCurrentPage(currentPage + 1);
      } else {
        console.log('Survey completed:', formData);
        const isQualified = determineQualification(formData);
<<<<<<< HEAD
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b

        if (isQualified) {
          await HaventBookedForm(userData, setToken, navigate);
        } else {
         await UnqualifiedForm(userData, setToken, navigate);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
<<<<<<< HEAD
<<<<<<< HEAD
      setDirection('backward');
=======
      setDirection('prev');
>>>>>>> dc6b067 (Version 1.8)
=======
      setDirection('prev');
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      setCurrentPage(currentPage - 1);
      setErrors({});
    }
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

<<<<<<< HEAD
<<<<<<< HEAD
  // Render the survey questions
  return (
    <div className='section relative overflow-hidden!'>
      <div className='survey-page survey-bg'>
        <div 
          key={currentPage}
          className='flex flex-col gap-3 md:gap-10 xl:gap-2 xl:w-250'
          style={{
            animation: direction === 'forward' ? 'slideInForward 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'slideInBackward 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h4 className='survey-tracker'>Page {currentPage + 1} of {totalPages}</h4>
          <h3 className="survey-title">{currentQuestion.title}</h3>

          {currentQuestion.type === 'radio' && (
            <div className='survey-form'>
              {currentQuestion.options.map(option => (
                <label 
                  key={option.value} 
                  className={`radio-label ${formData[currentQuestion.field] === option.value ? 'selected-cyan' : ''}`}
                >
                  <input
                    className='radio-survey'
                    type="radio"
                    name={currentQuestion.field}
                    value={option.value}
                    checked={formData[currentQuestion.field] === option.value}
                    onChange={(e) => handleRadioChange(currentQuestion.field, e.target.value)}
                  />
                  <span className="radio-text survey-answer font-semibold">{option.label}</span>
                </label>
              ))}
              <div className="error-message-container">
                {errors[currentQuestion.field] && <div className="error-message">{errors[currentQuestion.field]}</div>}
              </div>
            </div>
          )}

          <div className='flex gap-2'>
            {currentPage > 0 && (
              <button className='survey-btn' onClick={handlePrevious}>
                Previous
              </button>
            )}
            <button className='survey-btn' onClick={handleNext}>
=======
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
  return (
    <div>
      {/* Background patterns */}
      <div className='bg-patterns w-full h-[50%] hero-asset absolute inset-0 z-0 opacity-30 pointer-events-none'/>

      
      <style>{`
        .page-container {
          position: relative;
          overflow: hidden;
          min-height: 200px;
        }

        .page {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
        }

        .page-active {
          position: relative;
          transform: translateX(0);
          opacity: 1;
        }

        .page-left {
          transform: translateX(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .page-right {
          transform: translateX(100%);
          opacity: 0;
          pointer-events: none;
        }

        @keyframes progress-shine {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        .progress-bar-shine {
          position: relative;
          overflow: hidden;
        }

        .progress-bar-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: progress-shine 2s ease-in-out infinite;
          transform: skewX(-20deg);
        }
      `}</style>

      <div className="flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-blue-300 text-2xl font-bold text-center mb-4">
            Complete This Quick Form To Book Your Call:
          </h1>
          <h2 className="text-white text-center">
            Before we book you a call with our team, we need to ask you few things to decide whether we are fit to help you or not.
          </h2>
          <br/>
          
          {/* Progress Bar */}
          <div className="bg-white/10 h-1.5 rounded-full mb-6">
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-500 h-full rounded-full transition-all duration-500 progress-bar-shine"
              style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            />
          </div>

          {/* Page Counter */}
          <p className="text-white text-lg pb-5 pl-1 w-full">
            Page {currentPage + 1} of {totalPages}
          </p>

          {/* Pages Container */}
          <div className="page-container">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`page ${
                  index === currentPage
                    ? 'page-active'
                    : index < currentPage
                    ? 'page-left'
                    : 'page-right'
                }`}
              >
                <div>
                  <h2 className="text-white text-base font-semibold mb-3 leading-relaxed">
                    {question.title}
                  </h2>
                  <div className="space-y-2">
                    {question.options.map(option => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${
                          formData[question.field] === option.value
                            ? 'bg-blue-400/20 border-2 border-blue-400 shadow-[0_4px_15px_rgba(0,255,255,0.3)]'
                            : 'bg-black/40 border-2 border-blue-400/30 hover:border-blue-400 hover:bg-blue-400/10 hover:translate-x-1'
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.field}
                          value={option.value}
                          checked={formData[question.field] === option.value}
                          onChange={(e) => handleRadioChange(question.field, e.target.value)}
                          className="appearance-none"
                        />
                        <span className="text-white text-base font-medium">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors[question.field] && (
                    <p className="text-red-400 text-sm mt-2 bg-red-400/10 border border-red-400 rounded-lg px-3 py-2">
                      {errors[question.field]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {currentPage > 0 && (
              <button
                onClick={handlePrevious}
                className="cursor-pointer px-7 py-2.5 bg-gradient-to-br from-blue-400 to-blue-500 text-black font-bold rounded-lg shadow-[0_4px_15px_rgba(0,255,255,0.4)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,255,255,0.6)] transition-all min-w-[100px]"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="cursor-pointer px-7 py-2.5 bg-gradient-to-br from-blue-400 to-blue-500 text-black font-bold rounded-lg shadow-[0_4px_15px_rgba(0,255,255,0.3)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,255,255,0.6)] transition-all min-w-[100px]"
            >
<<<<<<< HEAD
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
              {currentPage === totalPages - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        
        <style>{`
          @keyframes slideInForward {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInBackward {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .radio-label {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            cursor: pointer;
            padding: 12px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            border: 2px solid transparent;
          }
          
          .radio-label:hover {
            background-color: rgba(0, 255, 255, 0.05);
          }
          
          /* Transparent cyan background ONLY for selected option */
          .radio-label.selected-cyan {
            background-color: rgba(0, 255, 255, 0.15) !important;
            border-color: rgba(0, 255, 255, 0.3);
          }
          
          /* Keep original text color - removed text color changes */
          .radio-label.selected-cyan .radio-text {
            /* No text color change - keeps original color */
          }
          
          .radio-label input[type="radio"] {
            appearance: none;
            width: 22px;
            height: 22px;
            border: 2px solid #ccc;
            border-radius: 50%;
            margin-right: 16px;
            position: relative;
            transition: all 0.3s ease;
            flex-shrink: 0;
          }
          
          /* Keep original radio button colors - removed cyan border */
          .radio-label input[type="radio"]:checked {
            border-color: #3b82f6; /* Keep original blue color */
          }
          
          .radio-label input[type="radio"]:checked::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #3b82f6; /* Keep original blue color */
            animation: dotAppear 0.3s ease-out;
          }
          
          /* Don't change radio button color for selected cyan background */
          .radio-label.selected-cyan input[type="radio"] {
            border-color: #ccc; /* Keep original border when not checked */
          }
          
          .radio-label.selected-cyan input[type="radio"]:checked {
            border-color: #3b82f6; /* Keep original blue when checked */
          }
          
          .radio-label.selected-cyan input[type="radio"]:checked::after {
            background-color: #3b82f6; /* Keep original blue dot */
          }
          
          .radio-text {
            flex: 1;
          }
          
          .error-message-container {
            min-height: 24px;
            transition: min-height 0.3s ease-out;
          }
          
          .error-message {
            color: red;
            font-size: 14px;
            animation: fadeIn 0.3s ease-out;
            padding: 2px 0;
            opacity: 1;
            transform-origin: top;
          }
          
          .error-message-container:empty {
            min-height: 4px;
          }
          
          @keyframes dotAppear {
            from {
              transform: translate(-50%, -50%) scale(0);
            }
            to {
              transform: translate(-50%, -50%) scale(1);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-5px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
=======
>>>>>>> dc6b067 (Version 1.8)
=======
>>>>>>> dc6b06753c6a42f907775ad94a83427f1279e72b
      </div>
    </div>
  );
};

export default SurveyPage;