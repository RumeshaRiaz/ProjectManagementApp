import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, Feather, Ionicons, FontAwesome } from '@expo/vector-icons';

const TaskDetailScreen = ({ navigation, route }) => {
  // Safely get task data with fallback
  const taskData = route.params?.task || {};
  
  // Complete default task structure
  const defaultTask = {
    id: '1',
    title: 'Untitled Task',
    description: 'No description available',
    assignees: [
      { id: '1', name: 'Team Member', avatar: require('../assets/images/profile.jpg') },
    ],
    dueDate: new Date().toISOString().split('T')[0], // Today's date
    priority: 'medium',
    labels: ['Feature'],
    checklist: [
      { id: '1', text: 'Sample checklist item', completed: false },
    ],
    attachments: [],
    comments: [
      {
        id: '1',
        user: { name: 'Team Member', avatar: require('../assets/images/profile.jpg') },
        text: 'Sample comment about this task',
        time: 'Just now',
      },
    ],
  };

  // Merge incoming task with defaults
  const currentTask = { ...defaultTask, ...taskData };

  // State management
  const [newComment, setNewComment] = useState('');
  const [checklist, setChecklist] = useState(currentTask.checklist);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(currentTask.description);

  // Helper functions
  const toggleChecklistItem = (itemId) => {
    setChecklist(checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    ));
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    // In a real app, you would add this to your state management
    setNewComment('');
  };

  const saveDescription = () => {
    setIsEditingDescription(false);
    // In a real app, save to backend
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/images/bimage.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#6366F1" />
              <Text style={styles.backText}>Back to board</Text>
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Feather name="bell" size={20} color="#6366F1" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Feather name="more-vertical" size={20} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Collaboration Button - NEW ADDITION */}
          <TouchableOpacity 
            style={styles.collaborationButton}
            onPress={() => navigation.navigate('CollaborationScreen', { task: currentTask })}
          >
            <Feather name="message-square" size={20} color="#FFFFFF" />
            <Text style={styles.collaborationButtonText}>Discuss</Text>
          </TouchableOpacity>

          {/* Main Content */}
          <ScrollView 
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            {/* Task Header */}
            <View style={styles.taskHeader}>
              <View style={styles.taskTitleContainer}>
                <MaterialIcons name="check-box-outline-blank" size={24} color="#6366F1" />
                <Text style={styles.taskTitle}>{currentTask.title}</Text>
              </View>

              <View style={styles.taskMeta}>
                <View style={styles.taskStatus}>
                  <View style={[styles.statusIndicator, { backgroundColor: '#E2E8F0' }]} />
                  <Text style={styles.statusText}>To Do</Text>
                </View>
                <Text style={styles.idText}>#{currentTask.id}</Text>
              </View>
            </View>

            {/* Description Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Description</Text>
                {!isEditingDescription ? (
                  <TouchableOpacity onPress={() => setIsEditingDescription(true)}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {isEditingDescription ? (
                <View>
                  <TextInput
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    style={styles.descriptionInput}
                    autoFocus
                  />
                  <View style={styles.descriptionActions}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={saveDescription}
                    >
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setIsEditingDescription(false);
                        setDescription(currentTask.description);
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text style={styles.descriptionText}>
                  {description || 'No description added'}
                </Text>
              )}
            </View>

            {/* Assignees Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Assignees</Text>
                <TouchableOpacity>
                  <Feather name="plus" size={18} color="#6366F1" />
                </TouchableOpacity>
              </View>

              <View style={styles.assigneesContainer}>
                {currentTask.assignees.map((assignee) => (
                  <View key={assignee.id} style={styles.assignee}>
                    <Image 
                      source={assignee.avatar} 
                      style={styles.assigneeAvatar} 
                    />
                    <Text style={styles.assigneeName}>{assignee.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Details Row */}
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Due Date</Text>
                <View style={styles.dueDate}>
                  <Feather name="calendar" size={16} color="#64748B" />
                  <Text style={styles.dueDateText}>{currentTask.dueDate}</Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Priority</Text>
                <View style={[
                  styles.priority,
                  { 
                    backgroundColor: 
                      currentTask.priority === 'high' ? '#FEE2E2' : 
                      currentTask.priority === 'medium' ? '#FEF3C7' : '#ECFDF5'
                  }
                ]}>
                  <Text style={[
                    styles.priorityText,
                    { 
                      color: 
                        currentTask.priority === 'high' ? '#DC2626' : 
                        currentTask.priority === 'medium' ? '#D97706' : '#059669'
                    }
                  ]}>
                    {currentTask.priority.charAt(0).toUpperCase() + currentTask.priority.slice(1)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Labels Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Labels</Text>
                <TouchableOpacity>
                  <Feather name="plus" size={18} color="#6366F1" />
                </TouchableOpacity>
              </View>

              <View style={styles.labelsContainer}>
                {currentTask.labels.map((label, index) => (
                  <View
                    key={index}
                    style={[
                      styles.label,
                      { 
                        backgroundColor: ['#DBEAFE', '#D1FAE5', '#FEE2E2'][index % 3],
                        marginRight: 8,
                        marginBottom: 8,
                      }
                    ]}
                  >
                    <Text style={styles.labelText}>{label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Checklist Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Checklist</Text>
                <TouchableOpacity>
                  <Feather name="plus" size={18} color="#6366F1" />
                </TouchableOpacity>
              </View>

              <Text style={styles.checklistProgress}>
                {checklist.filter(item => item.completed).length} of {checklist.length} completed
              </Text>

              <View style={styles.checklistContainer}>
                {checklist.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.checklistItem}
                    onPress={() => toggleChecklistItem(item.id)}
                  >
                    <MaterialIcons
                      name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                      size={20}
                      color={item.completed ? '#6366F1' : '#94A3B8'}
                    />
                    <Text style={[
                      styles.checklistText,
                      item.completed && styles.completedChecklistText
                    ]}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Comments Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Comments</Text>
              </View>

              <View style={styles.commentsContainer}>
                {currentTask.comments.map(comment => (
                  <View key={comment.id} style={styles.comment}>
                    <Image source={comment.user.avatar} style={styles.commentAvatar} />
                    <View style={styles.commentContent}>
                      <View style={styles.commentHeader}>
                        <Text style={styles.commentUser}>{comment.user.name}</Text>
                        <Text style={styles.commentTime}>{comment.time}</Text>
                      </View>
                      <Text style={styles.commentText}>{comment.text}</Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.addCommentContainer}>
                <Image
                  source={require('../assets/images/profile.jpg')}
                  style={styles.currentUserAvatar}
                />
                <TextInput
                  placeholder="Write a comment..."
                  placeholderTextColor="#94A3B8"
                  value={newComment}
                  onChangeText={setNewComment}
                  style={styles.commentInput}
                  onSubmitEditing={addComment}
                  multiline
                />
                {newComment ? (
                  <TouchableOpacity
                    style={styles.sendCommentButton}
                    onPress={addComment}
                  >
                    <FontAwesome name="send" size={16} color="#6366F1" />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    resizeMode: 'cover',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 8,
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  // NEW COLLABORATION BUTTON STYLES
  collaborationButton: {
    position: 'absolute',
    right: 80,
    top: 58,
    backgroundColor: '#6366F1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  collaborationButtonText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  taskHeader: {
    marginBottom: 24,
  },
  taskTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  idText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  editButton: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  descriptionText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 8,
  },
  descriptionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: '#64748B',
    fontWeight: '500',
  },
  assigneesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  assignee: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  assigneeAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  assigneeName: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailItem: {
    width: '48%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '500',
  },
  dueDate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dueDateText: {
    marginLeft: 8,
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '500',
  },
  priority: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#1E293B',
    fontWeight: '500',
  },
  checklistProgress: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 12,
    fontWeight: '500',
  },
  checklistContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  checklistText: {
    marginLeft: 8,
    color: '#1E293B',
    fontSize: 14,
    flex: 1,
  },
  completedChecklistText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  commentsContainer: {
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
  },
  currentUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    maxHeight: 100,
  },
  sendCommentButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default TaskDetailScreen;