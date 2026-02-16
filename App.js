import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Adicione a importação no início do arquivo
import StreamingScreen from './src/screens/StreamingScreen';

// Importação das telas (serão implementadas em breve)
import PresentationScreen from './src/screens/PresentationScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';

// Importação do PlayerProvider
import { PlayerProvider } from './src/context/PlayerContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Presentation">
          <Stack.Screen
            name="Presentation"
            component={PresentationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Player"
            component={PlayerScreen}
            options={{ title: 'Player de Músicas' }}
          />
          <Stack.Screen
            name="Playlist"
            component={PlaylistScreen}
            options={{ title: 'Playlist' }}
          />
          <Stack.Screen
            name="Streaming"
            component={StreamingScreen}
            options={{ title: 'Streaming/Búsqueda Online' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PlayerProvider>
  );
}