import React from 'react';
import { View, Text, FlatList, StyleSheet,StatusBar, TouchableOpacity, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodaysTasksScreen = ({ route, navigation }) => {
  const { tasks } = route.params;

  const [taskList, setTaskList] = React.useState(tasks);

  const toggleTask = (taskId) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.overlay}>
                                  <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Today's Tasks</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskInfo}>
              <Text style={[
                styles.taskTitle,
                item.completed && styles.completedTask
              ]}>
                {item.title}
              </Text>
              <Text style={styles.taskProject}>{item.project}</Text>
            </View>
            <Switch
              value={item.completed}
              onValueChange={() => toggleTask(item.id)}
              thumbColor={item.completed ? '#10B981' : '#f4f3f4'}
              trackColor={{ false: '#E2E8F0', true: '#A7F3D0' }}
            />
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
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  overlay: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      paddingTop: StatusBar.currentHeight,
    },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskProject: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default TodaysTasksScreen;