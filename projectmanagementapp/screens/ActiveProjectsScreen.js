import React from 'react';
import { View, Text, FlatList, StyleSheet,  StatusBar,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ActiveProjectsScreen = ({ route, navigation }) => {
  const { projects } = route.params;

  return (
    <View style={styles.container}>
         <View style={styles.overlay}>
                          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Active Projects</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.projectCard}>
            <Text style={styles.projectName}>{item.name}</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
              <Text style={styles.progressText}>{item.progress}%</Text>
            </View>
            <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
          </View>
        )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  listContainer: {
    paddingBottom: 16,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingTop: StatusBar.currentHeight,
  },
  progressText: {
    position: 'absolute',
    right: 8,
    top: -20,
    fontSize: 12,
    color: '#64748B',
  },
  dueDate: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default ActiveProjectsScreen;