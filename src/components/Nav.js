import React, { useRef } from "react";
import "./Styles.css"; // Import the CSS file
import logo from "./logo 5.png";

const Nav = ({ playlistStatus, setPlaylistStatus, setSongs }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const newSong = {
        name: file.name.replace(/\.[^/.]+$/, ""),
        cover: "", // You can add a default cover image or prompt the user to upload one
        artist: "Unknown Artist",
        audio: URL.createObjectURL(file),
        color: ["#000000", "#ffffff"], // You can generate random colors or set default colors
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        active: false,
      };
      setSongs((prevSongs) => [...prevSongs, newSong]);
    }
  };

  const styles = {
    body: {
      fontFamily: "Roboto, sans-serif",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(45deg, #ea4f4c 0%, #6d0019 100%)",
    },
    signature: {
      fontStyle: "italic",
      fontSize: "12px",
      color: "#212121",
      paddingTop: "15px",
      transition: "all 0.3s ease-in-out",
    },
    navigationWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      backgroundColor: "#000",
      boxShadow: "0 5px 15px 0 rgba(0, 0, 0, 0.25)",
      color: "white",
      //   textTransform: "uppercase",
      overflow: "hidden",
      width: "600px",
    },
    logoWrapper: {
      display: "flex",
    },
    stylish: {
      fontWeight: "bold",
    },
    logo: {
      paddingLeft: "4px",
      color: "#ea4f4c",
    },
    navigation: {
      display: "flex",
      listStyleType: "none",
    },
    parent: {
      padding: "0 10px",
      cursor: "pointer",
    },
    link: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      transition: "all 0.3s ease-in-out",
      color: "white",
    },
    subnavigation: {
      display: "none",
      listStyleType: "none",
      width: "500px",
      position: "absolute",
      top: "40%",
      left: "25%",
      margin: "auto",
      transition: "all 0.3s ease-in-out",
      backgroundColor: "#222",
    },
    invisible: {
      opacity: 0,
      transform: "translate(50px, 0)",
    },
    button: {
      color: "#fff",
    },
  };

  return (
    <div
      className="nav-container"
      style={{
        position: "absolute",
        top: "7%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* <div className="left-section">
        <h1 className={playlistStatus ? "h1-mobile" : "h1"}>
          IOTReady Audio Player
        </h1>
      </div>
      <div className="right-section">
        <button
          className="button"
          onClick={() => setPlaylistStatus(!playlistStatus)}
        >
          Playlist
        </button>
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          accept=".mp3"
          onChange={handleFileUpload}
          style={{ display: "none" }} // Hide the file input
        />
        <button className="button" onClick={() => fileInputRef.current.click()}>
          Add Song
        </button>
      </div> */}
      <nav style={styles.navigationWrapper} className="navigationWrapper">
        <div style={styles.logoWrapper} className="logoWrapper">
          <span style={styles.logo} className="logo">
            {/* meloMingle */}
            <img
              src={logo}
              alt="No logo found"
              style={{
                width: "200px",
                borderRadius: "12px",
              }}
            />
          </span>
        </div>
        <ul style={styles.navigation} className="navigation">
          <li style={styles.parent} className="parent">
            <button className="button">
              <a style={styles.link} className="link" href="#">
                Home
              </a>
            </button>
          </li>
          <li style={styles.parent} className="parent">
            <button
              className="button {buttonClassName}"
              style={styles.button}
              onClick={() => setPlaylistStatus(!playlistStatus)}
            >
              Playlist
            </button>
          </li>
          <li style={styles.parent} className="parent">
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              accept=".mp3"
              onChange={handleFileUpload}
              style={{ display: "none" }} // Hide the file input
            />
            <button
              className="button "
              style={styles.button}
              onClick={() => fileInputRef.current.click()}
            >
              Add Song
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
