import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { PlayerContext } from '../context/PlayerContext';

const PlayerScreen = ({ navigation }) => {
  const { playlist, currentMusic, setMusic } = useContext(PlayerContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const soundRef = useRef(null);

  // Índice da música atual na playlist
  const currentIndex = playlist.findIndex(m => m.id === (currentMusic ? currentMusic.id : ''));
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < playlist.length - 1 && currentIndex !== -1;

  // Carrega e toca a música selecionada
  useEffect(() => {
    let isMounted = true;
    const playAudio = async () => {
      if (!currentMusic || !currentMusic.uri) return;
      setIsLoading(true);
      try {
        if (soundRef.current) {
          await soundRef.current.unloadAsync();
          soundRef.current = null;
        }
        const { sound } = await Audio.Sound.createAsync(
          { uri: currentMusic.uri },
          { shouldPlay: true }
        );
        soundRef.current = sound;
        if (isMounted) setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish && hasNext) {
            handleNext();
          } else if (status.didJustFinish && !hasNext) {
            setIsPlaying(false);
          }
        });
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível reproduzir a música.');
        setIsPlaying(false);
      }
      setIsLoading(false);
    };
    playAudio();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMusic]);

  const handlePlayPause = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setMusic(playlist[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setMusic(playlist[currentIndex - 1]);
    }
  };

  const displayTitle = currentMusic ? currentMusic.titulo : "Nenhuma música selecionada";
  const displayArtist = currentMusic ? currentMusic.artista : "";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayTitle}</Text>
      <Text style={styles.artist}>{displayArtist}</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, !hasPrev && styles.disabledButton]}
          onPress={handlePrev}
          disabled={!hasPrev}
        >
          <Text style={styles.controlText}>⏮️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handlePlayPause}
          disabled={isLoading || !currentMusic}
        >
          <Text style={styles.controlText}>
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, !hasNext && styles.disabledButton]}
          onPress={handleNext}
          disabled={!hasNext}
        >
          <Text style={styles.controlText}>⏭️</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playlistButton}
        onPress={() => navigation.navigate('Playlist')}
      >
        <Text style={styles.playlistButtonText}>Ver Playlist</Text>
      </TouchableOpacity>
      {playlist.length === 0 &&
        <Text style={{ color: '#b8c1ec', marginTop: 24, fontSize: 16, textAlign: 'center' }}>
          Adicione músicas na playlist para começar a ouvir!
        </Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232946',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  title: {
    fontSize: 24,
    color: '#eebbc3',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  artist: {
    fontSize: 18,
    color: '#b8c1ec',
    marginBottom: 36,
    textAlign: 'center'
  },
  controls: {
    flexDirection: 'row',
    marginBottom: 36,
  },
  controlButton: {
    marginHorizontal: 24,
    backgroundColor: '#eebbc3',
    borderRadius: 32,
    padding: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  controlText: {
    fontSize: 28,
    color: '#232946',
  },
  playlistButton: {
    marginTop: 24,
    backgroundColor: '#b8c1ec',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  playlistButtonText: {
    fontSize: 16,
    color: '#232946',
    fontWeight: 'bold',
  },
});

export default PlayerScreen;