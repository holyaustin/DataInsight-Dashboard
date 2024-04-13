import React from "react";
import { useQuery } from "react-query";
import OptimismStatsOverview from "./OptimismStatsOverview";
import { Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";
import LoaderComp from "../../LoaderComp";

const OptimismContractAddress = "0x4200000000000000000000000000000000000042";

export default function OptimismStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["OptimismStats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      `https://api.coingecko.com/api/v3/coins/Optimism/contract/${OptimismContractAddress}`
    );
    return res.json();
  });

  //console.log(data);

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
      <OptimismStatsOverview data={data} />
    </>
  );
}
