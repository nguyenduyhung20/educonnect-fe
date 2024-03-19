import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext
} from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { Group, Member } from '@/types/groups';

import { GroupsApi } from '@/api/groups';
import { Post } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { getFormData } from '@/utils/api-request';
import { useRouter } from 'next/router';

interface ContextValue {
  getGroupsApi: UseFunctionReturnType<FormData, { data: Group[] }>;
  getHotGroups: UseFunctionReturnType<FormData, { data: Group[] }>;
  getGroupsApiById: UseFunctionReturnType<{ id: number }, { data: Group }>;
  getPostByGroupId: UseFunctionReturnType<{ id: number }, { data: Post[] }>;
  getGroupsUserHostApi: UseFunctionReturnType<number, { data: Group[] }>;
  getGroupsUserJoinApi: UseFunctionReturnType<number, { data: Group[] }>;
  createGroup: (
    requests: Partial<Group> & {
      uploadedFiles: File[];
    }
  ) => Promise<void>;
  joinGroup: (requests: Member) => Promise<void>;
  // updateGroup: (Group: Group) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
}

export const GroupsContext = createContext<ContextValue>({
  getGroupsApi: DEFAULT_FUNCTION_RETURN,
  getHotGroups: DEFAULT_FUNCTION_RETURN,
  getGroupsApiById: DEFAULT_FUNCTION_RETURN,
  getPostByGroupId: DEFAULT_FUNCTION_RETURN,
  getGroupsUserHostApi: DEFAULT_FUNCTION_RETURN,
  getGroupsUserJoinApi: DEFAULT_FUNCTION_RETURN,
  createGroup: async () => {},
  joinGroup: async () => {},
  // updateGroup: async () => {},
  deleteGroup: async () => {}
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

  const createGroup = useCallback(
    async (
      request: Group & {
        uploadedFiles: File[];
      }
    ) => {
      try {
        const response = await GroupsApi.postGroup(getFormData(request));

        if (response) {
          getGroupsUserHostApi.call(user.id);
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
        getGroupsUserHostApi.call(user.id);
        getGroupsUserJoinApi.call(user.id);
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
        createGroup,
        joinGroup,
        //   updateGroup,
        deleteGroup
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroupsContext = () => useContext(GroupsContext);

export default GroupsProvider;
