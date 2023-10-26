import { Stack, TextField } from '@mui/material'
import React from 'react'

export const CreateNewsFeedLink = () => {
  return (
    <Stack spacing={1}>
        <TextField placeholder='Title' multiline></TextField>
        <TextField placeholder='Url' multiline></TextField>
    </Stack>
  )
}
