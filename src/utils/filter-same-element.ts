import { Post } from '@/types/post';

export const filterSameElement = (newPosts: Post[], currentPosts: Post[]) => {
  if (currentPosts.length == 0) return newPosts;
  const results = newPosts.filter((item) => {
    return !currentPosts.some((subItem) => subItem.id === item.id);
  });
  return results;
};
