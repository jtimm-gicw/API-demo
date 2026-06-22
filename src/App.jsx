/* eslint-disable no-unused-vars */
// useState lets React store data
import { useState } from "react";
import "./App.css";


// =========================
// MAIN COMPONENT
// =========================

function App() {
const serverUrl = import.meta.env.VITE_SERVER_URL;
console.log("SERVER URL:", import.meta.env.VITE_SERVER_URL);

  // =========================
  // STATE VARIABLES
  // =========================

  // Stores the city the user types
  const [city, setCity] = useState("");

  // Stores weather data from the API
  const [weather, setWeather] = useState(null);

  // Tracks loading state
  const [loading, setLoading] = useState(false);

  // Stores error messages
  const [error, setError] = useState("");

  // =========================
  // BACKEND SERVER URL
  // =========================

  // NEW:
  //
  // In our first version of this app,
  // React talked directly to OpenWeather.
  //
  // Now React talks to OUR backend server.
  //
  // The backend:
  // 1. Calls OpenWeather
  // 2. Calls Unsplash
  // 3. Calls NASA
  // 4. Combines the data
  // 5. Sends one response back
  //
  // This is much closer to how
  // professional applications work.

  // =========================
  // GET WEATHER FUNCTION
  // =========================

  // ASYNC means:
  // "this function takes time to finish"
  // It can wait for API data
  // It allows use of await

  
  const getWeather = async () => {
    
    console.log("CITY:", city);
    console.log("URL:", `${serverUrl}/weather?city=${city}`);
    // Prevent empty searches
    if (city === "") {
      setError("Please enter a city.");
      return;
    }

    // Start loading
    setLoading(true);

    // Clear previous errors
    setError("");

    try {

      // =========================
      // BACKEND API URL
      // =========================

      // NEW:
      //
      // Instead of calling OpenWeather directly,
      // we call our own backend server.
      //
      // The backend handles all communication
      // with external APIs.

      const url =
        `${serverUrl}/weather?city=${city}`;

      // =========================
      // FETCH REQUEST
      // =========================

      // fetch() sends request to API
      const response = await fetch(url);

      // Convert response into JSON
      const data = await response.json();

      // =========================
      // ERROR HANDLING
      // =========================

      // NEW:
      //
      // Our backend sends a custom error object.
      //
      // Example:
      //
      // {
      //   error: "Unable to retrieve weather data."
      // }

      if (data.error) {
        setError(data.error);
        return;
      }

      // =========================
      // SAVE DATA TO STATE
      // =========================

      // NEW:
      //
      // The backend now combines:
      //
      // Weather Data
      // +
      // Image Data
      // +
      // NASA Data
      // Example:
      //
      // {
      //   city: "Seattle",
      //   temperature: 72,
      //   humidity: 60,
      //   description: "broken clouds",
      //   image: "https://...",
      //   nasa: "image of the day"
      // }

      setWeather(data);

    } catch {

      // Runs if request completely fails
      setError("Something went wrong.");

    } finally {

      // Stop loading no matter what
      setLoading(false);

    }
  };

  // =========================
  // return JSX to render UI
  // =========================

  return (

    <div style={styles.container}>

      {/* =========================
          TITLE
      ========================== */}

      {/*

      NEW:

      This demo now shows how one backend
      can combine multiple APIs into a
      single response.

      React
        ↓
      Backend
        ↓
      Weather API

      Backend
        ↓
      Image API

      Backend
        ↓
      Nasa API

      Backend
        ↓
      One Combined Response

      */}

      <h1>Weather + Image API + NASA API Demo</h1>

      {/* =========================
          INPUT
      ========================== */}

      <input
        type="text"
        placeholder="Enter city"

        // Controlled input value
        value={city}

        // Update state when typing
        onChange={(event) => setCity(event.target.value)}

        style={styles.input}
      />

      {/* =========================
          BUTTON
      ========================== */}

      <button
        onClick={getWeather}
        style={styles.button}
      >
        Get Weather
      </button>

      {/* =========================
          LOADING MESSAGE
      ========================== */}

      {loading && <h2>Loading...</h2>}

      {/* It means --> “Only show this element IF loading is true.” */}

      {/* =========================
          ERROR MESSAGE
      ========================== */}

      {error && <h2>{error}</h2>}

      {/* =========================
          WEATHER DATA
      ========================== */}

      {weather && (

        <div style={styles.card}>

          {/* City Name */}

          <h2>{weather.city}</h2>

          {/* Temperature */}

          <p>
            Temperature: {weather.temperature}°F
          </p>

          {/* Weather Condition */}

          <p>
            Condition: {weather.description}
          </p>

          {/* Humidity */}

          <p>
            Humidity: {weather.humidity}%
          </p>

          {/* =========================
              WEATHER IMAGE
          ========================== */}

          {/*

          NEW:
          The backend uses the weather
          condition to search Unsplash.

          Examples:

          Clouds → Cloud photo
          Rain → Rainy photo
          Snow → Snowy photo
          Sunny → Sunshine photo
          */}

          {weather.image && (

            <img
              src={weather.image}
              alt={weather.description}
              style={styles.image}
            />

          )}

        {/* =========================
            STEP 8: Add NASA Data
          ========================== */}

      {/* NEW NASA ADDITION */}

        {/* {weather.nasa && (

          <div style={styles.nasaCard}>

            <h2>🚀 NASA Astronomy Picture of the Day</h2>

            <h3>{weather.nasa.title}</h3>

            <img
              src={weather.nasa.image}
              alt={weather.nasa.title}
              style={styles.image}
            />

            <p>
              {weather.nasa.explanation}
            </p>

          </div>

)} */}
        </div>

      )}

    </div>
  );
}

// =========================
// SIMPLE STYLES
// =========================

const styles = {

  container: {
    fontFamily: "Arial",
    textAlign: "center",
    padding: "2rem",
  },

  input: {
    padding: "10px",
    marginRight: "10px",
    width: "200px",
  },

  button: {
    padding: "10px 15px",
    cursor: "pointer",
  },

  card: {
    marginTop: "20px",
    border: "1px solid gray",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "400px",
    marginInline: "auto",
  },

  image: {
    width: "100%",
    marginTop: "15px",
    borderRadius: "10px",
  },
};

// =========================
// EXPORT COMPONENT
// =========================

export default App;