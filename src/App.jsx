// useState lets React store data
import { useState } from "react";
import './App.css';
// =========================
// MAIN COMPONENT
// =========================

function App() {

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
  // API KEY
  // =========================

  // Access environment variable from .env file
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                  // Do NOT hardcode API keys in your code! This is a security risk. Instead, we store it in a .env file and access it as an environment variable. 
                  // import.meta.env --> Access Vite environment variable 
                  // VITE_WEATHER_API_KEY --> The specific variable we want ---> mathces .env variable name

  // =========================
  // GET WEATHER FUNCTION
  // =========================

  // ASYNC means:
  // "this function takes time to finish"
  // It can wait for API data
  // It allows use of await
  const getWeather = async () => {
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
      // API URL
      // =========================

      // Build the URL using:
      // - city from state
      // - API key
      // - units=imperial for Fahrenheit

      const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        // Developers Developers usually do NOT invent API URLs themselves. They read the API documentation.

      // =========================
      // FETCH REQUEST
      // =========================

      // fetch() sends request to API
      const response = await fetch(url); // Don't foreget await or fetch() will return a pending promise instead of the actual response. We use Axios for larger projects, but fetch is built into the browser and works fine for simple requests like this.

      // Convert response into JSON
      const data = await response.json(); // don't have to convert to json with Axios, but fetch returns a response object that we need to convert to JSON to access the data.

      // =========================
      // ERROR HANDLING
      // =========================

      // OpenWeather returns cod values for errors
      if (data.cod !== 200) {
        setError(data.message);
        // Stop function early
        return;
      }

      // =========================
      // SAVE DATA TO STATE
      // =========================

      // Store API data
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
      <h1>React Weather API Demo</h1>
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
      {/* It means --> “Only show this <p> element IF weather contains data.” */}

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
          <h2>{weather.name}</h2>


          {/* Temperature */}
          <p>
            Temperature: {weather.main.temp}°F
          </p>


          {/* Weather Condition */}
          <p>
            Condition: {weather.weather[0].description}
          </p>


          {/* Humidity */}
          <p>
            Humidity: {weather.main.humidity}%
          </p>

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
    maxWidth: "300px",
    marginInline: "auto",
  },
};

// =========================
// EXPORT COMPONENT
// =========================

export default App;