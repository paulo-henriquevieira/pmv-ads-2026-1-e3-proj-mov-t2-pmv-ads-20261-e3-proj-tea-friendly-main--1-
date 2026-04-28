# TEA Friendly

Aplicativo mobile para descoberta de estabelecimentos acolhedores para pessoas com Transtorno do Espectro Autista (TEA) e suas famílias.

---

## Sobre o projeto

O **TEA Friendly** conecta famílias a estabelecimentos que oferecem recursos inclusivos — sala calma, equipe treinada, baixa iluminação, ambiente silencioso e mais. Qualquer estabelecimento pode se cadastrar na plataforma e, após aprovação, aparecer na listagem.

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React Native | 0.81 | Framework mobile |
| Expo SDK | 54 | Build e ferramentas |
| TypeScript | 5.x | Tipagem estática |
| React Navigation | 7.x | Stack + Bottom Tabs |
| AsyncStorage | 2.x | Persistência local |
| @expo/vector-icons | 15.x | Ícones Ionicons |
| react-native-safe-area-context | 5.x | Safe areas iOS/Android |

---

## Pré-requisitos

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- App **Expo Go** no celular ou emulador Android/iOS

---

## Instalação

```bash
npm install
```

---

## Executando

```bash
# Iniciar servidor de desenvolvimento
npx expo start

# Android
npm run android

# iOS
npm run ios
```

Escaneie o QR code com o **Expo Go** para testar no dispositivo físico.

---

## Estrutura de pastas

```
src/
├── constants/      # Categorias, features TEA e chaves de storage
├── contexts/       # AuthContext — estado global de autenticação
├── data/           # Dados iniciais (seed)
├── navigation/     # Rotas: RootStack + MainTabs (Bottom Tabs)
├── screens/        # Telas do aplicativo
├── services/       # Acesso a dados (auth, establishments, reviews)
├── theme/          # Cores, fontes, espaçamentos e sombras
├── types/          # Interfaces TypeScript
└── utils/          # Funções utilitárias
```

---

## Telas

| Tela | Descrição |
|---|---|
| `LandingScreen` | Tela inicial com apresentação do app |
| `AuthScreen` | Login e acesso sem cadastro |
| `ProfileSetupScreen` | Cadastro e configuração de perfil |
| `RegisterEstablishmentScreen` | Formulário de cadastro de estabelecimento |
