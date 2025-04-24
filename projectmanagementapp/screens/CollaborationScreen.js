import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const CollaborationScreen = ({ navigation, route }) => {
  // Get task data from navigation params with fallback
  const taskData = route.params?.task || {};
  
  // Sample data for comments
  const [comments, setComments] = useState([
    {
      id: '1',
      user: { name: 'Ayesha ', avatar: require('../assets/images/profile.jpg') },
      text: 'Let me know when you complete the design mockups',
      time: '2 hours ago',
    },
    {
      id: '2',
      user: { name: 'Team Member', avatar: require('../assets/images/profile.jpg') },
      text: '@Alex I should have them ready by EOD tomorrow',
      time: '1 hour ago',
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [showMentions, setShowMentions] = useState(false);

  // Sample team members for @mentions
  const teamMembers = [
    { id: '1', name: 'Fatima' },
    { id: '2', name: 'Maryam' },
    { id: '3', name: 'Eman' },
  ];

  const addComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: Date.now().toString(),
      user: { name: 'Current User', avatar: require('../assets/images/profile.jpg') },
      text: newComment,
      time: 'Just now',
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleMention = (member) => {
    setNewComment(prev => `${prev}@${member.name} `);
    setShowMentions(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
                  <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#6366F1" />
          <Text style={styles.backText}>Back to task</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Collaboration</Text>
      </View>

      <ScrollView style={styles.container}>
        {/* Task Reference */}
        <View style={styles.taskReference}>
          <Text style={styles.taskTitle}>{taskData.title || 'Task Discussion'}</Text>
          <Text style={styles.taskId}>#{taskData.id || '1'}</Text>
        </View>

        {/* Comments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
          
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.comment}>
                <Image source={item.user.avatar} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentUser}>{item.user.name}</Text>
                    <Text style={styles.commentTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Mention Suggestions */}
        {showMentions && (
          <View style={styles.mentionsContainer}>
            <FlatList
              data={teamMembers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.mentionItem}
                  onPress={() => handleMention(item)}
                >
                  <Text style={styles.mentionText}>@{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>

      {/* New Comment Input */}
      <View style={styles.commentInputContainer}>
        <Image
          source={require('../assets/images/profile.jpg')}
          style={styles.userAvatar}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Add a comment..."
            placeholderTextColor="#94A3B8"
            value={newComment}
            onChangeText={(text) => {
              setNewComment(text);
              setShowMentions(text.includes('@'));
            }}
            style={styles.commentInput}
            multiline
          />
          <TouchableOpacity style={styles.mentionButton} onPress={() => setShowMentions(!showMentions)}>
            <Text style={styles.mentionSymbol}>@</Text>
          </TouchableOpacity>
        </View>
        {newComment ? (
          <TouchableOpacity style={styles.sendButton} onPress={addComment}>
            <FontAwesome name="send" size={20} color="#6366F1" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.attachmentButton}>
            <Feather name="paperclip" size={20} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backText: {
    marginLeft: 8,
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 80,
    color: '#1E293B',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  taskReference: {
    marginBottom: 24,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  taskId: {
    fontSize: 14,
    color: '#64748B',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentUser: {
    fontWeight: '600',
    color: '#1E293B',
    fontSize: 14,
  },
  commentTime: {
    color: '#94A3B8',
    fontSize: 12,
  },
  commentText: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  commentInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 40,
    minHeight: 40,
    maxHeight: 120,
    fontSize: 14,
    color: '#1E293B',
  },
  mentionButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  mentionSymbol: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendButton: {
    marginLeft: 12,
  },
  attachmentButton: {
    marginLeft: 12,
  },
  mentionsContainer: {
    maxHeight: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  mentionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  mentionText: {
    color: '#1E293B',
    fontSize: 14,
  },
});

export default CollaborationScreen;