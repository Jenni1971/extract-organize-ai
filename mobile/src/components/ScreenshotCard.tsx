import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ScreenshotCardProps {
  uri: string;
  title?: string;
  tags?: string[];
  onPress: () => void;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ uri, title, tags, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri }} style={styles.image} />
      {title && <Text style={styles.title}>{title}</Text>}
      {tags && tags.length > 0 && (
        <View style={styles.tagContainer}>
          {tags.map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { margin: 8, borderRadius: 12, backgroundColor: '#fff', shadowOpacity: 0.1, shadowRadius: 8 },
  image: { width: '100%', height: 200, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  title: { padding: 12, fontSize: 16, fontWeight: '600' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  tag: { backgroundColor: '#e0e7ff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, margin: 4 },
  tagText: { color: '#4f46e5', fontSize: 12 },
});
