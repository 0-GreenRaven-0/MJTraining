import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import {disableReactDevTools} from "@fvilers/disable-react-devtools";
import { HeadProvider } from 'react-head';

if(process.env.NODE_ENV === 'production') disableReactDevTools()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeadProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </HeadProvider>
  </StrictMode>,
)
