import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const newErrors = {};
    
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Welcome Back</Text>
      
      <Input
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors({ ...errors, email: '' });
        }}
        error={errors.email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors({ ...errors, password: '' });
        }}
        error={errors.password}
        placeholder="Enter your password"
        secureTextEntry
      />
      
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('Signup')}
        variant="secondary"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
  },
});
