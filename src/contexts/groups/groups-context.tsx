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

interface ContextValue {
  getGroupsApi: UseFunctionReturnType<FormData, { data: Group[] }>;
  getHotGroups: UseFunctionReturnType<FormData, { data: Group[] }>;
  getGroupsApiById: UseFunctionReturnType<{ id: number }, { data: Group }>;
  getPostByGroupId: UseFunctionReturnType<{ id: number }, { data: Post[] }>;
  createGroup: (requests: Partial<Group>) => Promise<void>;
  joinGroup: (requests: Member) => Promise<void>;
  // updateGroup: (Group: Group) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
}

export const GroupsContext = createContext<ContextValue>({
  getGroupsApi: DEFAULT_FUNCTION_RETURN,
  getHotGroups: DEFAULT_FUNCTION_RETURN,
  getGroupsApiById: DEFAULT_FUNCTION_RETURN,
  getPostByGroupId: DEFAULT_FUNCTION_RETURN,
  createGroup: async () => {},
  joinGroup: async () => {},
  // updateGroup: async () => {},
  deleteGroup: async () => {}
});

const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const getGroupsApi = useFunction(GroupsApi.getGroups);

  const getHotGroups = useFunction(GroupsApi.getHotGroups);

  const getGroupsApiById = useFunction(GroupsApi.getGroupsByID);

  const getPostByGroupId = useFunction(GroupsApi.getPostByGroupId);

  const createGroup = useCallback(
    async (request: Group) => {
      try {
        const response = await GroupsApi.postGroup(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    [getGroupsApi]
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
      getGroupsApi.call(new FormData());
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
