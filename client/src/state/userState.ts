import { userIFC } from '@/interface/userIFC';
import { atom } from 'recoil';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface IUserState {
    token: string;
    user: userIFC;
}

export const userState = atom<IUserState>({
    key: 'userState',
    default: {
        token: '',
        user: {
            id: 0,
            name: '',
            email: '',
            age: 0,
            phone: '',
        },
    },
    effects_UNSTABLE: [persistAtom],
});
