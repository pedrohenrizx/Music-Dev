# Music Player React Native

Um aplicativo player de música moderno feito com React Native e Expo. Permite ao usuário importar músicas do dispositivo, salvar e gerenciar uma playlist localmente, tocar as músicas com controles completos, buscar músicas online (streaming) e navegar entre telas com experiência elegante.

## Funcionalidades

- **Player de Músicas:** Controle de reprodução (play/pause, próxima, anterior) para as músicas da playlist.
- **Playlist Persistente:** Adicione músicas do dispositivo à playlist e tenha a lista salva localmente (AsyncStorage).
- **Extração de Metadados:** Exibe título, artista e miniatura/capa (quando disponível) das músicas importadas.
- **Busca Online/Streaming:** Tela dedicada para buscar músicas online (estrutura pronta para integração com APIs públicas de streaming/grátis).
- **Experiência Multiplataforma:** Funciona em Android, iOS e Web (com limitações para seleção de arquivos na web pelo Expo).
- **Interface Responsiva e Moderna:** Navegação fácil e visual agradável.

## Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [expo-av](https://docs.expo.dev/versions/latest/sdk/av/) (reprodução de áudio)
- [expo-document-picker](https://docs.expo.dev/versions/latest/sdk/document-picker/) (importação de arquivos)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) (persistência local)
- [React Navigation](https://reactnavigation.org/)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/music-player-react-native.git
   cd music-player-react-native
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o projeto no Expo:**
   ```bash
   npx expo start
   ```

4. **Abra o app:**
   - Por QR code no celular (Expo Go) ou em um emulador.
   - **Web:** Suporte básico via `w` no terminal, mas a importação de arquivos locais ainda não está disponível na web para Expo (veja observação abaixo).

## Uso

- **Adicionar músicas:** Na tela "Playlist", clique em "Adicionar Músicas do Dispositivo" e escolha arquivos de áudio.
- **Tocar música:** Clique em "Tocar" ao lado de uma música na playlist ou navegue para o Player.
- **Navegar entre músicas:** Use os botões de próxima/anterior no Player.
- **Buscar online:** Acesse a tela "Streaming" para pesquisar músicas em bancos públicos (estrutura pronta para integração real).
- **Persistência:** Suas músicas da playlist ficam salvas localmente.

## Observações Importantes

- **Web:** Por limitações do Expo, a seleção de arquivos locais não está disponível na web. O app exibe mensagem explicativa e está pronto para essa funcionalidade caso o Expo libere a API futuramente.
- **Metadados:** A extração de artista/capa depende dos metadados disponíveis nos arquivos importados e do suporte do expo-av.
- **Streaming:** A tela de busca online já está implementada e pode ser facilmente integrada a uma API pública real (ex: Jamendo, Free Music Archive).

## Estrutura do Projeto

```
App.js
src/
  context/
    PlayerContext.js
  screens/
    PresentationScreen.js
    PlayerScreen.js
    PlaylistScreen.js
    StreamingScreen.js
```

## Melhorias Futuras

- Integração real com APIs públicas de músicas online.
- Melhor extração e exibição de capas/miniaturas.
- Suporte a playlists múltiplas/favoritos.
- Download e cache de músicas para uso offline.

---

Feito com 💜 em React Native!
