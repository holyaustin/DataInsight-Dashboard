import React from "react";
import { useQuery } from "react-query";
import UniswapStatsOverview from "./UniswapStatsOverview";
import {  Center, Notification } from "@mantine/core";
import { IconX } from "@tabler/icons";
import LoaderComp from "../../../LoaderComp";

export default function UniswapStats() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["uniswapStats"], async () => {
    const res = await fetch(
      // coingecko API for Market Stats
      "https://api.coingecko.com/api/v3/coins/uniswap?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=false"
    );
    return res.json();
  });

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
      <UniswapStatsOverview data={data} />
    </>
  );
}
