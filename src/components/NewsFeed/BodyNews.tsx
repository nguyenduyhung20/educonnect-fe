import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Post, TypePost } from '@/types/post';
import { useRouter } from 'next/router';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { BodyNewsItem } from './BodyNewsItem';
import { useViewEventTimer } from '@/hooks/useViewEventTimer';

export const BodyNews = ({
  post,
  type,
  isLast,
  newLimit
}: {
  post: Post;
  type: TypePost;
  isLast: boolean;
  newLimit: () => void;
}) => {
  const newsFeedRef = useRef();

  const [isLiked, setIsLiked] = useState(post?.userInteract ? true : false);

  const { reactPost } = usePostsContext();

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  useViewEventTimer({ post, ref: newsFeedRef });

  useEffect(() => {
    if (!newsFeedRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Infinite scroll logic
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(newsFeedRef.current);

    // Clean-up observer
    return () => {
      if (newsFeedRef.current) {
        observer.unobserve(newsFeedRef.current);
      }
    };
  }, [isLast]);

  return (
    <>
      <BodyNewsItem
        post={post}
        isAuthenticated={isAuthenticated}
        user={user}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        router={router}
        type={type}
        reactPost={reactPost}
        newsFeedRef={newsFeedRef}
      />
    </>
  );
};
