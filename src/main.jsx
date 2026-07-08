// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// Lab 15 
// STEP 1: install--> npm install @auth0/auth0-react@2.x
import { Auth0Provider } from "@auth0/auth0-react";

// STEP 2: Import Auth0Provider + Add Auth0Provider to wrap the App component
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Auth0Provider
      domain="dev-s66j4v7lvc31ijyp.us.auth0.com"
      clientId="kAOvoKoUC7bwL7UQxJi5FfumPgfRVQoS"
      authorizationParams={{ 
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE, 
        //Without the audience, Auth0 won't issue the kind of access token your Express backend expects.
       }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
