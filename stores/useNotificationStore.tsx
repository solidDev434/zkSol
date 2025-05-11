import { 
  create, 
  StoreApi 
} from 'zustand';
import { 
  produce, 
  Draft 
} from 'immer';

interface Notification {
  type: string;
  message: string;
  description?: string;
  txid?: string;
}

interface NotificationStore {
  notifications: Notification[];
  set: (fn: (state: Draft<NotificationStore>) => void) => void;
}

const useNotificationStore = create<NotificationStore>(
  (
    set: StoreApi<NotificationStore>['setState'],
    get: StoreApi<NotificationStore>['getState']
  ) => ({
    notifications: [],
    set: (fn) => set(produce(fn)),
  })
);

export default useNotificationStore;
