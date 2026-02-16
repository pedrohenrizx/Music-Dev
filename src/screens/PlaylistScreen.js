import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { PlayerContext } from '../context/PlayerContext';
import { Audio } from 'expo-av';

const playlistExemplo = [
  { id: '1', titulo: 'Música 1', artista: 'Artista A' },
  { id: '2', titulo: 'Música 2', artista: 'Artista B' },
  { id: '3', titulo: 'Música 3', artista: 'Artista C' },
];

const PlaylistScreen = ({ navigation }) => {
  const { playlist, addMusicsToPlaylist, setMusic } = useContext(PlayerContext);

  const pickMusics = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Função Indisponível na Web',
        'A seleção de músicas locais não é suportada no navegador atualmente pelo Expo. ' +
        'Fique atento: em futuras atualizações do Expo, essa funcionalidade pode ser liberada para web!'
      );
      return;
    }
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        const musics = await Promise.all(result.assets.map(async (asset, idx) => {
          let artista = 'Desconhecido';
          let capa = null;
          try {
            const { sound, status } = await Audio.Sound.createAsync({ uri: asset.uri }, {}, null, false);
            if (status && status.isLoaded && status.androidImplementation) {
              // Caso algum dado especial por plataforma
            }
            // Expo-av não expõe metadados diretamente, mas em alguns casos pode estar em status
            // Se possível, pegue mais metadados de status ou asset
            // Aqui, apenas ilustrativo, pois expo-av não expõe capa/artista diretamente
            await sound.unloadAsync();
          } catch (e) {
            // Falha ao extrair metadados, seguir com os padrões
          }
          return {
            id: asset.uri + idx,
            titulo: asset.name,
            artista,
            capa,
            uri: asset.uri,
          };
        }));
        addMusicsToPlaylist(musics);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as músicas.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.musicCard}>
      <Text style={styles.musicTitle}>{item.titulo}</Text>
      <Text style={styles.musicArtist}>{item.artista}</Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => {
          setMusic(item);
          navigation.navigate('Player');
        }}
      >
        <Text style={styles.playButtonText}>Tocar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playlist</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={pickMusics}
      >
        <Text style={styles.addButtonText}>Adicionar Músicas do Dispositivo</Text>
      </TouchableOpacity>
      <FlatList
        data={playlist}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma música adicionada.</Text>
        }
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Voltar ao Player</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232946',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#eebbc3',
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#b8c1ec',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#232946',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 32,
  },
  musicCard: {
    backgroundColor: '#b8c1ec',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  musicTitle: {
    fontSize: 18,
    color: '#232946',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  musicArtist: {
    fontSize: 14,
    color: '#232946',
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: '#eebbc3',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  playButtonText: {
    color: '#232946',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 18,
    backgroundColor: '#eebbc3',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#232946',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#b8c1ec',
    fontSize: 16,
    marginTop: 32,
    textAlign: 'center',
  }
});

export default PlaylistScreen;