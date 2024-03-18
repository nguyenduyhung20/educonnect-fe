import React, { memo, useState } from 'react';
import { PostExplore } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { BodyNewsItem } from '../NewsFeed/BodyNewsItem';

export const TrendingNewsItem = memo(function TrendingNewsItem({
  postExplore
}: {
  postExplore: PostExplore;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(
    postExplore.userInteract ? true : false
  );

  return (
    <>
      <BodyNewsItem
        post={postExplore}
        isAuthenticated={isAuthenticated}
        router={router}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
    </>
  );
});
