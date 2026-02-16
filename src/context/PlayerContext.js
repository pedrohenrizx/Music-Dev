import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentMusic, setCurrentMusic] = useState(null);

  // Carrega a playlist do armazenamento local ao iniciar
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@playlist');
        const savedPlaylist = jsonValue != null ? JSON.parse(jsonValue) : [];
        setPlaylist(savedPlaylist);
        if (savedPlaylist.length > 0) setCurrentMusic(savedPlaylist[0]);
      } catch (e) {
        // erro ao carregar
        setPlaylist([]);
      }
    };
    loadPlaylist();
  }, []);

  // Salva a playlist sempre que ela mudar
  useEffect(() => {
    const savePlaylist = async () => {
      try {
        await AsyncStorage.setItem('@playlist', JSON.stringify(playlist));
      } catch (e) {
        // erro ao salvar
      }
    };
    savePlaylist();
  }, [playlist]);

  const addMusicsToPlaylist = (musics) => {
    setPlaylist(musics);
    if (musics.length > 0) setCurrentMusic(musics[0]);
  };

  const setMusic = (music) => {
    setCurrentMusic(music);
  };

  return (
    <PlayerContext.Provider value={{
      playlist,
      currentMusic,
      addMusicsToPlaylist,
      setMusic,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};