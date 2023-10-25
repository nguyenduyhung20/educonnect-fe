import { Stack, TextField } from '@mui/material'
import React from 'react'

export const CreateNewsFeedPost = () => {
  return (
    <Stack spacing={1}>
        <TextField placeholder='Title'></TextField>
        <TextField placeholder='Text (optional)'></TextField>
    </Stack>
  )
}
