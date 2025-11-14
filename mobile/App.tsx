import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { authenticateWithBiometric, checkBiometricSupport } from './src/services/BiometricService';
import { registerForPushNotifications } from './src/services/NotificationService';
import { ShareExtensionService } from './src/services/ShareExtensionService';
import { supabase } from './src/services/SupabaseService';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SettingsScreen = () => <View style={styles.screen}><Text>Settings</Text></View>;


function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
    
    // Process pending uploads from Share Extension
    ShareExtensionService.processPendingUploads();
    const uploadInterval = setInterval(() => {
      ShareExtensionService.processPendingUploads();
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(uploadInterval);
  }, []);

  const initialize = async () => {
    const hasBiometric = await checkBiometricSupport();
    if (hasBiometric) {
      const success = await authenticateWithBiometric();
      setAuthenticated(success);
    } else {
      setAuthenticated(true);
    }
    
    await registerForPushNotifications();
    setLoading(false);
  };


  if (loading) {
    return <View style={styles.loading}><ActivityIndicator size="large" /></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
