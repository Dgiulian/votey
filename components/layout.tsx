import React from "react";

import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>Votey | Share your opinion</Head>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
