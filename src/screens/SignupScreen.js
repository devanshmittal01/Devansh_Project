import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { validateEmail, validatePassword, validateName } from '../utils/validation';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { signup } = useContext(AuthContext);

  const handleSignup = async () => {
    const newErrors = {};
    
    if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }
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

    const result = await signup(name, email, password);
    if (!result.success) {
      Alert.alert('Error', 'Signup failed');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create Account</Text>
      
      <Input
        label="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrors({ ...errors, name: '' });
        }}
        error={errors.name}
        placeholder="Enter your name"
      />
      
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
      
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
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
