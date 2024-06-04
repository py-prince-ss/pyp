import { houseIFC } from '@/interface/houseIFC';
import { Apis } from '@/utils/api';

export const registerHouseApi = async (house: houseIFC) => {
    return await Apis.post('/house', house);
};
