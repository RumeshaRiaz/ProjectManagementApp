import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../theme/styles';
import colors from '../../theme/colors';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  return (
    <LinearGradient
      colors={[colors.background, colors.white]}
      style={styles.container}
    >
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <Image 
          source={require('../../../assets/images/logo.png')} 
          style={{ width: 120, height: 120 }}
        />
      </View>

      <Text style={styles.header}>Reset Password</Text>
      <Text style={{ color: colors.textSecondary, marginBottom: 20 }}>
        Enter your email to receive a password reset link
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => console.log('Reset password pressed')}
      >
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.textLink}>Back to Login</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ForgotPasswordScreen;