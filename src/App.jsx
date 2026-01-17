import { Route, Routes } from "react-router-dom";
import FirstPage from "./Sections/FirstPage";
import SecondPage from './Sections/SecondPage';
import SurveyPage from './Sections/SurveyPage';
import Qualified from "./Sections/Qualified";
import Unqualified from "./Sections/Unqualified";
import NotFound from "./Utility/NotFound";
import Thankyou from "./Sections/Thankyou";
import { AuthProvider } from "./Utility/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/free-guide-unlocked/:token" element={<SecondPage />} />
        <Route path="/book-your-call/:token" element={<SurveyPage/>}/>
        <Route path="/choose-schedule/:token" element={<Qualified/>}/>
        <Route path="/get-free-program/:token" element={<Unqualified/>}/>

        <Route path="/thank-you/:token" element={<Thankyou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;