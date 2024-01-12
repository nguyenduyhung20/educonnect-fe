import {
  Box,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchBar } from '@/components/dashboards/search-bar';
import { GroupsInfo } from './groups-info';
import { useRouter } from 'next/router';
import { useGroupsContext } from '@/contexts/groups/groups-context';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const DiscoverGroups = () => {
  const theme = useTheme();

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }));

  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // list hot group
  const { getHotGroups } = useGroupsContext();

  const listGroups = useMemo(() => {
    return getHotGroups.data?.data || [];
  }, [getHotGroups]);

  useEffect(() => {
    getHotGroups.call(new FormData());
  }, []);

  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          <SearchBar />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: 23
            }}
          >
            Groups
          </Typography>

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

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Stack direction={'column'} spacing={3}>
                {listGroups.slice(3, -1).map((group, index) => {
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
                    Show more
                  </Typography>
                ) : (
                  <Typography variant="h4" color={'primary'}>
                    Hide
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
