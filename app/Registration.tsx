  import React, { useState } from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, Alert } from 'react-native';
  import { useRouter, useLocalSearchParams } from 'expo-router';
  import { Picker } from '@react-native-picker/picker';
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function Registration() {
    const router = useRouter(); 
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isAgeModalVisible, setAgeModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    
    const location = [
      { label: 'Kathmandu', value: 'Kathmandu'},
      { label: 'Pokhara', value: 'Pokhara'},
      { label: 'Biratnagar', value: 'Biratnagar'},
      { label: 'Dharan', value: 'Dharan'},
      { label: 'Chitwan', value: 'Chitwan'},
      { label: 'Nepalgunj', value: 'Nepalgunj'},
    ];

    const bloodGroup = [
      { label: 'A-', value: 'A-' },
      { label: 'B+', value: 'B+' },
      { label: 'B-', value: 'B-' },
      { label: 'AB+', value: 'AB+' },
      { label: 'AB-', value: 'AB-' },
      { label: 'O+', value: 'O+' },
      { label: 'O-', value: 'O-' },
    ];


    const handleOtp = () => {
      setAgeModalVisible(true);
    };


    const handleAgeSubmit = async () => {
      const ageNumber = parseInt(age);
      if (ageNumber >= 18) {
        try {
          const response = await fetch('http://192.168.98.124:8000/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              password,
              contactNo,
              userType,
              location: selectedLocation,
              bloodType: selectedBloodGroup,
            }),
          });
    
          const result = await response.json();
          if (response.ok) {
            // Store email in AsyncStorage
            await AsyncStorage.setItem('email', email); 
    
            Alert.alert('Success', 'Registration successful! OTP sent to your email.');
            setAgeModalVisible(false);
            // Redirect to OTP screen with email and userType
            router.push({ pathname: '/Otp', params: { email, userType } });
          } else {
            Alert.alert('Error', result.message || 'Registration failed!');
          }
        } catch (error) {
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
      } else {
        Alert.alert('Age Restriction', 'You must be 18 or older to register.');
      }
    };
    
    const { userType } = useLocalSearchParams();
    const subtitle = userType === 'Donor' ? 'Donor Registration' : 'Gainer Registration';

    return (
      <View style={styles.container}>
        {/* Background circles */}
        <View style={[styles.circle, styles.bigCircle]} />
        <View style={[styles.circle, styles.mediumCircle]} />
        <View style={[styles.circle, styles.smallCircle]} />
        
        {/* Logo and title */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
          <Text style={styles.title}>BloodBuddy</Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.infoText}>Enter your credentials to get registered as a {userType}</Text>

        {/* Input fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput style={styles.input} placeholder="Enter your name" placeholderTextColor="#000" value={name} onChangeText={setName}/>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#000" value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password:</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry placeholderTextColor="#000" value={password} onChangeText={setPassword} />
        </View>
        
        {/* Phone number input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number:</Text>
          <TextInput style={styles.input} placeholder="Share your phone number" placeholderTextColor="#000" keyboardType="numeric" value={contactNo} onChangeText={setContactNo} />
        </View>

        {/* Registration button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleOtp}>
          <Text style={styles.registerButtonText}>Get Registered</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity style={[styles.loginButton]} onPress={() => router.push(`/Login?userType=${userType}`)} >
          <Text style={styles.loginButtonText}>Already have an id, Login</Text>
        </TouchableOpacity>

        {/* Age and blood group Modal */}
        <Modal visible={isAgeModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Your crucial credentials</Text>
              <View style={styles.inputContainer}>
                <View style={styles.pickerContainer2}>
                  <Picker
                    selectedValue={selectedLocation}
                    onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                    style={styles.picker2}
                  >
                    <Picker.Item label="Select your location" value="" />
                    {location.map((loc) => (
                      <Picker.Item key={loc.value} label={loc.label} value={loc.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <TextInput
                style={styles.ageInput}
                placeholder="Enter age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
              <View style={styles.pickerContainer2}>
                <Picker
                  selectedValue={selectedBloodGroup}
                  onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
                  style={styles.picker2}
                >
                  <Picker.Item label="Select your blood group" value="" />
                  {bloodGroup.map((bloodG) => (
                    <Picker.Item key={bloodG.value} label={bloodG.label} value={bloodG.value} />
                  ))}
                  </Picker>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={handleAgeSubmit}>
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setAgeModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    logo: {
      width: 120,
      height: 120,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#D11B31',
    },
    subtitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
      marginTop: 10,
    },
    infoText: {
      fontSize: 14,
      color: '#7C7C7C',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 10,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 5,
    },
    input: {
      height: 43,
      borderColor: '#F8C8CE',
      backgroundColor: '#F8C8CE',
      borderRadius: 10,
      paddingHorizontal: 10,
      color: '#000',
    },
    registerButton: {
      width: '100%',
      backgroundColor: '#D11B31',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    registerButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    loginButton: {
      width: '100%',
      paddingVertical: 15,
      borderWidth: 1,
      borderColor: '#D11B31',
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    loginButtonText: {
      color: '#D11B31',
      fontSize: 16,
      fontWeight: 'bold',
    },
    circle: {
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: '#FF495F', 
    },
    bigCircle: {
      width: 300,
      height: 300,
      top: 20, 
      left: -220,
      borderRadius: 150,
    },
    mediumCircle: {
      width: 150,
      height: 150,
      top: 120,
      right: -75,
    },
    smallCircle: {
      width: 80,
      height: 80,
      bottom: 20,
      left: -40,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    ageInput: {
      height: 50,
      width: '100%',
      borderColor: '#F8C8CE',
      backgroundColor: '#F8C8CE',
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: '#D11B31',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
    },
    modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    modalCloseButton: {
      paddingVertical: 10,
    },
    modalCloseButtonText: {
      color: '#D11B31',
      fontWeight: 'bold',
    },
    pickerContainer2: {
      width: '100%',
      backgroundColor: '#F8C8CE',
      borderRadius: 10,
      borderColor: '#F8C8CE',
      borderWidth: 1,
      justifyContent: 'center',
      marginBottom: 10,
    },
    picker2: {
      height: 50,
      color: '#000',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });   