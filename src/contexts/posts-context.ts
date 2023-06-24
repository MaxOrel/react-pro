import { createContext } from 'react';

export interface PostsContextType {
	setSearchQuery: (search: string) => void;
}

export const PostsContext = createContext<PostsContextType | null>(null);
PostsContext.displayName = 'PostsContext';
