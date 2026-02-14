import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';

export default function CreatePostScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [caption, setCaption] = useState('');

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant media library permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const handlePost = () => {
    if (!mediaUri) {
      Alert.alert('Error', 'Please select an image or video');
      return;
    }
    if (!caption.trim()) {
      Alert.alert('Error', 'Please add a caption');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      userName: user.name,
      mediaUri,
      mediaType,
      caption,
      likes: 0,
      replies: 0,
      isLiked: false,
    };

    route.params?.onPostCreated(newPost);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Post</Text>
        <View style={{ width: 60 }} />
      </View>

      <TouchableOpacity style={styles.mediaContainer} onPress={pickMedia}>
        {mediaUri ? (
          mediaType === 'image' ? (
            <Image source={{ uri: mediaUri }} style={styles.media} />
          ) : (
            <Video
              source={{ uri: mediaUri }}
              style={styles.media}
              useNativeControls
              resizeMode="contain"
            />
          )
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📷</Text>
            <Text style={styles.placeholderSubtext}>Tap to select image or video</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />

      <Button title="Post" onPress={handlePost} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  mediaContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  media: {
    width: '100%',
    height: 300,
  },
  placeholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#999',
  },
  captionInput: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
