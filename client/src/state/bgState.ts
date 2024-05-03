import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const bgState = atom<string>({
    key: 'bgState',
    default: '#f3f2fb',
    effects_UNSTABLE: [persistAtom],
});
