# Social App - React Native

A minimal social media app with authentication and community feed features.

## Features

### Authentication
- Signup with name, email, and password
- Login with email and password
- Form validation
- Persistent login using AsyncStorage
- Mock authentication (no backend required)

### Community Feed
- Create posts with image/video and caption
- View posts in a scrollable feed (FlatList)
- Like/unlike posts with counter
- Reply to posts with modal input
- Reply counter updates

## Tech Stack
- React Native (Expo)
- Functional components & hooks
- AsyncStorage for persistence
- React Navigation
- Expo Image Picker
- Expo AV (video playback)

## Installation

```bash
cd social-app
npm install
```

## Running the App

```bash
# Start Expo
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Project Structure

```
social-app/
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── PostCard.js
│   │   └── ReplyModal.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── FeedScreen.js
│   │   └── CreatePostScreen.js
│   └── utils/
│       ├── storage.js
│       └── validation.js
└── App.js
```

## Usage

1. Sign up with your name, email, and password
2. Login persists across app restarts
3. Create posts by tapping the + button
4. Select image or video from gallery
5. Add caption and post
6. Like and reply to posts in the feed
7. Logout from the feed screen
