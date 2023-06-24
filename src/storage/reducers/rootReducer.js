// Код файла rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './counter/counter-slice';
import userReducer from './user/user-slice';
import postsReducer from './post/posts-slice';
import singlePostReducer from './single-post/single-post-slice';

export const rootReducer = combineReducers({
	counter: counterReducer,
	user: userReducer,
	posts: postsReducer,
	'single-post': singlePostReducer,
});
