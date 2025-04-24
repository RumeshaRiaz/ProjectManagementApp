// screens/ProfileSettingsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  Switch,
  Alert,
  StatusBar,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ProfileSettingsScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    name: 'Rumesha Riaz',
    email: 'rumesha@example.com',
    bio: 'ReactNative Developer',
    phone: '+92 332 4567898',
    notificationsEnabled: true,
    darkMode: false,
  });
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleSwitch = (field) => {
    setProfile(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    Alert.alert('Profile Updated', 'Your changes have been saved successfully.');
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
       <View style={styles.overlay}>
                        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.editIcon}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>

      {/* Profile Info Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {!isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          ) : (
            <Text style={styles.infoValue}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profile.email}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Bio</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.bio}
              onChangeText={(text) => handleInputChange('bio', text)}
              multiline
            />
          ) : (
            <Text style={styles.infoValue}>{profile.bio}</Text>
          )}
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profile.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.infoValue}>{profile.phone}</Text>
          )}
        </View>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.preferenceItem}>
          <View>
            <Text style={styles.preferenceLabel}>Enable Notifications</Text>
            <Text style={styles.preferenceDescription}>Receive updates about your boards and tasks</Text>
          </View>
          <View style={styles.switchContainer}>
  <Switch
    value={profile.notificationsEnabled}
    onValueChange={() => toggleSwitch('notificationsEnabled')}
    thumbColor={profile.notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
    trackColor={{ false: '#767577', true: '#81c784' }}
    style={styles.switchStyle}
  />
</View>
        </View>

        <View style={styles.preferenceItem}>
          <View>
            <Text style={styles.preferenceLabel}>Dark Mode</Text>
            <Text style={styles.preferenceDescription}>Switch between light and dark theme</Text>
          </View>
          <Switch
            value={profile.darkMode}
            onValueChange={() => toggleSwitch('darkMode')}
            thumbColor={profile.darkMode ? '#4CAF50' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81c784' }}
          />
        </View>
      </View>

      {/* Account Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionText}>Linked Accounts</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionText}>Language</Text>
          <Text style={styles.actionValue}>English</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Login</Text>
        
        <TouchableOpacity 
          style={[styles.actionItem, styles.dangerItem]}
          onPress={() => Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive' }
            ]
          )}
        >
          <Text style={[styles.actionText, styles.dangerText]}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionItem, styles.dangerItem]}
          onPress={() => Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log Out', style: 'destructive' }
            ]
          )}
        >
          <Text style={[styles.actionText, styles.dangerText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  overlay: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      paddingTop: StatusBar.currentHeight,
    },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    marginLeft: 'center',
    bottom: 15,
    right:31 // This pushes it to the right
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    color: '#4CAF50',
    fontSize: 16,
  },
  saveButton: {
    color: '#2196F3',
    fontSize: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  preferenceLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionText: {
    fontSize: 16,
  },
  actionValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 'auto',
    marginLeft: 8,
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#f44336',
  },
});

export default ProfileSettingsScreen;