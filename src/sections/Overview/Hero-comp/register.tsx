import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { AuthContextType } from '@/contexts/auth/jwt-context';
import { useAuth } from '@/hooks/use-auth';
import { useMounted } from '@/hooks/use-mounted';
import { useRouter } from 'next/router';

function HeroRegister() {
  const initialValues = {
    username: '',
    password: '',
    submit: null,
    fullName: '',
    email: '',
    reEnterPassword: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().max(255).required('Tên đăng nhập là bắt buộc'),
    password: Yup.string().max(255).required('Mật khẩu là bắt buộc'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Vui lòng nhập lại mật khẩu')
  });

  const { signUp } = useAuth<AuthContextType>();

  const isMounted = useMounted();

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await signUp(
          values.username,
          values.password,
          values.fullName,
          values.email
        );
        if (isMounted()) {
          router.push('/');
        }
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: error.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item lg={8} mx="auto">
          <form onSubmit={formik.handleSubmit}>
            <Stack justifyContent={'center'} direction={'row'}>
              <Stack spacing={2} sx={{ padding: 2 }} flex={1}>
                <Stack alignItems={'flex-start'} spacing={1}>
                  <Typography variant="h4">Họ và Tên</Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    error={
                      !!(formik.touched.fullName && formik.errors.fullName)
                    }
                    helperText={
                      formik.touched.fullName && formik.errors.fullName
                    }
                    name="fullName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    placeholder="Nhập họ và tên"
                  />
                </Stack>

                <Stack alignItems={'flex-start'} spacing={1}>
                  <Typography variant="h4">Email</Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    error={!!(formik.touched.email && formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Nhập Email"
                  />
                </Stack>

                <Stack alignItems={'flex-start'} spacing={1}>
                  <Typography variant="h4">Tên đăng nhập</Typography>
                  <TextField
                    fullWidth
                    autoFocus
                    error={
                      !!(formik.touched.username && formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Nhập tên đăng nhập"
                  />
                </Stack>

                <Stack alignItems={'flex-start'} spacing={1}>
                  <Typography variant="h4">Mật khẩu</Typography>
                  <TextField
                    fullWidth
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                    placeholder="Nhập lại mật khẩu"
                  />
                </Stack>

                <Stack alignItems={'flex-start'} spacing={1}>
                  <Typography variant="h4">Xác nhận mật khẩu</Typography>
                  <TextField
                    fullWidth
                    error={
                      !!(
                        formik.touched.reEnterPassword &&
                        formik.errors.reEnterPassword
                      )
                    }
                    helperText={
                      formik.touched.reEnterPassword &&
                      formik.errors.reEnterPassword
                    }
                    name="reEnterPassword" // Đổi tên trường thành "reEnterPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password" // Đổi type thành "password"
                    value={formik.values.reEnterPassword}
                    placeholder="Nhập lại mật khẩu"
                  />
                </Stack>

                {formik.errors.submit && (
                  <FormHelperText error sx={{ mt: 1 }}>
                    {formik.errors.submit as string}
                  </FormHelperText>
                )}
              </Stack>

              <Box></Box>
            </Stack>

            <Button
              disabled={formik.isSubmitting}
              size="large"
              variant="contained"
              type="submit"
            >
              Đăng ký
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HeroRegister;
