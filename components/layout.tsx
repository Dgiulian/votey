import React from "react";

import Head from "next/head";
import Navbar from "./navbar";
import { AppShell, Container, Header } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          {<Navbar />}
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors["midnight-blue"][8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Head>Votey | Share your opinion</Head>
      <main>
        <Container>{children}</Container>
      </main>
    </AppShell>
  );
};

export default Layout;
