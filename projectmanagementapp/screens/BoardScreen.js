import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, TextInput, Image, StatusBar } from 'react-native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { DraxProvider, DraxList } from 'react-native-drax';

const BoardScreen = ({ navigation, route }) => {
  const { boardName = 'Website Redesign' } = route.params || {};

  const [columns, setColumns] = useState([
    {
      id: '1',
      title: 'To Do',
      cards: [
        { id: '1', title: 'Design wireframes', description: 'Create low-fidelity wireframes' },
        { id: '2', title: 'User research', description: 'Conduct 5 user interviews' },
      ],
    },
    {
      id: '2',
      title: 'In Progress',
      cards: [
        { id: '3', title: 'API integration', description: 'Connect frontend to backend' },
      ],
    },
    {
      id: '3',
      title: 'Done',
      cards: [
        { id: '4', title: 'Project setup', description: 'Initialize React Native project' },
      ],
    },
  ]);

  const [newCardText, setNewCardText] = useState('');
  const [newColumnText, setNewColumnText] = useState('');

  const handleDragEnd = ({ from, to }) => {
    const newColumns = [...columns];
    const fromColumn = newColumns[from.listIndex];
    const toColumn = newColumns[to.listIndex];

    // Remove card from source column
    const [movedCard] = fromColumn.cards.splice(from.itemIndex, 1);

    // Add card to destination column
    toColumn.cards.splice(to.itemIndex, 0, movedCard);

    setColumns(newColumns);
  };

  const addNewCard = (columnId) => {
    if (!newCardText.trim()) return;

    const newColumns = columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [
            ...column.cards,
            {
              id: Date.now().toString(),
              title: newCardText,
              description: '',
            },
          ],
        };
      }
      return column;
    });

    setColumns(newColumns);
    setNewCardText('');
  };

  const addNewColumn = () => {
    if (!newColumnText.trim()) return;

    setColumns([
      ...columns,
      {
        id: Date.now().toString(),
        title: newColumnText,
        cards: [],
      },
    ]);
    setNewColumnText('');
  };

  return (
    <ImageBackground
      source={require('../assets/images/bimage.jpg')}
      style={styles.backgroundImage}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.overlay}>
        <View style={styles.boardHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#6366F1" />
          </TouchableOpacity>

          <View style={styles.boardTitleContainer}>
            <Text style={styles.boardTitle}>{boardName}</Text>
            <Text style={styles.boardSubtitle}>5 tasks • 3 members</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="filter" size={20} color="#6366F1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="more-vertical" size={20} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.membersContainer}>
          <View style={styles.memberAvatars}>
            <Image source={require('../assets/images/profile.jpg')} style={styles.memberAvatar} />
            <Image source={require('../assets/images/profile.jpg')} style={styles.memberAvatar} />
            <Image source={require('../assets/images/profile.jpg')} style={styles.memberAvatar} />
            <TouchableOpacity style={styles.addMemberButton}>
              <Feather name="plus" size={16} color="#6366F1" />
            </TouchableOpacity>
          </View>
        </View>

        <DraxProvider>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.boardContainer}>
            {columns.map((column, columnIndex) => (
              <View key={column.id} style={styles.column}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnTitle}>{column.title}</Text>
                  <Text style={styles.columnCount}>{column.cards.length}</Text>
                </View>

                <DraxList
                  data={column.cards}
                  renderItemContent={({ item }) => (
                    <TouchableOpacity
                      style={styles.card}
                      onPress={() => navigation.navigate('TaskDetailScreen', { task: item })}
                    >
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      {item.description ? (
                        <Text style={styles.cardDescription}>{item.description}</Text>
                      ) : null}
                      <View style={styles.cardFooter}>
                        <Feather name="message-square" size={14} color="#94A3B8" />
                        <Text style={styles.cardComments}>2</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  onItemDragEnd={handleDragEnd}
                  keyExtractor={(item) => item.id}
                  style={styles.cardList}
                  listIndex={columnIndex}
                />

                <View style={styles.addCardContainer}>
                  <TextInput
                    placeholder="Add a card..."
                    placeholderTextColor="#94A3B8"
                    value={newCardText}
                    onChangeText={setNewCardText}
                    style={styles.addCardInput}
                    onSubmitEditing={() => addNewCard(column.id)}
                  />
                  {newCardText ? (
                    <TouchableOpacity
                      style={styles.addCardButton}
                      onPress={() => addNewCard(column.id)}
                    >
                      <Feather name="plus" size={18} color="#6366F1" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ))}

            <View style={styles.addColumnContainer}>
              <TextInput
                placeholder="Add another list..."
                placeholderTextColor="#94A3B8"
                value={newColumnText}
                onChangeText={setNewColumnText}
                style={styles.addColumnInput}
                onSubmitEditing={addNewColumn}
              />
              {newColumnText ? (
                <TouchableOpacity
                  style={styles.addColumnButton}
                  onPress={addNewColumn}
                >
                  <Feather name="plus" size={18} color="#6366F1" />
                </TouchableOpacity>
              ) : null}
            </View>
          </ScrollView>
        </DraxProvider>
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
    paddingTop: StatusBar.currentHeight,
  },
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 12,  // Reduced top padding
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  boardTitleContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  boardSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  membersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  memberAvatars: {
    flexDirection: 'row',
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: -8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  addMemberButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  column: {
    width: 280,
    marginRight: 16,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  columnCount: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
  },
  cardList: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardComments: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  addCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  addCardInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1E293B',
  },
  addCardButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addColumnContainer: {
    width: 280,
    padding: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addColumnInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1E293B',
  },
  addColumnButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BoardScreen;