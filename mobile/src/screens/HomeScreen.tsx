import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getScreenshots, detectScreenshot, bulkImport } from '../services/PhotoService';
import { addToSyncQueue, processSyncQueue } from '../services/SyncService';
import { supabase } from '../services/SupabaseService';
import { ScreenshotCard } from '../components/ScreenshotCard';

export const HomeScreen = ({ navigation }: any) => {
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScreenshots();
  }, []);

  const loadScreenshots = async () => {
    try {
      const assets = await getScreenshots();
      const filtered = [];
      
      for (const asset of assets) {
        const result = await detectScreenshot(asset.uri);
        if (result.isScreenshot && result.confidence > 0.7) {
          filtered.push(asset);
        }
      }
      
      setScreenshots(filtered);
    } catch (error) {
      Alert.alert('Error', 'Failed to load screenshots');
    }
  };

  const handleUploadAll = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    for (const screenshot of screenshots) {
      await addToSyncQueue({ id: screenshot.id, uri: screenshot.uri, assetId: screenshot.id });
    }
    
    await processSyncQueue(user?.id || '');
    setLoading(false);
    navigation.navigate('Library');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detected Screenshots</Text>
      <FlatList
        data={screenshots}
        renderItem={({ item }) => (
          <ScreenshotCard uri={item.uri} onPress={() => navigation.navigate('Detail', { id: item.id })} />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadAll}>
        <Text style={styles.buttonText}>Upload & Organize All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  uploadButton: { backgroundColor: '#6366f1', padding: 16, margin: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
