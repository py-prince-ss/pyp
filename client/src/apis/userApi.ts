import { signupIFC } from '@/interface/userIFC';
import { Apis } from '@/utils/api';

export const signupApi = async (user: signupIFC) => {
    return await Apis.post('/user/register', user);
};
