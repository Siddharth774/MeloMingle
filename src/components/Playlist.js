import React from "react";
import PlaylistSong from './PlaylistSong';
import "./Styles.css"; // Import the CSS file

const Playlist = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, playlistStatus }) => {
    return (
        <div className={`playlist-container ${playlistStatus ? 'active' : 'inactive'}`}>
            <h2 className="playlist-title">Playlist</h2>
            <div className="song-container">
                {songs.map((song) => (
                    <PlaylistSong
                        song={song}
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Playlist;
