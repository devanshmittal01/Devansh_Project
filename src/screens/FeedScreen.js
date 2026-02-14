import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PostCard from '../components/PostCard';
import ReplyModal from '../components/ReplyModal';
import { AuthContext } from '../context/AuthContext';

export default function FeedScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleReply = (postId) => {
    setSelectedPostId(postId);
    setReplyModalVisible(true);
  };

  const handleSubmitReply = (replyText) => {
    setPosts(posts.map(post => {
      if (post.id === selectedPostId) {
        return {
          ...post,
          replies: post.replies + 1,
        };
      }
      return post;
    }));
  };

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={handleLike}
      onReply={handleReply}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts yet. Create your first post!</Text>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost', { 
          onPostCreated: (newPost) => setPosts([newPost, ...posts]) 
        })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <ReplyModal
        visible={replyModalVisible}
        onClose={() => setReplyModalVisible(false)}
        onSubmit={handleSubmitReply}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});
