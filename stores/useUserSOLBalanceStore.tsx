import { 
  create, 
  StoreApi 
} from 'zustand';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface UserSOLBalanceStore {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => Promise<void>;
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set: StoreApi<UserSOLBalanceStore>['setState']) => ({
  balance: 0,
  getUserSOLBalance: async (
    publicKey: PublicKey, 
    connection: Connection
  ) => {
    try {
      const lamports = await connection.getBalance(publicKey, 'confirmed');
      const balance = lamports / LAMPORTS_PER_SOL;

      set({ balance });
      console.log('Balance updated:', balance);
    } catch (e) {
      console.error('Error getting balance:', e);
    }
  },
}));

export default useUserSOLBalanceStore;
