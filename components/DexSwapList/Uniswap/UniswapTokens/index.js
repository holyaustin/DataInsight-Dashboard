import { Box } from "@chakra-ui/react";
import { Center, Notification, Text } from "@mantine/core";
import UniswapTokenTable from "./UniswapTokenTable";
import { IconX } from "@tabler/icons";
import { useQuery } from "react-query";
import LoaderComp from "../../../LoaderComp";

//COVALENT API Key
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function UniswapTokens() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["uniswapTokens"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/10/xy=k/uniswap/tokens/?key=${APIKey}`
    );
    return res.json();
  });

  const items = data?.data?.items;

  //console.log(items2);

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
          Error! Failed to Fetch Uniswap Tokens API
        </Notification>
      </Center>
    );

  return (
    <Box>
      <Box minWidth="1220" maxW="600" justifyItems="center" mx="auto" mb={20}>
        <Text fw={500}>Top Tokens</Text>
        <UniswapTokenTable data={items} />
      </Box>
    </Box>
  );
}
