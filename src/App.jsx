// src/App.jsx
// useState + useEffect lets React store and load data
// useEffect is a React hook that runs code when the component loads or when certain variables change. In this case, we use it to load the user's saved favorites once when the component loads (or if the server URL changes). getFavorites() fetches data from the backend and updates React state with setFavorites(). This is the standard data-fetching pattern you'll see in many React applications.
import { useState, useEffect } from "react";
import "./App.css";
// STEP 9: Import the Header component
import Header from "./components/Header.jsx";
// STEP 10: Import useAuth0 from the Auth0 React SDK
import { useAuth0 } from "@auth0/auth0-react";

// =========================
// MAIN COMPONENT
// =========================

function App() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  console.log("SERVER URL:", import.meta.env.VITE_SERVER_URL);

  // =========================
  // STATE VARIABLES
  // =========================

  const [city, setCity] = useState(""); // user input city
  const [weather, setWeather] = useState(null); // weather API data
  const [loading, setLoading] = useState(false); // loading state
  const [notes, setNotes] = useState(""); // user notes
  const [favorites, setFavorites] = useState([]); // MongoDB favorites
  const [error, setError] = useState(""); // error messages

  const [editingId, setEditingId] = useState(null);
  const [updatedNotes, setUpdatedNotes] = useState("");

  // STEP 11: Destructure the following from useAuth0
  const {
  getAccessTokenSilently,
  isAuthenticated,
  } = useAuth0();
  // =========================
  // GET WEATHER FUNCTION
  // =========================

  const getWeather = async () => {
    console.log("CITY:", city);
    console.log("URL:", `${serverUrl}/weather?city=${city}`);

    if (city === "") {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = `${serverUrl}/weather?city=${city}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setWeather(data);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET FAVORITES (READ)
  // =========================

  const getFavorites = async () => {
  try {

    // STEP 12: Ask Auth0 for a JWT. 
    // This token proves who the logged-in user is.
    const token = await getAccessTokenSilently();

    const response = await fetch(`${serverUrl}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setFavorites(data);

  } catch (error) {
    console.log(error);
    setError("Unable to load favorites.");
  }
};

  // =========================
  // SAVE LOCATION (POST)
  // =========================

  const saveLocation = async () => {
    try {
      const token = await getAccessTokenSilently();
      //debugging--> 
      console.log("TOKEN:", token);
      console.log("SAVING CITY:", city);
      console.log("SAVING NOTES:", notes);

      const response = await fetch(`${serverUrl}/favorites`, {
        method: "POST",
        // STEP 12:
        // Include BOTH the content type and the JWT.
        // Attach the JWT to POST requests.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city,
          notes,
        }),
      });

      const savedLocation = await response.json();
      console.log(savedLocation);
      
      await getFavorites();

      // clear form
      setCity("");
      setNotes("");
    } catch (error) {
      console.log(error);
      setError("Unable to save favorite.");
    }
  };

    // =========================
  // UPDATE LOCATION (PUT)
  // =========================

  const updateLocation = async (id) => {
    try {
      
      const token = await getAccessTokenSilently();
      // STEP 13:
      // Attach the JWT to PUT requests.
      const response = await fetch(`${serverUrl}/favorites/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notes: updatedNotes,
        }),
      });

      const updatedFavorite = await response.json();
      console.log(updatedFavorite);

      getFavorites();

      setEditingId(null);
      setUpdatedNotes("");
    } catch (error) {
      console.log(error);
      setError("Unable to update favorite.");
    }
  };

  // =========================
  // DELETE FAVORITES (DELETE)
  // =========================

  const deleteLocation = async (id) => {
  try {
    const token = await getAccessTokenSilently();
    await fetch(`${serverUrl}/favorites/${id}`, {
      method: "DELETE",
      // STEP 14:
      // Attach the JWT to DELETE requests.
      headers: {
      Authorization: `Bearer ${token}`,
      },
    });

    getFavorites(); // refresh list
  } catch (error) {
    console.log(error);
    setError("Unable to delete favorite.");
  }
};
  

  // =========================
  // LOAD FAVORITES ON PAGE LOAD
  // =========================

useEffect(() => {
  if (isAuthenticated) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFavorites();
  } else {
    setFavorites([]);
  }
}, [isAuthenticated, serverUrl]);
  //Note: We load the user's saved favorites once when the component loads (or if the server URL changes). getFavorites() fetches data from the backend and updates React state with setFavorites(). This is the standard data-fetching pattern you'll see in many React applications.

  
  // =========================
  // UI (JSX)
  // =========================
  return (
    <div className="container">
      {/* STEP 10: Display the Header component */}
      <Header />
      

      {/* SEARCH BOX */}
      <div className="search-box">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />

        {/* NOTES INPUT */}
        <input
          type="text"
          placeholder="Add a note about this city..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
        />

        {/* GET WEATHER */}
        <button onClick={getWeather} className="button">
          Get Weather
        </button>

        {/* SAVE FAVORITE */}
        {isAuthenticated && (
          <button onClick={saveLocation} className="save-button">
            Save Favorite
          </button>
        )}

      </div>

      {/* LOADING */}
      {loading && <h2 className="loading">Loading...</h2>}

      {/* ERROR */}
      {error && <h2 className="error">{error}</h2>}

      {/* WEATHER CARD */}
      {weather && (
        <div className="card">

          <h2>{weather.city}</h2>

          <p>
            <span>Temperature:</span>{" "}
            <strong>{weather.temperature}°F</strong>
          </p>

          <p>
            <span>Condition:</span>{" "}
            <strong>{weather.description}</strong>
          </p>

          <p>
            <span>Humidity:</span>{" "}
            <strong>{weather.humidity}%</strong>
          </p>

          {weather.image && (
            <img src={weather.image} alt={weather.description} />
          )}

        </div>
      )}

      {/* =========================
          FAVORITES LIST (OUTSIDE WEATHER CARD)
      ========================== */}

     {/* Only authenticated users can view and manage favorites */}
{isAuthenticated ? (
  <>
    <h2>Saved Favorite Locations</h2>

    {favorites.map((location) => (
      <div key={location._id} className="card">

        <h3>{location.city}</h3>
        <p>{location.notes}</p>

        {/* Delete removes this favorite from MongoDB */}
        <button
          onClick={() => deleteLocation(location._id)}
          className="delete-button"
        >
          Delete Favorite
        </button>

        {/* EDIT BUTTON */}
        <button
          className="edit-button"
          onClick={() => {
            setEditingId(location._id);

            // If notes is undefined or null, use an empty string instead.
            setUpdatedNotes(location.notes ?? "");
          }}
        >
          Edit
        </button>

        {/* EDIT MODE INPUT */}
        {editingId === location._id && (
          <>
            <input
              type="text"
              value={updatedNotes ?? ""}
              onChange={(e) => setUpdatedNotes(e.target.value)}
            />

            <button
              className="button"
              onClick={() => updateLocation(location._id)}
            >
              Save Changes
            </button>
          </>
        )}

      </div>
    ))}
  </>
) : (
  <div className="card">
    <h2>🔒 Favorites Locked</h2>
    <p>
      Log in with Auth0 to save, edit, and view your favorite cities.
    </p>
  </div>
)}

  </div>
  );
}


// =========================
// EXPORT
// =========================
export default App;