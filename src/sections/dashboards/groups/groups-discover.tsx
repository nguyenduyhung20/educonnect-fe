import {
  Box,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GroupsInfo } from './groups-info';
import { useDebounce } from '@/hooks/use-debounce';
import useFunction from '@/hooks/use-function';
import { SearchApi } from '@/api/search';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Group, TypeItemGroup } from '@/types/groups';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export const DiscoverGroups = ({
  type,
  listGroups
}: {
  type: TypeItemGroup;
  listGroups: Group[];
}) => {
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const searchGroupApi = useFunction(SearchApi.searchGroup);

  const searchResult = useMemo(() => {
    return searchGroupApi.data;
  }, [searchGroupApi.data]);

  useEffect(() => {
    const searchUser = async () => {
      if (debouncedSearchValue && debouncedSearchValue !== '') {
        try {
          await searchGroupApi.call({
            userInput: debouncedSearchValue
          });
        } catch (error) {
          console.error(error);
          // Handle error state here if needed
        }
      }
    };
    searchUser();
  }, [debouncedSearchValue]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          {type == 'hot' && (
            <TextField
              placeholder="Search"
              sx={{ width: 1 }}
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <Stack
                    sx={{ mr: 1 }}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Search />
                  </Stack>
                )
              }}
            />
          )}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: type == 'hot' ? 23 : 18
            }}
          >
            {type == 'hot'
              ? 'Nhóm'
              : type == 'host'
              ? 'Nhóm của bạn'
              : 'Nhóm đã tham gia'}
          </Typography>

          <div>
            {searchResult &&
              searchResult.map((group, index) => {
                return <div key={group.title + index}>{group.title}</div>;
              })}
          </div>
          <Stack direction={'column'} spacing={3}>
            {listGroups.slice(0, 4).map((group, index) => {
              return (
                <Stack
                  onClick={() => {
                    router.push(`/communities/groups/${group.id}`);
                  }}
                  key={index}
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={1}
                  sx={{
                    '&:hover': {
                      background: `${theme.colors.primary.lighter}`,
                      borderRadius: 1
                    }
                  }}
                >
                  <GroupsInfo group={group} />
                  <Box>
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Stack>
              );
            })}

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Stack direction={'column'} spacing={3}>
                {listGroups.slice(4).map((group, index) => {
                  return (
                    <Stack
                      onClick={() => {
                        router.push(`/communities/groups/${group.id}`);
                      }}
                      key={index}
                      direction={'row'}
                      justifyContent={'space-between'}
                      width={1}
                      sx={{
                        p: 1,
                        '&:hover': {
                          background: `${theme.colors.primary.lighter}`,
                          borderRadius: 1
                        }
                      }}
                    >
                      <GroupsInfo group={group} />
                      <Box>
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>
            </Collapse>
            <Stack justifyContent={'center'} direction={'row'}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {!expanded ? (
                  <Typography variant="h4" color={'primary'}>
                    Hiển thị thêm
                  </Typography>
                ) : (
                  <Typography variant="h4" color={'primary'}>
                    Ẩn
                  </Typography>
                )}
              </ExpandMore>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
