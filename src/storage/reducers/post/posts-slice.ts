import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { isLiked } from '../../../utils/posts';
import { createAppAsyncThunk } from '../../hook';
import { isActionPending, isActionRejected } from '../../../utils/redux';

type TPostsState = {
	data: Post[];
	favoritePost: Post[];
	loading: boolean;
	error: SerializedError | null | unknown;
};

const initialState: TPostsState = {
	data: [],
	favoritePost: [],
	loading: false,
	error: null,
};

export const sliceName = 'posts';

export const fetchPosts = createAppAsyncThunk<
	{ post: Post[]; currentUser: User | null },
	void
>(
	`${sliceName}/fetchPosts`,
	async function (
		_,
		{ fulfillWithValue, rejectWithValue, getState, extra: api }
	) {
		try {
			const { user } = await getState();
			const data = await api.getPostsList();
			return fulfillWithValue({ post: data, currentUser: user.data });
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const fetchSearchPosts = createAppAsyncThunk<Post[], string>(
	`${sliceName}/fetchSearchPosts`,
	async function (
		searchQuery,
		{ fulfillWithValue, rejectWithValue, extra: api }
	) {
		try {
			const data = await api.search(searchQuery);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const fetchDeletePost = createAppAsyncThunk<Post, string>(
	`${sliceName}/fetchDeletePost`,
	async function (idPost, { fulfillWithValue, rejectWithValue, extra: api }) {
		try {
			const data = await api.deletePostById(idPost);
			return fulfillWithValue(data);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const fetchChangeLikePost = createAppAsyncThunk<
	{ post: Post; liked: boolean },
	PostLikeParam
>(
	`${sliceName}/fetchChangeLikePost`,
	async function (
		post,
		{ fulfillWithValue, rejectWithValue, getState, extra: api }
	) {
		try {
			const { user } = await getState();
			const liked = user.data ? isLiked(post.likes, user.data._id) : false;
			const data = await api.changeLikePostStatus(post._id, liked);

			return fulfillWithValue({ post: data, liked }); // action.payload = data = {products: [], total: 0, currentUser: {}}
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

const postSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.fulfilled, (state, action) => {
				const { post, currentUser } = action.payload;
				state.data = post;
				state.favoritePost = post.filter((item) =>
					isLiked(item.likes, currentUser?._id)
				);
				state.loading = false;
			})
			.addCase(fetchSearchPosts.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(fetchDeletePost.fulfilled, (state, action) => {
				state.data = state.data.filter((postState) => {
					return postState._id !== action.payload._id;
				});
				state.loading = false;
			})
			.addCase(fetchChangeLikePost.fulfilled, (state, action) => {
				const { post, liked } = action.payload;
				state.data = state.data.map((cardState) => {
					return cardState._id === post._id ? post : cardState;
				});

				if (!liked) {
					state.favoritePost.push(post);
				} else {
					state.favoritePost = state.favoritePost.filter(
						(card) => card._id !== post._id
					);
				}
				state.loading = false;
			})
			.addMatcher(isActionPending('posts/'), (state) => {
				state.loading = true;
				state.error = null;
			})
			.addMatcher(isActionRejected('/posts'), (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export default postSlice.reducer;
