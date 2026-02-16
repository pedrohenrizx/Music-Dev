import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PresentationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Music Player</Text>
      <Text style={styles.subtitle}>
        Ouça suas músicas favoritas com uma interface simples e moderna!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Player')}
      >
        <Text style={styles.buttonText}>Entrar no Player</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    color: '#eebbc3',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#b8c1ec',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#eebbc3',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#232946',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PresentationScreen;