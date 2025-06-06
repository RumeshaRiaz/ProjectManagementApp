import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, FlatList, Image, StatusBar, Modal, TextInput } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const initialBoards = [
    { id: '1', name: 'Website Redesign', color: '#6366F1', tasks: 5 },
    { id: '2', name: 'Mobile App', color: '#10B981', tasks: 12 },
    { id: '3', name: 'Marketing Plan', color: '#F59E0B', tasks: 8 },
    { id: '4', name: 'Product Roadmap', color: '#EC4899', tasks: 3 },
  ];

  const [allBoards, setAllBoards] = useState(initialBoards);
  const [modalVisible, setModalVisible] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeProjects = [
    { id: '1', name: 'Website Redesign', progress: 65, dueDate: '2023-06-15' },
    { id: '2', name: 'Mobile App', progress: 30, dueDate: '2023-06-30' },
    { id: '3', name: 'Marketing Plan', progress: 80, dueDate: '2023-06-10' },
    { id: '4', name: 'Product Roadmap', progress: 45, dueDate: '2023-07-01' },
  ];

  const todaysTasks = [
    { id: '1', project: 'Website Redesign', title: 'Update homepage design', completed: false },
    { id: '2', project: 'Mobile App', title: 'Fix login screen bug', completed: true },
    { id: '3', project: 'Marketing Plan', title: 'Review social media content', completed: false },
    { id: '4', project: 'Product Roadmap', title: 'Prepare Q3 roadmap', completed: false },
    { id: '5', project: 'Website Redesign', title: 'Meet with client', completed: false },
  ];

  return (
    <ImageBackground
      source={require('../assets/images/bimage.jpg')}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.overlay}>
        <View style={styles.topSpacer} />

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.username}>Rumesha Riaz</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('ProfileSettingsScreen')}
          >
            <Image
              source={require('../assets/images/profile.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('ActiveProjectsScreen', { projects: activeProjects })}
          >
            <Text style={styles.statNumber}>{activeProjects.length}</Text>
            <Text style={styles.statLabel}>Active Projects</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statCard}
            onPress={() => navigation.navigate('TodaysTasksScreen', { tasks: todaysTasks })}
          >
            <Text style={styles.statNumber}>
              {todaysTasks.filter(task => !task.completed).length}
            </Text>
            <Text style={styles.statLabel}>Tasks Today</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search boards..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Boards</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={allBoards.filter(board =>
            board.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.boardCard, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate('BoardScreen', { boardName: item.name })}
            >
              <Text style={styles.boardName}>{item.name}</Text>
              <Text style={styles.boardTasks}>{item.tasks} tasks</Text>
              <View style={styles.boardOverlay} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.boardsContainer}
        />

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add New Board</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Board name"
                placeholderTextColor="#94A3B8"
                value={boardName}
                onChangeText={setBoardName}
              />
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={() => {
                  if (boardName.trim() !== '') {
                    const newBoard = {
                      id: Date.now().toString(),
                      name: boardName,
                      color: '#0EA5E9',
                      tasks: 0,
                    };
                    setAllBoards([...allBoards, newBoard]);
                    setBoardName('');
                    setModalVisible(false);
                  }
                }}
              >
                <Text style={styles.modalAddButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
  },
  topSpacer: { height: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: { fontSize: 16, color: '#64748B' },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 4,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#1E293B',
    fontSize: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  seeAll: {
    color: '#6366F1',
    fontSize: 14,
  },
  boardsContainer: { paddingBottom: 15 },
  boardCard: {
    flex: 1,
    margin: 5,
    height: 130,
    borderRadius: 12,
    padding: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  boardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  boardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    zIndex: 1,
  },
  boardTasks: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    zIndex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1E293B',
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  modalAddButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalAddButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalCancelText: {
    marginTop: 12,
    color: '#64748B',
    fontSize: 14,
  },
});

export default HomeScreen;
