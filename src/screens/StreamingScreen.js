import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const StreamingScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  // Exemplo: função fictícia para buscar músicas
  const handleSearch = async () => {
    if (!search.trim()) {
      Alert.alert('Atenção', 'Digite o nome de uma música ou artista.');
      return;
    }
    // Aqui será feita a busca real via API pública em etapas futuras
    setResults([
      {
        id: 'online1',
        titulo: `Resultado 1 para "${search}"`,
        artista: 'Artista Online',
        url: null,
      },
      {
        id: 'online2',
        titulo: `Resultado 2 para "${search}"`,
        artista: 'Outro Artista Online',
        url: null,
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.resultCard}>
      <Text style={styles.musicTitle}>{item.titulo}</Text>
      <Text style={styles.musicArtist}>{item.artista}</Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => {
          // Em uma etapa futura: reproduzir stream da música, se disponível
          Alert.alert('Streaming', 'Funcionalidade de streaming será implementada.');
        }}
      >
        <Text style={styles.playButtonText}>Ouvir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Músicas Online</Text>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Digite artista ou música"
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum resultado.</Text>}
        contentContainerStyle={{ paddingTop: 16 }}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
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
    fontSize: 22,
    color: '#eebbc3',
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    flex: 1,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#b8c1ec',
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  searchButtonText: {
    color: '#232946',
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#b8c1ec',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
  },
  musicTitle: {
    fontSize: 16,
    color: '#232946',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  musicArtist: {
    fontSize: 13,
    color: '#232946',
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#eebbc3',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  playButtonText: {
    color: '#232946',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 16,
    backgroundColor: '#eebbc3',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#232946',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#b8c1ec',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default StreamingScreen;