import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { supabase } from '../services/SupabaseService';
import { ScreenshotCard } from '../components/ScreenshotCard';

export const LibraryScreen = ({ navigation }: any) => {
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showUntagged, setShowUntagged] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedFolder, showUntagged]);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Load folders
    const { data: foldersData } = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', user?.id);
    setFolders(foldersData || []);

    // Load screenshots
    let query = supabase
      .from('Screenshots')
      .select('*, screenshot_tags(tag_id, tags(name))')
      .eq('user_id', user?.id);

    if (selectedFolder) {
      query = query.eq('folder_id', selectedFolder);
    }

    if (showUntagged) {
      query = query.is('screenshot_tags', null);
    }

    if (searchQuery) {
      query = query.ilike('extracted_text', `%${searchQuery}%`);
    }

    const { data } = await query;
    setScreenshots(data || []);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search screenshots..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={loadData}
      />
      
      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setShowUntagged(!showUntagged)} style={styles.filterButton}>
          <Text>{showUntagged ? 'Show All' : 'Show Untagged'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={screenshots}
        renderItem={({ item }) => (
          <ScreenshotCard
            uri={item.storage_path}
            title={item.title}
            tags={item.screenshot_tags?.map((st: any) => st.tags.name)}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  searchBar: { margin: 16, padding: 12, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  filterRow: { flexDirection: 'row', padding: 8 },
  filterButton: { padding: 8, backgroundColor: '#e0e7ff', borderRadius: 8, margin: 4 },
});
