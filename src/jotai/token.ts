import { atomWithStorage } from 'jotai/utils';
import { JotaiStorage } from '~/utils/jotaiStorage';

export const TokenAtom = atomWithStorage('token', '', JotaiStorage);
