import React from "react";
import { useQuery } from "react-query";
import TokenPairTable from "./TokenPairTable";
import { Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";
import LoaderComp from "../../LoaderComp";

const OptimismTokensAddress = "0x4200000000000000000000000000000000000042";

export default function TokenPair() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmosTokenPair"], async () => {
    const res = await fetch(
      // Dexscreener API for Token Pair
      `https://api.dexscreener.com/latest/dex/tokens/${OptimismTokensAddress}`
    );
    return res.json();
  });
  console.log(data);

  if (isFetching)
    return (
     <LoaderComp />
    );

  if (error)
    return (
      <Center
        style={{
          width: "100%",
          height: "20%",

          left: "0px",
          top: "0px",
        }}
      >
        <Notification icon={<IconX size={18} />} color="red">
          Error! Failed to Fetch API
        </Notification>
      </Center>
    );
  return (
    <>
      <TokenPairTable data={data} />
    </>
  );
}
