import Head from "next/head";
import { AppShell } from "@mantine/core";
import { CronusTokensOverview, Footer, HeaderNavbar } from "../components";
import SideNavbarCronus from "../components/SideNavbarCronus";

export default function CronusOverviewT() {
  return (
    <>
     <Head>
        <title>Cronus-Finance Tokens - EddAlytics</title>
        <meta name="description" content="Emvos Dex Dashboard Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        navbar={<SideNavbarCronus />}
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
        <CronusTokensOverview />
      </AppShell>
    </>
  );
}
