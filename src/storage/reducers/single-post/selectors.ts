import { RootState } from '../../types';
import { sliceName } from './single-post-slice';

export const selectSinglePost = (state: RootState) => state[sliceName].data;
export const selectSinglePostLoading = (state: RootState) =>
	state[sliceName].loading;
