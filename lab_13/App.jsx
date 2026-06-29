/* eslint-disable no-unused-vars */

// useState + useEffect lets React store and load data
import { useState, useEffect } from "react";
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

  const [city, setCity] = useState(""); // user input city
  const [weather, setWeather] = useState(null); // weather API data
  const [loading, setLoading] = useState(false); // loading state
  const [notes, setNotes] = useState(""); // user notes
  const [favorites, setFavorites] = useState([]); // MongoDB favorites
  const [error, setError] = useState(""); // error messages

  // STEP 10: editing state
  const [editingId, setEditingId] = useState(null);
  const [updatedNotes, setUpdatedNotes] = useState("");

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
  // SAVE LOCATION (POST)
  // =========================

  const saveLocation = async () => {
    try {
      const response = await fetch(`${serverUrl}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city,
          notes,
        }),
      });

      const savedLocation = await response.json();
      console.log(savedLocation);


      // clear form
      setCity("");
      setNotes("");
    } catch (error) {
      console.log(error);
      setError("Unable to save favorite.");
    }
  };

  // =========================
  // DELETE FAVORITES (DELETE)
  // =========================

  const deleteLocation = async (id) => {
  try {
    await fetch(`${serverUrl}/favorites/${id}`, {
      method: "DELETE"
    });

    getFavorites(); // refresh list
  } catch (error) {
    console.log(error);
    setError("Unable to delete favorite.");
  }
};
  // =========================
  // GET FAVORITES (READ)
  // =========================

  const getFavorites = async () => {
    try {
      const response = await fetch(`${serverUrl}/favorites`);
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.log(error);
      setError("Unable to load favorites.");
    }
  };

  // =========================
  // UPDATE LOCATION (PUT)
  // =========================

  const updateLocation = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/favorites/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
  // STEP 9-A: LOAD FAVORITES ON PAGE LOAD
  // =========================

  useEffect(() => {
    getFavorites();
  }, [serverUrl]);

  // =========================
  // UI (JSX)
  // =========================

  return (
    <div className="container">

      {/* TITLE */}
      <h1 className="title">Weather + Image API Demo</h1>

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
        <button onClick={saveLocation} className="button">
          Save Favorite
        </button>

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

      <h2>Saved Favorite Locations</h2>

      {favorites.map((location) => (
        <div key={location._id} className="card">

          <h3>{location.city}</h3>
          <p>{location.notes}</p>

          {/* EDIT BUTTON */}
          <button
            onClick={() => {
              setEditingId(location._id);
              setUpdatedNotes(location.notes);
            }}
          >
            Edit
          </button>

          {/* EDIT MODE INPUT */}
          {editingId === location._id && (
            <>
              <input
                type="text"
                value={updatedNotes}
                onChange={(e) => setUpdatedNotes(e.target.value)}
              />

              <button onClick={() => updateLocation(location._id)}>
                Save Changes
              </button>
            </>
          )}

        </div>
      ))}

    </div>
  );
}

// =========================
// EXPORT
// =========================
export default App;