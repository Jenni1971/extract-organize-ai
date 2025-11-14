import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './SupabaseService';
import * as FileSystem from 'expo-file-system';

const APP_GROUP = 'group.com.snapxtract.app';

export class ShareExtensionService {
  static async processPendingUploads() {
    try {
      const sharedDir = FileSystem.documentDirectory + 'shared/';
      const files = await FileSystem.readDirectoryAsync(sharedDir).catch(() => []);
      
      for (const file of files) {
        if (file.startsWith('shared_')) {
          await this.uploadSharedFile(sharedDir + file);
        }
      }
    } catch (error) {
      console.error('Error processing pending uploads:', error);
    }
  }

  static async uploadSharedFile(fileUri: string) {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) return;

      const filename = fileUri.split('/').pop() || '';
      const timestamp = Date.now();
      const storagePath = `screenshots/${timestamp}_${filename}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('Screenshots')
        .upload(storagePath, {
          uri: fileUri,
          type: 'image/jpeg',
          name: filename,
        } as any);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('Screenshots')
        .getPublicUrl(storagePath);

      const { data: screenshot, error: dbError } = await supabase
        .from('Screenshots')
        .insert({
          file_path: storagePath,
          file_url: publicUrl,
          file_size: fileInfo.size,
          source: 'share_extension',
          is_screenshot: true,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      await FileSystem.deleteAsync(fileUri);
      
      await this.updateWidgetData();
      
      return screenshot;
    } catch (error) {
      console.error('Error uploading shared file:', error);
      throw error;
    }
  }

  static async updateWidgetData() {
    try {
      const { data: screenshots } = await supabase
        .from('Screenshots')
        .select('id, file_url, created_at, screenshot_tags(tags(name))')
        .order('created_at', { ascending: false })
        .limit(5);

      if (screenshots) {
        const widgetData = screenshots.map(s => ({
          id: s.id,
          thumbnailUrl: s.file_url,
          tags: s.screenshot_tags?.map((st: any) => st.tags.name) || [],
          createdAt: new Date(s.created_at).toLocaleDateString(),
        }));

        await AsyncStorage.setItem('recentScreenshots', JSON.stringify(widgetData));
      }
    } catch (error) {
      console.error('Error updating widget data:', error);
    }
  }
}
