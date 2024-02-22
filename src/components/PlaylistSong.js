import React from "react";
import "./Styles.css"; // Import the CSS file

const PlaylistSong = ({ song, setCurrentSong, audioRef, isPlaying, songs, setSongs }) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        const curSong = song;
        const songList = songs;

        const newSongs = songList.map((song) => {
            if (song.id === curSong.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);

        if (isPlaying) {
            audioRef.current.play();
        }
    };
    
    // Define the default image URL
    const defaultImage = "https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png";

    return (
        <div className={`playlist-song-container ${song.active ? 'active' : ''}`} onClick={songSelectHandler}>
            {/* Render the image based on the condition */}
            {song.cover ? (
                <img className="playlist-song-img" src={song.cover} alt={song.name} />
            ) : (
                <img className="playlist-song-img" src={defaultImage} alt={song.name} />
            )}
            <div className="playlist-song-description">
                <h3 className="playlist-song-h1">{song.name}</h3>
                <h4 className="playlist-song-h2">{song.artist}</h4>
            </div>
        </div>
    );
};

export default PlaylistSong;
