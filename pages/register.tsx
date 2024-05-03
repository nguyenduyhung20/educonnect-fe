import { Box, Card, Container, Stack, styled } from '@mui/material';
import { useEffect, type ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import Head from 'next/head';
import Logo from 'src/components/LogoSign';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import Hero from '@/sections/Overview/Hero-comp';
import HeroRegister from '@/sections/Overview/Hero-comp/register';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
    height: ${theme.spacing(10)};
    margin-bottom: ${theme.spacing(10)};
  `
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
      overflow: auto;
      background: ${theme.palette.common.white};
      flex: 1;
      overflow-x: hidden;
  `
);

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);
  return (
    <OverviewWrapper>
      <Head>
        <title>EduConnect</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex">
            <Logo />
            <Box flex={1}></Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <HeroRegister />
    </OverviewWrapper>
  );
}

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
