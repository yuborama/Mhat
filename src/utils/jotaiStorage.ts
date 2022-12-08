import { createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const JotaiStorage = createJSONStorage(() => AsyncStorage);
