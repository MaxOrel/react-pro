import { createContext } from 'react';

export interface PostsContextType {
	posts: Post[];
	onPostDelete: (id: string) => void;
	onPostLike: ({ _id, likes }: PostLikeParam) => Promise<Post>;
}

export const PostsContext = createContext<PostsContextType | null>(null);
PostsContext.displayName = 'PostsContext';
