import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const AlertGuidelineScreen: React.FC<{ disasterType: string }> = ({ disasterType }) => {
  const animation = new Animated.Value(0);

  const fadeIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  fadeIn();

  const renderGuidelines = () => {
    if (disasterType === 'flood') {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>Severe flood warning in your area.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Move to higher ground immediately.</Text>
          <Text style={styles.guideline}>2. Avoid walking or driving through floodwaters.</Text>
          <Text style={styles.guideline}>3. Stay informed through local news and weather reports.</Text>
          <Text style={styles.guideline}>4. Keep emergency supplies like food, water, and medications ready.</Text>
          <Text style={styles.guideline}>5. Follow instructions from local authorities and emergency services.</Text>
        </>
      );
    } else if (disasterType === 'earthquake') {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>Earthquake detected in your area.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Drop, cover, and hold on until the shaking stops.</Text>
          <Text style={styles.guideline}>2. Stay away from windows and heavy objects.</Text>
          <Text style={styles.guideline}>3. Move to an open area if you are outdoors.</Text>
          <Text style={styles.guideline}>4. Be prepared for aftershocks.</Text>
          <Text style={styles.guideline}>5. Follow emergency instructions from local authorities.</Text>
        </>
      );
    } else if (disasterType === 'landslide') {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>Landslide warning in your area.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Move away from the path of the landslide immediately.</Text>
          <Text style={styles.guideline}>2. Stay alert to any unusual sounds indicating moving debris.</Text>
          <Text style={styles.guideline}>3. If you are inside, move to a safer location away from the slope.</Text>
          <Text style={styles.guideline}>4. Be aware of secondary hazards like flooding.</Text>
          <Text style={styles.guideline}>5. Follow evacuation orders from local authorities.</Text>
        </>
      );
    } else if (disasterType === 'heatwave') {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>Extreme heatwave in your area.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Stay hydrated by drinking plenty of water.</Text>
          <Text style={styles.guideline}>2. Avoid outdoor activities during peak heat hours.</Text>
          <Text style={styles.guideline}>3. Wear lightweight, light-colored, and loose-fitting clothing.</Text>
          <Text style={styles.guideline}>4. Stay indoors in air-conditioned environments if possible.</Text>
          <Text style={styles.guideline}>5. Check on vulnerable individuals, such as the elderly and children.</Text>
        </>
      );
    } else if (disasterType === 'cyclone') {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>Cyclone warning in your area.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Secure outdoor objects that could become projectiles.</Text>
          <Text style={styles.guideline}>2. Stay indoors and away from windows during the storm.</Text>
          <Text style={styles.guideline}>3. Have an emergency kit ready with essentials.</Text>
          <Text style={styles.guideline}>4. Follow updates and instructions from local authorities.</Text>
          <Text style={styles.guideline}>5. Evacuate if instructed to do so by emergency services.</Text>
        </>
      );
    } else if (disasterType === 'tsunami') {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>Tsunami warning in your area.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Move to higher ground immediately if you are near the coast.</Text>
          <Text style={styles.guideline}>2. Stay tuned to emergency alerts and follow evacuation orders.</Text>
          <Text style={styles.guideline}>3. Avoid beaches and coastal areas until the all-clear is given.</Text>
          <Text style={styles.guideline}>4. Be prepared for multiple waves; the danger may last for hours.</Text>
          <Text style={styles.guideline}>5. Stay away from areas affected by the tsunami until authorities declare it safe.</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.title}>Alert!</Text>
          <Text style={styles.alertMessage}>General emergency alert.</Text>
          
          <Text style={styles.title}>Guidelines</Text>
          <Text style={styles.guideline}>1. Stay calm and assess the situation.</Text>
          <Text style={styles.guideline}>2. Follow instructions from local authorities.</Text>
          <Text style={styles.guideline}>3. Keep emergency supplies like food, water, and medications ready.</Text>
          <Text style={styles.guideline}>4. Stay informed through local news and emergency alerts.</Text>
          <Text style={styles.guideline}>5. Assist others if possible and safe to do so.</Text>
        </>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View style={{ opacity: animation }}>
        {renderGuidelines()}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "rgb(204 255 204)",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  alertMessage: {
    fontSize: 18,
    color: 'red',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  guideline: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  guidelineContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default AlertGuidelineScreen;
