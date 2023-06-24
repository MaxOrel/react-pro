export const isLiked = (likes: string[], userId: string | undefined) =>
	likes?.some((id) => id === userId);
