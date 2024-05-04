import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { AuthContextType } from '@/contexts/auth/jwt-context';
import { useAuth } from '@/hooks/use-auth';
import { useMounted } from '@/hooks/use-mounted';
import { useRouter } from 'next/router';
import Link from '@/components/Link';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

function Hero() {
  const initialValues = {
    username: '',
    password: '',
    submit: null
  };

  const validationSchema = Yup.object({
    username: Yup.string().max(255).required('Tên đăng nhập là bắt buộc'),
    password: Yup.string().max(255).required('Mật khẩu là bắt buộc')
  });

  const { signIn } = useAuth<AuthContextType>();

  const isMounted = useMounted();

  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const user = await signIn(values.username, values.password);
        if (isMounted() && user) {
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
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            EduConnect
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            {`Mạng xã hội EduConnect giúp hỗ trợ học tập hiệu quả, tạo cộng đồng kết nối các bạn học
            sinh, giáo viên, phụ huynh, và hỗ trợ hệ thống học tập trực tuyến cho các
            trường cấp 3 trên cả nước. `}
          </TypographyH2>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} sx={{ padding: 2 }}>
              <Stack alignItems={'flex-start'} spacing={1}>
                <Typography variant="h4">Tên đăng nhập</Typography>
                <TextField
                  fullWidth
                  autoFocus
                  error={!!(formik.touched.username && formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
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
                  error={!!(formik.touched.password && formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  placeholder="Nhập mật khẫu"
                />
              </Stack>

              {formik.errors.submit && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
            </Stack>

            <Button
              disabled={formik.isSubmitting}
              size="large"
              variant="contained"
              type="submit"
            >
              Đăng nhập
            </Button>

            <Typography padding={1} component={Link} href={'/register'}>
              Đăng ký
            </Typography>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
