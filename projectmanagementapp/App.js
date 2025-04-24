import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import BoardScreen from './screens/BoardScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import CollaborationScreen from './screens/CollaborationScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen}/>
        <Stack.Screen name="BoardScreen" component={BoardScreen}/>
        <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen}/>
        <Stack.Screen name="CollaborationScreen" component={CollaborationScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;