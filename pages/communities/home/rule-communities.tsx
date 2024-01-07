import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export const RuleCommunities = () => {
  return (
    <>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography variant="h5">
              Khi đăng bài ở nền tảng EduConnect của chúng tôi:
            </Typography>
          </Stack>
          <Divider />
          <Typography variant="h6">
            1. Hãy nhớ rằng bạn đang giao tiếp với người khác.
          </Typography>
          <Divider />
          <Typography variant="h6">
            2. Hãy cư xử đúng mực như khi bạn đang ở ngoài đời thật.
          </Typography>
          <Divider />
          <Typography variant="h6">
            3. Hãy nhớ nguồn gốc ban đầu của nội dung bài viết của bạn.
          </Typography>
          <Divider />
          <Typography variant="h6">
            4. Hãy tìm kiếm những bài đăng trùng lặp nếu có.
          </Typography>
          <Divider />
          <Typography variant="h6">
            5. Hãy đọc quy tắc và tiêu chuẩn cộng đồng của chúng tôi.
          </Typography>
        </Stack>
      </Paper>
    </>
  );
};
