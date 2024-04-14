import Head from "next/head";
import { AppShell } from "@mantine/core";
import { Footer, HeaderNavbar, UnstoppableLogin } from "../components";
import SideNavbarUniswap from "../components/SideNavbarUniswap";
import UniswapOverview from "../components/DexSwapList/Uniswap";

export default function Uniswap() {
  return (
    <>
      <Head>
        <title>DataInsight - Uniswap Dashboard Analytics</title>
        <meta name="description" content="Uniswap Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        navbar={<SideNavbarUniswap />}
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
      
        <UniswapOverview />
      </AppShell>
    </>
  );
}
