import React from "react";
import { Image } from "@mantine/core";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Image
          pb={2}
          src="/datalogo2.png"
          alt="gigiblock-logo"
          width="12vw"
          height="calc(7vw*0.3)"
        />
      </Link>
    </>
  );
}
