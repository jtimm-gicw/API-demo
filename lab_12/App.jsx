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

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  // ======================================
  // LAB 13
  // Editing State (PUT)
  // Uncomment these when teaching UPDATE.
  // ======================================
  // const [editingId, setEditingId] = useState(null);
  // const [updatedNotes, setUpdatedNotes] = useState("");

  // =========================
  // GET WEATHER FUNCTION
  // =========================
  const getWeather = async () => {
    if (city === "") {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${serverUrl}/weather?city=${city}`);
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

      await response.json();

      getFavorites();

      setCity("");
      setNotes("");

    } catch (error) {
      console.log(error);
      setError("Unable to save favorite.");
    }
  };

  // =========================
  // DELETE LOCATION (DELETE)
  // =========================
  /*
    Sends a DELETE request to the backend.
    The backend deletes one MongoDB document
    using its unique _id.

    After deleting, reload the favorites
    so the page stays up to date.
  */
  const deleteLocation = async (id) => {
    try {
      await fetch(`${serverUrl}/favorites/${id}`, {
        method: "DELETE",
      });

      getFavorites();

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

  /*
  // =========================
  // LAB 13
  // UPDATE LOCATION (PUT)
  // =========================

  const updateLocation = async (id) => {
    ...
  };
  */

  useEffect(() => {
    getFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl]);

  return (
    <div className="container">
      <h1 className="title">Weather + Image API Demo</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Add a note about this city..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
        />

        <button onClick={getWeather} className="button">
          Get Weather
        </button>

        <button onClick={saveLocation} className="save-button">
          Save Favorite
        </button>
      </div>

      {loading && <h2 className="loading">Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}

      {weather && (
        <div className="card">
          <h2>{weather.city}</h2>
          <p><strong>Temperature:</strong> {weather.temperature}°F</p>
          <p><strong>Condition:</strong> {weather.description}</p>
          <p><strong>Humidity:</strong> {weather.humidity}%</p>

          {weather.image && (
            <img src={weather.image} alt={weather.description} />
          )}
        </div>
      )}

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

          {/*
          ==========================
          LAB 13 - UPDATE UI

          <button>Edit</button>

          <input ... />

          <button>Save Changes</button>

          ==========================
          */}
        </div>
      ))}
    </div>
  );
}

export default App;
