import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  AppShell,
  createStyles,
  Container,
  Text,
  Button,
  Group,
  Image,
  Center,
  Notification,
  Box,
} from "@mantine/core";
import { IconX } from "@tabler/icons";

import {
  OptimismOverview,
  Footer,
  HeaderNavbar,
  LoaderComp,
  Logo,
  SideNavbarHome,
} from "../components";
import UAuth from "@uauth/js";
import Link from "next/link";

const uauth = new UAuth({
  clientID: process.env.NEXT_PUBLIC_UNSTOPPABLEDOMAIN_CLIENT_ID,
  redirectUri: "https://data-insight-dashboard.vercel.app/",
  scope: "openid wallet ",
});

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  inner: {
    position: "relative",
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,
    textAlign: "center",

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();
  const [authorization, setAuthorization] = useState();
  const { classes } = useStyles();

  // Check to see if the user is inside the cache
  useEffect(() => {
    setLoading(true);
    uauth
      .user()
      .then(setUser)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Login with a popup and save the user
  const handleLogin = () => {
    setLoading(true);
    uauth
      .loginWithPopup()
      .then(setAuthorization)
      .then(() => uauth.user().then(setUser))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  // Logout and delete user
  const handleLogout = () => {
    setLoading(true);
    uauth
      .logout()
      .then(() => setUser(undefined))
      .catch(setError)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <LoaderComp />;
  }

  if (error) {
    console.error(error);
    return (
      <Center
        style={{
          position: "fixed",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Connect
        </Notification>
      </Center>
    );
  }

  const getEllipsisTxt = (str, n = 5) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  if (user && authorization) {
    return (
      <>
        <Head>
          <title>DataInsight - Optimism Dex Dashboard Analytics</title>
          <meta name="description" content="Optimism Dex Dashboard Analytics" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppShell
          navbar={<SideNavbarHome />}
          header={<HeaderNavbar />}
          footer={<Footer links={[]} />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <Button
              sx={(theme) => ({
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: theme.shadows.md,
                },
              })}
              radius="md"
              variant="default"
              fz={{ base: "ms", md: "md" }}
              onClick={handleLogout}
            >
              <Image src="/ud-logo.svg" alt="ud-logo" px={1} />
              {user.sub}
            </Button>

            <Button
              sx={(theme) => ({
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: theme.shadows.md,
                },
              })}
              radius="md"
              variant="default"
              fz={{ base: "ms", md: "md" }}
              onClick={handleLogout}
            >
              {getEllipsisTxt(user.wallet_address)}
            </Button>
          </Group>
          <OptimismOverview />
        </AppShell>
      </>
    );
  }

  return (
    <Container h="100hv" className={classes.inner}>
      <Center>
        <Box my={1}>
          <Link href="https://data-insight-dashboard.vercel.app/">
            <Image
              pb={2}
              src="/datalogo.png"
              alt="gigiblock-logo"
              width="100%"
              height="100%"
            />
          </Link>
        </Box>
      </Center>

      <h1 className={classes.title}>
        {" "}
        <Center>
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: "green", to: "red" }}
          inherit
        >
          DataInsight Dashboard
          </Text>{" "}
        </Center>
      
        <Center>A Visual Analytics for</Center>
      </h1>
   
      <Center><h1>Decentralized Exchanges (DEXes)</h1></Center>

      <Text className={classes.description} color="dimmed">
        Providing a visual analytics front-end with detailed data about Dex’s
        performance and health on the Optimism Mainnet.
      </Text>

      <Center>
        <Group className={classes.controls}>
         
          <Link
            href="/optimism"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button bg="#0D67FE" radius="md" size="md" variant="default">
              Click to Continue
            </Button>
          </Link>
        </Group>
      </Center>
    </Container>
  );
}
