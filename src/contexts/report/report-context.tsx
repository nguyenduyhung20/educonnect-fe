import { ReportApi } from '@/api/report';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from '@/hooks/use-function';
import { ReportInfo } from '@/types/reportInfo';
import { ReactNode, createContext, useContext } from 'react';

interface ContextValue {
  getPostReportedGroup: UseFunctionReturnType<number, { data: ReportInfo[] }>;
  reportPost: (
    postId: number,
    userId: number,
    reason: string,
    groupId?: number
  ) => void;
  skipReportPost: (userId: number, postId: number) => void;
  deletePostReported: (postId: number, groupId: number, userId: number) => void;
}

const ReportContext = createContext<ContextValue>({
  getPostReportedGroup: DEFAULT_FUNCTION_RETURN,
  reportPost: () => {},
  skipReportPost: () => {},
  deletePostReported: () => {}
});

export const useReportContext = () => useContext(ReportContext);

const ReportProvider = ({ children }: { children: ReactNode }) => {
  const getPostReportedGroup = useFunction(ReportApi.getPostReportedGroup);
  const reportPost = async (
    postId: number,
    userId: number,
    reason: string,
    groupId?: number
  ) => {
    const respond = await ReportApi.ReportPost(
      postId,
      userId,
      reason,
      groupId ?? null
    );
    if (respond && groupId) {
      getPostReportedGroup.call(groupId)
    }
  };
  const skipReportPost = async (userId: number, postId: number) => {
    const respond = await ReportApi.skipReportPost(userId, postId);
    if (respond) {
      const currentListPost = getPostReportedGroup.data.data;
      getPostReportedGroup.setData({
        data: currentListPost.filter(
          (item) => item.post.id !== postId && item.userReport.id !== userId
        )
      });
    }
  };

  const deletePostReported = async (
    postId: number,
    groupId: number,
    userId: number
  ) => {
    const respond = await ReportApi.deletePostReported(postId, groupId, userId);
    if (respond) {
      const currentListPost = getPostReportedGroup.data.data;
      getPostReportedGroup.setData({
        data: currentListPost.filter(
          (item) => item.post.id !== postId && item.userReport.id !== userId
        )
      });
    }
  };

  return (
    <ReportContext.Provider
      value={{
        getPostReportedGroup,
        reportPost,
        skipReportPost,
        deletePostReported
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default ReportProvider;
