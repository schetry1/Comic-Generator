import React, { useState } from "react";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { API_ENDPOINT, API_KEY } from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [comicText, setComicText] = useState("");
  const [comicImages, setComicImages] = useState([
    "https://plus.unsplash.com/premium_photo-1661844541352-3b97b83f3edb?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New state variable for loading


  const handleInputChange = (event) => {
    setComicText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true); // Set loading to true when starting the request
      const data = { inputs: comicText };
      const response = await axios.post(API_ENDPOINT, data, {
        headers: {
          Accept: "image/png",
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const imgURL = URL.createObjectURL(response?.data);
      // Update the state by pushing the new image URL to the array
      setComicImages((prevImages) => [...prevImages, imgURL]);
      setComicText(""); // Clear input
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error making POST request:", error);
      toast(error);
      setError("Error generating comic. Please try again."); // Set an error message
    }finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <div
      style={{
        overflowX: "hidden",
        position: "relative",
        height: "100vh",
        padding: "2rem 0rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          opacity: "0.4",
          left: 0,
          top: 0,
          width: "100%",
          height: "auto",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Comic Generator</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <input
              style={{
                width: "100%",
                outline: "none",
                fontSize: "16px",
                maxWidth: "650px",
                boxSizing: "border-box",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 2rem",
              }}
              type="text"
              id="comicText"
              name="comicText"
              value={comicText}
              onChange={handleInputChange}
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                marginTop: "2rem",
                padding: "0.5rem 1rem",
                fontSize: "12px",
                cursor: "pointer",
                color: "white",
                background: "transparent",
                borderRadius: "8px",
                border: "solid",
              }}
              disabled={loading} // Disable input while loading
            >
              Generate Comic
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {comicImages.length > 0 && (
          <div className="gridContainer" style={{ padding: "1rem 3rem" }}>
            {comicImages.map((img, index) => (
              <div className="card" key={index}>
                <img
                  style={{
                    marginBottom: "10px",
                    maxHeight: "450px",
                    maxWidth: "450px",
                    width: "100%",
                    height: "100%",
                  }}
                  alt="img"
                  src={img}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
