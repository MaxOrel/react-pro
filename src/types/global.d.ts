export {};

declare global {
	interface Post {
		image: string;
		likes: string[];
		comments: string[];
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

	interface Comment {
		_id: string;
		text: string;
		author?: User;
		post?: Post;
		updated_at?: string;
		created_at?: string;
	}
}
