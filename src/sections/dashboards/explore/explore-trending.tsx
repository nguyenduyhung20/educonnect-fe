import {
  Box,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  Typography,
  styled
} from '@mui/material';
import React, { useState } from 'react';
import { TrendingNewsItem } from '@/components/dashboards/trending-news-item';
import { SearchBar } from '@/components/dashboards/search-bar';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExploreTrending = () => {
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            Xu hướng dành cho bạn
          </Typography>

          <Stack direction={'column'} spacing={1}>
            <TrendingNewsItem content="Bất đẳng thức Cauchy" />
            <TrendingNewsItem content="HSG Quốc gia" />
            <TrendingNewsItem content="Giao thoa sóng" />
            <TrendingNewsItem content="Sinh học 10" />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Stack direction={'column'} spacing={1}>
                <TrendingNewsItem content="Toán 12" />
                <TrendingNewsItem content="Đề thi GDCD" />
                <TrendingNewsItem content="Pascal khó" />
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
                    Xem thêm
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
