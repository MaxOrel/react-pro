export {};

declare global {
	interface CommentPost {
		_id: string;
		text: string;
		author?: User;
		post?: Post;
		updated_at?: string;
		created_at?: string;
	}
	interface Post {
		image: string;
		likes: string[];
		comments: CommentPost[];
		tags: string[];
		isPublished?: boolean;
		_id: string;
		title: string;
		author: User;
		text: string;
		created_at?: string;
		updated_at?: string;
		__v?: number;
	}

	interface User {
		name: string;
		about: string;
		avatar: string;
		_id: string;
		email: string;
		__v?: number;
		group?: string;
	}

	type PostLikeParam = {
		_id: string;
		likes: string[];
	};
}
