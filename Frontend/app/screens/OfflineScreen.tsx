import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const OfflineScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.disasterTitle}>Sorry for the inconvenience, please stay safe.</Text>
      <Text style={styles.header}>Stay Safe During Disasters</Text>
      
      <View style={styles.section}>
        <Text style={styles.disasterTitle}>🌊 Flood</Text>
        <Text style={styles.message}>1. <Text style={styles.bold}>Move to higher ground immediately.</Text></Text>
        <Text style={styles.message}>2. <Text style={styles.bold}>Avoid walking or driving through floodwaters.</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.disasterTitle}>🌍 Earthquake</Text>
        <Text style={styles.message}>1. <Text style={styles.bold}>Drop, cover, and hold on until the shaking stops.</Text></Text>
        <Text style={styles.message}>2. <Text style={styles.bold}>Stay away from windows and heavy objects.</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.disasterTitle}>🏔️ Landslide</Text>
        <Text style={styles.message}>1. <Text style={styles.bold}>Move away from the path of the landslide as quickly as possible.</Text></Text>
        <Text style={styles.message}>2. <Text style={styles.bold}>Stay alert to any unusual sounds that might indicate moving debris.</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.disasterTitle}>☀️ Heatwaves</Text>
        <Text style={styles.message}>1. <Text style={styles.bold}>Stay hydrated and drink plenty of water.</Text></Text>
        <Text style={styles.message}>2. <Text style={styles.bold}>Avoid outdoor activities during peak heat hours.</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.disasterTitle}>🌪️ Cyclone</Text>
        <Text style={styles.message}>1. <Text style={styles.bold}>Secure outdoor objects that could become projectiles.</Text></Text>
        <Text style={styles.message}>2. <Text style={styles.bold}>Stay indoors and away from windows during the storm.</Text></Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.disasterTitle}>🌊 Tsunami</Text>
        <Text style={styles.message}>1. <Text style={styles.bold}>Move to higher ground immediately if you are near the coast.</Text></Text>
        <Text style={styles.message}>2. <Text style={styles.bold}>Stay tuned to emergency alerts and follow evacuation orders.</Text></Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "rgb(204 255 204)",
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2c3e50',
  },
  section: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  disasterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e74c3c',
  },
  message: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default OfflineScreen;
