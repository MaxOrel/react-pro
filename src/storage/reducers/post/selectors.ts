import { RootState } from '../../types';
import { sliceName } from './posts-slice';

export const selectPosts = (state: RootState) => state[sliceName].data;
export const selectPostsLoading = (state: RootState) =>
	state[sliceName].loading;
