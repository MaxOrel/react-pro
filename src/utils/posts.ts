export const isLiked = (likes: string[], userId: string) =>
	likes?.some((id) => id === userId);
