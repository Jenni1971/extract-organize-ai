import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadScreenshot } from './SupabaseService';
import { deletePhoto } from './PhotoService';
import { sendLocalNotification } from './NotificationService';

interface SyncQueueItem {
  id: string;
  uri: string;
  assetId: string;
  timestamp: number;
  retries: number;
}

const QUEUE_KEY = 'sync_queue';

export const addToSyncQueue = async (item: Omit<SyncQueueItem, 'timestamp' | 'retries'>) => {
  const queue = await getSyncQueue();
  queue.push({ ...item, timestamp: Date.now(), retries: 0 });
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const getSyncQueue = async (): Promise<SyncQueueItem[]> => {
  const data = await AsyncStorage.getItem(QUEUE_KEY);
  return data ? JSON.parse(data) : [];
};

export const processSyncQueue = async (userId: string) => {
  const queue = await getSyncQueue();
  const remaining: SyncQueueItem[] = [];

  for (const item of queue) {
    try {
      await uploadScreenshot(item.uri, userId);
      await deletePhoto(item.assetId);
      await sendLocalNotification('Upload Complete', 'Screenshot organized successfully');
    } catch (error) {
      if (item.retries < 3) {
        remaining.push({ ...item, retries: item.retries + 1 });
      }
    }
  }

  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
};
