import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Post, TypePost } from '@/types/post';
import { useRouter } from 'next/router';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { BodyNewsItem } from './BodyNewsItem';

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
  
  const { isAuthenticated, user } = useAuth();
  const [isLiked, setIsLiked] = useState(post?.userInteract ? true : false);
  const router = useRouter();
  const { reactPost } = usePostsContext();

  const newsFeedRef = useRef();

  useEffect(() => {
    if (!newsFeedRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(newsFeedRef.current);
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
      />
    </>
  );
};
