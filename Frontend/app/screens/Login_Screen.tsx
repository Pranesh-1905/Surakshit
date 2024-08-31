import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import './login.css'
const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Add validation logic here
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter a valid phone number and password');
      return;
    }

    // Authentication logic here
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Surakshit</Text>
        <View>
          <Image
            source={require('../../assets/images/Designer.png')}
            style={styles.weatherIcon}
          />
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Login" onPress={handleLogin} style={styles.button} />
    
        <Button title="Register" onPress={() => navigation.navigate('Register')} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:"rgb(204 255 204)"
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // dark gray text
  },
  form: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666', // medium gray text
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4, // add some rounded corners
    backgroundColor : '#FFFFFF',
  },
  button: {
    marginBottom: 16,
    borderRadius: 1,
    backgroundColor: '#4CAF50', // green button
    paddingHorizontal: 8, // reduced padding
    paddingVertical: 4, // reduced padding
  },
  weatherIcon: {
    width: 200,
    height: 200,
    marginRight: 8,
  },
});

export default LoginScreen;