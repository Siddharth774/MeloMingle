import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import your CSS file

// Import components
import Player from './components/Player';
import Song from './components/Song';
import Playlist from './components/Playlist';
import Nav from './components/Nav';

// Import data
import data from './data';

const App = () => {
    // Ref
    const audioRef = useRef(null);

    // State
    const [songs, setSongs] = useState(() => {
        // Load songs from localStorage or use default data if not available
        const storedSongs = JSON.parse(localStorage.getItem('songs'));
        return storedSongs || data();
    });
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [currentSongIndex, setCurrentSongIndex] = useState(() => {
        // Load current song index from localStorage or use 0 if not available
        const storedIndex = localStorage.getItem('currentSongIndex');
        return storedIndex !== null ? parseInt(storedIndex) : 0;
    });
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlistStatus, setPlaylistStatus] = useState(false);
    
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    useEffect(() => {
        const lastPlaybackPosition = localStorage.getItem('lastPlaybackPosition');

        if (lastPlaybackPosition !== null) {
            audioRef.current.currentTime = parseFloat(lastPlaybackPosition);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('songs', JSON.stringify(songs));
        localStorage.setItem('currentSongIndex', currentSongIndex);
    }, [songs, currentSongIndex]);

    useEffect(() => {
        const savePlaybackState = () => {
            localStorage.setItem('lastPlaybackPosition', audioRef.current.currentTime);
        };
        const currentAudioRef = audioRef.current;
        currentAudioRef.addEventListener('timeupdate', savePlaybackState);

        return () => {
            currentAudioRef.removeEventListener('timeupdate', savePlaybackState);
        };
    }, []);

    // Event handlers
    const updateTimeHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime, duration });
    };

    const songEndHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };

    return (
        <div className="app">
            <Nav 
                playlistStatus={playlistStatus} 
                setPlaylistStatus={setPlaylistStatus} 
                setSongs={setSongs}
            />
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                songs={songs}
                setSongs={setSongs}
                setCurrentSongIndex={setCurrentSongIndex}
            />
            <Playlist
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                playlistStatus={playlistStatus}
            />
            <audio
                onLoadedMetadata={updateTimeHandler}
                onTimeUpdate={updateTimeHandler}
                onEnded={songEndHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default App;
