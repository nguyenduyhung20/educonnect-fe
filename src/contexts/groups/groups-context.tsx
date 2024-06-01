import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useMemo
} from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { Group, Member, UserApplyingGroup } from '@/types/groups';

import { GroupsApi } from '@/api/groups';
import { Post } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { getFormData } from '@/utils/api-request';
import { useRouter } from 'next/router';

interface ContextValue {
  getGroupsApi: UseFunctionReturnType<FormData, { data: Group[] }>;
  getHotGroups: UseFunctionReturnType<FormData, { data: Group[] }>;
  getGroupsApiById: UseFunctionReturnType<{ id: number }, { data: Group }>;
  getPostByGroupId: UseFunctionReturnType<
    { id: number },
    { data: Post[]; sumPosts: any }
  >;
  getGroupsUserHostApi: UseFunctionReturnType<number, { data: Group[] }>;
  getGroupsUserJoinApi: UseFunctionReturnType<number, { data: Group[] }>;
  getListUserApplyGroup: UseFunctionReturnType<
    {
      userId: number;
      groupId: number;
    },
    { data: UserApplyingGroup[] }
  >;
  changeAvatar: (request: { groupId: number; uploadedFiles: File[] }) => void;
  changeBackGround: (request: {
    groupId: number;
    uploadedFiles: File[];
  }) => void;
  createGroup: (
    requests: Partial<Group> & {
      uploadedFiles: File[];
    }
  ) => Promise<void>;
  joinGroup: (requests: Member) => Promise<void>;
  // updateGroup: (Group: Group) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  approveMember: (request: {
    member: Pick<Member, 'groupId' | 'memberId'>;
    userId: number;
  }) => Promise<void>;
  refuseMember: (request: {
    member: Pick<Member, 'groupId' | 'memberId'>;
    userId: number;
  }) => Promise<void>;
  groupID: number;
}

export const GroupsContext = createContext<ContextValue>({
  getGroupsApi: DEFAULT_FUNCTION_RETURN,
  getHotGroups: DEFAULT_FUNCTION_RETURN,
  getGroupsApiById: DEFAULT_FUNCTION_RETURN,
  getPostByGroupId: DEFAULT_FUNCTION_RETURN,
  getGroupsUserHostApi: DEFAULT_FUNCTION_RETURN,
  getGroupsUserJoinApi: DEFAULT_FUNCTION_RETURN,
  getListUserApplyGroup: DEFAULT_FUNCTION_RETURN,
  changeAvatar: async () => {},
  changeBackGround: async () => {},
  createGroup: async () => {},
  joinGroup: async () => {},
  // updateGroup: async () => {},
  deleteGroup: async () => {},
  approveMember: async () => {},
  refuseMember: async () => {},
  groupID: 0
});

const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const getGroupsApi = useFunction(GroupsApi.getGroups);

  const getHotGroups = useFunction(GroupsApi.getHotGroups);

  const getGroupsApiById = useFunction(GroupsApi.getGroupsByID);

  const getPostByGroupId = useFunction(GroupsApi.getPostByGroupId);

  const getGroupsUserHostApi = useFunction(GroupsApi.getGroupsUserHost);

  const getGroupsUserJoinApi = useFunction(GroupsApi.getGroupsUserJoin);

  const getListUserApplyGroup = useFunction(GroupsApi.getListApplyingGroup);

  const groupID = useMemo(() => {
    return Number(router.query.groupID);
  }, [router.query.groupID]);

  const changeAvatar = useCallback(
    async (request: { groupId: number; uploadedFiles: File[] }) => {
      try {
        const response = await GroupsApi.changeAvatar(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );
  const changeBackGround = useCallback(
    async (request: { groupId: number; uploadedFiles: File[] }) => {
      try {
        const response = await GroupsApi.changeBackGround(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const createGroup = useCallback(
    async (
      request: Group & {
        uploadedFiles: File[];
      }
    ) => {
      try {
        const response = await GroupsApi.postGroup(getFormData(request));

        if (response) {
          getGroupsUserHostApi.call(user?.id);
        }
      } catch (error) {
        throw error;
      }
    },
    [getGroupsApi, getGroupsUserHostApi, user]
  );

  const joinGroup = useCallback(
    async (request: Member) => {
      try {
        const response = await GroupsApi.joinGroup(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    [getGroupsApi]
  );

  const approveMember = useCallback(
    async (request: {
      member: Pick<Member, 'groupId' | 'memberId'>;
      userId: number;
    }) => {
      try {
        const response = await GroupsApi.approveMember(request);
        if (response) {
          getListUserApplyGroup.call({ userId: user?.id, groupId: groupID });
        }
      } catch (error) {
        throw error;
      }
    },
    [getListUserApplyGroup, groupID, user]
  );

  const refuseMember = useCallback(
    async (request: { member: Member; userId: number }) => {
      try {
        const response = await GroupsApi.refuseMember(request);
        if (response) {
          getListUserApplyGroup.call({ userId: user?.id, groupId: groupID });
        }
      } catch (error) {
        throw error;
      }
    },
    [getListUserApplyGroup, groupID, user]
  );

  // const updateGroup = useCallback(
  //   async (group: Group) => {
  //     try {
  //     //   const response = await GroupsApi.updateGroups(group);

  //       if (response) {
  //       }
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   [getGroupsApi]
  // );

  const deleteGroup = useCallback(
    async (id: string) => {
      try {
        const response = await GroupsApi.deleteGroup({ id: id });
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    [getGroupsApi]
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (router.asPath == '/communities/groups') {
        getGroupsApi.call(new FormData());
        getGroupsUserHostApi.call(user?.id);
        getGroupsUserJoinApi.call(user?.id);
      }
    } else {
      getHotGroups.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GroupsContext.Provider
      value={{
        getGroupsApi,
        getHotGroups,
        getGroupsApiById,
        getPostByGroupId,
        getGroupsUserHostApi,
        getGroupsUserJoinApi,
        getListUserApplyGroup,
        createGroup,
        joinGroup,
        refuseMember,
        changeAvatar,
        changeBackGround,
        //   updateGroup,
        deleteGroup,
        approveMember,
        groupID
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroupsContext = () => useContext(GroupsContext);

export default GroupsProvider;
