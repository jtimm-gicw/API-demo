// src/components/Header.jsx

// ======================================
// Header Component
// Displays the application title and
// Auth0 login/logout controls.
// ======================================
// STEP 5: Import useAuth0 from the Auth0 React SDK
import { useAuth0 } from "@auth0/auth0-react";
// This hook gives our component access to:
// • loginWithRedirect() - Opens the Auth0 login page
// • logout() - Signs the user out
// • user - Information about the logged-in user
// • isAuthenticated - true if the user is logged in


function Header() {

  // ======================================
  // STEP 6: Destructure the following from useAuth0
  // Get authentication information.
  //
  // React now knows:
  // • Who is logged in
  // • Whether someone is logged in
  // • How to log users in
  // • How to log users out
  // ======================================
  const {
    user,
    loginWithRedirect,
    logout,
    isAuthenticated,
  } = useAuth0();

  return (
    <header className="header">

      {/* ===============================
          Application Title
      =============================== */}
      <h1>🌤 Weather API Demo</h1>

      {/* ===============================
          STEP 7-A
          If NO user is logged in,
          display a Login button.
      =============================== */}
      {!isAuthenticated && (
        <button
          className="auth-button"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      )}

      {/* ===============================
          STEP 7-B
          If a user IS logged in,
          display their profile information.
      =============================== */}
      {isAuthenticated && (
        <div className="user-info">
          
          {/* STEP 8: Display user profile picture */}
          {/* User profile picture */}
          {/* Go to --> App.js to import the Header */}
          <img
            src={user.picture}
            alt={user.name}
            width="60"
            style={{ borderRadius: "50%" }}
          />

          {/* User's name */}
          <p>
            Welcome, <strong>{user.name}</strong>!
          </p>

          {/* User's email */}
          <p>{user.email}</p>

          {/* Logout button */}
          <button
            className="auth-logout"
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            Logout
          </button>

        </div>
      )}

    </header>
  );
}

export default Header;