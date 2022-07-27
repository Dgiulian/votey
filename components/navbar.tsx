import { Button, Container } from "@mantine/core";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header>
      <Container>
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link href="/create" passHref>
            <Button ml="auto">Create</Button>
          </Link>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
