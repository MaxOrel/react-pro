import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../../hook';
import { isActionPending, isActionRejected } from '../../../utils/redux';

type TPostState = {
	data: Post | null;
	loading: boolean;
	error: SerializedError | null | unknown;
};

const initialState: TPostState = {
	data: null,
	loading: false,
	error: null,
};

export const sliceName = 'single-post';

export const fetchSinglePost = createAppAsyncThunk<Post, string>(
	`${sliceName}/fetchSinglePost`,
	async function (postId, { fulfillWithValue, rejectWithValue, extra: api }) {
		try {
			const data = await api.getPostById(postId);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const fetchCreateComment = createAppAsyncThunk<
	Post,
	{ postId: string; data: any }
>(
	`${sliceName}/fetchCreateReview`,
	async function (
		{ postId, data: body },
		{ fulfillWithValue, rejectWithValue, extra: api }
	) {
		try {
			const data = await api.addComment(postId, body);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

const singlePostSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		updatePostData: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSinglePost.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(fetchCreateComment.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addMatcher(isActionPending('single-post/'), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected('single-post/'), (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export const { updatePostData } = singlePostSlice.actions;
export default singlePostSlice.reducer;
