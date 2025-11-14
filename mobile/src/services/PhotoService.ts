import * as MediaLibrary from 'expo-media-library';
import { supabase } from './SupabaseService';

export const getScreenshots = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission denied');

  const album = await MediaLibrary.getAlbumAsync('Screenshots');
  if (!album) return [];

  const { assets } = await MediaLibrary.getAssetsAsync({
    album: album,
    mediaType: 'photo',
    first: 1000,
  });

  return assets;
};

export const detectScreenshot = async (uri: string) => {
  const { data, error } = await supabase.functions.invoke('detect-screenshot', {
    body: { imageUrl: uri }
  });
  
  if (error) throw error;
  return data;
};

export const deletePhoto = async (assetId: string) => {
  await MediaLibrary.deleteAssetsAsync([assetId]);
};

export const bulkImport = async (photos: any[], userId: string) => {
  const { data, error } = await supabase.functions.invoke('bulk-import', {
    body: { photos, userId }
  });
  
  if (error) throw error;
  return data;
};
