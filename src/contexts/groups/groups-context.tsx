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
  
import { Group } from '@/types/groups';

import { GroupsApi } from '@/api/groups';
  
  interface ContextValue {
    getGroupsApi: UseFunctionReturnType<FormData, { data: Group[] }>;
  
    createGroup: (requests: Group) => Promise<void>;
    // updateGroup: (Group: Group) => Promise<void>;
    deleteGroup: (id: string) => Promise<void>;
  }
  
  export const GroupsContext = createContext<ContextValue>({
    getGroupsApi: DEFAULT_FUNCTION_RETURN,
  
    createGroup: async () => {},
    // updateGroup: async () => {},
    deleteGroup: async () => {}
  });
  
  const GroupsProvider = ({ children }: { children: ReactNode }) => {
    const getGroupsApi = useFunction(GroupsApi.getGroups);
  
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
      getGroupsApi.call(new FormData());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <GroupsContext.Provider
        value={{
          getGroupsApi,
  
          createGroup,
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
  