import { usePostsContext } from '@/contexts/posts/posts-context';
import { Post } from '@/types/post';
import { useEffect, useRef } from 'react';

const VIEW_RATIO_THRESHOLD = 1;
const VIEW_TIME_THRESHOLD = 30 * 1000;

type ViewEventTimerInput = {
  ref: React.MutableRefObject<undefined>;
  post: Post;
};
export const useViewEventTimer = ({ ref, post }: ViewEventTimerInput) => {
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const fullyViewedRef = useRef(false);

  const { sendViewEvent } = usePostsContext();

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Send user view event
        if (entry.isIntersecting) {
          if (
            entry.intersectionRatio === VIEW_RATIO_THRESHOLD &&
            !fullyViewedRef.current
          ) {
            // Component is fully in view and not already viewed
            console.log('Start counting view time');

            startTimeRef.current = Date.now();
            timerRef.current = setTimeout(() => {
              // Just call without await, we do not care anyway
              sendViewEvent(post.id);
              fullyViewedRef.current = true;
            }, VIEW_TIME_THRESHOLD);
          } else if (!startTimeRef.current) {
            // User started scrolling from the top
            startTimeRef.current = Date.now();
          }
        } else {
          // Component now out of view, start evaluating if there is a start time for long post
          if (startTimeRef.current && !fullyViewedRef.current) {
            const elapsedTime = Date.now() - startTimeRef.current;
            if (elapsedTime >= VIEW_TIME_THRESHOLD) {
              // User scrolled from start to finish within 30 seconds
              sendViewEvent(post.id);
              fullyViewedRef.current = true;
            }
            startTimeRef.current = null;
          }
          clearTimeout(timerRef.current);
        }
      },
      {
        threshold: [0, VIEW_RATIO_THRESHOLD]
      }
    );

    // Start observing
    observer.observe(ref.current);

    // Clean-up observer
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      clearTimeout(timerRef.current);
    };
  }, [ref]);
};
