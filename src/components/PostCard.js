import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

export default function PostCard({ post, onLike, onReply }) {
  return (
    <View style={styles.card}>
      <Text style={styles.userName}>{post.userName}</Text>
      
      {post.mediaType === 'image' ? (
        <Image source={{ uri: post.mediaUri }} style={styles.media} />
      ) : (
        <Video
          source={{ uri: post.mediaUri }}
          style={styles.media}
          useNativeControls
          resizeMode="contain"
        />
      )}
      
      <Text style={styles.caption}>{post.caption}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onLike(post.id)}>
          <Text style={styles.actionIcon}>{post.isLiked ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionText}>{post.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={() => onReply(post.id)}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>{post.replies}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    color: '#333',
  },
  media: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  caption: {
    padding: 12,
    fontSize: 14,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
});
