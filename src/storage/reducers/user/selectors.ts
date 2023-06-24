import { RootState } from '../../types';
import { sliceName } from './user-slice';

export const selectUser = (state: RootState) => state[sliceName].data;
export const selectUserLoading = (state: RootState) => state[sliceName].loading;
